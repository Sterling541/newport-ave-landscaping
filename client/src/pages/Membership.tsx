/* ============================================================
   MEMBERSHIP PAGE — Newport Priority Irrigation Membership
   Hero: Badge + sprinkler background (matches original banner)
   Body: Cream bg, red card, charcoal text, dot pattern
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Check, Droplets, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

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
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const membershipFeatures = [
  "Sprinkler system spring activation",
  "Mid-season inspection & adjustment",
  "Fall winterization / blowout",
  "Priority scheduling — no waiting",
  "Dedicated irrigation technician",
  "Annual system health report",
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
        <span className="font-body" style={{ fontSize: "1rem", color: "oklch(0.22 0.005 0)", lineHeight: 1.4, fontWeight: 400 }}>
          {q}
        </span>
        <ChevronDown
          size={16}
          style={{
            color: "oklch(0.46 0.20 25)",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        />
      </div>
      {open && (
        <div className="pb-5 font-body text-sm" style={{ color: "oklch(0.38 0.005 0)", lineHeight: 1.75, fontWeight: 300 }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function Membership() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <SEO
        title="Priority Irrigation Membership | Newport Avenue Landscaping Bend"
        description="Newport Avenue's Priority Irrigation Membership — guaranteed spring activation, fall blowout, mid-season checks & 1-year warranty on irrigation components. Bend, OR. LCB #9153."
        canonical="/membership"
      />
      <Navbar />
      {/* ── Hero — badge + sprinkler banner ── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "clamp(220px, 22vw, 320px)", marginTop: "204px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/manus-storage/hero-general-landscaping_ccf2305a.jpg",
            backgroundSize: "cover",
            backgroundPosition: "center 60%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, oklch(0.08 0.005 0 / 0.55) 0%, oklch(0.08 0.005 0 / 0.72) 100%)",
          }}
        />
        <div className="container relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 py-10 md:py-14">
          <div className="flex-shrink-0 flex items-center justify-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/membership-badge-v2_afdcad1b.png"
              alt="Newport Avenue Priority Irrigation Membership Badge"
              style={{
                width: "clamp(140px, 16vw, 220px)",
                height: "auto",
                filter: "drop-shadow(0 8px 24px oklch(0 0 0 / 0.60))",
              }}
            />
          </div>
          <div className="text-center md:text-left">
            <h1
              className="font-display font-black text-white uppercase leading-none mb-3"
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
                letterSpacing: "0.02em",
                textShadow: "0 2px 12px oklch(0 0 0 / 0.60)",
              }}
            >
              Newport Priority<br />
              Irrigation<br />
              Membership:
            </h1>
            <p
              className="font-body font-semibold mb-6"
              style={{
                color: "oklch(0.92 0.04 25)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)",
                textShadow: "0 1px 6px oklch(0 0 0 / 0.50)",
              }}
            >
              Never Worry About Your Sprinklers Again
            </p>
            <button
              onClick={() => {
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="btn-red"
              style={{ fontSize: "0.8rem", letterSpacing: "0.12em" }}
            >
              SIGN UP TODAY
            </button>
          </div>
        </div>
      </section>

      {/* ── Main Section — exact MembershipSection design ── */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
        {/* Subtle dot pattern */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(oklch(0.22 0.005 0) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="container relative z-10">
          <div
            ref={ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {/* Content */}
            <div>
              <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
                <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                Membership Program
              </div>

              <h2
                className="font-display font-light mb-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "oklch(0.22 0.005 0)", lineHeight: 1.1 }}
              >
                Newport Priority
                <br />
                <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
                  Irrigation Membership
                </em>
              </h2>

              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "oklch(0.38 0.005 0)" }}>
                Never worry about your sprinklers again. Our Priority Irrigation
                Membership gives you complete peace of mind — from spring
                activation to fall winterization, we handle everything.
              </p>

              <ul className="space-y-3 mb-10">
                {membershipFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                    >
                      <Check size={12} strokeWidth={2.5} style={{ color: "oklch(1 0 0)" }} />
                    </div>
                    <span className="font-body text-sm" style={{ color: "oklch(0.38 0.005 0)" }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-outline-dark"
              >
                Sign Up Today
              </button>
            </div>

            {/* Pricing Card — brand red, exact same as MembershipSection */}
            <div
              className="relative"
              style={{
                backgroundColor: "oklch(0.46 0.20 25)",
                padding: "3rem",
                borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
              }}
            >
              {/* Decorative corner */}
              <div
                className="absolute top-0 right-0 w-24 h-24"
                style={{ background: "linear-gradient(225deg, oklch(0.38 0.20 25) 0%, transparent 60%)" }}
              />

              <div
                className="w-16 h-16 flex items-center justify-center mb-6"
                style={{
                  backgroundColor: "oklch(1 0 0 / 0.15)",
                  color: "oklch(1 0 0)",
                  borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
                }}
              >
                <Droplets size={28} strokeWidth={1.5} />
              </div>

              <div className="font-label mb-2" style={{ color: "oklch(1 0 0 / 0.70)" }}>
                Everything Plan
              </div>

              <div className="font-display font-semibold mb-1" style={{ fontSize: "3rem", color: "oklch(1 0 0)", lineHeight: 1 }}>
                $388
              </div>
              <div className="font-body text-sm mb-6" style={{ color: "oklch(1 0 0 / 0.65)" }}>
                / Month <span className="text-xs">(based on min. 1 man hour/week)</span>
              </div>

              <div className="h-px mb-6" style={{ backgroundColor: "oklch(1 0 0 / 0.20)" }} />

              <div className="space-y-3 mb-8">
                {[
                  "Weekly lawn maintenance",
                  "Spring & fall clean-ups",
                  "Annual aeration",
                  "Sprinkler winterization",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check size={14} style={{ color: "oklch(1 0 0 / 0.80)", flexShrink: 0 }} />
                    <span className="font-body text-sm" style={{ color: "oklch(1 0 0 / 0.85)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-outline-white w-full text-center"
                style={{ display: "block" }}
              >
                Get Started
              </button>

              <p className="font-body text-xs mt-4 text-center" style={{ color: "oklch(1 0 0 / 0.55)" }}>
                Ask about our financing options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's Included detail ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
                <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                Newport Priority Program
              </div>
              <h2
                className="font-display font-light text-white mb-5"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
              >
                Never Worry About<br />
                <em style={{ color: "oklch(0.75 0.10 25)" }}>Your Sprinklers Again</em>
              </h2>
              <p className="font-body mb-6" style={{ color: "oklch(0.70 0.008 0)", lineHeight: 1.8, fontWeight: 300 }}>
                Our Newport <a href="https://newportavelandscaping.com/irrigation-membership" target="_blank" rel="noopener noreferrer" className="text-green-700 underline hover:text-green-900">Priority Irrigation Membership</a> covers your spring activation, fall blowout, and annual backflow test — everything you need to keep your irrigation system protected year-round and your warranty intact.
              </p>
              <button
                onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-red"
              >
                SIGN UP TODAY
              </button>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-4">
                {[
                  { icon: "💧", title: "Spring Activation", desc: "Full system start-up, zone check, head adjustment, and controller programming." },
                  { icon: "❄️", title: "Fall Blowout", desc: "Compressed-air winterization of every zone to prevent freeze damage." },
                  { icon: "✅", title: "Annual Backflow Test", desc: "Certified backflow preventer testing to meet city requirements." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5 p-5" style={{ backgroundColor: "oklch(0.20 0.005 0)", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}>
                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="font-display font-light text-white mb-1" style={{ fontSize: "1.05rem" }}>
                        {item.title}
                      </div>
                      <div className="font-body" style={{ color: "oklch(0.65 0.008 0)", fontSize: "0.88rem", fontWeight: 300 }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
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
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "oklch(0.22 0.005 0)", lineHeight: 1.1 }}
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

      {/* ── CTA ── */}
      <section className="py-20 text-center" style={{ backgroundColor: "oklch(0.46 0.20 25)" }}>
        <div className="container">
          <FadeIn>
            <h2
              className="font-display font-light text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Ready to Join?
            </h2>
            <p className="font-body mb-8 mx-auto" style={{ color: "oklch(0.92 0.05 25)", fontWeight: 300, maxWidth: "480px" }}>
              Sign up today and we'll take care of everything — spring activation, fall blowout, and your annual backflow test, automatically, every year.
            </p>
            <button
              onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="btn-outline-white"
            >
              SIGN UP TODAY
            </button>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
