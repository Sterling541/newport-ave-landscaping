/**
 * Email Notification Helpers — Newport Avenue Landscaping
 *
 * Sends transactional emails to sales reps when appointments are created,
 * rescheduled, or about to start (30-min reminder).
 *
 * All sends are non-fatal: errors are logged but never thrown.
 */
import { Resend } from "resend";
import { ENV } from "./_core/env";

const FROM = "Newport Ave Landscaping <noreply@newportavelandscaping.com>";

function getResend() {
  if (!ENV.resendApiKey) return null;
  return new Resend(ENV.resendApiKey);
}

/** Format a date string "YYYY-MM-DD" + time "HH:MM" into a readable string */
function formatDateTime(date: string, time: string): string {
  // e.g. "May 2, 2026 at 9:00 AM"
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const d = new Date(year, month - 1, day, hour, minute);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }) + " at " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function appointmentTypeLabel(type: string): string {
  switch (type) {
    case "install_design": return "Install / Design Consultation";
    case "enhancement": return "Enhancement";
    case "follow_up": return "Follow-Up";
    default: return "Appointment";
  }
}

interface AppointmentEmailData {
  repName: string;
  repEmail: string;
  customerName?: string | null;
  customerAddress?: string | null;
  customerPhone?: string | null;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  appointmentType: string;
  notes?: string | null;
}

/** Send email to sales rep when a new appointment is assigned to them */
export async function sendNewAppointmentEmail(data: AppointmentEmailData) {
  const resend = getResend();
  if (!resend || !data.repEmail) return;
  try {
    const dateTimeStr = formatDateTime(data.appointmentDate, data.startTime);
    const typeLabel = appointmentTypeLabel(data.appointmentType);
    await resend.emails.send({
      from: FROM,
      to: [data.repEmail],
      subject: `New Appointment Assigned: ${typeLabel} — ${data.customerName ?? "Customer"}`,
      html: [
        `<p>Hi ${data.repName.split(" ")[0]},</p>`,
        `<p>You have a new appointment scheduled:</p>`,
        `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;margin:16px 0;">`,
        `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Type</td><td style="padding:6px 0;">${typeLabel}</td></tr>`,
        `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">When</td><td style="padding:6px 0;">${dateTimeStr}</td></tr>`,
        data.customerName ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Customer</td><td style="padding:6px 0;">${data.customerName}</td></tr>` : "",
        data.customerPhone ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Phone</td><td style="padding:6px 0;"><a href="tel:${data.customerPhone}">${data.customerPhone}</a></td></tr>` : "",
        data.customerAddress ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Address</td><td style="padding:6px 0;">${data.customerAddress}</td></tr>` : "",
        data.notes ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Notes</td><td style="padding:6px 0;">${data.notes}</td></tr>` : "",
        `</table>`,
        `<p style="color:#666;font-size:12px;">— Newport Avenue Landscaping Team Portal</p>`,
      ].filter(Boolean).join("\n"),
    });
    console.log(`[emailNotifications] New appointment email sent to ${data.repEmail}`);
  } catch (err) {
    console.error("[emailNotifications] Failed to send new appointment email:", err);
  }
}

/** Send email to sales rep when their appointment is rescheduled */
export async function sendRescheduledAppointmentEmail(
  data: AppointmentEmailData,
  previousDate: string,
  previousTime: string
) {
  const resend = getResend();
  if (!resend || !data.repEmail) return;
  try {
    const newDateTimeStr = formatDateTime(data.appointmentDate, data.startTime);
    const oldDateTimeStr = formatDateTime(previousDate, previousTime);
    const typeLabel = appointmentTypeLabel(data.appointmentType);
    await resend.emails.send({
      from: FROM,
      to: [data.repEmail],
      subject: `Appointment Rescheduled: ${typeLabel} — ${data.customerName ?? "Customer"}`,
      html: [
        `<p>Hi ${data.repName.split(" ")[0]},</p>`,
        `<p>An appointment has been <strong>rescheduled</strong>:</p>`,
        `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;margin:16px 0;">`,
        `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Type</td><td style="padding:6px 0;">${typeLabel}</td></tr>`,
        `<tr><td style="padding:6px 16px 6px 0;color:#e44;">Was</td><td style="padding:6px 0;text-decoration:line-through;color:#999;">${oldDateTimeStr}</td></tr>`,
        `<tr><td style="padding:6px 16px 6px 0;color:#2a7;font-weight:600;">Now</td><td style="padding:6px 0;font-weight:600;">${newDateTimeStr}</td></tr>`,
        data.customerName ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Customer</td><td style="padding:6px 0;">${data.customerName}</td></tr>` : "",
        data.customerPhone ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Phone</td><td style="padding:6px 0;"><a href="tel:${data.customerPhone}">${data.customerPhone}</a></td></tr>` : "",
        data.customerAddress ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Address</td><td style="padding:6px 0;">${data.customerAddress}</td></tr>` : "",
        `</table>`,
        `<p style="color:#666;font-size:12px;">— Newport Avenue Landscaping Team Portal</p>`,
      ].filter(Boolean).join("\n"),
    });
    console.log(`[emailNotifications] Rescheduled appointment email sent to ${data.repEmail}`);
  } catch (err) {
    console.error("[emailNotifications] Failed to send rescheduled appointment email:", err);
  }
}

/** Send 30-minute reminder email to sales rep */
export async function sendAppointmentReminderEmail(data: AppointmentEmailData) {
  const resend = getResend();
  if (!resend || !data.repEmail) return;
  try {
    const dateTimeStr = formatDateTime(data.appointmentDate, data.startTime);
    const typeLabel = appointmentTypeLabel(data.appointmentType);
    await resend.emails.send({
      from: FROM,
      to: [data.repEmail],
      subject: `⏰ Reminder: ${typeLabel} in 30 minutes — ${data.customerName ?? "Customer"}`,
      html: [
        `<p>Hi ${data.repName.split(" ")[0]},</p>`,
        `<p>You have an appointment <strong>starting in 30 minutes</strong>:</p>`,
        `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;margin:16px 0;">`,
        `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Type</td><td style="padding:6px 0;">${typeLabel}</td></tr>`,
        `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">When</td><td style="padding:6px 0;">${dateTimeStr}</td></tr>`,
        data.customerName ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Customer</td><td style="padding:6px 0;">${data.customerName}</td></tr>` : "",
        data.customerPhone ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Phone</td><td style="padding:6px 0;"><a href="tel:${data.customerPhone}">${data.customerPhone}</a></td></tr>` : "",
        data.customerAddress ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Address</td><td style="padding:6px 0;">${data.customerAddress}</td></tr>` : "",
        `</table>`,
        `<p style="color:#666;font-size:12px;">— Newport Avenue Landscaping Team Portal</p>`,
      ].filter(Boolean).join("\n"),
    });
    console.log(`[emailNotifications] 30-min reminder email sent to ${data.repEmail}`);
  } catch (err) {
    console.error("[emailNotifications] Failed to send reminder email:", err);
  }
}

/** Send email to sales rep when their appointment is cancelled */
export async function sendCancelledAppointmentEmail(data: AppointmentEmailData) {
  const resend = getResend();
  if (!resend || !data.repEmail) return;
  try {
    const dateTimeStr = formatDateTime(data.appointmentDate, data.startTime);
    const typeLabel = appointmentTypeLabel(data.appointmentType);
    await resend.emails.send({
      from: FROM,
      to: [data.repEmail],
      subject: `Appointment Cancelled: ${typeLabel} — ${data.customerName ?? "Customer"}`,
      html: [
        `<p>Hi ${data.repName.split(" ")[0]},</p>`,
        `<p>The following appointment has been <strong style="color:#cc3333;">cancelled</strong>:</p>`,
        `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;margin:16px 0;">`,
        `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Type</td><td style="padding:6px 0;">${typeLabel}</td></tr>`,
        `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Was Scheduled</td><td style="padding:6px 0;text-decoration:line-through;color:#999;">${dateTimeStr}</td></tr>`,
        data.customerName ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Customer</td><td style="padding:6px 0;">${data.customerName}</td></tr>` : "",
        data.customerPhone ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Phone</td><td style="padding:6px 0;"><a href="tel:${data.customerPhone}">${data.customerPhone}</a></td></tr>` : "",
        data.customerAddress ? `<tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600;">Address</td><td style="padding:6px 0;">${data.customerAddress}</td></tr>` : "",
        `</table>`,
        `<p style="color:#666;font-size:12px;">— Newport Avenue Landscaping Team Portal</p>`,
      ].filter(Boolean).join("\n"),
    });
    console.log(`[emailNotifications] Cancelled appointment email sent to ${data.repEmail}`);
  } catch (err) {
    console.error("[emailNotifications] Failed to send cancelled appointment email:", err);
  }
}

/** Send PIN reset email to staff user */
export async function sendPinResetEmail(staffEmail: string, firstName: string, resetUrl: string) {
  const resend = getResend();
  if (!resend) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: [staffEmail],
      subject: "Reset Your Newport Team Portal PIN",
      html: [
        `<p>Hi ${firstName},</p>`,
        `<p>We received a request to reset your PIN for the Newport Avenue Landscaping Team Portal.</p>`,
        `<p><a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#2d5a27;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;">Reset My PIN</a></p>`,
        `<p style="color:#666;font-size:13px;">This link expires in 30 minutes. If you didn't request a PIN reset, you can ignore this email — your PIN will not change.</p>`,
        `<p style="color:#666;font-size:12px;">— Newport Avenue Landscaping Team Portal</p>`,
      ].join("\n"),
    });
    console.log(`[emailNotifications] PIN reset email sent to ${staffEmail}`);
  } catch (err) {
    console.error("[emailNotifications] Failed to send PIN reset email:", err);
  }
}
