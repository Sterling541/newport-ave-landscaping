/* ============================================================
   ADMIN DEBUG PAGE — /admin/debug
   Shows raw permission state from the server for the current session.
   Used to diagnose Configuration visibility issues.
   ============================================================ */
import { trpc } from "@/lib/trpc";

export default function AdminDebug() {
  const { data: debug, isLoading, error } = trpc.staff.debugPermissions.useQuery(undefined, {
    retry: false,
    staleTime: 0,
  });
  const { data: me } = trpc.staff.me.useQuery(undefined, { retry: false });
  const { data: perms } = trpc.staff.myPermissions.useQuery(undefined, { retry: false, staleTime: 0 });

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace", fontSize: "0.85rem", lineHeight: 1.6 }}>
      <h1 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>
        Staff Session Debug
      </h1>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>staff.me</h2>
        <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "0.5rem", overflow: "auto" }}>
          {JSON.stringify(me ?? null, null, 2)}
        </pre>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>staff.debugPermissions</h2>
        {isLoading && <p>Loading…</p>}
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "0.5rem", overflow: "auto" }}>
          {JSON.stringify(debug ?? null, null, 2)}
        </pre>
      </section>

      <section style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>staff.myPermissions (sidebar query)</h2>
        <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "0.5rem", overflow: "auto" }}>
          {JSON.stringify(perms ?? null, null, 2)}
        </pre>
      </section>

      <p style={{ color: "#666", fontSize: "0.75rem" }}>
        This page is for debugging only. Share the output above to diagnose permission issues.
      </p>
    </div>
  );
}
