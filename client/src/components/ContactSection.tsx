/* ============================================================
   CONTACT SECTION — Brand Refresh
   Charcoal background, white form panel, brand red accents
   ============================================================ */
import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="py-24"
      style={{ backgroundColor: "oklch(0.18 0.005 0)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="font-label mb-4 flex items-center justify-center gap-3"
            style={{ color: "oklch(0.72 0.12 25)" }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ backgroundColor: "oklch(0.72 0.12 25)" }}
            />
            Get In Touch
            <span
              className="inline-block w-8 h-px"
              style={{ backgroundColor: "oklch(0.72 0.12 25)" }}
            />
          </div>
          <h2
            className="font-display font-light"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "oklch(1 0 0)",
              lineHeight: 1.1,
            }}
          >
            Start Your Outdoor
            <br />
            <em style={{ color: "oklch(0.72 0.12 25)", fontStyle: "italic" }}>
              Transformation Today
            </em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="p-12 text-center"
                style={{ backgroundColor: "oklch(1 0 0)" }}
              >
                <div
                  className="font-display text-3xl mb-4"
                  style={{ color: "oklch(0.46 0.20 25)" }}
                >
                  Thank You!
                </div>
                <p
                  className="font-body"
                  style={{ color: "oklch(0.38 0.005 0)" }}
                >
                  We've received your message and will be in touch within 1
                  business day. We look forward to transforming your outdoor
                  space!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-10"
                style={{ backgroundColor: "oklch(1 0 0)" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      className="font-label block mb-2"
                      style={{ color: "oklch(0.38 0.005 0)", fontSize: "0.65rem" }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 font-body text-sm outline-none transition-colors"
                      style={{
                        backgroundColor: "oklch(0.97 0.003 0)",
                        border: "1px solid oklch(0.90 0.003 0)",
                        color: "oklch(0.22 0.005 0)",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "oklch(0.46 0.20 25)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "oklch(0.90 0.003 0)")
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="font-label block mb-2"
                      style={{ color: "oklch(0.38 0.005 0)", fontSize: "0.65rem" }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(541) 555-0000"
                      className="w-full px-4 py-3 font-body text-sm outline-none transition-colors"
                      style={{
                        backgroundColor: "oklch(0.97 0.003 0)",
                        border: "1px solid oklch(0.90 0.003 0)",
                        color: "oklch(0.22 0.005 0)",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "oklch(0.46 0.20 25)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "oklch(0.90 0.003 0)")
                      }
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    className="font-label block mb-2"
                    style={{ color: "oklch(0.38 0.005 0)", fontSize: "0.65rem" }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 font-body text-sm outline-none transition-colors"
                    style={{
                      backgroundColor: "oklch(0.97 0.003 0)",
                      border: "1px solid oklch(0.90 0.003 0)",
                      color: "oklch(0.22 0.005 0)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "oklch(0.46 0.20 25)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "oklch(0.90 0.003 0)")
                    }
                  />
                </div>

                <div className="mb-5">
                  <label
                    className="font-label block mb-2"
                    style={{ color: "oklch(0.38 0.005 0)", fontSize: "0.65rem" }}
                  >
                    Service Needed
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 font-body text-sm outline-none transition-colors"
                    style={{
                      backgroundColor: "oklch(0.97 0.003 0)",
                      border: "1px solid oklch(0.90 0.003 0)",
                      color: formData.service ? "oklch(0.22 0.005 0)" : "oklch(0.55 0.005 0)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "oklch(0.46 0.20 25)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "oklch(0.90 0.003 0)")
                    }
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
                    <optgroup label="Commercial &amp; HOA">
                      <option value="commercial-install">Commercial Landscape Installation</option>
                      <option value="hoa-maintenance">HOA &amp; Community Maintenance</option>
                      <option value="commercial-maintenance">Commercial Property Maintenance</option>
                      <option value="government">Government / Municipal</option>
                    </optgroup>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label
                    className="font-label block mb-2"
                    style={{ color: "oklch(0.38 0.005 0)", fontSize: "0.65rem" }}
                  >
                    Tell Us About Your Project
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your vision, property size, timeline..."
                    className="w-full px-4 py-3 font-body text-sm outline-none transition-colors resize-none"
                    style={{
                      backgroundColor: "oklch(0.97 0.003 0)",
                      border: "1px solid oklch(0.90 0.003 0)",
                      color: "oklch(0.22 0.005 0)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "oklch(0.46 0.20 25)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "oklch(0.90 0.003 0)")
                    }
                  />
                </div>

                <button type="submit" className="btn-red w-full text-center">
                  Send Message
                </button>

                <p
                  className="font-body text-xs mt-4 text-center"
                  style={{ color: "oklch(0.55 0.005 0)" }}
                >
                  We typically respond within 1 business day. Ask about our
                  financing options!
                </p>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h3
                className="font-display font-light text-2xl mb-6"
                style={{ color: "oklch(1 0 0)" }}
              >
                Contact Information
              </h3>

              <div className="space-y-5">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "(541) 617-8873",
                    href: "tel:5416178873",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "info@newportavelandscaping.com",
                    href: "mailto:info@newportavelandscaping.com",
                  },
                  {
                    icon: MapPin,
                    label: "Address",
                    value: "1020 SE Paiute Way #100\nBend, OR 97702",
                    href: null,
                  },
                  {
                    icon: Clock,
                    label: "Hours",
                    value: "Visits by Appointment Only",
                    href: null,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex gap-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: "oklch(0.46 0.20 25 / 0.20)",
                          color: "oklch(0.72 0.12 25)",
                        }}
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div
                          className="font-label mb-1"
                          style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.65rem" }}
                        >
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-body text-sm transition-colors"
                            style={{ color: "oklch(0.85 0.005 0)", whiteSpace: "pre-line" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = "oklch(0.72 0.12 25)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "oklch(0.85 0.005 0)")
                            }
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span
                            className="font-body text-sm"
                            style={{ color: "oklch(0.85 0.005 0)", whiteSpace: "pre-line" }}
                          >
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* License info */}
            <div
              className="p-6"
              style={{
                backgroundColor: "oklch(0.25 0.005 0)",
                borderLeft: "3px solid oklch(0.46 0.20 25)",
              }}
            >
              <div
                className="font-label mb-3"
                style={{ color: "oklch(0.72 0.12 25)" }}
              >
                Licensed, Bonded & Insured
              </div>
              <p
                className="font-body text-xs leading-relaxed"
                style={{ color: "oklch(0.70 0.005 0)" }}
              >
                LCB #9153 — "All Phase" license with the Oregon Landscape
                Contractors Board. Serving residential, commercial, and
                government clients throughout Central Oregon.
              </p>
            </div>

            {/* Social */}
            <div>
              <div
                className="font-label mb-4"
                style={{ color: "oklch(0.72 0.12 25)" }}
              >
                Follow Us
              </div>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/newportavelandscaping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 font-label text-xs transition-colors"
                  style={{
                    border: "1px solid oklch(0.35 0.005 0)",
                    color: "oklch(0.70 0.005 0)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(0.46 0.20 25)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "oklch(1 0 0)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.46 0.20 25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.70 0.005 0)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.35 0.005 0)";
                  }}
                >
                  Facebook
                </a>
                <a
                  href="https://www.yelp.com/biz/newport-avenue-landscaping-bend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 font-label text-xs transition-colors"
                  style={{
                    border: "1px solid oklch(0.35 0.005 0)",
                    color: "oklch(0.70 0.005 0)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(0.46 0.20 25)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "oklch(1 0 0)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.46 0.20 25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.70 0.005 0)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.35 0.005 0)";
                  }}
                >
                  Yelp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
