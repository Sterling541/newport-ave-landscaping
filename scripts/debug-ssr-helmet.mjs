import { render } from "../dist/server/entry-server.js";

const { html, helmetContext } = render("/");
console.log("helmetContext keys:", Object.keys(helmetContext));
console.log("helmetContext.helmet:", helmetContext.helmet ? Object.keys(helmetContext.helmet) : "undefined");
if (helmetContext.helmet) {
  const h = helmetContext.helmet;
  console.log("title type:", typeof h.title);
  console.log("title toString:", h.title?.toString?.()?.slice(0, 200));
  console.log("meta toString:", h.meta?.toString?.()?.slice(0, 200));
}
// Check if title is in the HTML
const titleMatch = html.match(/<title>([^<]*)<\/title>/);
console.log("Title in HTML:", titleMatch?.[1] || "NOT FOUND");
console.log("HTML snippet (first 500 chars):", html.slice(0, 500));
