/* ============================================================
   CONTACT PAGE — Newport Ave Landscaping
   Design: Dark charcoal + cream. Serif display headings.
   Contact form with tRPC backend submission, info, map embed, license info.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

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

const SERVICE_OPTIONS = [
  "Irrigation Installation",
  "Sprinkler Repair & Backflow",
  "Sprinkler Blowout / Winterization",
  "Spring Activation",
  "Lawn Service",
  "Aeration",
  "Snow Removal",
  "Lawn Fungus Treatment",
  "Commercial & HOA Maintenance",
  "Landscape Architecture & Design",
  "Paver Patios & Walkways",
  "Water Features",
  "Outdoor Kitchens & Living",
  "Fire Pits & Fireplaces",
  "Landscape Lighting",
  "Xeriscaping",
  "Other / General Inquiry",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submitQuote = trpc.quote.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setErrorMsg("");
    },
    onError: (err) => {
      setErrorMsg(err.message || "Something went wrong. Please try again or call us directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    submitQuote.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      service: form.service || undefined,
      message: form.message,
    });
  };

  const inputStyle = {
    backgroundColor: "oklch(1 0 0)",
    border: "1px solid oklch(0.88 0.010 85)",
    color: "oklch(0.15 0.005 0)",
    fontSize: "0.92rem",
  };

  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative flex items-end"
        style={{
          height: "clamp(220px, 28vw, 340px)", marginTop: "204px",
          backgroundColor: "oklch(0.12 0.005 0)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkPhotos16_5e801b45.jpg",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.95) 0%, oklch(0 0 0 / 0.20) 70%)" }}
        />
        <div className="container relative pb-12" style={{ paddingTop: "clamp(200px, 22vw, 280px)" }}>
          <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            Get In Touch
          </div>
          <h1
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.0 }}
          >
            Contact<br />
            <em style={{ color: "oklch(0.75 0.10 25)" }}>Newport</em>
          </h1>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* ── Form ── */}
            <div className="lg:col-span-3">
              <FadeIn>
                <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
                  <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                  Request a Free Quote
                </div>
                <h2
                  className="font-display font-light mb-8"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
                >
                  Get a Free Quote
                </h2>

                {submitted ? (
                  <div
                    className="p-8 text-center"
                    style={{ backgroundColor: "oklch(0.46 0.20 25)", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}
                  >
                    <div className="font-display font-light text-white mb-2" style={{ fontSize: "1.5rem" }}>
                      Thank You!
                    </div>
                    <div className="font-body text-white" style={{ fontWeight: 300 }}>
                      Your request has been received. We'll be in touch shortly.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="font-label block mb-2" style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.65rem" }}>
                          NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 font-body outline-none"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label className="font-label block mb-2" style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.65rem" }}>
                          PHONE
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="(541) 000-0000"
                          className="w-full px-4 py-3 font-body outline-none"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-label block mb-2" style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.65rem" }}>
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 font-body outline-none"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label className="font-label block mb-2" style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.65rem" }}>
                        SERVICE REQUESTED
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-3 font-body outline-none"
                        style={inputStyle}
                      >
                        <option value="">Select a service (optional)</option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-label block mb-2" style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.65rem" }}>
                        MESSAGE *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us a little bit about your property and your vision for it..."
                        className="w-full px-4 py-3 font-body outline-none resize-none"
                        style={inputStyle}
                      />
                    </div>

                    {errorMsg && (
                      <div className="font-body text-sm" style={{ color: "oklch(0.46 0.20 25)" }}>
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitQuote.isPending}
                      className="font-label px-10 py-4 text-white w-full transition-opacity hover:opacity-90 disabled:opacity-60"
                      style={{ backgroundColor: "oklch(0.46 0.20 25)", letterSpacing: "0.12em" }}
                    >
                      {submitQuote.isPending ? "SENDING…" : "SEND MY REQUEST"}
                    </button>
                  </form>
                )}
              </FadeIn>
            </div>

            {/* ── Contact Info ── */}
            <div className="lg:col-span-2 space-y-8">
              <FadeIn delay={0.15}>
                <div>
                  <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
                    <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                    Contact Us
                  </div>
                  <div className="space-y-5 p-7" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
                    <div>
                      <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem" }}>
                        LOCATION
                      </div>
                      <div className="font-body text-white" style={{ fontWeight: 300 }}>
                        64625 N. HWY 97<br />Bend, OR 97701
                      </div>
                      <div className="font-label mt-1" style={{ color: "oklch(0.55 0.008 0)", fontSize: "0.65rem" }}>
                        PLEASE CALL BEFORE COMING BY
                      </div>
                    </div>
                    <div style={{ height: "1px", backgroundColor: "oklch(0.25 0.005 0)" }} />
                    <div>
                      <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem" }}>
                        PHONE
                      </div>
                      <a
                        href="tel:5416178873"
                        className="font-body text-white hover:opacity-80 transition-opacity"
                        style={{ fontWeight: 300 }}
                      >
                        (541) 617-8873
                      </a>
                    </div>
                    <div style={{ height: "1px", backgroundColor: "oklch(0.25 0.005 0)" }} />
                    <div>
                      <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem" }}>
                        EMAIL
                      </div>
                      <a
                        href="mailto:info@newportavelandscaping.com"
                        className="font-body text-white hover:opacity-80 transition-opacity"
                        style={{ fontWeight: 300 }}
                      >
                        info@newportavelandscaping.com
                      </a>
                    </div>
                    <div style={{ height: "1px", backgroundColor: "oklch(0.25 0.005 0)" }} />
                    <div>
                      <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem" }}>
                        HOURS
                      </div>
                      <div className="font-body text-white" style={{ fontWeight: 300 }}>
                        Mon–Fri: 7:00 AM – 5:00 PM<br />
                        Sat–Sun: Closed
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div>
                  <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
                    <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                    License & Insurance
                  </div>
                  <div className="space-y-3 p-7" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
                    <div>
                      <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem" }}>
                        LANDSCAPE CONTRACTOR LICENSE
                      </div>
                      <div className="font-body text-white" style={{ fontWeight: 300 }}>
                        LCB #9153
                      </div>
                    </div>
                    <div style={{ height: "1px", backgroundColor: "oklch(0.25 0.005 0)" }} />
                    <div>
                      <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem" }}>
                        BACKFLOW ASSEMBLY TESTER
                      </div>
                      <div className="font-body text-white" style={{ fontWeight: 300 }}>
                        Certified & Insured
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="pb-20">
        <div className="container">
          <FadeIn>
            <div
              className="overflow-hidden"
              style={{ height: "380px", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}
            >
              <iframe
                title="Newport Avenue Landscaping Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8!2d-121.3!3d44.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s64625+N+US-97%2C+Bend%2C+OR+97701!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
