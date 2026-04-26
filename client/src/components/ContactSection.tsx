/* ============================================================
   CONTACT SECTION — Two-Step Form
   Step 1: Name + Phone (low friction entry)
   Step 2: Service + Message (detail)
   With trust badges and urgency copy near the CTA
   ============================================================ */
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Shield, Award, CheckCircle, ChevronRight } from "lucide-react";

type Step = 1 | 2;

export default function ContactSection() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    backgroundColor: "oklch(0.97 0.003 0)",
    border: "1px solid oklch(0.90 0.003 0)",
    color: "oklch(0.22 0.005 0)",
  };

  const labelStyle = {
    color: "oklch(0.32 0.005 0)",
    fontSize: "0.65rem",
  };

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "oklch(0.46 0.20 25)";
  };
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "oklch(0.90 0.003 0)";
  };

  return (
    <section
      id="contact"
      className="py-24"
      style={{ backgroundColor: "oklch(0.965 0.008 85)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="font-label mb-4 flex items-center justify-center gap-3"
            style={{ color: "oklch(0.46 0.20 25)" }}
          >
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            Get In Touch
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
          </div>
          <h2
            className="font-display font-light"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "oklch(0.18 0.008 0)",
              lineHeight: 1.1,
            }}
          >
            Start Your Outdoor
            <br />
            <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
              Transformation Today
            </em>
          </h2>
          {/* Urgency copy */}
          <p
            className="font-body mt-4 text-sm font-semibold"
            style={{ color: "oklch(0.46 0.20 25)" }}
          >
            ⚡ Currently booking spring projects — schedule fills fast. Secure your spot now.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="p-12 text-center"
                style={{ backgroundColor: "oklch(1 0 0)" }}
              >
                <CheckCircle className="mx-auto mb-4 w-12 h-12" style={{ color: "oklch(0.46 0.20 25)" }} />
                <div className="font-display text-2xl mb-4" style={{ color: "oklch(0.46 0.20 25)" }}>
                  You're on the list!
                </div>
                <p className="font-body" style={{ color: "oklch(0.28 0.005 0)" }}>
                  We've received your request and will call you within 1 business day to discuss your project.
                  We look forward to transforming your outdoor space!
                </p>
              </div>
            ) : (
              <div style={{ backgroundColor: "oklch(1 0 0)" }}>
                {/* Step indicator */}
                <div className="flex items-center px-8 pt-8 pb-4 gap-3">
                  <div
                    className="flex items-center gap-2 text-xs font-label"
                    style={{ color: step === 1 ? "oklch(0.46 0.20 25)" : "oklch(0.55 0.005 0)" }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: step === 1 ? "oklch(0.46 0.20 25)" : "oklch(0.55 0.005 0)",
                        color: "white",
                      }}
                    >
                      {step === 2 ? "✓" : "1"}
                    </span>
                    Your Info
                  </div>
                  <ChevronRight className="w-4 h-4" style={{ color: "oklch(0.75 0.003 0)" }} />
                  <div
                    className="flex items-center gap-2 text-xs font-label"
                    style={{ color: step === 2 ? "oklch(0.46 0.20 25)" : "oklch(0.75 0.003 0)" }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: step === 2 ? "oklch(0.46 0.20 25)" : "oklch(0.88 0.003 0)",
                        color: step === 2 ? "white" : "oklch(0.55 0.005 0)",
                      }}
                    >
                      2
                    </span>
                    Project Details
                  </div>
                </div>

                {/* Step 1 */}
                {step === 1 && (
                  <form onSubmit={handleStep1} className="px-8 pb-8 pt-2">
                    <p className="font-body text-sm mb-6" style={{ color: "oklch(0.45 0.005 0)" }}>
                      Just two quick fields — we'll call you to discuss the details.
                    </p>
                    <div className="mb-5">
                      <label htmlFor="contact-name" className="font-label block mb-2" style={labelStyle}>
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 font-body text-sm outline-none transition-colors"
                        style={inputStyle}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </div>
                    <div className="mb-8">
                      <label htmlFor="contact-phone" className="font-label block mb-2" style={labelStyle}>
                        Best Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(541) 555-0000"
                        className="w-full px-4 py-3 font-body text-sm outline-none transition-colors"
                        style={inputStyle}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </div>

                    <button type="submit" className="btn-red w-full text-center">
                      Continue — Tell Us About Your Project →
                    </button>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6" style={{ borderTop: "1px solid oklch(0.93 0.003 0)" }}>
                      <div className="flex items-center gap-1.5 text-xs font-label" style={{ color: "oklch(0.45 0.005 0)" }}>
                        <Shield className="w-3.5 h-3.5" style={{ color: "oklch(0.46 0.20 25)" }} />
                        Licensed & Bonded
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-label" style={{ color: "oklch(0.45 0.005 0)" }}>
                        <Award className="w-3.5 h-3.5" style={{ color: "oklch(0.46 0.20 25)" }} />
                        LCB #9153
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-label" style={{ color: "oklch(0.45 0.005 0)" }}>
                        <CheckCircle className="w-3.5 h-3.5" style={{ color: "oklch(0.46 0.20 25)" }} />
                        21+ Years in Central Oregon
                      </div>
                    </div>
                  </form>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <form onSubmit={handleStep2} className="px-8 pb-8 pt-2">
                    <p className="font-body text-sm mb-6" style={{ color: "oklch(0.45 0.005 0)" }}>
                      Almost done, {formData.name.split(" ")[0] || "there"}! Tell us a bit about what you're looking for.
                    </p>

                    <div className="mb-5">
                      <label htmlFor="contact-email" className="font-label block mb-2" style={labelStyle}>
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 font-body text-sm outline-none transition-colors"
                        style={inputStyle}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="contact-service" className="font-label block mb-2" style={labelStyle}>
                        Service Needed
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 font-body text-sm outline-none transition-colors"
                        style={{
                          ...inputStyle,
                          color: formData.service ? "oklch(0.22 0.005 0)" : "oklch(0.55 0.005 0)",
                        }}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      >
                        <option value="">Select a service...</option>
                        <optgroup label="Residential">
                          <option value="design-build">Custom Design & Build</option>
                          <option value="irrigation">Sprinklers & Irrigation</option>
                          <option value="pavers">Patio Pavers & Walkways</option>
                          <option value="maintenance">Residential Maintenance</option>
                          <option value="water-features">Water Features</option>
                          <option value="outdoor-living">Outdoor Living Areas</option>
                          <option value="snow-removal">Snow Removal</option>
                          <option value="membership">Priority Irrigation Membership</option>
                        </optgroup>
                        <optgroup label="Commercial & HOA">
                          <option value="commercial-install">Commercial Landscape Installation</option>
                          <option value="hoa-maintenance">HOA & Community Maintenance</option>
                          <option value="commercial-maintenance">Commercial Property Maintenance</option>
                          <option value="government">Government / Municipal</option>
                        </optgroup>
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </div>

                    <div className="mb-8">
                      <label htmlFor="contact-message" className="font-label block mb-2" style={labelStyle}>
                        Tell Us About Your Project
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe your vision, property size, timeline..."
                        className="w-full px-4 py-3 font-body text-sm outline-none transition-colors resize-none"
                        style={inputStyle}
                        onFocus={focusBorder}
                        onBlur={blurBorder}
                      />
                    </div>

                    <button type="submit" className="btn-red w-full text-center">
                      Send My Request — We'll Call You Soon
                    </button>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6" style={{ borderTop: "1px solid oklch(0.93 0.003 0)" }}>
                      <div className="flex items-center gap-1.5 text-xs font-label" style={{ color: "oklch(0.45 0.005 0)" }}>
                        <Shield className="w-3.5 h-3.5" style={{ color: "oklch(0.46 0.20 25)" }} />
                        Licensed & Bonded
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-label" style={{ color: "oklch(0.45 0.005 0)" }}>
                        <Award className="w-3.5 h-3.5" style={{ color: "oklch(0.46 0.20 25)" }} />
                        LCB #9153
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-label" style={{ color: "oklch(0.45 0.005 0)" }}>
                        <CheckCircle className="w-3.5 h-3.5" style={{ color: "oklch(0.46 0.20 25)" }} />
                        21+ Years in Central Oregon
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full text-center mt-3 text-xs font-label"
                      style={{ color: "oklch(0.60 0.005 0)" }}
                    >
                      ← Back
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3
                className="font-display font-light mb-6"
                style={{ fontSize: "1.5rem", color: "oklch(0.18 0.008 0)" }}
              >
                Other Ways to Reach Us
              </h3>
              <div className="space-y-5">
                <a
                  href="tel:+15416178873"
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                  >
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-label text-xs mb-1" style={{ color: "oklch(0.55 0.005 0)" }}>
                      CALL OR TEXT
                    </div>
                    <div
                      className="font-body text-base group-hover:underline"
                      style={{ color: "oklch(0.22 0.005 0)" }}
                    >
                      (541) 617-8873
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:info@newportavelandscaping.com"
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                  >
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-label text-xs mb-1" style={{ color: "oklch(0.55 0.005 0)" }}>
                      EMAIL
                    </div>
                    <div
                      className="font-body text-sm group-hover:underline"
                      style={{ color: "oklch(0.22 0.005 0)" }}
                    >
                      info@newportavelandscaping.com
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                  >
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-label text-xs mb-1" style={{ color: "oklch(0.55 0.005 0)" }}>
                      OFFICE
                    </div>
                    <div className="font-body text-sm" style={{ color: "oklch(0.22 0.005 0)" }}>
                      61535 S Hwy 97
                      <br />
                      Bend, OR 97702
                      <br />
                      <span className="text-xs" style={{ color: "oklch(0.55 0.005 0)" }}>
                        Visits by appointment only
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                  >
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-label text-xs mb-1" style={{ color: "oklch(0.55 0.005 0)" }}>
                      HOURS
                    </div>
                    <div className="font-body text-sm" style={{ color: "oklch(0.22 0.005 0)" }}>
                      Mon – Fri: 7:00 AM – 5:00 PM
                      <br />
                      <span className="text-xs" style={{ color: "oklch(0.55 0.005 0)" }}>
                        Emergency irrigation service available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust block */}
            <div
              className="p-6"
              style={{ backgroundColor: "oklch(0.18 0.008 0)" }}
            >
              <div className="font-label text-xs mb-4" style={{ color: "oklch(0.46 0.20 25)" }}>
                WHY NEWPORT AVENUE
              </div>
              <div className="space-y-3">
                {[
                  "Licensed Landscape Contractor — LCB #9153",
                  "Fully licensed & bonded in Oregon",
                  "21+ years serving Central Oregon",
                  "400+ completed residential projects",
                  "Same dedicated crew every visit",
                  "Free estimates on all projects",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.46 0.20 25)" }} />
                    <span className="font-body text-sm" style={{ color: "oklch(0.88 0.003 0)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
