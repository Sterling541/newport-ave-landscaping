/**
 * PIN-based admin authentication
 * Stores access in sessionStorage so it persists across page navigations
 * but clears when the browser tab is closed.
 *
 * The PIN is also stored under "adminPin" so the tRPC client can read it
 * and send it as the x-admin-pin header on every API request.
 */

const ADMIN_SESSION_KEY = "nal_admin_v1";
// PIN is validated server-side — this client copy is only used to populate the header.
const ADMIN_PIN = "4132";

export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

export function adminLogin(pin: string): boolean {
  if (pin === ADMIN_PIN) {
    try {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      // Store the PIN so the tRPC client can send it as x-admin-pin header
      sessionStorage.setItem("adminPin", pin);
    } catch {
      // sessionStorage unavailable — ignore
    }
    return true;
  }
  return false;
}

export function adminLogout(): void {
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    sessionStorage.removeItem("adminPin");
  } catch {
    // ignore
  }
}
