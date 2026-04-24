/**
 * PIN-based admin authentication
 * Stores access in sessionStorage so it persists across page navigations
 * but clears when the browser tab is closed.
 */

const ADMIN_SESSION_KEY = "nal_admin_v1";
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
  } catch {
    // ignore
  }
}
