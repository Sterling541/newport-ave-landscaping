/* ============================================================
   MAINTENANCE SIGN-UP PAGE
   Replicates the 2026 Landscape Maintenance Agreement Google Form.
   NOT indexed by search engines (noindex meta tag).
   Submissions go directly to Completed Scheduled Services.
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

// ── Section IDs ──────────────────────────────────────────────────────────────
type Section = 1 | 2 | 3 | 4 | 5;

// ── Form state ───────────────────────────────────────────────────────────────
interface FormData {
  // Section 1 — Service Agreement
  weeklyServiceCap: string;
  cleanupCap: string;
  // Section 2 — Additional Services
  wantsAeration: string;
  wantsDethatch: string;
  wantsSprinklerStartup: string;
  wantsBackflowTest: string;
  // Section 3 — Sign Me Up
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  siteAddress: string;
  gateCode: string;
  hasPets: string;
  // Section 4 — Payment
  creditCardNumber: string;
  creditCardExpiration: string;
  creditCardCvv: string;
  billingAddress: string;
  creditCardAuthSignature: string;
  // Section 5 — Property Enhancements
  wantsPropertyEnhancement: string;
}

const INITIAL_FORM: FormData = {
  weeklyServiceCap: "",
  cleanupCap: "",
  wantsAeration: "",
  wantsDethatch: "",
  wantsSprinklerStartup: "",
  wantsBackflowTest: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  siteAddress: "",
  gateCode: "",
  hasPets: "",
  creditCardNumber: "",
  creditCardExpiration: "",
  creditCardCvv: "",
  billingAddress: "",
  creditCardAuthSignature: "",
  wantsPropertyEnhancement: "",
};

// ── Checkbox group helper ─────────────────────────────────────────────────────
function toggleCheckbox(current: string, value: string): string {
  const parts = current ? current.split("|").map(s => s.trim()).filter(Boolean) : [];
  const idx = parts.indexOf(value);
  if (idx >= 0) {
    parts.splice(idx, 1);
  } else {
    parts.push(value);
  }
  return parts.join(" | ");
}

function isChecked(current: string, value: string): boolean {
  return current.split("|").map(s => s.trim()).includes(value);
}

// ── Styles ────────────────────────────────────────────────────────────────────
const SECTION_BG = "oklch(0.98 0.003 100)";
const CARD_BG = "#ffffff";
const GREEN = "oklch(0.35 0.12 145)";
const RED = "oklch(0.45 0.22 25)";
const BORDER = "#d1d5db";

export default function MaintenanceSignUp() {
  const [section, setSection] = useState<Section>(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [startTime] = useState(() => Date.now());
  const topRef = useRef<HTMLDivElement>(null);

  const submitMutation = trpc.submissions.create.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  // Scroll to top on section change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [section]);

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  function validateSection(s: Section): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!form.weeklyServiceCap) errs.weeklyServiceCap = "Please select a weekly service cap.";
      if (!form.cleanupCap) errs.cleanupCap = "Please select a cleanup time cap.";
    }
    if (s === 2) {
      if (!form.wantsAeration) errs.wantsAeration = "Please make a selection.";
      if (!form.wantsDethatch) errs.wantsDethatch = "Please make a selection.";
      if (!form.wantsSprinklerStartup) errs.wantsSprinklerStartup = "Please make a selection.";
      if (!form.wantsBackflowTest) errs.wantsBackflowTest = "Please make a selection.";
    }
    if (s === 3) {
      if (!form.firstName.trim()) errs.firstName = "First name is required.";
      if (!form.lastName.trim()) errs.lastName = "Last name is required.";
      if (!form.phone.trim()) errs.phone = "Phone number is required.";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email is required.";
      if (!form.siteAddress.trim()) errs.siteAddress = "Site address is required.";
      if (!form.hasPets) errs.hasPets = "Please answer the pets question.";
    }
    if (s === 4) {
      if (!form.creditCardNumber.trim()) errs.creditCardNumber = "Card number is required.";
      if (!form.creditCardExpiration.trim()) errs.creditCardExpiration = "Expiration date is required.";
      if (!form.creditCardCvv.trim()) errs.creditCardCvv = "CVC is required.";
      if (!form.billingAddress.trim()) errs.billingAddress = "Billing address is required.";
      if (!form.creditCardAuthSignature.trim()) errs.creditCardAuthSignature = "Authorization signature is required.";
    }
    if (s === 5) {
      if (!form.wantsPropertyEnhancement) errs.wantsPropertyEnhancement = "Please make a selection.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function next() {
    if (!validateSection(section)) return;
    if (section < 5) setSection((section + 1) as Section);
  }

  function prev() {
    if (section > 1) setSection((section - 1) as Section);
  }

  function handleSubmit() {
    if (!validateSection(5)) return;
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    submitMutation.mutate({
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      siteAddress: form.siteAddress,
      serviceType: "Maintenance: Weekly Landscape Maintenance Agreement",
      weeklyServiceCap: form.weeklyServiceCap || undefined,
      cleanupCap: form.cleanupCap || undefined,
      wantsAeration: form.wantsAeration || undefined,
      wantsDethatch: form.wantsDethatch || undefined,
      wantsSprinklerStartup: form.wantsSprinklerStartup || undefined,
      wantsBackflowTest: form.wantsBackflowTest || undefined,
      gateCode: form.gateCode || undefined,
      hasPets: form.hasPets || undefined,
      creditCardNumber: form.creditCardNumber || undefined,
      creditCardExpiration: form.creditCardExpiration || undefined,
      creditCardCvv: form.creditCardCvv || undefined,
      billingAddress: form.billingAddress || undefined,
      creditCardAuthSignature: form.creditCardAuthSignature || undefined,
      wantsPropertyEnhancement: form.wantsPropertyEnhancement || undefined,
      formCompletionSeconds: elapsed,
      dataSource: "form",
    } as Parameters<typeof submitMutation.mutate>[0]);
  }

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: SECTION_BG }}>
        <Helmet>
          <title>Thank You — Newport Avenue Landscaping</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Navbar />
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>&#10003;</div>
          <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "2rem", color: GREEN, marginBottom: 16 }}>
            Agreement Received!
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#444", lineHeight: 1.7, marginBottom: 24 }}>
            Thank you for signing up for our 2026 Landscape Maintenance service. Your account manager will contact you shortly to discuss scheduling and any other details.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#666", marginBottom: 32 }}>
            Questions? Call us at{" "}
            <a href="tel:+15416178873" style={{ color: GREEN, fontWeight: 700 }}>(541) 617-8873</a>
          </p>
          <Link href="/" style={{ display: "inline-block", background: GREEN, color: "#fff", padding: "12px 32px", borderRadius: 6, textDecoration: "none", fontWeight: 700, fontSize: "0.95rem" }}>
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: SECTION_BG }} ref={topRef}>
      <Helmet>
        <title>2026 Landscape Maintenance Agreement — Newport Avenue Landscaping</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Sign up for Newport Avenue Landscaping's 2026 residential landscape maintenance service. Complete the agreement to get on our schedule." />
      </Helmet>
      <Navbar />

      {/* ── Hero Image Header ── */}
      <div style={{ position: "relative", height: "clamp(280px, 40vw, 420px)", overflow: "hidden", marginTop: 0 }}>
        <img
          src="/manus-storage/safe-hero-lawn-service_fcba45d8.jpg"
          alt="Newport Avenue Landscaping maintenance crew"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%)" }} />
        {/* Text over image */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "0 24px 40px", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>
            Residential Maintenance
          </p>
          <h1 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#fff", fontWeight: 300, margin: 0, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
            2026 Landscape Maintenance Agreement
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginTop: 12, maxWidth: 520 }}>
            Complete the form below and your account manager will be in touch to confirm scheduling.
          </p>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div style={{ background: "#e5e7eb", height: 4 }}>
        <div style={{ background: RED, height: 4, width: `${(section / 5) * 100}%`, transition: "width 0.4s ease" }} />
      </div>
      <div style={{ textAlign: "center", padding: "8px 0", fontSize: "0.78rem", color: "#888" }}>
        Section {section} of 5 &mdash; {["Service Agreement", "Additional Services", "Sign Me Up!", "Payment Information", "Property Enhancements"][section - 1]}
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ════════════════════════════════════════════════════════════════
            SECTION 1 — Service Agreement
        ════════════════════════════════════════════════════════════════ */}
        {section === 1 && (
          <div>
            {/* Intro */}
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "28px 28px", marginBottom: 20, marginTop: 24 }}>
              <p style={{ fontSize: "0.95rem", color: "#444", lineHeight: 1.75, margin: 0 }}>
                Kindly complete the agreement in its entirety. After we receive the fully completed form, we will forward your details to your account manager. They will then contact you to discuss scheduling and any other relevant details. Our Weekly Maintenance service runs from <strong>March 1st to November 30th</strong>. Additionally, this service will automatically renew each year unless you notify us of cancellation via email or phone call.
              </p>
            </div>

            {/* What's Included */}
            <SectionCard title="WHAT'S INCLUDED IN YOUR WEEKLY SERVICE">
              <p style={{ fontSize: "0.93rem", color: "#555", lineHeight: 1.7, marginBottom: 12 }}>
                To ensure consistent service, we provide a single maintenance package. Included in this package are the following:
              </p>
              <p style={{ fontSize: "0.93rem", color: "#555", lineHeight: 1.7, marginBottom: 12 }}>
                Our maintenance package offers a comprehensive approach to landscape care, ensuring your space remains pristine and healthy. Here's what we include:
              </p>
              <ul style={{ margin: 0, paddingLeft: 20, color: "#555", fontSize: "0.93rem", lineHeight: 1.8 }}>
                <li><strong>Mowing:</strong> This is carried out as needed. Please note, areas that cannot be reached by mowers will be attended to with a line trimmer, following the same schedule.</li>
                <li><strong>Edging:</strong> Also completed as necessary. We avoid weekly edging as it's not essential for maintaining the lawn's aesthetic appeal and can be harmful to its health.</li>
                <li><strong>Blowing/Trash &amp; Debris Removal:</strong> Performed as required. We'll remove all weeds, leaves, and light debris (such as fast-food bags, bottles, etc.) from the landscape and sidewalks to keep your area clean and orderly.</li>
                <li><strong>Minor Pruning &amp; Hedging:</strong> Performed as required to maintain the health and appearance of trees, shrubs, and hedges. Note that major pruning (involving limbs over 1.5" caliper or needing assisted access like a climbing crew or man lift) will be provided under a separate proposal and at an additional cost.</li>
                <li><strong>Irrigation Monitoring:</strong> Our teams will routinely inspect and adjust irrigation heads, nozzles, and timers as needed throughout the growing season. Should further inspection by our specialized irrigation technician be required, it will be billable, and you will be notified in advance. This excludes backflow prevention testing and irrigation repairs.</li>
                <li><strong>Pre/Post Emergent Weed Control:</strong> Application of weed control products in beds as necessary throughout the season. Weeds larger than 4 inches will be hand-removed. Note that the peak weed season is April–May, and rapid weed growth may occur between service visits.</li>
                <li><strong>Lawn Fertilization:</strong> We schedule lawn fertilization for spring, early summer, mid-summer, fall, and winter to maintain a healthy lawn.</li>
                <li><strong>Insect/Disease Control:</strong> We manage common issues like aphids, fungus, and moss on trees, shrubs, and perennials as needed. In cases where excessive control is required (as defined by Newport Avenue Landscaping), we will provide a separate bid for these services.</li>
              </ul>
            </SectionCard>

            {/* Pricing */}
            <SectionCard title="YOUR WEEKLY SERVICE PRICING">
              <p style={{ fontSize: "0.93rem", color: "#555", lineHeight: 1.7, marginBottom: 12 }}>
                Billing is charged on a man-hours basis at a rate of <strong>$95 per man-hour</strong>. Our standard teams consist of two crew members. Occasionally, we may deploy teams of three, and the time spent on your property will be adjusted to reflect this. Each of our trucks is equipped with a GPS unit that accurately tracks the time our crews spend on your property. After completing their service, our crews will leave a door hanger on your door as a notification.
              </p>
              <p style={{ fontSize: "0.93rem", color: "#555", lineHeight: 1.7 }}>
                This pricing model was adopted to enhance customer satisfaction. Recognizing that each landscape is unique and owner expectations vary, we have standardized our pricing to accommodate these differences. Below, you will find the option to select and set a maximum number of man-hours to be spent on your property each week.
              </p>
            </SectionCard>

            {/* Weekly Cap */}
            <SectionCard title="CAP YOUR WEEKLY SERVICE TIME" required>
              <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
                The average subdivision size landscape can be fully serviced in 30 minutes or (1) man hour for a total of $95.
              </p>
              <CheckboxGroup
                options={[
                  "(1) man hour (2 employees | 30 minutes on site | $95 weekly charge)",
                  "(1.5) man hours (2 employees | 45 minutes on site | $142.50 weekly charge)",
                  "(2) man hours (2 employees | 1 hour on site | $190 weekly charge)",
                  "(2.5) man hours (2 employees | 1hr 15 minutes on site | $237.50 weekly charge)",
                  "(3) Man Hours (2 employees | 1.5 Hours on site | $285 weekly charge)",
                ]}
                value={form.weeklyServiceCap}
                onChange={v => set("weeklyServiceCap", v)}
                single
              />
              {errors.weeklyServiceCap && <FieldError msg={errors.weeklyServiceCap} />}
            </SectionCard>

            {/* Cleanup Cap */}
            <SectionCard title="CAP YOUR SPRING &amp; FALL CLEANUPS TIME" required>
              <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: 12, lineHeight: 1.6 }}>
                Spring and fall clean-ups are mandatory for signing up for our weekly service. We charge $95 per man-hour and an additional $22 per yard of debris (equivalent to a small pickup truck load). These clean-ups are crucial to bring your property to a "maintainable" condition.
              </p>
              <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: 12, lineHeight: 1.6 }}>
                For an average subdivision-sized home, the clean-up typically takes around 6 man-hours each for spring and fall. However, the actual time may vary depending on your specific requirements and the needs of your landscaping.
              </p>
              <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
                Please note that we do not provide estimates for clean-ups. The time and cost will be determined based on the actual work required for your property.
              </p>
              <CheckboxGroup
                options={[
                  "(6) Man hour cap per clean up (Spring &amp; Fall) (2 employees | 3 hours on site | $570 Max)",
                  "(12) Man hour cap per clean up (Spring &amp; Fall) (2 employees | 6 hours on site | $1,140 Max)",
                  "However long it might take",
                  "A full property landscaping cleanup was already completed",
                ]}
                value={form.cleanupCap}
                onChange={v => set("cleanupCap", v)}
                single
                other
                otherValue={form.cleanupCap.startsWith("Other:") ? form.cleanupCap.replace("Other: ", "") : ""}
                onOtherChange={v => set("cleanupCap", v ? `Other: ${v}` : "")}
              />
              {errors.cleanupCap && <FieldError msg={errors.cleanupCap} />}
            </SectionCard>

            <NavButtons onNext={next} nextLabel="Next" />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            SECTION 2 — Additional Services
        ════════════════════════════════════════════════════════════════ */}
        {section === 2 && (
          <div>
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "28px", marginBottom: 20, marginTop: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.2rem", color: GREEN, marginBottom: 12 }}>ADDITIONAL SERVICES</h2>
              <p style={{ fontSize: "0.93rem", color: "#555", lineHeight: 1.7, margin: 0 }}>
                Enhance the beauty and health of your landscape with our range of extra services. Tailored to meet the unique requirements of your property, these additional offerings ensure a comprehensive approach to maintaining your outdoor space.
              </p>
            </div>

            {/* Aeration */}
            <SectionCard title="Would you like your lawn Aerated?" required>
              <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
                Aerations are billed at <strong>$205 minimum charge</strong> for the first hour and then $95 per man-hour thereafter. We recommend aerating your lawn once in the spring and once in the fall for optimal health and growth.
              </p>
              <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
                It's important to note that we typically do not remove the aeration plugs, as they naturally decompose and contribute to the lawn's health. However, if you specifically request the removal and raking of these plugs, we can accommodate this with advanced notice.
              </p>
              <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
                <img src="/manus-storage/safe-hero-aeration_742c2b11.jpg" alt="Lawn aeration machine" style={{ width: "100%", maxHeight: 240, objectFit: "cover", display: "block" }} />
              </div>
              <RadioGroup
                options={["Yes — Spring only", "Yes — Fall only", "Yes — Both Spring and Fall", "No"]}
                value={form.wantsAeration}
                onChange={v => set("wantsAeration", v)}
                other
                otherValue={form.wantsAeration.startsWith("Other:") ? form.wantsAeration.replace("Other: ", "") : ""}
                onOtherChange={v => set("wantsAeration", v ? `Other: ${v}` : "")}
              />
              {errors.wantsAeration && <FieldError msg={errors.wantsAeration} />}
            </SectionCard>

            {/* Dethatch */}
            <SectionCard title="Would you like your lawn Dethatched?" required>
              <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
                Thatching services are billed at <strong>$299 minimum charge</strong> for the first hour and then $95 per man-hour thereafter. This service is billed by the minute for accurate and fair pricing. We recommend dethatching your lawn once in the spring to maintain its health and appearance.
              </p>
              <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
                Please be aware that dethatching usually takes about 1.5 to 2 times longer than aerating. This is due to the additional time required for raking and disposing of the dead grass that is removed during the process.
              </p>
              <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
                <img src="/manus-storage/svc-aeration-1_afc106ab.jpg" alt="Lawn dethatching machine" style={{ width: "100%", maxHeight: 240, objectFit: "cover", display: "block" }} />
              </div>
              <RadioGroup
                options={["Yes — Spring", "No"]}
                value={form.wantsDethatch}
                onChange={v => set("wantsDethatch", v)}
                other
                otherValue={form.wantsDethatch.startsWith("Other:") ? form.wantsDethatch.replace("Other: ", "") : ""}
                onOtherChange={v => set("wantsDethatch", v ? `Other: ${v}` : "")}
              />
              {errors.wantsDethatch && <FieldError msg={errors.wantsDethatch} />}
            </SectionCard>

            {/* Sprinkler Startup */}
            <SectionCard title="Would you like us to start up your sprinkler system?" required>
              <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
                Our certified irrigation technician offers a comprehensive start-up service for your irrigation system at a cost of <strong>$140</strong>, which covers up to 8 zones. There is an additional charge of $5 per zone beyond the initial 8. If parts are required, they will be charged separately.
              </p>
              <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: 8, lineHeight: 1.6 }}>
                During the system start-up, our technician will carry out the following tasks:
              </p>
              <ul style={{ margin: "0 0 16px", paddingLeft: 20, color: "#666", fontSize: "0.88rem", lineHeight: 1.8 }}>
                <li>Activate your main isolation valve and backflow device.</li>
                <li>Inspect and test your automatic sprinkler valves.</li>
                <li>Check all wiring connections for proper functioning.</li>
                <li>Run through each irrigation zone, making necessary adjustments to the heads.</li>
                <li>Thoroughly check the entire system for any leaks.</li>
                <li>Set the sprinkler timer, provided the timer is accessible.</li>
              </ul>
              <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
                <img src="/manus-storage/safe-hero-sprinkler-activation_6c04210c.jpg" alt="Sprinkler system startup" style={{ width: "100%", maxHeight: 240, objectFit: "cover", display: "block" }} />
              </div>
              <RadioGroup
                options={["Yes", "No"]}
                value={form.wantsSprinklerStartup}
                onChange={v => set("wantsSprinklerStartup", v)}
                other
                otherValue={form.wantsSprinklerStartup.startsWith("Other:") ? form.wantsSprinklerStartup.replace("Other: ", "") : ""}
                onOtherChange={v => set("wantsSprinklerStartup", v ? `Other: ${v}` : "")}
              />
              {errors.wantsSprinklerStartup && <FieldError msg={errors.wantsSprinklerStartup} />}
            </SectionCard>

            {/* Backflow */}
            <SectionCard title="Do you need your backflow tested?" required>
              <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
                Our certified irrigation technician offers a comprehensive service to test your irrigation backflow. This service includes not only the testing but also the submission of the certification paperwork to your city. The charge for this complete service is <strong>$140 per backflow</strong> (most properties have one backflow), ensuring that your irrigation system complies with local regulations and operates safely and effectively.
              </p>
              <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
                <img src="/manus-storage/backflow-preventer-rpz_fc63f41e.jpg" alt="Backflow testing equipment" style={{ width: "100%", maxHeight: 240, objectFit: "cover", display: "block" }} />
              </div>
              <RadioGroup
                options={["Yes", "No"]}
                value={form.wantsBackflowTest}
                onChange={v => set("wantsBackflowTest", v)}
              />
              {errors.wantsBackflowTest && <FieldError msg={errors.wantsBackflowTest} />}
            </SectionCard>

            <NavButtons onPrev={prev} onNext={next} nextLabel="Next" />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            SECTION 3 — Sign Me Up
        ════════════════════════════════════════════════════════════════ */}
        {section === 3 && (
          <div>
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "28px", marginBottom: 20, marginTop: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.2rem", color: GREEN, marginBottom: 0 }}>SOUNDS GREAT, SIGN ME UP!</h2>
            </div>

            <SectionCard>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <FormField label="First Name" required error={errors.firstName}>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => set("firstName", e.target.value)}
                    placeholder="First name"
                    style={inputStyle(!!errors.firstName)}
                  />
                </FormField>
                <FormField label="Last Name" required error={errors.lastName}>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={e => set("lastName", e.target.value)}
                    placeholder="Last name"
                    style={inputStyle(!!errors.lastName)}
                  />
                </FormField>
              </div>

              <FormField label="Best Phone Number To Be Reached At" required error={errors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => set("phone", e.target.value)}
                  placeholder="(541) 000-0000"
                  style={inputStyle(!!errors.phone)}
                />
              </FormField>

              <FormField label="Email" required error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set("email", e.target.value)}
                  placeholder="your@email.com"
                  style={inputStyle(!!errors.email)}
                />
              </FormField>

              <FormField label="Site Address" required error={errors.siteAddress}>
                <input
                  type="text"
                  value={form.siteAddress}
                  onChange={e => set("siteAddress", e.target.value)}
                  placeholder="123 Main St, Bend, OR 97701"
                  style={inputStyle(!!errors.siteAddress)}
                />
              </FormField>

              <FormField label="Gate Lock Codes or Other Access Instructions" error={errors.gateCode}>
                <input
                  type="text"
                  value={form.gateCode}
                  onChange={e => set("gateCode", e.target.value)}
                  placeholder="e.g., Gate code #1234"
                  style={inputStyle(false)}
                />
              </FormField>

              <FormField label="Pets within service areas we should be aware of?" required error={errors.hasPets}>
                <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.6, marginBottom: 10 }}>
                  Just a reminder, if there is excessive animal waste in your landscape that could potentially cause issues with our equipment or pose safety concerns for our team members, we will need to skip the service. However, please note that in such instances, our minimum charge will still apply as we have to pay our crews to come out to your property. We appreciate your understanding and cooperation in maintaining a safe and workable environment for our services.
                </p>
                <RadioGroup
                  options={["Yes", "No"]}
                  value={form.hasPets}
                  onChange={v => set("hasPets", v)}
                />
              </FormField>
            </SectionCard>

            <NavButtons onPrev={prev} onNext={next} nextLabel="Next" />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            SECTION 4 — Payment Information
        ════════════════════════════════════════════════════════════════ */}
        {section === 4 && (
          <div>
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "28px", marginBottom: 20, marginTop: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.2rem", color: GREEN, marginBottom: 12 }}>PAYMENT INFORMATION</h2>
              <p style={{ fontSize: "0.93rem", color: "#555", lineHeight: 1.7, marginBottom: 12 }}>
                It is important for us to have a form of payment on file for most of the services we offer. We will process payments for services immediately after they are rendered.
              </p>
              <p style={{ fontSize: "0.93rem", color: "#555", lineHeight: 1.7, marginBottom: 12 }}>
                For most services, we require a credit card to be kept on file. If you prefer to provide your credit card information directly to our office staff, please give us a call at{" "}
                <a href="tel:+15416178873" style={{ color: GREEN, fontWeight: 700 }}>541-617-8873</a>. Your cooperation is greatly appreciated and helps us ensure seamless service delivery.
              </p>
              <div style={{ background: "#fef9ec", border: "1px solid #f5d76e", borderRadius: 6, padding: "12px 16px", marginBottom: 12 }}>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#7a5c00", lineHeight: 1.6 }}>
                  <strong>We automatically charge after each service rendered.</strong>
                </p>
              </div>
              <p style={{ fontSize: "0.88rem", color: "#666", lineHeight: 1.6, margin: 0 }}>
                If you're ever unhappy with our service, give us a call — we're happy to find a solution. Most service issues come down to not having enough approved time on-site, so let's chat and make it right! Please note pricing will increase each year automatically 3–5% based on a cost of living increase.
              </p>
            </div>

            <SectionCard title="CREDIT CARD AUTHORIZATION FORM">
              <FormField label="Full Name On Card" required error={errors.creditCardNumber}>
                <input
                  type="text"
                  value={form.creditCardNumber}
                  onChange={e => set("creditCardNumber", e.target.value)}
                  placeholder="Name as it appears on card"
                  style={inputStyle(!!errors.creditCardNumber)}
                />
              </FormField>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16 }}>
                <FormField label="Card Number" required error={errors.creditCardNumber}>
                  <input
                    type="text"
                    value={form.creditCardNumber}
                    onChange={e => set("creditCardNumber", e.target.value.replace(/\D/g, "").slice(0, 16))}
                    placeholder="0000 0000 0000 0000"
                    maxLength={16}
                    style={inputStyle(!!errors.creditCardNumber)}
                  />
                </FormField>
                <FormField label="Expiration Date" required error={errors.creditCardExpiration}>
                  <input
                    type="text"
                    value={form.creditCardExpiration}
                    onChange={e => set("creditCardExpiration", e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    style={inputStyle(!!errors.creditCardExpiration)}
                  />
                </FormField>
                <FormField label="CVC #" required error={errors.creditCardCvv}>
                  <input
                    type="text"
                    value={form.creditCardCvv}
                    onChange={e => set("creditCardCvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="000"
                    maxLength={4}
                    style={inputStyle(!!errors.creditCardCvv)}
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
                  By signing this form, you authorize us to debit your account for the specified amount following each service rendered. This authorization covers the transaction for the service provided and also allows for any necessary debits or credits to your account in the event it becomes delinquent. This ensures seamless financial transactions and account management for the services we provide. Please note that payments made by credit card will include a <strong>3% processing fee</strong>, which reflects the cost incurred by our processor. Avoid the 3% processing fee by paying via ACH. Just provide your ACH information, and we'll keep it on file and process the payment directly.
                </p>
              </div>

              <FormField label="Authorization Signature (Type Full Name)" required error={errors.creditCardAuthSignature}>
                <input
                  type="text"
                  value={form.creditCardAuthSignature}
                  onChange={e => set("creditCardAuthSignature", e.target.value)}
                  placeholder="Type your full legal name"
                  style={inputStyle(!!errors.creditCardAuthSignature)}
                />
              </FormField>
            </SectionCard>

            <NavButtons onPrev={prev} onNext={next} nextLabel="Next" />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            SECTION 5 — Property Enhancements
        ════════════════════════════════════════════════════════════════ */}
        {section === 5 && (
          <div>
            <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "28px", marginBottom: 20, marginTop: 24 }}>
              <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.2rem", color: GREEN, marginBottom: 12 }}>PROPERTY ENHANCEMENTS</h2>
              <p style={{ fontSize: "0.93rem", color: "#555", lineHeight: 1.7, margin: 0 }}>
                With over 5,000 landscape installs and renovations under our belt over the last 20 years, we can help you enhance your property and create the living space you have always dreamed of.
              </p>
            </div>

            <SectionCard title="PROPERTY ENHANCEMENT" required>
              <p style={{ fontSize: "0.88rem", color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
                Our landscape construction crews are organized into groups of 3 and 5 members, each fully equipped with all the necessary tools to handle projects of any size. However, due to the resources and equipment involved, we are unable to undertake projects that are valued under $5,000. This threshold ensures that we can maintain the quality of our work without incurring financial losses.
              </p>
              <RadioGroup
                options={[
                  "Yes — I am interested in discussing a property enhancement project",
                  "No — Not at this time",
                ]}
                value={form.wantsPropertyEnhancement}
                onChange={v => set("wantsPropertyEnhancement", v)}
              />
              {errors.wantsPropertyEnhancement && <FieldError msg={errors.wantsPropertyEnhancement} />}
            </SectionCard>

            {submitMutation.error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 6, padding: "12px 16px", marginBottom: 16 }}>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#b91c1c" }}>
                  There was an error submitting your form. Please try again or call us at (541) 617-8873.
                </p>
              </div>
            )}

            <NavButtons
              onPrev={prev}
              onNext={handleSubmit}
              nextLabel={submitMutation.isPending ? "Submitting..." : "Submit Agreement"}
              nextDisabled={submitMutation.isPending}
              isSubmit
            />
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({ title, required, children }: { title?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "24px 28px", marginBottom: 20 }}>
      {title && (
        <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1rem", color: GREEN, marginBottom: 16, marginTop: 0, display: "flex", alignItems: "center", gap: 6 }}>
          <span dangerouslySetInnerHTML={{ __html: title }} />
          {required && <span style={{ color: RED, fontSize: "0.9rem" }}>*</span>}
        </h3>
      )}
      {children}
    </div>
  );
}

function FormField({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>
        {label}{required && <span style={{ color: RED, marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && <FieldError msg={error} />}
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return <p style={{ color: RED, fontSize: "0.8rem", marginTop: 4, margin: "4px 0 0" }}>{msg}</p>;
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "10px 12px",
    border: `1px solid ${hasError ? "#ef4444" : BORDER}`,
    borderRadius: 6,
    fontSize: "0.93rem",
    color: "#111",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
  };
}

function RadioGroup({
  options, value, onChange, other, otherValue, onOtherChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  other?: boolean;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  const isOtherSelected = value.startsWith("Other:");
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
      {other && (
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: "0.93rem", color: "#374151" }}>
          <input
            type="radio"
            checked={isOtherSelected}
            onChange={() => onChange("Other: ")}
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

function CheckboxGroup({
  options, value, onChange, single, other, otherValue, onOtherChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  single?: boolean;
  other?: boolean;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  const isOtherSelected = value.startsWith("Other:");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {options.map(opt => {
        const checked = single ? value === opt : isChecked(value, opt);
        return (
          <label key={opt} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: "0.93rem", color: "#374151", lineHeight: 1.5 }}>
            <input
              type={single ? "radio" : "checkbox"}
              checked={checked}
              onChange={() => {
                if (single) {
                  onChange(opt);
                } else {
                  onChange(toggleCheckbox(value, opt));
                }
              }}
              style={{ marginTop: 3, accentColor: GREEN, flexShrink: 0 }}
            />
            <span dangerouslySetInnerHTML={{ __html: opt }} />
          </label>
        );
      })}
      {other && (
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: "0.93rem", color: "#374151" }}>
          <input
            type={single ? "radio" : "checkbox"}
            checked={isOtherSelected}
            onChange={() => onChange("Other: ")}
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

function NavButtons({
  onPrev, onNext, nextLabel, nextDisabled, isSubmit,
}: {
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
          Back
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
          {nextLabel || "Next"}
        </button>
      )}
    </div>
  );
}
