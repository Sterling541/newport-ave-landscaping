/**
 * /badge-scan — Public badge scan landing page
 * Premium cinematic design: dark green hero with landscape background,
 * clean white card form, employee greeting.
 * Reads ?emp=NK from URL, greets with employee name,
 * collects lead info + employee name (first+last), submits to DB.
 * Noindexed — excluded from sitemap and robots.txt.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Leaf,
  Phone,
  Mail,
  ChevronRight,
  AlertCircle,
  Star,
  Shield,
  Clock,
} from "lucide-react";

const LOGO_URL = "/manus-storage/logo-transparent-stacked_ff350b79_624f848b.webp";
const HERO_BG = "/manus-storage/compressed_NewportAveLandcaping-9_97b731b0_1204d3ca_c439672c.webp";

type ServiceType = "maintenance" | "landscape_construction" | "irrigation_sprinkler" | "other";

const SERVICE_OPTIONS: { value: ServiceType; label: string; emoji: string }[] = [
  { value: "maintenance", label: "Lawn Maintenance", emoji: "🌿" },
  { value: "landscape_construction", label: "Landscape Construction", emoji: "🏡" },
  { value: "irrigation_sprinkler", label: "Irrigation / Sprinkler", emoji: "💧" },
  { value: "other", label: "Other / Not Sure", emoji: "✨" },
];

const TRUST_BADGES = [
  { icon: Star, text: "5-Star Rated" },
  { icon: Shield, text: "Licensed & Insured" },
  { icon: Clock, text: "Free Estimates" },
];

export default function BadgeScan() {
  const params = new URLSearchParams(window.location.search);
  const empCode = params.get("emp")?.toUpperCase() ?? "";

  const { data: employee, isLoading: empLoading } = trpc.badgeScan.lookupEmployee.useQuery(
    { code: empCode },
    { enabled: !!empCode, retry: false }
  );

  const [step, setStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    employeeFirstName: "",
    employeeLastName: "",
    serviceType: "" as ServiceType | "",
    serviceTypeOther: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitMutation = trpc.badgeScan.submitScan.useMutation({
    onSuccess: () => setStep("success"),
    onError: (err) => {
      setErrors({ submit: err.message || "Something went wrong. Please try again." });
    },
  });

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) errs.phone = "Valid phone required";
    if (!form.employeeFirstName.trim()) errs.employeeFirstName = "Required";
    if (!form.employeeLastName.trim()) errs.employeeLastName = "Required";
    if (!form.serviceType) errs.serviceType = "Please select a service";
    if (form.serviceType === "other" && !form.serviceTypeOther.trim()) errs.serviceTypeOther = "Please describe what you need";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // scroll to first error
      setTimeout(() => {
        const el = document.querySelector("[data-error]");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    setErrors({});
    submitMutation.mutate({
      employeeCode: empCode || undefined,
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      employeeFirstName: form.employeeFirstName,
      employeeLastName: form.employeeLastName,
      serviceType: form.serviceType as ServiceType,
      serviceTypeOther: form.serviceTypeOther || undefined,
      message: form.message || undefined,
      userAgent: navigator.userAgent,
    });
  }

  const empName = employee ? `${employee.firstName} ${employee.lastName}` : null;

  // ── Success state ────────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative"
        style={{
          background: "linear-gradient(160deg, oklch(0.14 0.04 155) 0%, oklch(0.20 0.06 145) 100%)",
        }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.55 0.15 145 / 0.25)", border: "2px solid oklch(0.55 0.15 145 / 0.5)" }}
            >
              <CheckCircle2 className="w-12 h-12" style={{ color: "oklch(0.75 0.18 145)" }} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            You're all set, {form.firstName}!
          </h1>
          <p className="text-white/70 mb-2 text-base">
            We received your request and will reach out within 1 business day.
          </p>
          {empName && (
            <p className="text-sm text-white/50 mb-8">
              Thanks for connecting with <strong className="text-white/70">{empName}</strong> from Newport Avenue Landscaping.
            </p>
          )}
          <div
            className="rounded-2xl p-6 text-left mb-8"
            style={{ background: "oklch(1 0 0 / 0.08)", border: "1px solid oklch(1 0 0 / 0.12)" }}
          >
            <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">What happens next</h2>
            <div className="space-y-4">
              {[
                { icon: Phone, text: "We'll call or text you within 1 business day" },
                { icon: Mail, text: "Check your email for a confirmation" },
                { icon: Leaf, text: "We'll schedule a free on-site estimate" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "oklch(0.55 0.15 145 / 0.2)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "oklch(0.75 0.18 145)" }} />
                  </div>
                  <p className="text-sm text-white/80">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <a
            href="https://www.newportavelandscaping.com"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ color: "oklch(0.75 0.18 145)" }}
          >
            Visit our website <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // ── Form state ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Cinematic Hero ─────────────────────────────────────────────────── */}
      <div className="relative flex flex-col items-center justify-end pb-10 pt-16 px-4 min-h-[52vh]">
        {/* Background photo */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, oklch(0.12 0.04 155 / 0.55) 0%, oklch(0.10 0.04 155 / 0.85) 60%, oklch(0.10 0.04 155) 100%)",
          }}
        />

        {/* Logo */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2">
          <img
            src={LOGO_URL}
            alt="Newport Avenue Landscaping"
            className="h-14 w-auto"
            loading="eager"
            width={160}
            height={56}
          />
        </div>

        {/* Hero text */}
        <div className="relative z-10 text-center max-w-sm">
          {empLoading && empCode ? (
            <div className="h-8 w-48 mx-auto rounded-lg bg-white/10 animate-pulse mb-3" />
          ) : empName ? (
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              style={{ background: "oklch(0.55 0.15 145 / 0.25)", border: "1px solid oklch(0.55 0.15 145 / 0.5)", color: "oklch(0.85 0.12 145)" }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ background: "oklch(0.45 0.15 145)" }}
              >
                {employee?.firstName?.[0]}{employee?.lastName?.[0]}
              </div>
              You scanned {empName}
            </div>
          ) : null}

          <h1 className="text-3xl font-bold text-white leading-tight mb-2">
            Get Your Free<br />
            <span style={{ color: "oklch(0.80 0.18 145)" }}>Landscape Estimate</span>
          </h1>
          <p className="text-white/65 text-sm leading-relaxed">
            Central Oregon's premier landscaping company.<br />
            We'll reach out within 1 business day.
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-5">
            {TRUST_BADGES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-white/50 text-xs">
                <Icon className="w-3.5 h-3.5" style={{ color: "oklch(0.75 0.18 145)" }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form Card ──────────────────────────────────────────────────────── */}
      <div
        className="flex-1 px-4 pb-12"
        style={{ background: "oklch(0.10 0.04 155)" }}
      >
        <div
          className="max-w-lg mx-auto -mt-1 rounded-2xl overflow-hidden"
          style={{ background: "oklch(0.98 0.005 120)", boxShadow: "0 24px 60px oklch(0 0 0 / 0.5)" }}
        >
          <div className="px-6 pt-6 pb-2">
            <h2 className="text-base font-semibold text-gray-800">Your Information</h2>
            <p className="text-xs text-gray-500 mt-0.5">All fields marked <span className="text-red-500">*</span> are required</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-5 pt-4">

            {/* ── Your Name ── */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Name</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1 block">
                    First <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    placeholder="Jane"
                    className={`h-11 ${errors.firstName ? "border-red-400" : ""}`}
                    data-error={errors.firstName ? true : undefined}
                  />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1 block">
                    Last <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    placeholder="Smith"
                    className={`h-11 ${errors.lastName ? "border-red-400" : ""}`}
                  />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>
            </div>

            {/* ── Contact ── */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Contact</p>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="jane@example.com"
                    className={`h-11 ${errors.email ? "border-red-400" : ""}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="(541) 555-0100"
                    className={`h-11 ${errors.phone ? "border-red-400" : ""}`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* ── Employee Name ── */}
            <div
              className="rounded-xl p-4"
              style={{ background: "oklch(0.96 0.01 145)", border: "1px solid oklch(0.85 0.06 145)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "oklch(0.40 0.10 145)" }}>
                Newport Employee Who Helped You
              </p>
              <p className="text-xs mb-3" style={{ color: "oklch(0.50 0.08 145)" }}>
                Please enter the first and last name of the Newport team member you spoke with.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="employeeFirstName" className="text-sm font-medium text-gray-700 mb-1 block">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="employeeFirstName"
                    value={form.employeeFirstName}
                    onChange={e => setForm(f => ({ ...f, employeeFirstName: e.target.value }))}
                    placeholder="Nathan"
                    className={`h-11 bg-white ${errors.employeeFirstName ? "border-red-400" : ""}`}
                    data-error={errors.employeeFirstName ? true : undefined}
                  />
                  {errors.employeeFirstName && <p className="text-xs text-red-500 mt-1">{errors.employeeFirstName}</p>}
                </div>
                <div>
                  <Label htmlFor="employeeLastName" className="text-sm font-medium text-gray-700 mb-1 block">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="employeeLastName"
                    value={form.employeeLastName}
                    onChange={e => setForm(f => ({ ...f, employeeLastName: e.target.value }))}
                    placeholder="Kooy"
                    className={`h-11 bg-white ${errors.employeeLastName ? "border-red-400" : ""}`}
                  />
                  {errors.employeeLastName && <p className="text-xs text-red-500 mt-1">{errors.employeeLastName}</p>}
                </div>
              </div>
            </div>

            {/* ── Service Type ── */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Service Interested In <span className="text-red-500">*</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, serviceType: opt.value }))}
                    className={`flex items-center gap-2.5 px-3 py-3 rounded-xl border-2 text-left transition-all text-sm font-medium ${
                      form.serviceType === opt.value
                        ? "border-[oklch(0.45_0.15_145)] bg-[oklch(0.96_0.01_145)] text-[oklch(0.30_0.10_145)]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-base leading-none">{opt.emoji}</span>
                    <span className="leading-tight">{opt.label}</span>
                  </button>
                ))}
              </div>
              {errors.serviceType && <p className="text-xs text-red-500 mt-1">{errors.serviceType}</p>}
            </div>

            {/* Other service detail */}
            {form.serviceType === "other" && (
              <div>
                <Label htmlFor="serviceTypeOther" className="text-sm font-medium text-gray-700 mb-1 block">
                  Please describe <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="serviceTypeOther"
                  value={form.serviceTypeOther}
                  onChange={e => setForm(f => ({ ...f, serviceTypeOther: e.target.value }))}
                  placeholder="e.g. Tree removal, sod installation..."
                  className={`h-11 ${errors.serviceTypeOther ? "border-red-400" : ""}`}
                />
                {errors.serviceTypeOther && <p className="text-xs text-red-500 mt-1">{errors.serviceTypeOther}</p>}
              </div>
            )}

            {/* Optional message */}
            <div>
              <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1 block">
                Additional details <span className="text-gray-400 font-normal">(optional)</span>
              </Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Tell us about your property, timeline, or any specific needs..."
                className="resize-none h-24"
                maxLength={500}
              />
              <p className="text-xs text-gray-400 text-right mt-1">{form.message.length}/500</p>
            </div>

            {/* Submit error */}
            {errors.submit && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errors.submit}</p>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full h-13 text-white font-semibold text-base rounded-xl"
              style={{ background: "oklch(0.35 0.12 145)", height: "52px" }}
            >
              {submitMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Request Free Estimate
                  <ChevronRight className="w-5 h-5" />
                </span>
              )}
            </Button>

            <p className="text-xs text-center text-gray-400 pb-2">
              By submitting, you agree to be contacted by Newport Avenue Landscaping.
              We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
