import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

// ============================================================
// CONSTANTS
// ============================================================
const W = 480;
const H = 270;
const LANE_COUNT = 3;
const LANE_H = H / LANE_COUNT;
const LANE_CENTERS = [LANE_H * 0.5, LANE_H * 1.5, LANE_H * 2.5];
const PLAYER_X = 90;
const PLAYER_W = 88;
const PLAYER_H = 48;
const OBS_W = 48;
const OBS_H = 48;
const DISCOUNT_CODE = "MOWMONEY100";
const DOUBLE_CODE = "MOWMONEY200";
const LEADERBOARD_KEY = "nal_mower_lb_v6";

type GameState =
  | "idle" | "playing" | "level_complete" | "dead"
  | "enter_initials" | "celebration" | "double_or_nothing"
  | "boss_fight" | "won" | "boss_lost";

interface LeaderEntry { initials: string; score: number; level: number; }
interface Obstacle { x: number; lane: number; type: string; frame: number; }
interface Collectible { x: number; lane: number; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number; }

function loadLB(): LeaderEntry[] {
  try { return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) ?? "[]") || []; } catch { return []; }
}
function saveLB(lb: LeaderEntry[]) {
  try { localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb)); } catch {}
}

const LEVELS = [
  {
    id: 1, name: "Residential Route",
    tagline: "Dodge the toys. Mow the lawn.",
    obstacleTypes: ["tricycle","soccer_ball","garden_hose","sprinkler","sandbox","lawn_chair"],
    bgColor: "#3a8a20", skyColor: "#5ba3e8",
    baseSpeed: 2.4, speedPerSec: 0.04, spawnInterval: 88, duration: 1800,
  },
  {
    id: 2, name: "HOA Gauntlet",
    tagline: "No loud noises past 10.",
    obstacleTypes: ["hoa_rep","violation_sign","measuring_tape","angry_neighbor"],
    bgColor: "#2a7a18", skyColor: "#8ab8e8",
    baseSpeed: 3.0, speedPerSec: 0.05, spawnInterval: 78, duration: 1800,
  },
  {
    id: 3, name: "Construction Site",
    tagline: "Hard hats required.",
    obstacleTypes: ["lumber_pile","porta_potty","hard_hat","cone_row","mud_puddle"],
    bgColor: "#b89050", skyColor: "#c8b890",
    baseSpeed: 3.4, speedPerSec: 0.06, spawnInterval: 72, duration: 1800,
  },
  {
    id: 4, name: "Drought Zone",
    tagline: "Pray for rain.",
    obstacleTypes: ["fire_ants","dead_stump","cracked_earth","tumbleweed"],
    bgColor: "#b88030", skyColor: "#e89030",
    baseSpeed: 3.8, speedPerSec: 0.07, spawnInterval: 65, duration: 1800,
  },
];

// ============================================================
// DRAWING PRIMITIVES
// ============================================================
function r(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radius: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h), radius);
  ctx.fill();
}
function stroke(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, lw = 2) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, Math.round(w) - 1, Math.round(h) - 1);
}
function txt(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, color: string, align: CanvasTextAlign = "center", shadow = true) {
  ctx.font = `bold ${size}px 'Courier New', monospace`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  if (shadow) {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillText(s, x + 1, y + 1);
  }
  ctx.fillStyle = color;
  ctx.fillText(s, x, y);
}
function circle(ctx: CanvasRenderingContext2D, x: number, y: number, rad: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
}

// ============================================================
// MOWER SPRITE — Exmark Navigator, red deck, white hopper
// ============================================================
function drawMower(ctx: CanvasRenderingContext2D, cx: number, cy: number, frame: number, hurt = false) {
  if (hurt && Math.floor(frame / 3) % 2 === 0) return; // flash on hurt
  const x = cx - PLAYER_W / 2;
  const y = cy - PLAYER_H / 2;

  // Ground shadow
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath(); ctx.ellipse(cx, cy + PLAYER_H / 2 + 2, PLAYER_W * 0.42, 5, 0, 0, Math.PI * 2); ctx.fill();

  // === REAR LARGE WHEELS ===
  circle(ctx, x + 14, cy + 16, 14, "#111");
  circle(ctx, x + 14, cy + 16, 9, "#333");
  circle(ctx, x + 14, cy + 16, 4, "#555");
  // wheel spokes
  for (let i = 0; i < 4; i++) {
    const a = (i * 90 + frame * 4) * Math.PI / 180;
    ctx.strokeStyle = "#444"; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + 14 + Math.cos(a) * 4, cy + 16 + Math.sin(a) * 4);
    ctx.lineTo(x + 14 + Math.cos(a) * 9, cy + 16 + Math.sin(a) * 9);
    ctx.stroke();
  }

  // === FRONT SMALL WHEELS ===
  circle(ctx, x + PLAYER_W - 14, cy + 16, 9, "#111");
  circle(ctx, x + PLAYER_W - 14, cy + 16, 5, "#333");

  // === MAIN BODY / FRAME (dark charcoal) ===
  rr(ctx, x + 10, y + 14, PLAYER_W - 20, 26, 3, "#2a2a2a");

  // === RED CUTTING DECK ===
  rr(ctx, x + 8, cy + 6, PLAYER_W - 16, 14, 2, "#cc1111");
  rr(ctx, x + 8, cy + 6, PLAYER_W - 16, 5, 2, "#ee2222");
  stroke(ctx, x + 8, cy + 6, PLAYER_W - 16, 14, "#880000", 1.5);
  // NAVIGATOR text on deck
  ctx.font = "bold 5px 'Courier New', monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText("NAVIGATOR", cx + 4, cy + 13);
  // Blade spinner hint
  const bladeAngle = (frame * 8) * Math.PI / 180;
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 8 + Math.cos(bladeAngle) * 6, cy + 13 + Math.sin(bladeAngle) * 3);
  ctx.lineTo(cx - 8 + Math.cos(bladeAngle + Math.PI) * 6, cy + 13 + Math.sin(bladeAngle + Math.PI) * 3);
  ctx.stroke();

  // === WHITE HOPPER / GRASS CATCHER (back of mower) ===
  rr(ctx, x + 2, y + 4, 28, 28, 3, "#e0e0e0");
  rr(ctx, x + 2, y + 4, 28, 7, 3, "#f0f0f0");
  stroke(ctx, x + 2, y + 4, 28, 28, "#aaa", 1.5);
  // vent slats
  for (let i = 0; i < 3; i++) {
    r(ctx, x + 6, y + 14 + i * 6, 20, 2, "#ccc");
  }
  // EXMARK label
  ctx.font = "bold 4px 'Courier New', monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = "#cc1111";
  ctx.fillText("EXMARK", x + 16, y + 30);

  // === OPERATOR SEAT ===
  rr(ctx, x + 34, cy - 2, 16, 8, 2, "#5a3010");

  // === OPERATOR BODY ===
  const bx = x + 36;
  const by = y + 2;
  // torso — red NAL shirt
  rr(ctx, bx, by + 8, 16, 14, 2, "#cc1111");
  r(ctx, bx + 2, by + 8, 12, 4, "#dd2222");
  stroke(ctx, bx, by + 8, 16, 14, "#880000", 1);
  // arms
  r(ctx, bx - 4, by + 10, 6, 8, "#cc1111");
  r(ctx, bx + 16, by + 10, 6, 8, "#cc1111");
  // hands on controls
  rr(ctx, bx - 4, by + 16, 6, 5, 2, "#f4c07a");
  rr(ctx, bx + 16, by + 16, 6, 5, 2, "#f4c07a");
  // legs (seated)
  r(ctx, bx + 2, by + 22, 6, 7, "#1a1a4a");
  r(ctx, bx + 8, by + 22, 6, 7, "#1a1a4a");
  // boots
  rr(ctx, bx, by + 28, 8, 4, 1, "#111");
  rr(ctx, bx + 8, by + 28, 8, 4, 1, "#111");
  // head
  rr(ctx, bx + 2, by - 1, 12, 11, 2, "#f4c07a");
  stroke(ctx, bx + 2, by - 1, 12, 11, "#c8843a", 1);
  // eyes
  r(ctx, bx + 4, by + 2, 2, 2, "#111");
  r(ctx, bx + 8, by + 2, 2, 2, "#111");
  // smile
  r(ctx, bx + 5, by + 7, 4, 1, "#c8843a");
  // cap — red NAL
  rr(ctx, bx + 1, by - 5, 14, 5, 1, "#cc1111");
  r(ctx, bx + 1, by - 5, 14, 2, "#ee2222");
  stroke(ctx, bx + 1, by - 5, 14, 5, "#880000", 1);
  r(ctx, bx + 11, by - 3, 7, 3, "#cc1111"); // brim
  ctx.font = "bold 3px 'Courier New', monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText("NAL", bx + 8, by - 2);

  // === SPEED LINES ===
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    const lx = x - 6 - (frame % 12) * 1.2;
    const ly = y + 8 + i * 12;
    const len = 10 + i * 4;
    ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx - len, ly); ctx.stroke();
  }
}

// ============================================================
// OBSTACLE SPRITES
// ============================================================
function drawObstacle(ctx: CanvasRenderingContext2D, type: string, cx: number, cy: number, frame: number) {
  const x = cx - OBS_W / 2;
  const y = cy - OBS_H / 2;
  ctx.save();

  switch (type) {
    case "tricycle": {
      // Frame
      r(ctx, x + 10, y + 14, 28, 14, "#e84040");
      stroke(ctx, x + 10, y + 14, 28, 14, "#990000", 2);
      // Wheels
      circle(ctx, x + 16, cy + 14, 11, "#111");
      circle(ctx, x + 16, cy + 14, 6, "#333");
      circle(ctx, x + 36, cy + 14, 8, "#111");
      circle(ctx, x + 36, cy + 14, 4, "#333");
      // Handlebars
      r(ctx, x + 28, y + 6, 4, 10, "#888");
      r(ctx, x + 22, y + 6, 14, 3, "#888");
      // Seat
      rr(ctx, x + 18, y + 10, 14, 5, 2, "#2244cc");
      break;
    }
    case "soccer_ball": {
      circle(ctx, cx, cy + 2, 20, "#fff");
      ctx.strokeStyle = "#111"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy + 2, 20, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = "#111";
      [[0,-12],[10,6],[-10,6]].forEach(([px2,py2]) => {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (i*72-90)*Math.PI/180;
          if (i===0) ctx.moveTo(cx+px2+Math.cos(a)*5, cy+2+py2+Math.sin(a)*5);
          else ctx.lineTo(cx+px2+Math.cos(a)*5, cy+2+py2+Math.sin(a)*5);
        }
        ctx.closePath(); ctx.fill();
      });
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.beginPath(); ctx.ellipse(cx, cy+24, 16, 4, 0, 0, Math.PI*2); ctx.fill();
      break;
    }
    case "garden_hose": {
      ctx.strokeStyle = "#228b22"; ctx.lineWidth = 5; ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x+8, y+44); ctx.bezierCurveTo(x+8,y+8,x+44,y+8,x+44,y+44);
      ctx.bezierCurveTo(x+44,y+26,x+26,y+26,x+26,y+44); ctx.stroke();
      rr(ctx, x+22, y+38, 8, 12, 2, "#888");
      if (frame%6<3) {
        ctx.strokeStyle="#4af"; ctx.lineWidth=2;
        for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(x+26,y+36);ctx.lineTo(x+26+(i-1)*8,y+26);ctx.stroke();}
      }
      break;
    }
    case "sprinkler": {
      r(ctx, cx-3, y+28, 6, 22, "#888");
      rr(ctx, cx-10, y+20, 20, 10, 3, "#aaa");
      stroke(ctx, cx-10, y+20, 20, 10, "#666", 1.5);
      const a = (frame*4)*Math.PI/180;
      ctx.strokeStyle="#aaa"; ctx.lineWidth=3;
      ctx.beginPath(); ctx.moveTo(cx,y+25); ctx.lineTo(cx+Math.cos(a)*14,y+25+Math.sin(a)*3); ctx.stroke();
      if(frame%4<2){ctx.strokeStyle="#4af";ctx.lineWidth=1.5;for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*14,y+25);ctx.lineTo(cx+Math.cos(a)*14+Math.cos(a+0.5+i*0.3)*10,y+25-8-i*3);ctx.stroke();}}
      break;
    }
    case "sandbox": {
      rr(ctx, x+4, y+18, 40, 28, 3, "#f4d03f");
      stroke(ctx, x+4, y+18, 40, 28, "#c9a227", 2);
      rr(ctx, x+8, y+22, 32, 20, 2, "#f9e07a");
      rr(ctx, x+10, y+26, 10, 8, 2, "#e84040");
      r(ctx, x+26, y+28, 12, 4, "#2244cc");
      r(ctx, x+4, y+18, 40, 5, "#c9a227");
      break;
    }
    case "lawn_chair": {
      r(ctx, x+8, y+26, 4, 22, "#888"); r(ctx, x+36, y+26, 4, 22, "#888");
      r(ctx, x+6, y+42, 16, 4, "#888"); r(ctx, x+28, y+42, 16, 4, "#888");
      r(ctx, x+6, y+24, 36, 7, "#2244cc");
      r(ctx, x+6, y+8, 8, 18, "#2244cc"); r(ctx, x+34, y+8, 8, 18, "#2244cc"); r(ctx, x+6, y+8, 36, 7, "#2244cc");
      for(let i=0;i<4;i++) r(ctx, x+6+i*9, y+8, 4, 26, "#4466ee");
      stroke(ctx, x+6, y+8, 36, 24, "#1133aa", 2);
      break;
    }
    case "hoa_rep": {
      ctx.fillStyle="rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(cx,cy+24,12,4,0,0,Math.PI*2); ctx.fill();
      r(ctx, cx-9, cy+4, 7, 18, "#2a2a6a"); r(ctx, cx+2, cy+4, 7, 18, "#2a2a6a");
      rr(ctx, cx-10, cy-14, 20, 20, 2, "#c8a860"); stroke(ctx, cx-10, cy-14, 20, 20, "#8a7040", 1.5);
      // clipboard
      rr(ctx, cx+8, cy-10, 14, 18, 2, "#f5f5dc"); stroke(ctx, cx+8, cy-10, 14, 18, "#888", 1.5);
      r(ctx, cx+10, cy-6, 10, 2, "#aaa"); r(ctx, cx+10, cy-2, 10, 2, "#aaa"); r(ctx, cx+10, cy+2, 10, 2, "#aaa");
      r(ctx, cx+13, cy-12, 4, 4, "#888");
      rr(ctx, cx-7, cy-28, 14, 14, 2, "#f4c07a"); stroke(ctx, cx-7, cy-28, 14, 14, "#c8843a", 1);
      r(ctx, cx-4, cy-23, 3, 3, "#111"); r(ctx, cx+1, cy-23, 3, 3, "#111");
      r(ctx, cx-4, cy-16, 8, 2, "#c8843a"); r(ctx, cx-5, cy-15, 2, 2, "#c8843a"); r(ctx, cx+3, cy-15, 2, 2, "#c8843a");
      r(ctx, cx-9, cy-32, 18, 6, "#2a2a6a"); r(ctx, cx-7, cy-38, 14, 8, "#2a2a6a");
      // speech bubble
      const bob = Math.sin(frame*0.1)*2;
      rr(ctx, cx-26, cy-52+bob, 48, 16, 4, "#fffde7"); stroke(ctx, cx-26, cy-52+bob, 48, 16, "#888", 1.5);
      r(ctx, cx-3, cy-36+bob, 6, 6, "#fffde7");
      ctx.font="bold 5px 'Courier New',monospace"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillStyle="#cc0000";
      const msgs=["VIOLATION!","RULE #47!","TOO LOUD!","CALL HOA!"];
      ctx.fillText(msgs[Math.floor(frame/40)%4], cx, cy-44+bob);
      break;
    }
    case "violation_sign": {
      r(ctx, cx-3, y+22, 6, 30, "#888");
      rr(ctx, x+2, y+4, 44, 20, 3, "#cc1111"); stroke(ctx, x+2, y+4, 44, 20, "#880000", 2.5);
      ctx.font="bold 6px 'Courier New',monospace"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillStyle="#fff";
      ctx.fillText("NO LOUD", cx, y+11); ctx.fillText("NOISES", cx, y+18);
      ctx.font="bold 4px 'Courier New',monospace"; ctx.fillText("PAST 10PM", cx, y+24);
      break;
    }
    case "measuring_tape": {
      ctx.fillStyle="#f4c430"; ctx.beginPath(); ctx.arc(cx,cy,20,0,Math.PI*2); ctx.fill();
      stroke(ctx, cx-20, cy-20, 40, 40, "#c8a000", 2);
      circle(ctx, cx, cy, 7, "#888");
      r(ctx, cx+7, cy-3, 26, 6, "#f5f5dc"); stroke(ctx, cx+7, cy-3, 26, 6, "#888", 1);
      for(let i=0;i<5;i++) r(ctx, cx+11+i*5, cy-3, 1, 6, "#888");
      ctx.font="bold 5px 'Courier New',monospace"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillStyle="#111"; ctx.fillText("HOA",cx,cy);
      break;
    }
    case "angry_neighbor": {
      ctx.fillStyle="rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(cx,cy+24,10,4,0,0,Math.PI*2); ctx.fill();
      rr(ctx, cx-10, cy-12, 20, 22, 2, "#c8c8c8"); stroke(ctx, cx-10, cy-12, 20, 22, "#888", 1.5);
      r(ctx, cx-3, cy-12, 6, 22, "#aaa");
      r(ctx, cx-7, cy+10, 7, 14, "#c8c8c8"); r(ctx, cx, cy+10, 7, 14, "#c8c8c8");
      rr(ctx, cx-9, cy+22, 10, 5, 2, "#e8c880"); rr(ctx, cx+1, cy+22, 10, 5, 2, "#e8c880");
      rr(ctx, cx-7, cy-28, 14, 14, 2, "#f4c07a"); stroke(ctx, cx-7, cy-28, 14, 14, "#c8843a", 1);
      r(ctx, cx-4, cy-23, 3, 3, "#111"); r(ctx, cx+1, cy-23, 3, 3, "#111");
      r(ctx, cx-4, cy-25, 6, 2, "#c8843a"); r(ctx, cx+1, cy-25, 6, 2, "#c8843a");
      r(ctx, cx-3, cy-16, 6, 2, "#c8843a");
      r(ctx, cx-7, cy-34, 14, 8, "#888"); r(ctx, cx-9, cy-32, 4, 6, "#888"); r(ctx, cx+5, cy-32, 4, 6, "#888");
      rr(ctx, cx+8, cy-6, 10, 12, 2, "#fff"); stroke(ctx, cx+8, cy-6, 10, 12, "#888", 1.5);
      ctx.strokeStyle="#888"; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(cx+20,cy,4,-Math.PI/2,Math.PI/2); ctx.stroke();
      if(frame%8<4){ctx.strokeStyle="rgba(200,200,200,0.6)";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx+12,cy-8);ctx.lineTo(cx+10,cy-16);ctx.stroke();ctx.beginPath();ctx.moveTo(cx+16,cy-8);ctx.lineTo(cx+18,cy-16);ctx.stroke();}
      break;
    }
    case "lumber_pile": {
      for(let i=0;i<4;i++){
        const ly=y+38-i*8;
        rr(ctx, x+4+i*2, ly, 40-i*4, 7, 1, i%2===0?"#c8a060":"#b08040");
        stroke(ctx, x+4+i*2, ly, 40-i*4, 7, "#7a5020", 1);
        for(let j=0;j<3;j++) r(ctx, x+10+j*10+i*2, ly+2, 2, 3, "rgba(0,0,0,0.15)");
      }
      ctx.fillStyle="#8a5c20"; ctx.beginPath(); ctx.arc(x+8,y+22,5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+8,y+30,5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#c8a060"; ctx.beginPath(); ctx.arc(x+8,y+22,2,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+8,y+30,2,0,Math.PI*2); ctx.fill();
      break;
    }
    case "porta_potty": {
      rr(ctx, x+8, y+8, 32, 42, 3, "#4488cc"); stroke(ctx, x+8, y+8, 32, 42, "#2255aa", 2.5);
      rr(ctx, x+6, y+4, 36, 8, 2, "#3366bb");
      rr(ctx, x+16, y+24, 16, 26, 2, "#3366bb"); stroke(ctx, x+16, y+24, 16, 26, "#2255aa", 1.5);
      r(ctx, x+28, y+34, 3, 6, "#f4c430");
      rr(ctx, x+10, y+12, 8, 8, 2, "#2255aa");
      for(let i=0;i<3;i++) r(ctx, x+11, y+13+i*2, 6, 1, "#88aadd");
      ctx.font="bold 4px 'Courier New',monospace"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillStyle="#fff";
      ctx.fillText("OCCUPIED", cx, y+18);
      if(frame%10<5){ctx.strokeStyle="rgba(150,200,50,0.4)";ctx.lineWidth=1;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(x+14+i*8,y+4);ctx.bezierCurveTo(x+10+i*8,y-4,x+18+i*8,y-8,x+14+i*8,y-14);ctx.stroke();}}
      break;
    }
    case "hard_hat": {
      ctx.fillStyle="#f4c430"; ctx.beginPath(); ctx.arc(cx,cy+2,20,Math.PI,0); ctx.fill();
      r(ctx, x+2, cy+2, 44, 6, "#f4c430"); stroke(ctx, x+2, cy+2, 44, 6, "#c8a000", 1.5);
      ctx.strokeStyle="#c8a000"; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(cx,cy+2,20,Math.PI,0); ctx.stroke();
      r(ctx, cx-14, cy, 28, 4, "#e8b800");
      ctx.fillStyle="rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(cx,cy+24,18,5,0,0,Math.PI*2); ctx.fill();
      break;
    }
    case "cone_row": {
      for(let i=0;i<3;i++){
        const cx2=x+8+i*16;
        ctx.fillStyle="#ff6600"; ctx.beginPath(); ctx.moveTo(cx2,y+8); ctx.lineTo(cx2-9,y+42); ctx.lineTo(cx2+9,y+42); ctx.closePath(); ctx.fill();
        ctx.fillStyle="#fff"; ctx.beginPath(); ctx.moveTo(cx2-4,y+22); ctx.lineTo(cx2+4,y+22); ctx.lineTo(cx2+6,y+30); ctx.lineTo(cx2-6,y+30); ctx.closePath(); ctx.fill();
        r(ctx, cx2-11, y+40, 22, 5, "#ff6600");
        ctx.strokeStyle="#cc4400"; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(cx2,y+8); ctx.lineTo(cx2-9,y+42); ctx.lineTo(cx2+9,y+42); ctx.closePath(); ctx.stroke();
      }
      break;
    }
    case "mud_puddle": {
      ctx.fillStyle="#6b4423"; ctx.beginPath(); ctx.ellipse(cx,cy+12,24,12,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#7a5030"; ctx.beginPath(); ctx.ellipse(cx-4,cy+8,16,8,-0.2,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle="rgba(100,60,20,0.35)"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.ellipse(cx,cy+12,18+(frame%20),9+(frame%20)*0.4,0,0,Math.PI*2); ctx.stroke();
      ctx.fillStyle="#8a6040";
      for(let i=0;i<4;i++){const a=(i*90+frame*5)*Math.PI/180; ctx.beginPath(); ctx.arc(cx+Math.cos(a)*20,cy+12+Math.sin(a)*9,3,0,Math.PI*2); ctx.fill();}
      break;
    }
    case "fire_ants": {
      ctx.fillStyle="#c8703a"; ctx.beginPath(); ctx.arc(cx,cy+12,22,Math.PI,0); ctx.fill();
      for(let i=0;i<6;i++){ctx.fillStyle="#a04c18"; ctx.beginPath(); ctx.arc(cx-14+i*6,cy+8,3,0,Math.PI*2); ctx.fill();}
      ctx.fillStyle="#1a0a00";
      [[cx-18,cy+2],[cx+16,cy+4],[cx-6,cy-4],[cx+4,cy-6],[cx-12,cy+12],[cx+18,cy+10]].forEach(([ax,ay],i)=>{
        const off=Math.sin(frame*0.2+i)*3;
        ctx.beginPath(); ctx.arc(ax+off,ay,2,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(ax+off+4,ay+1,1.5,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(ax+off-4,ay+1,1.5,0,Math.PI*2); ctx.fill();
      });
      ctx.font="bold 9px 'Courier New',monospace"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillStyle="#ff4400"; ctx.fillText("!",cx,cy-10);
      break;
    }
    case "dead_stump": {
      ctx.fillStyle="#5a3010"; ctx.beginPath(); ctx.moveTo(cx-18,cy+22); ctx.bezierCurveTo(cx-12,cy+12,cx-6,cy+16,cx,cy+18); ctx.bezierCurveTo(cx+6,cy+16,cx+12,cy+12,cx+18,cy+22); ctx.fill();
      ctx.fillStyle="#6b4020"; ctx.beginPath(); ctx.moveTo(cx-16,cy+20); ctx.lineTo(cx-12,cy-10); ctx.lineTo(cx+12,cy-10); ctx.lineTo(cx+16,cy+20); ctx.closePath(); ctx.fill();
      stroke(ctx, cx-16, cy-10, 32, 30, "#3a1a00", 1.5);
      ctx.strokeStyle="#5a3010"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.ellipse(cx,cy-10,12,4,0,0,Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx,cy-10,7,3,0,0,Math.PI*2); ctx.stroke();
      ctx.fillStyle="#7a5030"; ctx.beginPath(); ctx.ellipse(cx,cy-10,12,4,0,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle="#3a1a00"; ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(cx,cy-10,12,4,0,0,Math.PI*2); ctx.stroke();
      break;
    }
    case "cracked_earth": {
      rr(ctx, x+2, y+14, 44, 32, 3, "#c8903a");
      ctx.strokeStyle="#8a5a1a"; ctx.lineWidth=2;
      [[[cx-18,cy+8],[cx-6,cy+18],[cx-14,cy+28]],[[cx+8,cy+6],[cx+18,cy+16],[cx+10,cy+26]],[[cx-2,cy+12],[cx+10,cy+20],[cx+4,cy+30]]].forEach(pts=>{
        ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]); pts.slice(1).forEach(p=>ctx.lineTo(p[0],p[1])); ctx.stroke();
      });
      break;
    }
    case "tumbleweed": {
      const roll=(frame*5)%360;
      ctx.save(); ctx.translate(cx,cy+6); ctx.rotate(roll*Math.PI/180);
      ctx.strokeStyle="#8a6020"; ctx.lineWidth=2;
      for(let i=0;i<6;i++){const a=(i*60)*Math.PI/180; ctx.beginPath(); ctx.moveTo(0,0); ctx.bezierCurveTo(Math.cos(a)*8,Math.sin(a)*8,Math.cos(a+0.5)*18,Math.sin(a+0.5)*18,Math.cos(a)*20,Math.sin(a)*20); ctx.stroke();}
      ctx.strokeStyle="#a07830"; ctx.beginPath(); ctx.arc(0,0,16,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.arc(0,0,9,0,Math.PI*2); ctx.stroke();
      ctx.restore();
      ctx.fillStyle="rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(cx,cy+28,16,4,0,0,Math.PI*2); ctx.fill();
      break;
    }
  }
  ctx.restore();
}

// ============================================================
// COLLECTIBLE — glowing leaf bag
// ============================================================
function drawCollectible(ctx: CanvasRenderingContext2D, cx: number, cy: number, frame: number) {
  const bob = Math.sin(frame * 0.15) * 3;
  // glow
  const grd = ctx.createRadialGradient(cx, cy+bob, 2, cx, cy+bob, 20);
  grd.addColorStop(0, "rgba(100,220,80,0.4)");
  grd.addColorStop(1, "rgba(100,220,80,0)");
  ctx.fillStyle = grd;
  ctx.beginPath(); ctx.arc(cx, cy+bob, 20, 0, Math.PI*2); ctx.fill();
  // bag
  ctx.fillStyle = "#2a7a2a";
  ctx.beginPath();
  ctx.moveTo(cx-10, cy+12+bob);
  ctx.bezierCurveTo(cx-12, cy-2+bob, cx+12, cy-2+bob, cx+10, cy+12+bob);
  ctx.closePath(); ctx.fill();
  stroke(ctx, cx-10, cy-2+bob, 20, 14, "#1a5a1a", 1.5);
  r(ctx, cx-4, cy-4+bob, 8, 4, "#8B4513");
  // leaf
  ctx.fillStyle = "#f4c430";
  ctx.beginPath(); ctx.moveTo(cx, cy+2+bob); ctx.bezierCurveTo(cx-7,cy-7+bob,cx+7,cy-7+bob,cx,cy+2+bob); ctx.fill();
  // sparkle
  if (frame % 20 < 10) {
    ctx.strokeStyle = "rgba(255,220,0,0.7)"; ctx.lineWidth = 1;
    const sa = (frame * 15) * Math.PI / 180;
    for (let i = 0; i < 4; i++) {
      const a = sa + i * Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(cx+Math.cos(a)*12, cy+bob+Math.sin(a)*12); ctx.lineTo(cx+Math.cos(a)*16, cy+bob+Math.sin(a)*16); ctx.stroke();
    }
  }
}

// ============================================================
// BACKGROUNDS
// ============================================================
function drawBg(ctx: CanvasRenderingContext2D, level: number, scrollX: number, frame: number) {
  if (level === 1) {
    // Sky gradient
    const sg = ctx.createLinearGradient(0,0,0,H*0.44);
    sg.addColorStop(0,"#4a90d9"); sg.addColorStop(1,"#a8d4f5");
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H*0.44);
    // Clouds
    ctx.fillStyle="rgba(255,255,255,0.92)";
    [[80,28,38,16],[230,18,48,18],[380,32,32,14]].forEach(([cx2,cy2,cw,ch])=>{
      const ox=((cx2-scrollX*0.25)%(W+120)+W+120)%(W+120)-60;
      ctx.beginPath(); ctx.ellipse(ox,cy2,cw,ch,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(ox-18,cy2+4,cw*0.65,ch*0.75,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(ox+18,cy2+4,cw*0.65,ch*0.75,0,0,Math.PI*2); ctx.fill();
    });
    // Lawn gradient
    const lg = ctx.createLinearGradient(0,H*0.44,0,H);
    lg.addColorStop(0,"#5aaf3c"); lg.addColorStop(1,"#2a7a18");
    ctx.fillStyle=lg; ctx.fillRect(0,H*0.44,W,H*0.56);
    // Mow stripes
    for(let i=0;i<5;i++){ctx.fillStyle=i%2===0?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)";ctx.fillRect(0,H*0.44+i*(H*0.56/5),W,H*0.56/5);}
    // Houses
    [30,170,320,470].forEach(hx=>{
      const ox=((hx-scrollX*0.45)%(W+120)+W+120)%(W+120)-60;
      r(ctx,ox,H*0.22,64,42,"#f5e6d0"); stroke(ctx,ox,H*0.22,64,42,"#c8a880",1);
      ctx.fillStyle="#8B4513"; ctx.beginPath(); ctx.moveTo(ox-4,H*0.22); ctx.lineTo(ox+32,H*0.1); ctx.lineTo(ox+68,H*0.22); ctx.closePath(); ctx.fill();
      r(ctx,ox+24,H*0.42,16,22,"#8B4513");
      r(ctx,ox+6,H*0.27,14,12,"#87ceeb"); stroke(ctx,ox+6,H*0.27,14,12,"#888",1);
      r(ctx,ox+44,H*0.27,14,12,"#87ceeb"); stroke(ctx,ox+44,H*0.27,14,12,"#888",1);
    });
    // Fence
    for(let i=0;i<22;i++){const fx=((i*26-scrollX*0.65)%(W+52)+W+52)%(W+52)-26;r(ctx,fx,H*0.44-14,3,18,"#f0f0f0");r(ctx,fx+3,H*0.44-10,20,3,"#f0f0f0");}
    // Lane dividers
    ctx.strokeStyle="rgba(255,255,255,0.12)"; ctx.setLineDash([18,9]); ctx.lineWidth=1;
    for(let i=1;i<LANE_COUNT;i++){ctx.beginPath();ctx.moveTo(0,LANE_H*i);ctx.lineTo(W,LANE_H*i);ctx.stroke();}
    ctx.setLineDash([]);

  } else if (level === 2) {
    const sg=ctx.createLinearGradient(0,0,0,H*0.4);
    sg.addColorStop(0,"#6a9ed8"); sg.addColorStop(1,"#b8d8f0");
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H*0.4);
    const lg=ctx.createLinearGradient(0,H*0.4,0,H);
    lg.addColorStop(0,"#4a9e30"); lg.addColorStop(1,"#1a6a10");
    ctx.fillStyle=lg; ctx.fillRect(0,H*0.4,W,H*0.6);
    // Tall grass
    for(let lane=0;lane<LANE_COUNT;lane++){
      const gy=LANE_H*lane+LANE_H*0.65;
      for(let i=0;i<28;i++){
        const gx=((i*17-scrollX*0.88)%(W+34)+W+34)%(W+34)-17;
        const gh=16+Math.sin(i*1.7+frame*0.05)*5;
        const sway=Math.sin(frame*0.08+i*0.5)*3;
        ctx.strokeStyle=lane%2===0?"#3a8a20":"#2a7a18"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.moveTo(gx,gy); ctx.quadraticCurveTo(gx+sway,gy-gh*0.5,gx+sway*2,gy-gh); ctx.stroke();
      }
    }
    // HOA houses
    [20,160,310].forEach(hx=>{
      const ox=((hx-scrollX*0.38)%(W+100)+W+100)%(W+100)-50;
      r(ctx,ox,H*0.16,72,46,"#e8dcc8"); stroke(ctx,ox,H*0.16,72,46,"#c8b898",1);
      ctx.fillStyle="#6a3a1a"; ctx.beginPath(); ctx.moveTo(ox-4,H*0.16); ctx.lineTo(ox+36,H*0.04); ctx.lineTo(ox+76,H*0.16); ctx.closePath(); ctx.fill();
      r(ctx,ox+28,H*0.38,16,24,"#6a3a1a");
      r(ctx,ox+8,H*0.21,14,12,"#87ceeb"); stroke(ctx,ox+8,H*0.21,14,12,"#888",1);
      r(ctx,ox+50,H*0.21,14,12,"#87ceeb"); stroke(ctx,ox+50,H*0.21,14,12,"#888",1);
    });
    ctx.strokeStyle="rgba(255,255,255,0.18)"; ctx.setLineDash([14,7]); ctx.lineWidth=1;
    for(let i=1;i<LANE_COUNT;i++){ctx.beginPath();ctx.moveTo(0,LANE_H*i);ctx.lineTo(W,LANE_H*i);ctx.stroke();}
    ctx.setLineDash([]);

  } else if (level === 3) {
    const sg=ctx.createLinearGradient(0,0,0,H*0.4);
    sg.addColorStop(0,"#b8a880"); sg.addColorStop(1,"#d4c4a0");
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H*0.4);
    const dg=ctx.createLinearGradient(0,H*0.4,0,H);
    dg.addColorStop(0,"#c8a060"); dg.addColorStop(1,"#906830");
    ctx.fillStyle=dg; ctx.fillRect(0,H*0.4,W,H*0.6);
    // Gravel
    for(let i=0;i<50;i++){const gx=((i*11+7-scrollX*0.93)%(W+22)+W+22)%(W+22)-11;const gy=H*0.4+(i*19%(H*0.6));ctx.fillStyle=`rgba(${100+i%40},${80+i%30},${40+i%20},0.35)`;ctx.beginPath();ctx.arc(gx,gy,1.5+i%3,0,Math.PI*2);ctx.fill();}
    // Building frame
    const bldX=((50-scrollX*0.28)%(W+120)+W+120)%(W+120)-60;
    ctx.strokeStyle="#777"; ctx.lineWidth=3;
    for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(bldX+i*30,H*0.04);ctx.lineTo(bldX+i*30,H*0.4);ctx.stroke();}
    for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(bldX,H*0.04+i*(H*0.36/3));ctx.lineTo(bldX+90,H*0.04+i*(H*0.36/3));ctx.stroke();}
    // Chain link
    ctx.strokeStyle="#888"; ctx.lineWidth=1;
    for(let i=0;i<26;i++){const fx=((i*20-scrollX*0.78)%(W+40)+W+40)%(W+40)-20;ctx.beginPath();ctx.moveTo(fx,H*0.4);ctx.lineTo(fx+10,H*0.4-12);ctx.lineTo(fx+20,H*0.4);ctx.stroke();ctx.beginPath();ctx.moveTo(fx,H*0.4-12);ctx.lineTo(fx+10,H*0.4);ctx.lineTo(fx+20,H*0.4-12);ctx.stroke();}
    for(let i=0;i<8;i++){const fx=((i*62-scrollX*0.78)%(W+124)+W+124)%(W+124)-62;r(ctx,fx-2,H*0.4-16,4,20,"#666");}
    ctx.strokeStyle="rgba(100,70,30,0.35)"; ctx.setLineDash([22,8]); ctx.lineWidth=2;
    for(let i=1;i<LANE_COUNT;i++){ctx.beginPath();ctx.moveTo(0,LANE_H*i);ctx.lineTo(W,LANE_H*i);ctx.stroke();}
    ctx.setLineDash([]);

  } else {
    const sg=ctx.createLinearGradient(0,0,0,H*0.45);
    sg.addColorStop(0,"#d06010"); sg.addColorStop(0.5,"#e89030"); sg.addColorStop(1,"#f8c060");
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H*0.45);
    if(frame%4<2){ctx.fillStyle="rgba(255,180,80,0.04)";ctx.fillRect(0,H*0.3,W,H*0.2);}
    const dg=ctx.createLinearGradient(0,H*0.45,0,H);
    dg.addColorStop(0,"#c4a050"); dg.addColorStop(1,"#7a5018");
    ctx.fillStyle=dg; ctx.fillRect(0,H*0.45,W,H*0.55);
    // Cracks
    ctx.strokeStyle="rgba(100,60,10,0.28)"; ctx.lineWidth=1;
    for(let i=0;i<10;i++){const cx2=((i*58+18-scrollX*0.88)%(W+116)+W+116)%(W+116)-58;const cy2=H*0.5+(i*21%(H*0.4));ctx.beginPath();ctx.moveTo(cx2,cy2);ctx.lineTo(cx2+18,cy2+10);ctx.lineTo(cx2+8,cy2+20);ctx.stroke();}
    // Dead trees
    [70,230,390].forEach(tx=>{
      const ox=((tx-scrollX*0.48)%(W+80)+W+80)%(W+80)-40;
      r(ctx,ox-4,H*0.18,8,H*0.27,"#5a3010");
      ctx.strokeStyle="#5a3010"; ctx.lineWidth=2;
      [[ox-14,H*0.2,ox,H*0.26],[ox+14,H*0.23,ox,H*0.28],[ox-10,H*0.31,ox,H*0.34],[ox+12,H*0.33,ox,H*0.37]].forEach(([x1,y1,x2,y2])=>{ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();});
    });
    ctx.strokeStyle="rgba(180,140,60,0.28)"; ctx.setLineDash([18,9]); ctx.lineWidth=1;
    for(let i=1;i<LANE_COUNT;i++){ctx.beginPath();ctx.moveTo(0,LANE_H*i);ctx.lineTo(W,LANE_H*i);ctx.stroke();}
    ctx.setLineDash([]);
  }
}

// ============================================================
// HUD
// ============================================================
function drawHUD(ctx: CanvasRenderingContext2D, level: number, score: number, lives: number, lb: LeaderEntry[], frame: number, boost: boolean) {
  // Top bar
  const hg=ctx.createLinearGradient(0,0,0,26);
  hg.addColorStop(0,"rgba(0,0,0,0.78)"); hg.addColorStop(1,"rgba(0,0,0,0.55)");
  ctx.fillStyle=hg; ctx.fillRect(0,0,W,26);

  // Level badge
  rr(ctx, 4, 4, 6, 18, 2, "#cc1111");
  txt(ctx, `L${level}`, 7, 13, 7, "#fff", "center", false);
  txt(ctx, LEVELS[level-1].name.toUpperCase(), 16, 13, 6, "#f4c430", "left", false);

  // Score (center)
  txt(ctx, `${score}ft`, W/2, 13, 10, "#fff", "center", false);

  // Lives (right)
  for(let i=0;i<lives;i++){
    const hx=W-8-i*16;
    ctx.fillStyle="#cc1111"; ctx.beginPath(); ctx.arc(hx,10,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="#ee2222"; ctx.beginPath(); ctx.arc(hx-2,8,2.5,0,Math.PI*2); ctx.fill();
  }

  // Boost bar
  if(boost){
    rr(ctx, W/2-38, 26, 76, 12, 2, "rgba(255,80,0,0.88)");
    txt(ctx, "⚡ TURBO MODE ⚡", W/2, 32, 7, "#fff", "center", false);
  }

  // Leaderboard panel (top right)
  const lbX=W-86, lbY=38;
  rr(ctx, lbX-3, lbY-3, 89, 72, 4, "rgba(0,0,0,0.58)");
  ctx.strokeStyle="rgba(244,196,48,0.4)"; ctx.lineWidth=1;
  ctx.beginPath(); ctx.roundRect(lbX-3,lbY-3,89,72,4); ctx.stroke();
  txt(ctx, "TOP 5", lbX+40, lbY+6, 6, "#f4c430", "center", false);
  const top5=lb.slice(0,5);
  top5.forEach((e,i)=>{
    const ey=lbY+16+i*11;
    txt(ctx, `${i+1}.${e.initials}`, lbX+2, ey, 6, i===0?"#f4c430":"#ccc", "left", false);
    txt(ctx, `${e.score}`, lbX+86, ey, 6, i===0?"#f4c430":"#ccc", "right", false);
  });
  if(top5.length===0) txt(ctx, "BE FIRST!", lbX+40, lbY+38, 6, "#666", "center", false);
}

// ============================================================
// SCREENS
// ============================================================
function drawIdle(ctx: CanvasRenderingContext2D, lb: LeaderEntry[], frame: number) {
  // Overlay
  const og=ctx.createLinearGradient(0,0,0,H);
  og.addColorStop(0,"rgba(0,15,0,0.93)"); og.addColorStop(1,"rgba(0,8,0,0.97)");
  ctx.fillStyle=og; ctx.fillRect(0,0,W,H);

  // Decorative border
  ctx.strokeStyle="#cc1111"; ctx.lineWidth=3; ctx.strokeRect(5,5,W-10,H-10);
  ctx.strokeStyle="#f4c430"; ctx.lineWidth=1; ctx.strokeRect(9,9,W-18,H-18);

  // Title with glow
  const pulse=1+Math.sin(frame*0.05)*0.025;
  ctx.save(); ctx.translate(W/2,36); ctx.scale(pulse,pulse);
  // glow
  ctx.shadowColor="#f4c430"; ctx.shadowBlur=12;
  txt(ctx, "LAWN MOWER DASH", 0, 0, 17, "#f4c430", "center");
  ctx.shadowBlur=0; ctx.restore();

  txt(ctx, "NEWPORT AVENUE LANDSCAPING", W/2, 54, 6, "#cc1111", "center");
  txt(ctx, "Can you survive one day at NAL", W/2, 68, 7, "#ddd", "center");
  txt(ctx, "and mow your entire route?", W/2, 78, 7, "#ddd", "center");

  // Level cards
  const cardW=100, cardH=52, startX=(W-(cardW*4+6*3))/2;
  LEVELS.forEach((lv,i)=>{
    const cx2=startX+i*(cardW+6);
    const cy2=90;
    const hover=Math.sin(frame*0.08+i*0.8)*2;
    const colors=[["#0d3d0d","#1a7a1a"],["#0d0d3d","#1a1a7a"],["#2a1e08","#7a5a18"],["#2a0d08","#7a2a18"]];
    rr(ctx, cx2, cy2+hover, cardW, cardH, 4, colors[i][0]);
    ctx.strokeStyle=colors[i][1]; ctx.lineWidth=1.5; ctx.beginPath(); ctx.roundRect(cx2,cy2+hover,cardW,cardH,4); ctx.stroke();
    txt(ctx, `LVL ${lv.id}`, cx2+cardW/2, cy2+12+hover, 8, "#f4c430", "center");
    const words=lv.name.split(" ");
    if(words.length<=2){txt(ctx, lv.name.toUpperCase(), cx2+cardW/2, cy2+26+hover, 6, "#fff", "center");}
    else{txt(ctx, words.slice(0,2).join(" ").toUpperCase(), cx2+cardW/2, cy2+23+hover, 6, "#fff", "center");txt(ctx, words.slice(2).join(" ").toUpperCase(), cx2+cardW/2, cy2+31+hover, 6, "#fff", "center");}
    txt(ctx, lv.tagline.length>20?lv.tagline.slice(0,20)+"..":lv.tagline, cx2+cardW/2, cy2+44+hover, 5, "#888", "center");
  });

  // Controls
  txt(ctx, "↑↓ ARROWS / TAP = CHANGE LANE  |  ↓ HOLD = TURBO", W/2, 156, 6, "#666", "center");

  // Prize box
  rr(ctx, W/2-118, 164, 236, 30, 4, "rgba(180,14,14,0.18)");
  ctx.strokeStyle="#cc1111"; ctx.lineWidth=1; ctx.beginPath(); ctx.roundRect(W/2-118,164,236,30,4); ctx.stroke();
  txt(ctx, "BEAT ALL 4 LEVELS:", W/2, 174, 8, "#f4c430", "center");
  txt(ctx, "WIN $100 OFF YOUR SERVICE!", W/2, 186, 8, "#cc1111", "center");

  // Leaderboard
  txt(ctx, "HALL OF FAME", W/2, 204, 8, "#f4c430", "center");
  const top5=lb.slice(0,5);
  if(top5.length===0){txt(ctx, "No scores yet — be the first!", W/2, 218, 7, "#555", "center");}
  else{top5.forEach((e,i)=>{const ey=216+i*10;const color=i===0?"#f4c430":i===1?"#c0c0c0":i===2?"#cd7f32":"#888";txt(ctx,`${i+1}. ${e.initials}`,W/2-58,ey,7,color,"left");txt(ctx,`${e.score}ft`,W/2+18,ey,7,color,"left");txt(ctx,`L${e.level}`,W/2+68,ey,7,color,"left");});}

  // Blink
  if(frame%40<26) txt(ctx, "PRESS SPACE OR TAP TO START", W/2, H-12, 8, "#fff", "center");
}

function drawLevelIntro(ctx: CanvasRenderingContext2D, level: number, frame: number) {
  const alpha=Math.min(1, Math.min(frame/10, (90-frame)/20));
  ctx.fillStyle=`rgba(0,0,0,${0.72*alpha})`;
  ctx.fillRect(0, H/2-38, W, 76);
  ctx.strokeStyle=`rgba(244,196,48,${alpha})`; ctx.lineWidth=2;
  ctx.strokeRect(0, H/2-38, W, 76);
  txt(ctx, `LEVEL ${level}`, W/2, H/2-18, 16, `rgba(244,196,48,${alpha})`, "center");
  txt(ctx, LEVELS[level-1].name.toUpperCase(), W/2, H/2+2, 10, `rgba(255,255,255,${alpha})`, "center");
  txt(ctx, LEVELS[level-1].tagline, W/2, H/2+18, 7, `rgba(170,170,170,${alpha})`, "center");
  if(frame%30<20) txt(ctx, "GET READY!", W/2, H/2+32, 8, `rgba(204,17,17,${alpha})`, "center");
}

function drawLevelComplete(ctx: CanvasRenderingContext2D, level: number, score: number, frame: number) {
  ctx.fillStyle="rgba(0,25,0,0.88)"; ctx.fillRect(0,H/2-48,W,96);
  ctx.strokeStyle="#2a8a2a"; ctx.lineWidth=2; ctx.strokeRect(0,H/2-48,W,96);
  txt(ctx, `LEVEL ${level} COMPLETE!`, W/2, H/2-28, 14, "#f4c430", "center");
  txt(ctx, `Score: ${score}ft`, W/2, H/2-8, 10, "#fff", "center");
  if(level<4){txt(ctx, `NEXT: ${LEVELS[level].name.toUpperCase()}`, W/2, H/2+12, 8, "#aaa", "center");if(frame%30<20)txt(ctx,"CONTINUING...",W/2,H/2+30,8,"#2a8a2a","center");}
  else{txt(ctx,"YOU BEAT THE ROUTE!",W/2,H/2+12,10,"#cc1111","center");if(frame%30<20)txt(ctx,"CALCULATING REWARD...",W/2,H/2+30,8,"#f4c430","center");}
}

function drawDead(ctx: CanvasRenderingContext2D, level: number, score: number, lb: LeaderEntry[], rank: number, frame: number) {
  const og=ctx.createLinearGradient(0,0,0,H);
  og.addColorStop(0,"rgba(25,0,0,0.92)"); og.addColorStop(1,"rgba(10,0,0,0.96)");
  ctx.fillStyle=og; ctx.fillRect(0,0,W,H);
  ctx.strokeStyle="#cc1111"; ctx.lineWidth=3; ctx.strokeRect(5,5,W-10,H-10);
  ctx.shadowColor="#cc1111"; ctx.shadowBlur=8;
  txt(ctx, "WIPED OUT!", W/2, 28, 18, "#cc1111", "center");
  ctx.shadowBlur=0;
  const subs=["The HOA wins this round.","Shoulda dodged that tricycle.","That porta-potty came outta nowhere.","Fire ants: 1. You: 0."];
  txt(ctx, subs[(level-1)%4], W/2, 46, 7, "#666", "center");
  txt(ctx, `Level ${level}  |  Score: ${score}ft`, W/2, 60, 9, "#fff", "center");
  txt(ctx, "LEADERBOARD", W/2, 78, 9, "#f4c430", "center");
  const top5=lb.slice(0,5);
  top5.forEach((e,i)=>{
    const ey=92+i*14;
    const isNew=i===rank;
    if(isNew){rr(ctx,W/2-98,ey-7,196,14,2,"rgba(200,160,0,0.22)");}
    txt(ctx,`${i+1}. ${e.initials}`,W/2-58,ey,8,isNew?"#f4c430":i===0?"#f4c430":"#aaa","left");
    txt(ctx,`${e.score}ft`,W/2+18,ey,8,isNew?"#f4c430":"#aaa","left");
    txt(ctx,`L${e.level}`,W/2+78,ey,8,isNew?"#f4c430":"#aaa","left");
  });
  if(frame%40<26) txt(ctx, "SPACE / TAP TO TRY AGAIN", W/2, H-12, 8, "#fff", "center");
}

function drawCelebration(ctx: CanvasRenderingContext2D, score: number, zoom: number, browWipe: number, frame: number) {
  const og=ctx.createLinearGradient(0,0,0,H);
  og.addColorStop(0,"#0a2a0a"); og.addColorStop(1,"#1a4a1a");
  ctx.fillStyle=og; ctx.fillRect(0,0,W,H);
  // Confetti
  for(let i=0;i<36;i++){const cx2=(i*47+frame*(2+i%3))%W;const cy2=(i*31+frame*(1+i%2))%H;ctx.fillStyle=["#cc1111","#f4c430","#2a8a2a","#fff","#4488ff"][i%5];ctx.fillRect(cx2,cy2,4,4);}
  const scale=1+zoom*1.4;
  ctx.save(); ctx.translate(W/2,H/2+8); ctx.scale(scale,scale);
  drawMower(ctx,0,0,frame);
  if(browWipe>0){
    const ar=Math.min(browWipe*3,1);
    ctx.save(); ctx.translate(14,-18); ctx.rotate(-ar*1.1);
    r(ctx,0,0,5,16,"#cc1111"); r(ctx,0,0,5,4,"#f4c07a"); ctx.restore();
    if(browWipe>0.5){ctx.fillStyle="#4488ff";for(let i=0;i<3;i++){const sx=8+i*7+Math.sin(frame*0.3+i)*2;const sy=-30-(browWipe*18)+i*5;ctx.beginPath();ctx.arc(sx,sy,2,0,Math.PI*2);ctx.fill();}}
  }
  ctx.restore();
  txt(ctx,"ROUTE COMPLETE!",W/2,20,14,"#f4c430","center");
  txt(ctx,`Total: ${score}ft mowed`,W/2,38,9,"#fff","center");
  txt(ctx,"Sterling is proud.",W/2,52,8,"#aaa","center");
}

function drawDoubleOrNothing(ctx: CanvasRenderingContext2D, score: number, frame: number) {
  ctx.fillStyle="rgba(0,0,0,0.94)"; ctx.fillRect(0,0,W,H);
  ctx.strokeStyle="#f4c430"; ctx.lineWidth=3; ctx.strokeRect(5,5,W-10,H-10);
  ctx.shadowColor="#f4c430"; ctx.shadowBlur=10;
  txt(ctx,"DOUBLE OR NOTHING?",W/2,26,13,"#f4c430","center");
  ctx.shadowBlur=0;
  txt(ctx,`You earned: $100 off`,W/2,44,9,"#fff","center");
  txt(ctx,"But do you dare face...",W/2,58,8,"#aaa","center");
  ctx.shadowColor="#cc1111"; ctx.shadowBlur=8;
  txt(ctx,"GIANT STERLING?",W/2,74,12,"#cc1111","center");
  ctx.shadowBlur=0;
  txt(ctx,"Win: $200 off  |  Lose: Keep $100",W/2,90,7,"#888","center");
  txt(ctx,"(1 in 500 chance. He's very large.)",W/2,102,6,"#555","center");
  // Buttons
  rr(ctx,18,114,W/2-24,62,6,"#8a0000");
  ctx.strokeStyle="#cc1111"; ctx.lineWidth=2; ctx.beginPath(); ctx.roundRect(18,114,W/2-24,62,6); ctx.stroke();
  txt(ctx,"FIGHT",W/4+9,138,13,"#fff","center");
  txt(ctx,"STERLING",W/4+9,154,9,"#fff","center");
  txt(ctx,"(risk it)",W/4+9,168,7,"#ffaaaa","center");
  rr(ctx,W/2+6,114,W/2-24,62,6,"#0a4a0a");
  ctx.strokeStyle="#2a8a2a"; ctx.lineWidth=2; ctx.beginPath(); ctx.roundRect(W/2+6,114,W/2-24,62,6); ctx.stroke();
  txt(ctx,"TAKE",W*3/4-9,138,13,"#fff","center");
  txt(ctx,"$100 OFF",W*3/4-9,154,9,"#fff","center");
  txt(ctx,"(safe!)",W*3/4-9,168,7,"#aaffaa","center");
  if(frame%30<20) txt(ctx,"TAP LEFT = FIGHT  |  TAP RIGHT = TAKE $100",W/2,H-12,7,"#666","center");
}

function drawBoss(ctx: CanvasRenderingContext2D, frame: number) {
  const og=ctx.createLinearGradient(0,0,0,H);
  og.addColorStop(0,"#060000"); og.addColorStop(1,"#180000");
  ctx.fillStyle=og; ctx.fillRect(0,0,W,H);
  if(frame%40<4){ctx.fillStyle="rgba(255,180,80,0.12)";ctx.fillRect(0,0,W,H);}
  const shake=Math.sin(frame*0.3)*3;
  const bob=Math.sin(frame*0.08)*4;
  ctx.save(); ctx.translate(W*0.62+shake, H*0.08+bob); ctx.scale(2.6,2.6);
  // Sterling body
  r(ctx,-17,18,34,52,"#1a1a3a"); stroke(ctx,-17,18,34,52,"#0a0a2a",2);
  r(ctx,-4,20,8,32,"#cc1111"); r(ctx,-2,20,4,10,"#ee2222");
  ctx.fillStyle="#2a2a4a"; ctx.beginPath(); ctx.moveTo(-17,18); ctx.lineTo(-4,34); ctx.lineTo(-17,70); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(17,18); ctx.lineTo(4,34); ctx.lineTo(17,70); ctx.closePath(); ctx.fill();
  r(ctx,-27,22,12,36,"#1a1a3a"); r(ctx,15,22,12,36,"#1a1a3a");
  rr(ctx,-29,56,14,10,2,"#f4c07a"); rr(ctx,15,56,14,10,2,"#f4c07a");
  r(ctx,-15,70,13,24,"#1a1a3a"); r(ctx,2,70,13,24,"#1a1a3a");
  rr(ctx,-17,92,15,6,2,"#0a0a0a"); rr(ctx,2,92,15,6,2,"#0a0a0a");
  rr(ctx,-13,-6,26,28,3,"#f4c07a"); stroke(ctx,-13,-6,26,28,"#c8843a",2);
  r(ctx,-13,-10,26,8,"#c8c8c8"); r(ctx,-15,-8,4,10,"#c8c8c8"); r(ctx,11,-8,4,10,"#c8c8c8");
  r(ctx,-7,2,4,4,"#111"); r(ctx,3,2,4,4,"#111");
  r(ctx,-9,0,8,2,"#c8843a"); r(ctx,1,0,8,2,"#c8843a");
  r(ctx,-5,14,10,3,"#c8843a"); r(ctx,-7,13,2,2,"#c8843a"); r(ctx,5,13,2,2,"#c8843a");
  ctx.restore();
  // Speech bubble
  const bx=W*0.04, by=H*0.06, bw=160, bh=36;
  rr(ctx,bx,by,bw,bh,6,"#fffde7"); ctx.strokeStyle="#cc1111"; ctx.lineWidth=2; ctx.beginPath(); ctx.roundRect(bx,by,bw,bh,6); ctx.stroke();
  ctx.fillStyle="#fffde7"; ctx.beginPath(); ctx.moveTo(bx+bw*0.68,by+bh); ctx.lineTo(bx+bw*0.78,by+bh+14); ctx.lineTo(bx+bw*0.83,by+bh); ctx.fill();
  txt(ctx,"YOU'RE FIRED! 🔥",bx+bw/2,by+14,11,"#cc1111","center");
  txt(ctx,"(and mowed)",bx+bw/2,by+28,7,"#888","center");
  ctx.save(); ctx.translate(W*0.14,H*0.72); ctx.scale(0.48,0.48); drawMower(ctx,0,0,frame); ctx.restore();
  ctx.shadowColor="#cc1111"; ctx.shadowBlur=6;
  txt(ctx,"BOSS FIGHT!",W/2,H-28,12,"#cc1111","center");
  ctx.shadowBlur=0;
  if(frame%30<20) txt(ctx,"Deciding your fate...",W/2,H-12,8,"#555","center");
}

function drawWon(ctx: CanvasRenderingContext2D, code: string, isBoss: boolean, frame: number) {
  const og=ctx.createLinearGradient(0,0,0,H);
  og.addColorStop(0,"#082008"); og.addColorStop(1,"#143814");
  ctx.fillStyle=og; ctx.fillRect(0,0,W,H);
  ctx.strokeStyle="#f4c430"; ctx.lineWidth=3; ctx.strokeRect(5,5,W-10,H-10);
  for(let i=0;i<44;i++){const cx2=(i*47+frame*(2+i%3))%W;const cy2=(i*31+frame*(1+i%2))%H;ctx.fillStyle=["#cc1111","#f4c430","#2a8a2a","#fff","#4488ff"][i%5];ctx.fillRect(cx2,cy2,4,4);}
  ctx.shadowColor="#f4c430"; ctx.shadowBlur=10;
  txt(ctx,isBoss?"YOU BEAT STERLING!":"YOU DID IT!",W/2,26,14,"#f4c430","center");
  ctx.shadowBlur=0;
  txt(ctx,isBoss?"IMPOSSIBLE. Absolutely impossible.":"Sterling is proud. (Yes, really.)",W/2,44,7,"#aaa","center");
  txt(ctx,"YOUR DISCOUNT CODE:",W/2,62,9,"#fff","center");
  const pulse=1+Math.sin(frame*0.1)*0.02;
  ctx.save(); ctx.translate(W/2,88); ctx.scale(pulse,pulse);
  rr(ctx,-82,-18,164,36,6,"#cc1111"); ctx.strokeStyle="#f4c430"; ctx.lineWidth=2; ctx.beginPath(); ctx.roundRect(-82,-18,164,36,6); ctx.stroke();
  ctx.shadowColor="#f4c430"; ctx.shadowBlur=8;
  txt(ctx,code,0,0,16,"#fff","center");
  ctx.shadowBlur=0; ctx.restore();
  txt(ctx,isBoss?"$200 OFF any service!":"$100 OFF any service!",W/2,114,9,"#f4c430","center");
  txt(ctx,"(Yes, it's real. We're serious.)",W/2,128,7,"#888","center");
  txt(ctx,"Call (541) 617-8873 to redeem",W/2,142,7,"#fff","center");
  txt(ctx,"newportavelandscaping.com",W/2,156,7,"#4488ff","center");
  if(frame%40<26) txt(ctx,"SPACE / TAP TO PLAY AGAIN",W/2,H-12,8,"#888","center");
}

function drawBossLost(ctx: CanvasRenderingContext2D, code: string, frame: number) {
  ctx.fillStyle="rgba(8,0,0,0.96)"; ctx.fillRect(0,0,W,H);
  ctx.strokeStyle="#cc1111"; ctx.lineWidth=3; ctx.strokeRect(5,5,W-10,H-10);
  ctx.shadowColor="#cc1111"; ctx.shadowBlur=8;
  txt(ctx,"STERLING WINS.",W/2,26,14,"#cc1111","center");
  ctx.shadowBlur=0;
  txt(ctx,"He's very large. It was always unlikely.",W/2,44,7,"#666","center");
  txt(ctx,"But you beat the route, so...",W/2,58,7,"#aaa","center");
  txt(ctx,"YOUR $100 CODE:",W/2,76,9,"#fff","center");
  const pulse=1+Math.sin(frame*0.1)*0.02;
  ctx.save(); ctx.translate(W/2,100); ctx.scale(pulse,pulse);
  rr(ctx,-82,-18,164,36,6,"#1a5a1a"); ctx.strokeStyle="#f4c430"; ctx.lineWidth=2; ctx.beginPath(); ctx.roundRect(-82,-18,164,36,6); ctx.stroke();
  ctx.shadowColor="#f4c430"; ctx.shadowBlur=8;
  txt(ctx,code,0,0,16,"#fff","center");
  ctx.shadowBlur=0; ctx.restore();
  txt(ctx,"$100 OFF any service!",W/2,124,9,"#f4c430","center");
  txt(ctx,"Call (541) 617-8873 to redeem",W/2,140,7,"#fff","center");
  txt(ctx,"newportavelandscaping.com",W/2,154,7,"#4488ff","center");
  if(frame%40<26) txt(ctx,"SPACE / TAP TO PLAY AGAIN",W/2,H-12,8,"#888","center");
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function LawnMowerDash() {
  const [, goTo] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<GameState>("idle");
  const frameRef = useRef(0);
  const rafId = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const scrollRef = useRef(0);
  const speedRef = useRef(0);
  const spawnCounterRef = useRef(0);
  const playerLaneRef = useRef(1);
  const targetLaneRef = useRef(1);
  const playerYRef = useRef(LANE_CENTERS[1]);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const collectiblesRef = useRef<Collectible[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const boostRef = useRef(false);
  const hurtFrameRef = useRef(0);
  const celebTimerRef = useRef(0);
  const celebZoomRef = useRef(0);
  const celebBrowRef = useRef(0);
  const sessionId = useRef(`s_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const lbRef = useRef<LeaderEntry[]>(loadLB());

  const [displayState, setDisplayState] = useState<GameState>("idle");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [wonCode, setWonCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [initials, setInitials] = useState(["A","A","A"]);
  const [initialsPos, setInitialsPos] = useState(0);
  const [newEntryRank, setNewEntryRank] = useState(-1);
  const currentLevelRef = useRef(1);
  const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";

  const trackEvent = trpc.game.trackEvent.useMutation();

  // Resize canvas to fill container
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const scale = Math.min(cw / W, ch / H);
    canvas.style.width = `${W * scale}px`;
    canvas.style.height = `${H * scale}px`;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const resetGame = useCallback((level = 1) => {
    stateRef.current = "playing";
    frameRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = 3;
    scrollRef.current = 0;
    speedRef.current = LEVELS[level-1].baseSpeed;
    spawnCounterRef.current = 0;
    playerLaneRef.current = 1;
    targetLaneRef.current = 1;
    playerYRef.current = LANE_CENTERS[1];
    obstaclesRef.current = [];
    collectiblesRef.current = [];
    particlesRef.current = [];
    boostRef.current = false;
    hurtFrameRef.current = 0;
    celebTimerRef.current = 0;
    celebZoomRef.current = 0;
    celebBrowRef.current = 0;
    currentLevelRef.current = level;
    setCurrentLevel(level);
    setScore(0);
    setWonCode("");
    setCopied(false);
  }, []);

  const startGame = useCallback(() => {
    sessionId.current = `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    resetGame(1);
    setDisplayState("playing");
    trackEvent.mutate({ sessionId: sessionId.current, event: "start", level: 1, score: 0, device: deviceType });
  }, [resetGame, trackEvent, deviceType]);

  const submitInitials = useCallback(() => {
    const ini = initials.join("");
    const entry: LeaderEntry = { initials: ini, score: scoreRef.current, level: currentLevelRef.current };
    const lb = loadLB();
    lb.push(entry);
    lb.sort((a,b) => b.score - a.score);
    const top10 = lb.slice(0,10);
    saveLB(top10);
    lbRef.current = top10;
    const rank = top10.findIndex(e => e.initials === ini && e.score === entry.score);
    setNewEntryRank(rank);
    trackEvent.mutate({ sessionId: sessionId.current, event: "death", level: currentLevelRef.current, score: scoreRef.current, device: deviceType });
    setDisplayState("dead");
  }, [initials, trackEvent, deviceType]);

  // ---- GAME LOOP ----
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = stateRef.current;
    const frame = frameRef.current;
    const level = currentLevelRef.current;
    const lv = LEVELS[level-1];

    if (state === "idle") {
      drawBg(ctx, 1, scrollRef.current, frame);
      scrollRef.current += 0.8;
      drawIdle(ctx, lbRef.current, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }
    if (state === "enter_initials") {
      drawBg(ctx, level, scrollRef.current, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }
    if (state === "dead") {
      drawBg(ctx, level, scrollRef.current, frame);
      drawDead(ctx, level, scoreRef.current, lbRef.current, newEntryRank, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }
    if (state === "level_complete") {
      drawBg(ctx, level, scrollRef.current, frame);
      drawLevelComplete(ctx, level, scoreRef.current, frame);
      if (frame > 100) {
        if (level < 4) { resetGame(level+1); setDisplayState("playing"); }
        else { stateRef.current = "celebration"; setDisplayState("celebration"); frameRef.current = 0; }
        return;
      }
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }
    if (state === "celebration") {
      celebTimerRef.current++;
      const t = celebTimerRef.current;
      celebZoomRef.current = Math.min(t/60,1)*0.4;
      celebBrowRef.current = t>60 ? Math.min((t-60)/40,1) : 0;
      drawCelebration(ctx, scoreRef.current, celebZoomRef.current, celebBrowRef.current, frame);
      if (t > 160) { stateRef.current = "double_or_nothing"; setDisplayState("double_or_nothing"); frameRef.current = 0; return; }
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }
    if (state === "double_or_nothing") {
      drawDoubleOrNothing(ctx, scoreRef.current, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }
    if (state === "boss_fight") {
      drawBoss(ctx, frame);
      if (frame > 180) {
        const wins = Math.random() < 0.002;
        if (wins) { stateRef.current = "won"; setWonCode(DOUBLE_CODE); setDisplayState("won"); trackEvent.mutate({sessionId:sessionId.current,event:"boss_win",level:4,score:scoreRef.current,device:deviceType}); }
        else { stateRef.current = "boss_lost"; setWonCode(DISCOUNT_CODE); setDisplayState("boss_lost"); trackEvent.mutate({sessionId:sessionId.current,event:"boss_loss",level:4,score:scoreRef.current,device:deviceType}); }
        return;
      }
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }
    if (state === "won") {
      drawWon(ctx, wonCode||DOUBLE_CODE, wonCode===DOUBLE_CODE, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }
    if (state === "boss_lost") {
      drawBossLost(ctx, wonCode||DISCOUNT_CODE, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }
    if (state !== "playing") return;

    // ---- PLAYING ----
    const boost = boostRef.current;
    const speedMult = boost ? 1.6 : 1;
    speedRef.current = Math.min(lv.baseSpeed + (frame/60)*lv.speedPerSec, lv.baseSpeed*2.5) * speedMult;
    scrollRef.current += speedRef.current;
    scoreRef.current = Math.floor(scrollRef.current / 10);
    setScore(scoreRef.current);

    // Lane transition
    const targetY = LANE_CENTERS[targetLaneRef.current];
    playerYRef.current += (targetY - playerYRef.current) * 0.2;

    // Spawn
    spawnCounterRef.current++;
    if (spawnCounterRef.current >= lv.spawnInterval) {
      spawnCounterRef.current = 0;
      const lane = Math.floor(Math.random() * LANE_COUNT);
      const type = lv.obstacleTypes[Math.floor(Math.random() * lv.obstacleTypes.length)];
      obstaclesRef.current.push({ x: W+OBS_W, lane, type, frame: 0 });
      if (Math.random() < 0.32) {
        const cLane = (lane+1+Math.floor(Math.random()*(LANE_COUNT-1)))%LANE_COUNT;
        collectiblesRef.current.push({ x: W+24, lane: cLane });
      }
    }

    // Move
    obstaclesRef.current = obstaclesRef.current.map(o=>({...o,x:o.x-speedRef.current,frame:o.frame+1})).filter(o=>o.x>-OBS_W);
    collectiblesRef.current = collectiblesRef.current.map(c=>({...c,x:c.x-speedRef.current})).filter(c=>c.x>-24);

    // Particles
    particlesRef.current = particlesRef.current.map(p=>({...p,x:p.x+p.vx,y:p.y+p.vy,vy:p.vy+0.15,life:p.life-1})).filter(p=>p.life>0);

    // Draw
    drawBg(ctx, level, scrollRef.current, frame);
    collectiblesRef.current.forEach(c=>drawCollectible(ctx,c.x,LANE_CENTERS[c.lane],frame));
    obstaclesRef.current.forEach(o=>drawObstacle(ctx,o.type,o.x,LANE_CENTERS[o.lane],o.frame));

    // Particles
    particlesRef.current.forEach(p=>{
      ctx.globalAlpha=p.life/p.maxLife;
      ctx.fillStyle=p.color; ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha=1;

    const hurt = hurtFrameRef.current > 0;
    if (hurt) hurtFrameRef.current--;
    drawMower(ctx, PLAYER_X, playerYRef.current, frame, hurt);
    drawHUD(ctx, level, scoreRef.current, livesRef.current, lbRef.current, frame, boost);
    if (frame < 90) drawLevelIntro(ctx, level, frame);

    // Collision
    const hitW = PLAYER_W*0.48, hitH = PLAYER_H*0.48;
    for (const o of obstaclesRef.current) {
      if (Math.abs(o.x-PLAYER_X)<(hitW+OBS_W*0.4) && Math.abs(LANE_CENTERS[o.lane]-playerYRef.current)<(hitH+OBS_H*0.4)) {
        obstaclesRef.current = obstaclesRef.current.filter(ob=>ob!==o);
        livesRef.current--;
        hurtFrameRef.current = 40;
        // Spawn hit particles
        for (let i=0;i<12;i++) {
          particlesRef.current.push({x:PLAYER_X,y:playerYRef.current,vx:(Math.random()-0.5)*4,vy:(Math.random()-0.5)*4-1,life:20,maxLife:20,color:["#cc1111","#f4c430","#ff6600"][i%3],size:3+Math.random()*3});
        }
        if (livesRef.current<=0) { stateRef.current="enter_initials"; setDisplayState("enter_initials"); setInitials(["A","A","A"]); setInitialsPos(0); return; }
        break;
      }
    }
    // Collectible pickup
    for (const c of collectiblesRef.current) {
      if (Math.abs(c.x-PLAYER_X)<(hitW+20) && Math.abs(LANE_CENTERS[c.lane]-playerYRef.current)<(hitH+20)) {
        collectiblesRef.current = collectiblesRef.current.filter(cb=>cb!==c);
        livesRef.current = Math.min(livesRef.current+1,3);
        for (let i=0;i<8;i++) {
          particlesRef.current.push({x:c.x,y:LANE_CENTERS[c.lane],vx:(Math.random()-0.5)*3,vy:(Math.random()-0.5)*3-1,life:16,maxLife:16,color:"#f4c430",size:2+Math.random()*2});
        }
        break;
      }
    }
    // Level end
    if (frame >= lv.duration) { stateRef.current="level_complete"; setDisplayState("level_complete"); frameRef.current=0; return; }

    frameRef.current++;
    rafId.current = requestAnimationFrame(gameLoop);
  }, [resetGame, newEntryRank, wonCode, trackEvent, deviceType]);

  useEffect(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafId.current);
  }, [displayState, gameLoop]);

  // Keyboard
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.code==="ArrowDown"||e.code==="KeyS") { boostRef.current=true; return; }
      if (e.code==="Space"||e.code==="ArrowUp"||e.code==="KeyW") {
        e.preventDefault();
        const s=stateRef.current;
        if (s==="idle"||s==="dead"||s==="won"||s==="boss_lost") { startGame(); return; }
        if (s==="playing") { targetLaneRef.current=Math.max(0,targetLaneRef.current-1); playerLaneRef.current=targetLaneRef.current; }
      }
      if (e.code==="ArrowDown"||e.code==="KeyS") {
        const s=stateRef.current;
        if (s==="playing") { targetLaneRef.current=Math.min(LANE_COUNT-1,targetLaneRef.current+1); playerLaneRef.current=targetLaneRef.current; }
      }
    };
    const onUp = (e: KeyboardEvent) => { if (e.code==="ArrowDown"||e.code==="KeyS") boostRef.current=false; };
    window.addEventListener("keydown",onDown);
    window.addEventListener("keyup",onUp);
    return () => { window.removeEventListener("keydown",onDown); window.removeEventListener("keyup",onUp); };
  }, [startGame]);

  // Touch
  const handleTouch = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const s=stateRef.current;
    const canvas=canvasRef.current;
    if (!canvas) return;
    const rect=canvas.getBoundingClientRect();
    const touch=e.changedTouches[0];
    const relY=(touch.clientY-rect.top)/rect.height;
    const relX=(touch.clientX-rect.left)/rect.width;
    if (s==="idle"||s==="dead"||s==="won"||s==="boss_lost") { startGame(); return; }
    if (s==="double_or_nothing") {
      if (relX<0.5) { stateRef.current="boss_fight"; setDisplayState("boss_fight"); frameRef.current=0; }
      else { stateRef.current="boss_lost"; setWonCode(DISCOUNT_CODE); setDisplayState("boss_lost"); }
      return;
    }
    if (s==="playing") {
      if (relY<0.5) { targetLaneRef.current=Math.max(0,targetLaneRef.current-1); playerLaneRef.current=targetLaneRef.current; }
      else { targetLaneRef.current=Math.min(LANE_COUNT-1,targetLaneRef.current+1); playerLaneRef.current=targetLaneRef.current; boostRef.current=true; setTimeout(()=>{boostRef.current=false;},400); }
    }
  }, [startGame]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const s=stateRef.current;
    const canvas=canvasRef.current;
    if (!canvas) return;
    const rect=canvas.getBoundingClientRect();
    const relX=(e.clientX-rect.left)/rect.width;
    const relY=(e.clientY-rect.top)/rect.height;
    if (s==="idle"||s==="dead"||s==="won"||s==="boss_lost") { startGame(); return; }
    if (s==="double_or_nothing") {
      if (relX<0.5) { stateRef.current="boss_fight"; setDisplayState("boss_fight"); frameRef.current=0; }
      else { stateRef.current="boss_lost"; setWonCode(DISCOUNT_CODE); setDisplayState("boss_lost"); }
      return;
    }
    if (s==="playing") {
      if (relY<0.5) { targetLaneRef.current=Math.max(0,targetLaneRef.current-1); playerLaneRef.current=targetLaneRef.current; }
      else { targetLaneRef.current=Math.min(LANE_COUNT-1,targetLaneRef.current+1); playerLaneRef.current=targetLaneRef.current; }
    }
  }, [startGame]);

  const cycleInitial = (pos: number, dir: number) => {
    setInitials(prev => {
      const next=[...prev];
      const code=next[pos].charCodeAt(0)+dir;
      next[pos]=String.fromCharCode(code<65?90:code>90?65:code);
      return next;
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed", inset: 0,
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Back button */}
      <button
        onClick={() => goTo("/")}
        style={{
          position: "absolute", top: 12, left: 12, zIndex: 10,
          background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff", fontFamily: "'Courier New', monospace", fontWeight: 700,
          fontSize: "11px", padding: "6px 12px", borderRadius: "4px",
          cursor: "pointer", letterSpacing: "0.08em",
        }}
        onMouseEnter={e=>(e.currentTarget.style.background="rgba(40,40,40,0.9)")}
        onMouseLeave={e=>(e.currentTarget.style.background="rgba(0,0,0,0.7)")}
      >
        ← BACK
      </button>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{
          imageRendering: "pixelated",
          cursor: "pointer",
          display: "block",
        }}
        onTouchStart={handleTouch}
        onTouchEnd={() => { boostRef.current = false; }}
        onClick={handleClick}
      />

      {/* Initials overlay */}
      {displayState === "enter_initials" && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.88)",
        }}>
          <div style={{
            background: "#111", border: "2px solid #f4c430", borderRadius: "8px",
            padding: "24px", textAlign: "center", maxWidth: "280px", width: "90%",
          }}>
            <div style={{fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:"16px",color:"#f4c430",marginBottom:"4px"}}>ENTER YOUR INITIALS</div>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:"12px",color:"#888",marginBottom:"16px"}}>Score: {score}ft — Level {currentLevel}</div>
            <div style={{display:"flex",justifyContent:"center",gap:"12px",marginBottom:"20px"}}>
              {[0,1,2].map(pos=>(
                <div key={pos} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"}}>
                  <button onClick={()=>cycleInitial(pos,1)} style={{width:"44px",height:"36px",background:"#8a0000",border:"none",color:"#fff",fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:"18px",borderRadius:"4px",cursor:"pointer"}}>▲</button>
                  <div onClick={()=>setInitialsPos(pos)} style={{width:"44px",height:"44px",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:"24px",borderRadius:"4px",border:`2px solid ${initialsPos===pos?"#f4c430":"#444"}`,background:initialsPos===pos?"#222":"#1a1a1a",color:initialsPos===pos?"#f4c430":"#fff",cursor:"pointer"}}>
                    {initials[pos]}
                  </div>
                  <button onClick={()=>cycleInitial(pos,-1)} style={{width:"44px",height:"36px",background:"#8a0000",border:"none",color:"#fff",fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:"18px",borderRadius:"4px",cursor:"pointer"}}>▼</button>
                </div>
              ))}
            </div>
            <button onClick={submitInitials} style={{width:"100%",padding:"12px",background:"#cc1111",border:"2px solid #880000",color:"#fff",fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:"16px",borderRadius:"4px",cursor:"pointer",letterSpacing:"0.1em"}}>
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {/* Copy code button */}
      {(displayState==="won"||displayState==="boss_lost") && wonCode && (
        <button
          onClick={()=>{navigator.clipboard.writeText(wonCode);setCopied(true);}}
          style={{
            position:"absolute",bottom:"16px",left:"50%",transform:"translateX(-50%)",
            padding:"10px 24px",background:copied?"#2a7a2a":"#f4c430",
            border:`2px solid ${copied?"#1a5a1a":"#c8a000"}`,
            color:copied?"#fff":"#000",fontFamily:"'Courier New',monospace",fontWeight:700,
            fontSize:"13px",borderRadius:"4px",cursor:"pointer",letterSpacing:"0.1em",zIndex:10,
          }}
        >
          {copied?"✓ COPIED!":"📋 COPY CODE"}
        </button>
      )}
    </div>
  );
}
