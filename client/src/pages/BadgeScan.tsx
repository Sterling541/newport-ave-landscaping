/**
 * /badge-scan — Public badge scan landing page
 * Mobile-first. Reads ?emp=NK from URL, greets with employee name,
 * collects lead info, submits to DB, shows thank-you state.
 * Noindexed (handled in App.tsx SEO component).
 */
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Leaf, Phone, Mail, User, ChevronRight, AlertCircle } from "lucide-react";

const LOGO_URL = "https://storage.manus.space/webdev-static/newport-ave-landscaping/logo-nav-compressed.webp";

type ServiceType = "maintenance" | "landscape_construction" | "irrigation_sprinkler" | "other";

const SERVICE_OPTIONS: { value: ServiceType; label: string; desc: string }[] = [
  { value: "maintenance", label: "Maintenance Services", desc: "Lawn care, pruning, seasonal clean-ups" },
  { value: "landscape_construction", label: "Landscape Construction", desc: "Patios, retaining walls, planting beds" },
  { value: "irrigation_sprinkler", label: "Irrigation / Sprinkler", desc: "New systems, repairs, winterization" },
  { value: "other", label: "Other / Not Sure", desc: "Tell us what you need" },
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
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) errs.phone = "Valid phone number is required";
    if (!form.serviceType) errs.serviceType = "Please select a service type";
    if (form.serviceType === "other" && !form.serviceTypeOther.trim()) errs.serviceTypeOther = "Please describe what you need";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    submitMutation.mutate({
      employeeCode: empCode || undefined,
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      serviceType: form.serviceType as ServiceType,
      serviceTypeOther: form.serviceTypeOther || undefined,
      message: form.message || undefined,
      userAgent: navigator.userAgent,
    });
  }

  const empName = employee ? `${employee.firstName} ${employee.lastName}` : null;

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0f7ee] to-white flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#2d5a27]/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#2d5a27]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#1a3a1a] mb-3">You're all set, {form.firstName}!</h1>
          <p className="text-gray-600 mb-2">
            We received your request and will reach out to you shortly.
          </p>
          {empName && (
            <p className="text-sm text-gray-500 mb-8">
              Thanks for connecting with <strong>{empName}</strong> from Newport Avenue Landscaping.
            </p>
          )}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-left mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">What happens next</h2>
            <div className="space-y-3">
              {[
                { icon: Phone, text: "We'll call or text you within 1 business day" },
                { icon: Mail, text: "Check your email for a confirmation" },
                { icon: Leaf, text: "We'll schedule a free on-site estimate" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2d5a27]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#2d5a27]" />
                  </div>
                  <p className="text-sm text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <a
            href="https://www.newportavelandscaping.com"
            className="inline-flex items-center gap-2 text-[#2d5a27] font-medium text-sm hover:underline"
          >
            Visit our website <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f7ee] to-white">
      {/* Header */}
      <div className="bg-[#1a3a1a] px-4 py-4 flex items-center justify-center">
        <img
          src={LOGO_URL}
          alt="Newport Avenue Landscaping"
          className="h-10 w-auto"
          loading="eager"
        />
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Employee greeting */}
        {empCode && (
          <div className="mb-6">
            {empLoading ? (
              <div className="h-16 bg-white/60 rounded-2xl animate-pulse" />
            ) : employee ? (
              <div className="bg-white rounded-2xl shadow-sm border border-[#2d5a27]/20 p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2d5a27] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {employee.firstName[0]}{employee.lastName[0]}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">You scanned</p>
                  <p className="font-semibold text-[#1a3a1a]">{employee.firstName} {employee.lastName}</p>
                  <p className="text-xs text-gray-500">{employee.role} · Newport Avenue Landscaping</p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  Badge code not recognized, but you can still submit your info below.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Headline */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1a3a1a] mb-2">
            Get a Free Estimate
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Fill out the form below and a Newport Avenue Landscaping team member will reach out within 1 business day.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                value={form.firstName}
                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                placeholder="Jane"
                className={`h-11 ${errors.firstName ? "border-red-400 focus-visible:ring-red-300" : ""}`}
              />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                value={form.lastName}
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                placeholder="Smith"
                className={`h-11 ${errors.lastName ? "border-red-400 focus-visible:ring-red-300" : ""}`}
              />
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="jane@example.com"
              className={`h-11 ${errors.email ? "border-red-400 focus-visible:ring-red-300" : ""}`}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="(541) 555-0100"
              className={`h-11 ${errors.phone ? "border-red-400 focus-visible:ring-red-300" : ""}`}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* Service type */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">
              What service are you interested in? <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-1 gap-2">
              {SERVICE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, serviceType: opt.value }))}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                    form.serviceType === opt.value
                      ? "border-[#2d5a27] bg-[#2d5a27]/5"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${form.serviceType === opt.value ? "text-[#2d5a27]" : "text-gray-800"}`}>
                        {opt.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 ${
                      form.serviceType === opt.value ? "border-[#2d5a27] bg-[#2d5a27]" : "border-gray-300"
                    }`}>
                      {form.serviceType === opt.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {errors.serviceType && <p className="text-xs text-red-500">{errors.serviceType}</p>}
          </div>

          {/* Other service type detail */}
          {form.serviceType === "other" && (
            <div className="space-y-1.5">
              <Label htmlFor="serviceTypeOther" className="text-sm font-medium text-gray-700">
                Please describe <span className="text-red-500">*</span>
              </Label>
              <Input
                id="serviceTypeOther"
                value={form.serviceTypeOther}
                onChange={e => setForm(f => ({ ...f, serviceTypeOther: e.target.value }))}
                placeholder="e.g. Tree removal, sod installation..."
                className={`h-11 ${errors.serviceTypeOther ? "border-red-400 focus-visible:ring-red-300" : ""}`}
              />
              {errors.serviceTypeOther && <p className="text-xs text-red-500">{errors.serviceTypeOther}</p>}
            </div>
          )}

          {/* Optional message */}
          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-sm font-medium text-gray-700">
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
            <p className="text-xs text-gray-400 text-right">{form.message.length}/500</p>
          </div>

          {/* Submit error */}
          {errors.submit && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{errors.submit}</p>
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full h-12 bg-[#2d5a27] hover:bg-[#1a3a1a] text-white font-semibold text-base rounded-xl"
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

          <p className="text-xs text-center text-gray-400 pb-4">
            By submitting, you agree to be contacted by Newport Avenue Landscaping.
            We respect your privacy and will never share your information.
          </p>
        </form>
      </div>
    </div>
  );
}
