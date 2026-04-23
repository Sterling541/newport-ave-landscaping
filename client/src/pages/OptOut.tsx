/* ============================================================
   SPRAY & PRUNE OPT-OUT PROGRAM PAGE
   Newport Avenue Landscaping
   ============================================================ */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const SIGN_IMG = "/manus-storage/newport_sign_rendering_cba5551c.webp";
const NO_SPRAY_IMG = "/manus-storage/no_spray_branded_20ebea52.png";
const NO_PRUNE_IMG = "/manus-storage/no_prune_branded_5c6ef3f2.png";

const NAVY = "oklch(0.22 0.055 240)";
const RED = "oklch(0.42 0.18 25)";

// ── Colour tokens ─────────────────────────────────────────────────────────────
const styles = {
  navyBg: { backgroundColor: NAVY } as React.CSSProperties,
  redText: { color: RED } as React.CSSProperties,
  navyText: { color: NAVY } as React.CSSProperties,
};

// ── How-It-Works steps ────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    icon: "✅",
    title: "Choose Your Opt-Out",
    body: "Select No Spray, No Prune, or both. Each opt-out is all-or-nothing by category.",
  },
  {
    num: "02",
    icon: "🪧",
    title: "We Install Your Sign",
    body: "A Newport team member places the sign at your property within two weeks of your request, in a location we select for visibility and consistency.",
  },
  {
    num: "03",
    icon: "🌿",
    title: "You Take It From Here",
    body: "Once the sign is installed, the selected service becomes your responsibility to manage.",
  },
];

// ── Terms items ───────────────────────────────────────────────────────────────
const TERMS = [
  {
    title: "Opting out is all-or-nothing by category.",
    body: "If you opt out of spraying, Newport will no longer perform any weed or turf treatments on your property — including broadleaf weeds, grass weeds, and general weed control in both lawn and planting beds. If you opt out of pruning, Newport will no longer perform any pruning services — including shrubs, trees, ornamentals, and seasonal shaping. We are not able to selectively spray or prune portions of a property once an opt-out is in place.",
  },
  {
    title: "Your yard remains your responsibility.",
    body: "When you opt out of a service, you agree to maintain your landscape in accordance with your neighborhood or HOA standards. Newport is not responsible for weed growth, overgrown shrubs, or any resulting appearance or compliance issues in areas covered by your opt-out.",
  },
  {
    title: "Sign placement is determined by Newport.",
    body: "To ensure visibility for our crews and consistency across properties, a Newport team member will select the installation location at the time of placement. Signs should not be relocated by the homeowner. Moving, removing, or covering the sign may result in services being performed as originally contracted.",
  },
  {
    title: "Installation timing.",
    body: "Please allow up to two weeks from the date of your request for a Newport employee to install your sign. Newport is not responsible for any spraying or pruning that occurs between the date of your request and the date your sign is installed.",
  },
  {
    title: "Accidental service.",
    body: "While we take every precaution to honor opt-out requests, Newport is not responsible if a service is inadvertently performed on a property where the sign has been removed, relocated, damaged, or where a sticker is missing or illegible.",
  },
];

// ── Form state type ───────────────────────────────────────────────────────────
interface FormState {
  fullName: string;
  neighborhood: string;
  serviceAddress: string;
  email: string;
  phone: string;
  noSpray: boolean;
  noPrune: boolean;
  acknowledged: boolean;
}

const EMPTY_FORM: FormState = {
  fullName: "",
  neighborhood: "",
  serviceAddress: "",
  email: "",
  phone: "",
  noSpray: false,
  noPrune: false,
  acknowledged: false,
};

export default function OptOut() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitMutation = trpc.optOut.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setError(null);
    },
    onError: (err) => {
      setError(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.noSpray && !form.noPrune) {
      setError("Please select at least one opt-out type (No Spray or No Prune).");
      return;
    }
    if (!form.acknowledged) {
      setError("Please acknowledge the terms before submitting.");
      return;
    }
    const optOutTypes = [form.noSpray && "no_spray", form.noPrune && "no_prune"]
      .filter(Boolean)
      .join(",");
    submitMutation.mutate({
      fullName: form.fullName,
      neighborhood: form.neighborhood,
      serviceAddress: form.serviceAddress,
      email: form.email || undefined,
      phone: form.phone || undefined,
      optOutTypes,
      acknowledged: form.acknowledged,
    });
  };

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SEO
        title="Spray & Prune Opt-Out Program | Newport Avenue Landscaping"
        description="Prefer to manage your own pruning or weed control? Newport Avenue Landscaping offers a simple opt-out program for maintenance customers."
      />
      <div className="min-h-screen" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <Navbar />

        {/* ── A. HERO ──────────────────────────────────────────────────────── */}
        <section
          style={{
            paddingTop: "clamp(7rem, 14vh, 10rem)",
            paddingBottom: "4rem",
            backgroundColor: "oklch(0.97 0.005 240)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 clamp(1.25rem, 5vw, 3rem)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "3rem",
              alignItems: "center",
            }}
            className="flex-col-reverse md:grid"
          >
            {/* Text */}
            <div>
              <div
                style={{
                  display: "inline-block",
                  background: RED,
                  color: "white",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  padding: "0.3rem 0.9rem",
                  borderRadius: "2px",
                  marginBottom: "1.25rem",
                  textTransform: "uppercase",
                }}
              >
                Maintenance Program
              </div>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: NAVY,
                  marginBottom: "1.25rem",
                }}
              >
                Prefer to Manage Your Own Pruning or Weed Control?{" "}
                <span style={styles.redText}>We've Got a Sign for That.</span>
              </h1>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                  color: "oklch(0.38 0.02 240)",
                  lineHeight: 1.7,
                  maxWidth: "560px",
                  marginBottom: "2rem",
                }}
              >
                Newport Avenue Landscaping offers a simple opt-out program for
                maintenance customers who want to handle pruning, spraying, or
                both on their own.
              </p>
              <a
                href="#request-form"
                style={{
                  display: "inline-block",
                  background: RED,
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  letterSpacing: "0.06em",
                  padding: "0.85rem 2rem",
                  borderRadius: "3px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Request My Opt-Out Sign →
              </a>
            </div>

            {/* Sign image */}
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <img
                src={SIGN_IMG}
                alt="Newport Avenue Landscaping opt-out sign installed on green stake in front of home"
                style={{
                  width: "clamp(220px, 28vw, 360px)",
                  borderRadius: "8px",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
                }}
              />
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "oklch(0.5 0.02 240)",
                  marginTop: "0.75rem",
                  fontStyle: "italic",
                }}
              >
                Actual sign shown to scale. Dimensions: 7&Prime; wide &times; 10&Prime; tall on a forest green ground stake.
              </p>
            </div>
          </div>
        </section>

        {/* ── B. HOW IT WORKS ──────────────────────────────────────────────── */}
        <section style={{ padding: "4rem 0", backgroundColor: "oklch(1 0 0)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 700,
                color: NAVY,
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              How the Program Works
            </h2>
            <p style={{ textAlign: "center", color: "oklch(0.5 0.02 240)", marginBottom: "3rem" }}>
              Three simple steps from request to installation.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {STEPS.map((s) => (
                <div
                  key={s.num}
                  style={{
                    background: "oklch(0.97 0.005 240)",
                    borderRadius: "8px",
                    padding: "2rem 1.75rem",
                    borderTop: `4px solid ${RED}`,
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: RED, marginBottom: "0.4rem" }}>
                    STEP {s.num}
                  </div>
                  <h3 style={{ fontWeight: 700, color: NAVY, fontSize: "1.1rem", marginBottom: "0.6rem" }}>
                    {s.title}
                  </h3>
                  <p style={{ color: "oklch(0.42 0.02 240)", lineHeight: 1.65, fontSize: "0.95rem" }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── C. STICKER PREVIEWS ──────────────────────────────────────────── */}
        <section style={{ padding: "4rem 0", backgroundColor: "oklch(0.97 0.005 240)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 700,
                color: NAVY,
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              Your Opt-Out Stickers
            </h2>
            <p style={{ textAlign: "center", color: "oklch(0.5 0.02 240)", marginBottom: "3rem" }}>
              Peel-and-stick stickers applied to your sign indicate which services you've opted out of.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
                justifyItems: "center",
              }}
            >
              {/* No Spray */}
              <div style={{ textAlign: "center", maxWidth: "340px" }}>
                <img
                  src={NO_SPRAY_IMG}
                  alt="No Spray / No Rociar circular sticker"
                  style={{ width: "200px", height: "200px", objectFit: "contain", marginBottom: "1rem" }}
                />
                <h3 style={{ fontWeight: 700, color: NAVY, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                  No Spray / No Rociar
                </h3>
                <p style={{ color: "oklch(0.42 0.02 240)", lineHeight: 1.65, fontSize: "0.9rem" }}>
                  Applied when you opt out of all weed and turf spraying — including broadleaf weeds, grass weeds, and general weed control across lawn and beds.
                </p>
              </div>

              {/* No Prune */}
              <div style={{ textAlign: "center", maxWidth: "340px" }}>
                <img
                  src={NO_PRUNE_IMG}
                  alt="No Prune / No Podar circular sticker"
                  style={{ width: "200px", height: "200px", objectFit: "contain", marginBottom: "1rem" }}
                />
                <h3 style={{ fontWeight: 700, color: NAVY, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                  No Prune / No Podar
                </h3>
                <p style={{ color: "oklch(0.42 0.02 240)", lineHeight: 1.65, fontSize: "0.9rem" }}>
                  Applied when you opt out of all pruning — including shrub shaping, tree pruning, and plant maintenance throughout your landscape.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── D. TERMS ─────────────────────────────────────────────────────── */}
        <section style={{ padding: "4rem 0", backgroundColor: "oklch(1 0 0)" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 700,
                color: NAVY,
                marginBottom: "0.5rem",
              }}
            >
              A Few Important Things to Know
            </h2>
            <p style={{ color: "oklch(0.5 0.02 240)", marginBottom: "2rem" }}>
              Before you request a sign, please review the following.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {TERMS.map((t, i) => (
                <div
                  key={i}
                  style={{
                    borderLeft: `4px solid ${NAVY}`,
                    paddingLeft: "1.25rem",
                  }}
                >
                  <p style={{ fontWeight: 700, color: NAVY, marginBottom: "0.35rem" }}>{t.title}</p>
                  <p style={{ color: "oklch(0.42 0.02 240)", lineHeight: 1.7, fontSize: "0.95rem" }}>{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── E. REQUEST FORM ──────────────────────────────────────────────── */}
        <section
          id="request-form"
          style={{ padding: "4rem 0 5rem", backgroundColor: "oklch(0.97 0.005 240)" }}
        >
          <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 700,
                color: NAVY,
                marginBottom: "0.5rem",
              }}
            >
              Request Your Opt-Out Sign
            </h2>
            <p style={{ color: "oklch(0.5 0.02 240)", marginBottom: "2rem" }}>
              Fill out the form below and a Newport team member will install your sign within two weeks.
            </p>

            {submitted ? (
              <div
                style={{
                  background: "oklch(0.94 0.06 145)",
                  border: "1.5px solid oklch(0.6 0.12 145)",
                  borderRadius: "8px",
                  padding: "2rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>✅</div>
                <h3 style={{ fontWeight: 700, color: "oklch(0.28 0.1 145)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  Request Received!
                </h3>
                <p style={{ color: "oklch(0.35 0.08 145)", lineHeight: 1.65 }}>
                  Thanks! We've received your request. A Newport team member will install your sign within two weeks and reach out if we need anything further.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Full Name */}
                <div>
                  <label style={{ display: "block", fontWeight: 600, color: NAVY, marginBottom: "0.4rem", fontSize: "0.9rem" }}>
                    Full Name <span style={styles.redText}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={set("fullName")}
                    placeholder="Jane Smith"
                    style={inputStyle}
                  />
                </div>

                {/* Neighborhood / HOA */}
                <div>
                  <label style={{ display: "block", fontWeight: 600, color: NAVY, marginBottom: "0.4rem", fontSize: "0.9rem" }}>
                    Neighborhood / HOA <span style={styles.redText}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.neighborhood}
                    onChange={set("neighborhood")}
                    placeholder="e.g. Awbrey Butte, Broken Top"
                    style={inputStyle}
                  />
                </div>

                {/* Service Address */}
                <div>
                  <label style={{ display: "block", fontWeight: 600, color: NAVY, marginBottom: "0.4rem", fontSize: "0.9rem" }}>
                    Service Address <span style={styles.redText}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.serviceAddress}
                    onChange={set("serviceAddress")}
                    placeholder="123 Main St, Bend, OR 97701"
                    style={inputStyle}
                  />
                </div>

                {/* Email + Phone row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, color: NAVY, marginBottom: "0.4rem", fontSize: "0.9rem" }}>
                      Email <span style={{ color: "oklch(0.6 0 0)" }}>(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="jane@example.com"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, color: NAVY, marginBottom: "0.4rem", fontSize: "0.9rem" }}>
                      Phone <span style={{ color: "oklch(0.6 0 0)" }}>(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="(541) 555-0100"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Opt-Out Selection */}
                <div>
                  <label style={{ display: "block", fontWeight: 600, color: NAVY, marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                    Opt-Out Selection <span style={styles.redText}>*</span> <span style={{ fontWeight: 400, color: "oklch(0.5 0.02 240)" }}>(select at least one)</span>
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <label style={checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={form.noSpray}
                        onChange={set("noSpray")}
                        style={{ marginRight: "0.6rem", accentColor: RED }}
                      />
                      <img src={NO_SPRAY_IMG} alt="" style={{ width: "32px", height: "32px", objectFit: "contain", marginRight: "0.6rem" }} />
                      <span style={{ fontWeight: 600, color: NAVY }}>No Spray</span>
                      <span style={{ color: "oklch(0.5 0.02 240)", marginLeft: "0.4rem", fontSize: "0.88rem" }}>— opt out of all weed &amp; turf spraying</span>
                    </label>
                    <label style={checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={form.noPrune}
                        onChange={set("noPrune")}
                        style={{ marginRight: "0.6rem", accentColor: RED }}
                      />
                      <img src={NO_PRUNE_IMG} alt="" style={{ width: "32px", height: "32px", objectFit: "contain", marginRight: "0.6rem" }} />
                      <span style={{ fontWeight: 600, color: NAVY }}>No Prune</span>
                      <span style={{ color: "oklch(0.5 0.02 240)", marginLeft: "0.4rem", fontSize: "0.88rem" }}>— opt out of all pruning &amp; shaping</span>
                    </label>
                  </div>
                </div>

                {/* Acknowledgment */}
                <div
                  style={{
                    background: "oklch(0.94 0.01 240)",
                    border: "1.5px solid oklch(0.82 0.02 240)",
                    borderRadius: "6px",
                    padding: "1.25rem",
                  }}
                >
                  <label style={{ ...checkboxLabel, alignItems: "flex-start" }}>
                    <input
                      type="checkbox"
                      required
                      checked={form.acknowledged}
                      onChange={set("acknowledged")}
                      style={{ marginRight: "0.75rem", marginTop: "0.2rem", accentColor: RED, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: "0.9rem", color: "oklch(0.35 0.02 240)", lineHeight: 1.6 }}>
                      I have read and agree to the terms of the Opt-Out Program described above. I understand that opting out is all-or-nothing by category, and that my yard remains my responsibility for the opted-out services.
                    </span>
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <div
                    style={{
                      background: "oklch(0.96 0.04 25)",
                      border: "1.5px solid oklch(0.75 0.1 25)",
                      borderRadius: "6px",
                      padding: "0.85rem 1rem",
                      color: RED,
                      fontSize: "0.9rem",
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  style={{
                    background: submitMutation.isPending ? "oklch(0.6 0.05 25)" : RED,
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "0.06em",
                    padding: "1rem 2rem",
                    borderRadius: "4px",
                    border: "none",
                    cursor: submitMutation.isPending ? "not-allowed" : "pointer",
                    textTransform: "uppercase",
                    transition: "background 0.2s",
                  }}
                >
                  {submitMutation.isPending ? "Submitting…" : "Request My Opt-Out Sign"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── F. FOOTER CONTACT LINE ───────────────────────────────────────── */}
        <section
          style={{
            ...styles.navyBg,
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <p style={{ color: "oklch(0.8 0.02 240)", fontSize: "0.9rem" }}>
            Questions about the program?{" "}
            <a href="tel:5416178873" style={{ color: "white", fontWeight: 600 }}>
              (541) 617-8873
            </a>{" "}
            or{" "}
            <a href="/contact" style={{ color: "white", fontWeight: 600 }}>
              contact us online
            </a>
            .
          </p>
        </section>

        <Footer />
      </div>
    </>
  );
}

// ── Shared input style ────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.7rem 0.9rem",
  border: "1.5px solid oklch(0.82 0.02 240)",
  borderRadius: "4px",
  fontSize: "0.95rem",
  color: "oklch(0.22 0.055 240)",
  backgroundColor: "white",
  outline: "none",
  boxSizing: "border-box",
};

const checkboxLabel: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};
