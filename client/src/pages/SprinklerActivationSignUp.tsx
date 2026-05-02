/* ============================================================
   SPRINKLER ACTIVATION SIGN-UP PAGE
   Replicates the 2026 Sprinkler Activations Sign Up Google Form.
   NOT indexed by search engines (noindex meta tag).
   Flow: Service Info → Contact Info → Payment → Backflow / How Heard
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

// ── Section IDs ──────────────────────────────────────────────────────────────
type Section = 1 | 2 | 3 | 4;

// ── Form state ───────────────────────────────────────────────────────────────
interface FormData {
  // Section 1 — Service Info (read-only, no user input)
  // Section 2 — Contact & Property Info
  fullName: string;
  phone: string;
  email: string;
  siteAddress: string;
  gateCode: string;
  timerBackflowLocation: string;
  hasPets: string;
  // Section 3 — Payment
  nameOnCard: string;
  cardNumber: string;
  cardExpiration: string;
  cardCvv: string;
  billingAddress: string;
  authSignature: string;
  // Section 4 — Backflow & How Heard
  wantsBackflowTest: string;
  howHeard: string;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  phone: "",
  email: "",
  siteAddress: "",
  gateCode: "",
  timerBackflowLocation: "",
  hasPets: "",
  nameOnCard: "",
  cardNumber: "",
  cardExpiration: "",
  cardCvv: "",
  billingAddress: "",
  authSignature: "",
  wantsBackflowTest: "",
  howHeard: "",
};

// ── Checkbox helper ───────────────────────────────────────────────────────────
function toggleCheckbox(current: string, value: string): string {
  const parts = current ? current.split("|").map(s => s.trim()).filter(Boolean) : [];
  const idx = parts.indexOf(value);
  if (idx >= 0) parts.splice(idx, 1);
  else parts.push(value);
  return parts.join(" | ");
}
function isChecked(current: string, value: string): boolean {
  return current.split("|").map(s => s.trim()).includes(value);
}

// ── Styles ────────────────────────────────────────────────────────────────────
const SECTION_BG = "oklch(0.98 0.003 100)";
const GREEN = "oklch(0.35 0.12 145)";
const RED = "oklch(0.45 0.22 25)";
const BORDER = "#d1d5db";

function inputStyle(hasError: boolean) {
  return {
    width: "100%",
    padding: "10px 12px",
    border: `1.5px solid ${hasError ? "#ef4444" : BORDER}`,
    borderRadius: 6,
    fontSize: "0.93rem",
    color: "#111",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box" as const,
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionCard({ title, children, required }: { title: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 24px", marginBottom: 20 }}>
      {title && (
        <div style={{ background: "#5a5a5a", color: "#fff", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.08em", padding: "6px 12px", borderRadius: 4, marginBottom: 16, display: "inline-block" }}>
          {title}{required && <span style={{ color: "#f87171", marginLeft: 4 }}>*</span>}
        </div>
      )}
      {children}
    </div>
  );
}

function FormField({ label, required, error, children, hint }: { label: string; required?: boolean; error?: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#374151", marginBottom: 6 }}>
        {label}{required && <span style={{ color: RED, marginLeft: 3 }}>*</span>}
      </label>
      {hint && <p style={{ fontSize: "0.82rem", color: "#6b7280", marginBottom: 8, lineHeight: 1.5 }}>{hint}</p>}
      {children}
      {error && <p style={{ color: "#ef4444", fontSize: "0.82rem", marginTop: 4 }}>{error}</p>}
    </div>
  );
}

function RadioGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {options.map(opt => (
        <label key={opt} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: "0.93rem", color: "#374151", lineHeight: 1.5 }}>
          <input
            type="radio"
            checked={value === opt}
            onChange={() => onChange(opt)}
            style={{ marginTop: 3, accentColor: GREEN, flexShrink: 0 }}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({ options, value, onChange, other, otherValue, onOtherChange }: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  other?: boolean;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  const isOtherSelected = value.includes("Other:");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {options.map(opt => (
        <label key={opt} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: "0.93rem", color: "#374151", lineHeight: 1.5 }}>
          <input
            type="checkbox"
            checked={isChecked(value, opt)}
            onChange={() => onChange(toggleCheckbox(value, opt))}
            style={{ marginTop: 3, accentColor: GREEN, flexShrink: 0 }}
          />
          {opt}
        </label>
      ))}
      {other && (
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: "0.93rem", color: "#374151" }}>
          <input
            type="checkbox"
            checked={isOtherSelected}
            onChange={() => onChange(isOtherSelected ? toggleCheckbox(value, "Other:") : toggleCheckbox(value, "Other: "))}
            style={{ marginTop: 3, accentColor: GREEN, flexShrink: 0 }}
          />
          <span>Other:</span>
          {isOtherSelected && (
            <input
              type="text"
              value={otherValue || ""}
              onChange={e => onOtherChange?.(e.target.value)}
              style={{ ...inputStyle(false), marginTop: -2, flex: 1 }}
              autoFocus
            />
          )}
        </label>
      )}
    </div>
  );
}

function NavButtons({ onPrev, onNext, nextLabel, nextDisabled, isSubmit }: {
  onPrev?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  isSubmit?: boolean;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, paddingTop: 8 }}>
      {onPrev ? (
        <button
          type="button"
          onClick={onPrev}
          style={{ background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "10px 24px", fontSize: "0.93rem", color: "#555", cursor: "pointer", fontWeight: 600 }}
        >
          ← Back
        </button>
      ) : <span />}
      {onNext && (
        <button
          type={isSubmit ? "submit" : "button"}
          onClick={onNext}
          disabled={nextDisabled}
          style={{
            background: nextDisabled ? "#9ca3af" : GREEN,
            border: "none",
            borderRadius: 6,
            padding: "12px 32px",
            fontSize: "0.95rem",
            color: "#fff",
            cursor: nextDisabled ? "not-allowed" : "pointer",
            fontWeight: 700,
            letterSpacing: "0.04em",
          }}
        >
          {nextLabel || "Next →"}
        </button>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SprinklerActivationSignUp() {
  const [section, setSection] = useState<Section>(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [howHeardOther, setHowHeardOther] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const submitMutation = trpc.submissions.create.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [section]);

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  // Is today past April 1st?
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 3, 1); // April 1
  const isPastStartDate = today > startDate;

  function validateSection(s: Section): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (s === 2) {
      if (!form.fullName.trim()) errs.fullName = "Full name is required.";
      if (!form.phone.trim()) errs.phone = "Phone number is required.";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email is required.";
      if (!form.siteAddress.trim()) errs.siteAddress = "Site address is required.";
      if (!form.timerBackflowLocation.trim()) errs.timerBackflowLocation = "Timer/backflow location is required.";
      if (!form.hasPets) errs.hasPets = "Please answer the pets question.";
    }
    if (s === 3) {
      if (!form.nameOnCard.trim()) errs.nameOnCard = "Name on card is required.";
      if (!form.cardNumber.trim()) errs.cardNumber = "Card number is required.";
      if (!form.cardExpiration.trim()) errs.cardExpiration = "Expiration date is required.";
      if (!form.cardCvv.trim()) errs.cardCvv = "CVV is required.";
      if (!form.billingAddress.trim()) errs.billingAddress = "Billing address is required.";
      if (!form.authSignature.trim()) errs.authSignature = "Authorization signature is required.";
    }
    if (s === 4) {
      if (!form.wantsBackflowTest) errs.wantsBackflowTest = "Please make a selection.";
      if (!form.howHeard) errs.howHeard = "Please tell us how you heard about us.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (!validateSection(section)) return;
    if (section < 4) setSection((section + 1) as Section);
  }

  function prev() {
    if (section > 1) setSection((section - 1) as Section);
  }

  function handleSubmit() {
    if (!validateSection(4)) return;
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const howHeardFinal = howHeardOther
      ? form.howHeard.replace("Other:", `Other: ${howHeardOther}`)
      : form.howHeard;
    submitMutation.mutate({
      email: form.email,
      firstName: form.fullName.split(" ")[0] || form.fullName,
      lastName: form.fullName.split(" ").slice(1).join(" ") || "",
      phone: form.phone,
      siteAddress: form.siteAddress,
      serviceType: "Sprinkler Activation",
      gateCode: form.gateCode || undefined,
      hasPets: form.hasPets || undefined,
      creditCardNumber: form.cardNumber || undefined,
      creditCardExpiration: form.cardExpiration || undefined,
      creditCardCvv: form.cardCvv || undefined,
      billingAddress: form.billingAddress || undefined,
      creditCardAuthSignature: form.authSignature || undefined,
      wantsBackflowTest: form.wantsBackflowTest || undefined,
      howHeard: howHeardFinal || undefined,
      formCompletionSeconds: elapsed,
      dataSource: "form",
    } as Parameters<typeof submitMutation.mutate>[0]);
  }

  // ── Submitted state ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: SECTION_BG }}>
        <Helmet>
          <title>Thank You — Newport Avenue Landscaping</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Navbar />
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
          <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "2rem", color: GREEN, marginBottom: 16 }}>
            Sign-Up Received!
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#444", lineHeight: 1.7, marginBottom: 24 }}>
            Thank you for signing up for our 2026 Sprinkler Activation service. You will receive a call or voicemail the evening before your scheduled service date.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#666", marginBottom: 32 }}>
            Questions? Call us at <a href="tel:5416178873" style={{ color: GREEN, fontWeight: 700 }}>(541) 617-8873</a>
          </p>
          <Link href="/" style={{ display: "inline-block", background: GREEN, color: "#fff", padding: "14px 32px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
            Return Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const SECTION_LABELS: Record<Section, string> = {
    1: "Service Information",
    2: "Contact & Property Info",
    3: "Payment Information",
    4: "Backflow Test & How You Heard",
  };

  // ── Main render ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", backgroundColor: SECTION_BG }} ref={topRef}>
      <Helmet>
        <title>Sprinkler Activation Sign-Up — Newport Avenue Landscaping</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px 80px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", color: RED, textTransform: "uppercase", marginBottom: 8 }}>
            Spring 2026
          </p>
          <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "#1a1a1a", marginBottom: 12 }}>
            Sprinkler Activation Sign-Up
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#555", maxWidth: 520, margin: "0 auto" }}>
            Complete this form to schedule your 2026 sprinkler system activation with Newport Avenue Landscaping.
          </p>
        </div>

        {/* Hero image */}
        <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 28, maxHeight: 320 }}>
          <img
            src="/manus-storage/rachio-smart-sprinkler-controller_6613214a.jpg"
            alt="Sprinkler system activation"
            style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Progress indicator */}
        <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "12px 20px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.85rem", color: "#555", fontWeight: 600 }}>
            Step {section} of 4 — {SECTION_LABELS[section]}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {([1, 2, 3, 4] as Section[]).map(s => (
              <div key={s} style={{ width: 28, height: 6, borderRadius: 3, background: s <= section ? GREEN : "#e5e7eb" }} />
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 1 — Service Information
        ════════════════════════════════════════════════════════════════ */}
        {section === 1 && (
          <div>
            {/* April 1st notice */}
            {isPastStartDate ? (
              <div style={{ background: "#fff7ed", border: "1.5px solid #f59e0b", borderRadius: 10, padding: "18px 22px", marginBottom: 20 }}>
                <p style={{ fontWeight: 700, color: "#92400e", fontSize: "1rem", marginBottom: 6 }}>
                  ⚠ Activations Are Already Underway
                </p>
                <p style={{ fontSize: "0.92rem", color: "#78350f", lineHeight: 1.7, margin: 0 }}>
                  We started activations on April 1st, {today.getFullYear()}. Since you are signing up after our start date, your system will be scheduled at the <strong>next available time</strong> in our rotation. You will receive a call or voicemail the evening before your service date.
                </p>
              </div>
            ) : (
              <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10, padding: "18px 22px", marginBottom: 20 }}>
                <p style={{ fontWeight: 700, color: "#166534", fontSize: "1rem", marginBottom: 6 }}>
                  🗓 Activations Begin April 1st, {today.getFullYear()}
                </p>
                <p style={{ fontSize: "0.92rem", color: "#14532d", lineHeight: 1.7, margin: 0 }}>
                  We will start activations on April 1st. If weather is still freezing or frosting overnight, we will activate your system and then turn your timer to the <strong>OFF setting</strong> — you can simply flip it on when weather permits.
                </p>
              </div>
            )}

            <SectionCard title="2026 SPRINKLER ACTIVATION SERVICE">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
                <div style={{ background: "#f9fafb", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "14px 16px" }}>
                  <p style={{ fontWeight: 700, color: GREEN, fontSize: "0.85rem", marginBottom: 4 }}>COST</p>
                  <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.6, margin: 0 }}>
                    <strong>$140</strong> for the first 8 zones / first hour + cost of any materials (nozzles, heads, etc.). You will be notified of any major repairs over $250.
                  </p>
                </div>
                <div style={{ background: "#f9fafb", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "14px 16px" }}>
                  <p style={{ fontWeight: 700, color: GREEN, fontSize: "0.85rem", marginBottom: 4 }}>WHEN</p>
                  <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.6, margin: 0 }}>
                    Starting April 1st, {today.getFullYear()}. If freezing overnight, we activate and set your timer to OFF so you can flip it on when ready.
                  </p>
                </div>
                <div style={{ background: "#f9fafb", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "14px 16px" }}>
                  <p style={{ fontWeight: 700, color: GREEN, fontSize: "0.85rem", marginBottom: 4 }}>APPOINTMENTS</p>
                  <p style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.6, margin: 0 }}>
                    Due to the number of clients we serve, we cannot set specific appointments. You will receive a call or voicemail the <strong>evening before</strong> service.
                  </p>
                </div>
              </div>

              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "14px 16px", marginBottom: 16 }}>
                <p style={{ fontWeight: 700, color: "#991b1b", fontSize: "0.85rem", marginBottom: 4 }}>CANCELLATION POLICY</p>
                <p style={{ fontSize: "0.88rem", color: "#7f1d1d", lineHeight: 1.6, margin: 0 }}>
                  If you sign up and then make other arrangements or cancel <strong>without notifying us by email before we arrive</strong>, we will charge $140 to cover the cost of our service technician's time.
                </p>
              </div>

              <p style={{ fontSize: "0.82rem", color: "#6b7280", fontStyle: "italic", margin: 0 }}>
                * We charge more for estates, ranches, systems with a pump and irrigation ponds, and larger commercial properties. Please call to inquire: <a href="tel:5416178873" style={{ color: GREEN }}>(541) 617-8873</a>
              </p>
            </SectionCard>

            <SectionCard title="WHAT'S INCLUDED IN YOUR ACTIVATION">
              <p style={{ fontSize: "0.92rem", color: "#555", lineHeight: 1.7, marginBottom: 14 }}>
                During your system start-up, our certified irrigation technician will carry out the following:
              </p>
              <ul style={{ margin: 0, paddingLeft: 20, color: "#374151", fontSize: "0.92rem", lineHeight: 1.9 }}>
                <li>Activate your main isolation valve and backflow device</li>
                <li>Inspect and test your automatic sprinkler valves</li>
                <li>Check all wiring connections for proper functioning</li>
                <li>Run through each irrigation zone, making necessary adjustments to the heads</li>
                <li>Thoroughly check the entire system for any leaks</li>
                <li>Set the sprinkler timer (provided the timer is accessible)</li>
              </ul>
            </SectionCard>

            <NavButtons onNext={next} nextLabel="Sounds Great, Sign Me Up! →" />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            SECTION 2 — Contact & Property Info
        ════════════════════════════════════════════════════════════════ */}
        {section === 2 && (
          <div>
            <SectionCard title="SOUNDS GREAT, SIGN ME UP!">
              <FormField label="Your Full Name" required error={errors.fullName}>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={e => set("fullName", e.target.value)}
                  placeholder="First and last name"
                  style={inputStyle(!!errors.fullName)}
                />
              </FormField>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <FormField label="Best Phone Number" required error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => set("phone", e.target.value)}
                    placeholder="(541) 000-0000"
                    style={inputStyle(!!errors.phone)}
                  />
                </FormField>
                <FormField label="Email Address" required error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => set("email", e.target.value)}
                    placeholder="you@example.com"
                    style={inputStyle(!!errors.email)}
                  />
                </FormField>
              </div>
              <FormField label="Site Address" required error={errors.siteAddress}>
                <input
                  type="text"
                  value={form.siteAddress}
                  onChange={e => set("siteAddress", e.target.value)}
                  placeholder="Street address where service will be performed"
                  style={inputStyle(!!errors.siteAddress)}
                />
              </FormField>
              <FormField label="Gate Lock Codes or Other Access Instructions" error={errors.gateCode}>
                <input
                  type="text"
                  value={form.gateCode}
                  onChange={e => set("gateCode", e.target.value)}
                  placeholder="Leave blank if not applicable"
                  style={inputStyle(!!errors.gateCode)}
                />
              </FormField>
              <FormField
                label="Timer, Backflow & Valve Locations"
                required
                error={errors.timerBackflowLocation}
                hint="Please provide as much detail as possible — this helps our technician complete the job efficiently."
              >
                <textarea
                  value={form.timerBackflowLocation}
                  onChange={e => set("timerBackflowLocation", e.target.value)}
                  placeholder="e.g. Timer is in the garage on the north wall. Backflow is on the east side of the house near the hose bib."
                  rows={4}
                  style={{ ...inputStyle(!!errors.timerBackflowLocation), resize: "vertical" }}
                />
              </FormField>
              <FormField
                label="Pets within service areas we should be aware of?"
                required
                error={errors.hasPets}
                hint="Just a reminder that we will skip service and still charge our minimum if there is excessive animal waste in your landscape that causes issues with our equipment or safety concerns for our team members."
              >
                <RadioGroup
                  options={["Yes", "No"]}
                  value={form.hasPets}
                  onChange={v => set("hasPets", v)}
                />
              </FormField>
            </SectionCard>
            <NavButtons onPrev={prev} onNext={next} nextLabel="Continue to Payment →" />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            SECTION 3 — Payment Information
        ════════════════════════════════════════════════════════════════ */}
        {section === 3 && (
          <div>
            <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 24px", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.25rem", color: "#1a1a1a", marginBottom: 10 }}>
                Payment Information
              </h2>
              <p style={{ fontSize: "0.92rem", color: "#555", lineHeight: 1.7, marginBottom: 10 }}>
                Having a form of payment on file is necessary for this service. We will charge for services immediately after they are rendered.
              </p>
              <div style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: 8, padding: "12px 16px" }}>
                <p style={{ fontSize: "0.88rem", color: "#78350f", lineHeight: 1.6, margin: 0 }}>
                  <strong>We automatically charge after each service rendered.</strong> Payments made by credit card include a <strong>3% processing fee</strong>. Avoid this fee by paying via ACH — just provide your ACH information and we'll keep it on file.
                </p>
              </div>
            </div>

            <SectionCard title="CREDIT CARD AUTHORIZATION FORM">
              <FormField label="Full Name On Card" required error={errors.nameOnCard}>
                <input
                  type="text"
                  value={form.nameOnCard}
                  onChange={e => set("nameOnCard", e.target.value)}
                  placeholder="Name as it appears on card"
                  style={inputStyle(!!errors.nameOnCard)}
                />
              </FormField>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16 }}>
                <FormField label="Card Number" required error={errors.cardNumber}>
                  <input
                    type="text"
                    value={form.cardNumber}
                    onChange={e => set("cardNumber", e.target.value.replace(/\D/g, "").slice(0, 16))}
                    placeholder="0000 0000 0000 0000"
                    maxLength={16}
                    style={inputStyle(!!errors.cardNumber)}
                  />
                </FormField>
                <FormField label="Expiration Date" required error={errors.cardExpiration}>
                  <input
                    type="text"
                    value={form.cardExpiration}
                    onChange={e => set("cardExpiration", e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    style={inputStyle(!!errors.cardExpiration)}
                  />
                </FormField>
                <FormField label="CVV" required error={errors.cardCvv}>
                  <input
                    type="text"
                    value={form.cardCvv}
                    onChange={e => set("cardCvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="000"
                    maxLength={4}
                    style={inputStyle(!!errors.cardCvv)}
                  />
                </FormField>
              </div>
              <FormField label="Billing Address" required error={errors.billingAddress}>
                <textarea
                  value={form.billingAddress}
                  onChange={e => set("billingAddress", e.target.value)}
                  placeholder="Street, City, State, ZIP"
                  rows={3}
                  style={{ ...inputStyle(!!errors.billingAddress), resize: "vertical" }}
                />
              </FormField>
              <div style={{ background: "#f0f7f0", border: `1px solid ${GREEN}33`, borderRadius: 6, padding: "14px 16px", marginBottom: 16 }}>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#444", lineHeight: 1.7 }}>
                  By signing this form, you authorize Newport Avenue Landscaping to debit your account for the specified amount following each service rendered. This authorization covers the transaction for the service provided and also allows for any necessary debits or credits to your account in the event it becomes delinquent.
                </p>
              </div>
              <FormField label="Authorization Signature (Type Full Name)" required error={errors.authSignature}>
                <input
                  type="text"
                  value={form.authSignature}
                  onChange={e => set("authSignature", e.target.value)}
                  placeholder="Type your full legal name"
                  style={inputStyle(!!errors.authSignature)}
                />
              </FormField>
            </SectionCard>
            <NavButtons onPrev={prev} onNext={next} nextLabel="Almost Done →" />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            SECTION 4 — Backflow Test & How You Heard
        ════════════════════════════════════════════════════════════════ */}
        {section === 4 && (
          <div>
            <SectionCard title="DO YOU NEED YOUR BACKFLOW TESTED?" required>
              <p style={{ fontSize: "0.92rem", color: "#555", lineHeight: 1.7, marginBottom: 12 }}>
                Our certified irrigation technician offers a comprehensive service to test your irrigation backflow. This service includes not only the testing but also the submission of the certification paperwork to your city. The charge for this complete service is <strong>$140 per backflow</strong> (most properties have one backflow), ensuring that your irrigation system complies with local regulations and operates safely and effectively.
              </p>
              <p style={{ fontSize: "0.88rem", color: "#666", lineHeight: 1.6, marginBottom: 16 }}>
                Backflow testing is a crucial process conducted on your plumbing system to ensure the safety of your drinking water. This test checks to prevent dirty water from infiltrating and contaminating the water supply via your irrigation backflow.
              </p>
              {/* Backflow image */}
              <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
                <img
                  src="/manus-storage/backflow-preventer-rpz_fc63f41e.jpg"
                  alt="Backflow testing equipment"
                  style={{ width: "100%", maxHeight: 260, objectFit: "cover", display: "block" }}
                />
              </div>
              {errors.wantsBackflowTest && <p style={{ color: "#ef4444", fontSize: "0.82rem", marginBottom: 8 }}>{errors.wantsBackflowTest}</p>}
              <RadioGroup
                options={[
                  "Yes, I'd like a backflow test for $140",
                  "No, I have this service covered.",
                ]}
                value={form.wantsBackflowTest}
                onChange={v => set("wantsBackflowTest", v)}
              />
            </SectionCard>

            <SectionCard title="HOW DID YOU HEAR ABOUT US?" required>
              {errors.howHeard && <p style={{ color: "#ef4444", fontSize: "0.82rem", marginBottom: 8 }}>{errors.howHeard}</p>}
              <CheckboxGroup
                options={[
                  "Current Customer",
                  "Google / Internet Search",
                  "Email",
                  "Facebook",
                  "Instagram",
                  "I have seen your trucks",
                ]}
                value={form.howHeard}
                onChange={v => set("howHeard", v)}
                other
                otherValue={howHeardOther}
                onOtherChange={setHowHeardOther}
              />
            </SectionCard>

            <NavButtons
              onPrev={prev}
              onNext={handleSubmit}
              nextLabel={submitMutation.isPending ? "Submitting…" : "Submit Sign-Up ✓"}
              nextDisabled={submitMutation.isPending}
              isSubmit
            />
            {submitMutation.isError && (
              <p style={{ color: "#ef4444", fontSize: "0.88rem", marginTop: 12, textAlign: "center" }}>
                Something went wrong. Please try again or call us at (541) 617-8873.
              </p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
