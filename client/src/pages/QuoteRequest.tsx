/* ============================================================
   QUICK QUOTE PAGE
   Lightweight lead capture for "Get a Quote" / "Quick Quote" CTAs.
   Saves to quote_leads table and emails info@newportavelandscaping.com.
   After submission, directs user to the full Schedule Services form.
   ============================================================ */
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const SERVICE_OPTIONS = [
  "Landscape Design & Installation",
  "Lawn Maintenance",
  "Irrigation / Sprinkler Systems",
  "Sprinkler Repair",
  "Landscape Lighting",
  "Water Features",
  "Pavers & Hardscape",
  "Fire Features",
  "Xeriscape / Drought-Tolerant",
  "Aeration & Overseeding",
  "Commercial Maintenance",
  "Firewise Assessment",
  "Other / Not Sure",
];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  serviceInterest: string;
  message: string;
}

interface QuoteRequestProps {
  source?: string;
}

export default function QuoteRequest({ source = "other" }: QuoteRequestProps) {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    serviceInterest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const submitMutation = trpc.quoteLeads.submit.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "A valid email is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    submitMutation.mutate({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim() || undefined,
      serviceInterest: form.serviceInterest || undefined,
      message: form.message.trim() || undefined,
      source,
    });
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(1 0 0)" }}>
      <Helmet>
        <title>Get a Free Quote | Newport Avenue Landscaping</title>
        <meta
          name="description"
          content="Request a free landscaping quote from Newport Avenue Landscaping. Serving Bend, OR and Central Oregon. Licensed, bonded, 21+ years experience."
        />
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-28 pb-16 px-4"
        style={{ backgroundColor: "oklch(0.18 0.04 155)" }}
      >
        <div className="max-w-3xl mx-auto text-center text-white">
          <p className="text-xs font-semibold tracking-widest uppercase text-green-400 mb-3">
            Free Estimate · No Obligation
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Get Your Free Quote
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Tell us about your project and a Newport Avenue specialist will
            contact you within 1 business day.
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-12">
        {/* Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Quote Request Received!
              </h2>
              <p className="text-green-700 mb-6">
                Thank you, {form.firstName}. Our team will reach out within 1
                business day to discuss your project.
              </p>
              <p className="text-sm text-green-600 mb-8">
                Ready to move forward? Fill out our full Schedule Services form
                to provide more details and get on our calendar faster.
              </p>
              <a
                href="/schedule"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Fill Out Schedule Services Form
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="Sterling"
                    className={errors.firstName ? "border-red-400" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Smith"
                    className={errors.lastName ? "border-red-400" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className={errors.email ? "border-red-400" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(541) 555-0100"
                    className={errors.phone ? "border-red-400" : ""}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Property Address <span className="text-gray-400 font-normal">(optional)</span>
                </Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="123 Main St, Bend, OR 97701"
                />
              </div>

              <div>
                <Label htmlFor="serviceInterest" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Service Interested In
                </Label>
                <Select
                  value={form.serviceInterest}
                  onValueChange={(v) => setForm({ ...form, serviceInterest: v })}
                >
                  <SelectTrigger id="serviceInterest">
                    <SelectValue placeholder="Select a service…" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Tell Us About Your Project <span className="text-gray-400 font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your project, timeline, budget range, or any questions…"
                />
              </div>

              {submitMutation.error && (
                <p className="text-red-500 text-sm">
                  Something went wrong. Please try again or call us at (541) 617-8873.
                </p>
              )}

              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full bg-[oklch(0.45_0.15_145)] hover:bg-[oklch(0.38_0.15_145)] text-white font-semibold py-3 text-base"
              >
                {submitMutation.isPending ? "Sending…" : "Request My Free Quote →"}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                By submitting you agree to be contacted by Newport Avenue Landscaping. We never share your information.
              </p>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Contact Us Directly
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-green-700 mt-0.5 shrink-0" />
                <a href="tel:5416178873" className="text-gray-700 hover:text-green-700 font-medium">
                  (541) 617-8873
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-green-700 mt-0.5 shrink-0" />
                <a href="mailto:info@newportavelandscaping.com" className="text-gray-700 hover:text-green-700 text-sm break-all">
                  info@newportavelandscaping.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-700 mt-0.5 shrink-0" />
                <span className="text-gray-700 text-sm">
                  61535 S Hwy 97, Bend, OR 97702<br />
                  <span className="text-gray-400">Visits by appointment only</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2">Need More Detail?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Use our full Schedule Services form to provide project specifics,
              preferred dates, and service details — this gets you on our calendar faster.
            </p>
            <a
              href="/schedule"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-800"
            >
              Full Schedule Services Form <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <p className="font-medium text-gray-700">Why Newport Ave?</p>
            <p>✓ Licensed & Bonded — LCB #9153</p>
            <p>✓ 21+ years serving Central Oregon</p>
            <p>✓ Free estimates, no obligation</p>
            <p>✓ Locally owned & operated</p>
          </div>
        </aside>
      </section>

      <Footer />
    </div>
  );
}
