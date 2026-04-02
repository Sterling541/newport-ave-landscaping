/* ============================================================
   CONTACT PAGE — Newport Ave Landscaping
   Design: Dark charcoal + cream. Serif display headings.
   Contact form, info, map embed, license info.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

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

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a static site, open mailto as fallback
    const subject = encodeURIComponent("Landscaping Quote Request");
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:info@newportavelandscaping.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>

      {/* ── Hero ── */}
      <section
        className="relative flex items-end"
        style={{
          height: "clamp(220px, 28vw, 340px)",
          backgroundColor: "oklch(0.12 0.005 0)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&auto=format&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.95) 0%, oklch(0 0 0 / 0.20) 70%)" }}
        />
        <div className="container relative pb-12 pt-24">
          <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            Get In Touch
          </div>
          <h1
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.0 }}
          >
            Contact<br />
            <em style={{ color: "oklch(0.75 0.10 25)" }}>Newport Ave</em>
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
                  Email Us
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
                    style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                  >
                    <div className="font-display font-light text-white mb-2" style={{ fontSize: "1.5rem" }}>
                      Thank You!
                    </div>
                    <div className="font-body text-white" style={{ fontWeight: 300 }}>
                      Your message has been sent. We'll be in touch shortly.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          className="font-label block mb-2"
                          style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.65rem" }}
                        >
                          NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 font-body outline-none"
                          style={{
                            backgroundColor: "oklch(1 0 0)",
                            border: "1px solid oklch(0.88 0.010 85)",
                            color: "oklch(0.15 0.005 0)",
                            fontSize: "0.92rem",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          className="font-label block mb-2"
                          style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.65rem" }}
                        >
                          PHONE
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="(541) 000-0000"
                          className="w-full px-4 py-3 font-body outline-none"
                          style={{
                            backgroundColor: "oklch(1 0 0)",
                            border: "1px solid oklch(0.88 0.010 85)",
                            color: "oklch(0.15 0.005 0)",
                            fontSize: "0.92rem",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="font-label block mb-2"
                        style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.65rem" }}
                      >
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 font-body outline-none"
                        style={{
                          backgroundColor: "oklch(1 0 0)",
                          border: "1px solid oklch(0.88 0.010 85)",
                          color: "oklch(0.15 0.005 0)",
                          fontSize: "0.92rem",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="font-label block mb-2"
                        style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.65rem" }}
                      >
                        MESSAGE
                      </label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us a little bit about your property and your vision for it..."
                        className="w-full px-4 py-3 font-body outline-none resize-none"
                        style={{
                          backgroundColor: "oklch(1 0 0)",
                          border: "1px solid oklch(0.88 0.010 85)",
                          color: "oklch(0.15 0.005 0)",
                          fontSize: "0.92rem",
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="font-label px-10 py-4 text-white w-full transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "oklch(0.46 0.20 25)", letterSpacing: "0.12em" }}
                    >
                      SEND MY EMAIL
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
                        1020 SE Paiute Way #100<br />Bend, OR 97702
                      </div>
                      <div
                        className="font-label mt-1"
                        style={{ color: "oklch(0.55 0.008 0)", fontSize: "0.65rem" }}
                      >
                        PLEASE CALL BEFORE COMING BY
                      </div>
                    </div>
                    <div
                      style={{ height: "1px", backgroundColor: "oklch(0.25 0.005 0)" }}
                    />
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
                    <div
                      style={{ height: "1px", backgroundColor: "oklch(0.25 0.005 0)" }}
                    />
                    <div>
                      <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem" }}>
                        EMAIL
                      </div>
                      <a
                        href="mailto:info@newportavelandscaping.com"
                        className="font-body text-white hover:opacity-80 transition-opacity"
                        style={{ fontWeight: 300, fontSize: "0.9rem" }}
                      >
                        info@newportavelandscaping.com
                      </a>
                    </div>
                    <div
                      style={{ height: "1px", backgroundColor: "oklch(0.25 0.005 0)" }}
                    />
                    <div>
                      <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem" }}>
                        SCHEDULED VISITS
                      </div>
                      <div className="font-body" style={{ color: "oklch(0.65 0.008 0)", fontWeight: 300, fontSize: "0.88rem" }}>
                        Visits by appointment only. Fill out the form and get started.
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Map */}
              <FadeIn delay={0.2}>
                <div>
                  <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
                    <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                    Find Us
                  </div>
                  <div style={{ height: "220px", overflow: "hidden" }}>
                    <iframe
                      title="Newport Ave Landscaping Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.0!2d-121.2978!3d44.0582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54b8c0b0b0b0b0b0%3A0x0!2s1020+SE+Paiute+Way+%23100%2C+Bend%2C+OR+97702!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                      width="100%"
                      height="220"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </FadeIn>

              {/* License */}
              <FadeIn delay={0.25}>
                <div className="p-6" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
                  <div className="font-label mb-3" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem" }}>
                    LICENSE INFORMATION
                  </div>
                  <div className="font-body mb-1" style={{ color: "oklch(0.38 0.008 0)", fontWeight: 500, fontSize: "0.88rem" }}>
                    Licensed, Bonded, and Insured
                  </div>
                  <div className="font-body mb-3" style={{ color: "oklch(0.50 0.008 0)", fontWeight: 300, fontSize: "0.82rem" }}>
                    LCB # 9153 — "All Phase" license with the Oregon Landscape Contractors Board
                  </div>
                  <div className="font-body" style={{ color: "oklch(0.50 0.008 0)", fontWeight: 300, fontSize: "0.80rem" }}>
                    Oregon Landscape Contractors Board<br />
                    2111 Front St NE Ste 2-101<br />
                    Salem, Oregon 97301<br />
                    (503) 967-6291
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
