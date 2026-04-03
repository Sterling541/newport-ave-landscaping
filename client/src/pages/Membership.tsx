/* ============================================================
   MEMBERSHIP PAGE — Newport Priority Irrigation Membership
   Design: Dark charcoal + cream + brand red. Badge, benefits, FAQ, CTA.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Droplets, Shield, Clock, Star, ChevronDown } from "lucide-react";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const BENEFITS = [
  {
    icon: "💧",
    title: "Spring Activation",
    desc: "Full system start-up every spring — zone-by-zone inspection, head adjustment, pressure check, and controller programming. We make sure everything is dialed in before the season starts.",
  },
  {
    icon: "❄️",
    title: "Fall Winterization / Blowout",
    desc: "Compressed-air blowout of every zone before the first freeze. Prevents cracked pipes, broken heads, and costly spring repairs. Scheduled automatically — no need to call.",
  },
  {
    icon: "✅",
    title: "Annual Backflow Test",
    desc: "Certified backflow preventer testing to meet City of Bend requirements. We file the paperwork and send you the certificate. Required to maintain your irrigation warranty.",
  },
  {
    icon: "📅",
    title: "Priority Scheduling",
    desc: "Members go to the front of the line. No waiting weeks for an appointment — your seasonal services are pre-scheduled and you get priority access for any mid-season issues.",
  },
];

const WHY_ITEMS = [
  { icon: Shield, title: "Protects Your Investment", desc: "A properly winterized and activated system lasts years longer. Membership pays for itself by preventing a single repair." },
  { icon: Clock, title: "Zero Effort on Your Part", desc: "We reach out to schedule each service. You don't have to remember dates, make calls, or worry about the season changing." },
  { icon: Star, title: "Certified Technicians", desc: "All irrigation work is performed by our licensed, backflow-certified technicians — the same team that installs systems across Central Oregon." },
];

const FAQS = [
  { q: "When does my membership start?", a: "Your membership begins the day you sign up. If you join mid-season, we'll schedule whichever services remain for the year and prorate accordingly." },
  { q: "Do I need to call to schedule each service?", a: "No — that's the whole point. We reach out to you each spring and fall to schedule your activation and blowout. You'll never have to chase us down." },
  { q: "What if I have a mid-season issue with my sprinklers?", a: "Members receive priority scheduling for any service call. You'll be seen faster than non-members, and our team knows your system from the annual visits." },
  { q: "Is the backflow test included?", a: "Yes. The annual certified backflow preventer test is included in your membership. We file the required documentation with the city on your behalf." },
  { q: "Can I cancel my membership?", a: "Memberships are annual. If you need to cancel, contact us and we'll work with you. Services already performed for the year are non-refundable." },
  { q: "Do you service my neighborhood?", a: "We serve all of Bend and the surrounding Central Oregon area including Redmond, Sisters, Sunriver, and La Pine. Contact us if you're unsure about your address." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "oklch(0.88 0.010 85)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <span className="font-display font-light" style={{ fontSize: "1.05rem", color: "oklch(0.18 0.005 0)", lineHeight: 1.3 }}>
          {q}
        </span>
        <ChevronDown
          size={18}
          style={{
            color: "oklch(0.46 0.20 25)",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        />
      </div>
      {open && (
        <div className="pb-5 font-body" style={{ color: "oklch(0.42 0.008 0)", fontWeight: 300, lineHeight: 1.75, fontSize: "0.95rem" }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function Membership() {
  const [, navigate] = useLocation();

  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative flex items-end"
        style={{ height: "clamp(260px, 32vw, 400px)", backgroundColor: "oklch(0.12 0.005 0)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            opacity: 0.25,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.97) 0%, oklch(0 0 0 / 0.15) 70%)" }}
        />
        <div className="container relative pb-14">
          <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            Newport Priority Program
          </div>
          <h1
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.0 }}
          >
            Priority Irrigation<br />
            <em style={{ color: "oklch(0.75 0.10 25)" }}>Membership</em>
          </h1>
        </div>
      </section>

      {/* ── Intro + Badge ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Badge */}
            <FadeIn className="flex justify-center">
              <div className="relative" style={{ width: "320px", height: "320px" }}>
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle, oklch(0.46 0.20 25 / 0.12) 0%, transparent 70%)",
                  }}
                />
                {/* Badge circle */}
                <div
                  className="absolute inset-8 rounded-full flex flex-col items-center justify-center text-center"
                  style={{
                    backgroundColor: "oklch(0.46 0.20 25)",
                    boxShadow: "0 0 0 6px oklch(0.46 0.20 25 / 0.20), 0 20px 60px oklch(0.46 0.20 25 / 0.30)",
                  }}
                >
                  <Droplets size={36} strokeWidth={1.5} style={{ color: "oklch(1 0 0 / 0.75)", marginBottom: "8px" }} />
                  <div className="font-label text-white" style={{ fontSize: "0.58rem", letterSpacing: "0.18em", opacity: 0.80 }}>
                    NEWPORT
                  </div>
                  <div className="font-display font-semibold text-white" style={{ fontSize: "1.6rem", lineHeight: 1.05 }}>
                    Priority
                  </div>
                  <div className="font-display font-light text-white" style={{ fontSize: "1.1rem", fontStyle: "italic", color: "oklch(1 0 0 / 0.85)" }}>
                    Irrigation
                  </div>
                  <div className="font-label text-white mt-1" style={{ fontSize: "0.55rem", letterSpacing: "0.16em", opacity: 0.70 }}>
                    MEMBERSHIP
                  </div>
                  <div
                    className="mt-4 px-5 py-1 font-label text-white"
                    style={{ backgroundColor: "oklch(1 0 0 / 0.15)", fontSize: "0.58rem", letterSpacing: "0.10em", borderRadius: "20px" }}
                  >
                    $349 / YEAR
                  </div>
                </div>
                {/* Decorative tick marks */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <div
                    key={deg}
                    className="absolute"
                    style={{
                      width: "2px",
                      height: "10px",
                      backgroundColor: "oklch(0.46 0.20 25 / 0.40)",
                      top: "50%",
                      left: "50%",
                      transformOrigin: "0 -140px",
                      transform: `rotate(${deg}deg) translateX(-1px)`,
                    }}
                  />
                ))}
              </div>
            </FadeIn>

            {/* Copy */}
            <FadeIn delay={0.15}>
              <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
                <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                Complete Peace of Mind
              </div>
              <h2
                className="font-display font-light mb-5"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
              >
                Never Worry About<br />
                <em style={{ color: "oklch(0.46 0.20 25)" }}>Your Sprinklers Again</em>
              </h2>
              <p className="font-body mb-6" style={{ color: "oklch(0.40 0.008 0)", fontWeight: 300, lineHeight: 1.8 }}>
                Our Newport Priority Irrigation Membership is the simplest way to protect your irrigation system year-round. We handle your spring activation, fall winterization, and annual backflow testing — automatically, on schedule, with no reminders needed on your end.
              </p>
              <p className="font-body mb-8" style={{ color: "oklch(0.40 0.008 0)", fontWeight: 300, lineHeight: 1.8 }}>
                Members also get priority scheduling for any mid-season service calls — so when something comes up, you're never waiting weeks for a technician.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="btn-red"
                >
                  Sign Up Today — $349/yr
                </button>
                <a href="tel:5416178873" className="btn-outline-dark">
                  Call (541) 617-8873
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
        <div className="container">
          <FadeIn className="text-center mb-14">
            <div className="font-label mb-3" style={{ color: "oklch(0.46 0.20 25)" }}>
              What's Included
            </div>
            <h2
              className="font-display font-light"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
            >
              Everything Your System Needs,<br />
              <em style={{ color: "oklch(0.46 0.20 25)" }}>All Year Long</em>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENEFITS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div
                  className="flex gap-6 p-7"
                  style={{ backgroundColor: "oklch(1 0 0)", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}
                >
                  <div className="text-3xl flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <div className="font-display font-light mb-2" style={{ fontSize: "1.15rem", color: "oklch(0.18 0.005 0)" }}>
                      {item.title}
                    </div>
                    <div className="font-body" style={{ color: "oklch(0.42 0.008 0)", fontWeight: 300, lineHeight: 1.75, fontSize: "0.92rem" }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Members Love It ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
        <div className="container">
          <FadeIn className="text-center mb-14">
            <div className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)" }}>
              Why It Works
            </div>
            <h2
              className="font-display font-light text-white"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
            >
              Built for Central Oregon<br />
              <em style={{ color: "oklch(0.75 0.10 25)" }}>Homeowners</em>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_ITEMS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div
                  className="p-8 text-center"
                  style={{ backgroundColor: "oklch(0.20 0.005 0)", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: "oklch(0.46 0.20 25 / 0.15)", borderRadius: "50%" }}
                  >
                    <item.icon size={24} style={{ color: "oklch(0.72 0.12 25)" }} />
                  </div>
                  <div className="font-display font-light text-white mb-3" style={{ fontSize: "1.1rem" }}>
                    {item.title}
                  </div>
                  <div className="font-body" style={{ color: "oklch(0.62 0.008 0)", fontWeight: 300, lineHeight: 1.75, fontSize: "0.90rem" }}>
                    {item.desc}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
                <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                Simple, Transparent Pricing
              </div>
              <h2
                className="font-display font-light mb-5"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
              >
                One Annual Fee.<br />
                <em style={{ color: "oklch(0.46 0.20 25)" }}>Everything Covered.</em>
              </h2>
              <p className="font-body mb-6" style={{ color: "oklch(0.40 0.008 0)", fontWeight: 300, lineHeight: 1.8 }}>
                No surprise charges. No per-visit fees. Your $349 annual membership covers all three seasonal services — spring activation, fall blowout, and annual backflow test — for the full year.
              </p>
              <p className="font-body mb-8" style={{ color: "oklch(0.40 0.008 0)", fontWeight: 300, lineHeight: 1.8 }}>
                Compare that to paying separately: activation alone runs $95–$150, a blowout $85–$125, and a backflow test $75–$100. Membership saves you money and the hassle of scheduling three separate visits.
              </p>
              <div className="space-y-3">
                {["Spring activation included", "Fall winterization included", "Annual backflow test included", "Priority scheduling all season", "No hidden fees or per-visit charges"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: "oklch(0.46 0.20 25)", flexShrink: 0 }} />
                    <span className="font-body text-sm" style={{ color: "oklch(0.38 0.008 0)", fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div
                className="p-10 text-center"
                style={{ backgroundColor: "oklch(0.46 0.20 25)", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}
              >
                <div className="font-label mb-2" style={{ color: "oklch(1 0 0 / 0.70)", fontSize: "0.62rem" }}>
                  ANNUAL MEMBERSHIP
                </div>
                <div
                  className="font-display font-semibold text-white"
                  style={{ fontSize: "4.5rem", lineHeight: 1 }}
                >
                  $349
                </div>
                <div className="font-body mb-6" style={{ color: "oklch(1 0 0 / 0.65)", fontWeight: 300 }}>
                  per year
                </div>
                <div className="h-px mb-6" style={{ backgroundColor: "oklch(1 0 0 / 0.20)" }} />
                <div className="space-y-3 mb-8 text-left">
                  {["Spring system activation", "Fall compressed-air blowout", "Annual backflow preventer test", "Priority scheduling — all season"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle size={14} style={{ color: "oklch(1 0 0 / 0.75)", flexShrink: 0 }} />
                      <span className="font-body text-sm" style={{ color: "oklch(1 0 0 / 0.85)", fontWeight: 300 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="btn-outline-white w-full text-center"
                  style={{ display: "block" }}
                >
                  Sign Up Today
                </button>
                <p className="font-body text-xs mt-4" style={{ color: "oklch(1 0 0 / 0.50)" }}>
                  Questions? Call (541) 617-8873
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
        <div className="container">
          <FadeIn className="mb-12">
            <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
              <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              Common Questions
            </div>
            <h2
              className="font-display font-light"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
            >
              Frequently Asked<br />
              <em style={{ color: "oklch(0.46 0.20 25)" }}>Questions</em>
            </h2>
          </FadeIn>
          <div className="max-w-3xl">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 text-center" style={{ backgroundColor: "oklch(0.46 0.20 25)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-4" style={{ color: "oklch(1 0 0 / 0.70)", fontSize: "0.62rem" }}>
              READY TO JOIN?
            </div>
            <h2
              className="font-display font-light text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Protect Your System.<br />Skip the Stress.
            </h2>
            <p className="font-body mb-8 mx-auto" style={{ color: "oklch(1 0 0 / 0.75)", fontWeight: 300, maxWidth: "480px", lineHeight: 1.75 }}>
              Sign up today and we'll reach out to schedule your first service. Memberships are limited — we keep our list small so every member gets the attention they deserve.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="font-label text-white px-10 py-4 transition-opacity hover:opacity-90"
                style={{ backgroundColor: "oklch(0.15 0.005 0)", letterSpacing: "0.10em" }}
              >
                SIGN UP TODAY
              </button>
              <a
                href="tel:5416178873"
                className="font-label px-10 py-4 transition-opacity hover:opacity-90"
                style={{ border: "1px solid oklch(1 0 0 / 0.40)", color: "oklch(1 0 0)", letterSpacing: "0.10em" }}
              >
                CALL (541) 617-8873
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
