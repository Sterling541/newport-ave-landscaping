/* ============================================================
   SCHEDULE SERVICES PAGE — Newport Avenue Landscaping
   Warm, on-brand multi-step form. All 9 service branches,
   all fields and dropdown options are identical to the
   original Google Form. Only the visual design has changed.
   ============================================================ */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2, ChevronLeft, ChevronRight, Loader2, AlertCircle,
  Leaf, Phone, MapPin, Calendar, CreditCard, Shield, Wrench, Droplets,
  Lightbulb, TreePine, Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Logo ──────────────────────────────────────────────────────────────────────
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/logo-transparent-stacked_ff350b79.png";

// ── Types ─────────────────────────────────────────────────────────────────────
type FormData = {
  email: string;
  usedBefore: string;
  firstName: string;
  lastName: string;
  phone: string;
  siteAddress: string;
  billingAddress: string;
  howHeard: string[];
  serviceType: string;
  warrantyDetails: string;
  salesConsultant: string;
  projectManager: string;
  maintenanceTypes: string[];
  maintenanceNotes: string;
  irrigationTypes: string[];
  irrigationNotes: string;
  winterizationDate: string;
  lightingTypes: string[];
  lightingNotes: string;
  waterFeatureTypes: string[];
  waterFeatureNotes: string;
  waterFeatureRepairDesc: string;
  creditCardNumber: string;
  creditCardExpiration: string;
  creditCardCvv: string;
  creditCardAuthSignature: string;
  concreteServiceType: string;
  concreteElements: string[];
  concreteDimensions: string;
  concreteHasStairs: string;
  concreteAttachedToBuilding: string;
  hasExistingDesign: string;
  needsHoaApproval: string;
  landscapeElements: string[];
  budget: string;
  budgetOther: string;
  designConsultationAccepted: string;
  idealCompletionDate: string;
  flexibleScheduling: boolean;
  isRentalProperty: string;
  isPropertyOwner: string;
  hasPets: string;
  comments: string;
};

const INITIAL_FORM: FormData = {
  email: "", usedBefore: "", firstName: "", lastName: "", phone: "",
  siteAddress: "", billingAddress: "", howHeard: [],
  serviceType: "",
  warrantyDetails: "", salesConsultant: "", projectManager: "",
  maintenanceTypes: [], maintenanceNotes: "",
  irrigationTypes: [], irrigationNotes: "", winterizationDate: "",
  lightingTypes: [], lightingNotes: "",
  waterFeatureTypes: [], waterFeatureNotes: "", waterFeatureRepairDesc: "",
  creditCardNumber: "", creditCardExpiration: "", creditCardCvv: "", creditCardAuthSignature: "",
  concreteServiceType: "", concreteElements: [], concreteDimensions: "",
  concreteHasStairs: "", concreteAttachedToBuilding: "",
  hasExistingDesign: "", needsHoaApproval: "", landscapeElements: [],
  budget: "", budgetOther: "", designConsultationAccepted: "", idealCompletionDate: "",
  flexibleScheduling: false, isRentalProperty: "", isPropertyOwner: "", hasPets: "",
  comments: "",
};

// ── Constants ─────────────────────────────────────────────────────────────────
const HOW_HEARD_OPTIONS = [
  "Google Search", "A Friend Or Family Referred Me.", "I have seen your trucks",
  "Current Customer", "TV", "Email Marketing", "Postcard", "Instagram",
  "Facebook", "Houzz.com", "Home Advisor", "Nextdoor.com", "Other",
];
const SERVICE_OPTIONS = [
  "> New Landscape Installation",
  "> Landscape Design",
  "Maintenance: Weekly or One-Time Landscape Clean Ups",
  "> Aeration, fertilization and top dressing",
  "> Irrigation Services: Including backflow test, repairs",
  "> Lighting addition or repair",
  "> Water Feature service (Including clean-outs, maintenance repairs)",
  "> Warranty",
  "Sprinkler Winterization",
];
const MAINTENANCE_TYPES = [
  "Weekly Lawn Mowing", "One-Time Clean Up", "Spring Clean Up", "Fall Clean Up",
  "Hedge / Shrub Trimming", "Edging & Blowing", "Weed Control",
  "Mulch / Rock Installation", "Leaf Removal", "Gutter Cleaning", "Other",
];
const IRRIGATION_TYPES = [
  "Backflow Test", "System Repair", "System Installation", "System Winterization",
  "Spring Start-Up", "Drip System Installation", "Drip System Repair", "Other",
];
const LIGHTING_TYPES = [
  "New Lighting Installation", "Lighting Repair", "Lighting Upgrade",
  "Timer / Controller Replacement", "Other",
];
const WATER_FEATURE_TYPES = [
  "Clean-Out: Pump out dirty water until majority of debris removed",
  "One-Time Chemical Treatment: Apply Sludge Away, Algaecide and beneficial bacteria",
  "Monthly Chemical Treatments",
  "Water Feature Winterization: Advise leaving pump in pond if more than 1 foot deep",
  "Water Feature Repair: Please provide a description below",
  "Other",
];
const LANDSCAPE_ELEMENTS = [
  "Irrigation", "Plantings", "Sod", "Paver Patio", "Fire Pit",
  "Outdoor Kitchen / BBQ", "Pathways", "Pergola", "Low Voltage Lighting",
  "Water Feature", "Fencing",
];
const BUDGET_OPTIONS = [
  "$10,000–$20,000", "$20,000–$35,000", "$35,000–$60,000",
  "$60,000–$100,000", "$100,000+",
];

// Services that require credit card info on file
const CC_SERVICES = new Set([
  "Maintenance: Weekly or One-Time Landscape Clean Ups",
  "> Irrigation Services: Including backflow test, repairs",
  "> Lighting addition or repair",
  "> Water Feature service (Including clean-outs, maintenance repairs)",
  "Sprinkler Winterization",
]);

// Step icons for the progress indicator
const STEP_ICONS: Record<string, React.ReactNode> = {
  contact: <Phone className="w-3.5 h-3.5" />,
  service: <Leaf className="w-3.5 h-3.5" />,
  warranty: <Shield className="w-3.5 h-3.5" />,
  maintenance: <Wrench className="w-3.5 h-3.5" />,
  irrigation: <Droplets className="w-3.5 h-3.5" />,
  lighting: <Lightbulb className="w-3.5 h-3.5" />,
  waterfeature: <Droplets className="w-3.5 h-3.5" />,
  creditcard: <CreditCard className="w-3.5 h-3.5" />,
  design: <TreePine className="w-3.5 h-3.5" />,
  scheduling: <Calendar className="w-3.5 h-3.5" />,
  final: <Star className="w-3.5 h-3.5" />,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function toggleItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
}

// ── Sub-components ────────────────────────────────────────────────────────────
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <Label className="text-sm font-semibold text-stone-700 mb-1 block">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </Label>
  );
}

function CheckboxGroup({
  options, value, onChange, columns = 2,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  columns?: number;
}) {
  return (
    <div className={`grid gap-2.5 ${columns === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
      {options.map(opt => (
        <label key={opt} className="flex items-start gap-3 cursor-pointer group p-2 rounded-lg hover:bg-stone-50 transition-colors">
          <Checkbox
            checked={value.includes(opt)}
            onCheckedChange={() => onChange(toggleItem(value, opt))}
            className="mt-0.5 border-stone-400 data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700"
          />
          <span className="text-sm text-stone-600 group-hover:text-stone-800 leading-snug">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function SectionHeader({ title, description, icon }: { title: string; description?: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 mb-6 pb-4 border-b border-stone-100">
      {icon && (
        <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-green-700 shrink-0 mt-0.5">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-lg font-bold text-stone-900">{title}</h3>
        {description && <p className="text-sm text-stone-500 mt-1 leading-relaxed">{description}</p>}
      </div>
    </div>
  );
}

function SelectField({
  label, value, onChange, options, placeholder, required, error,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder?: string; required?: boolean; error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <FieldLabel required={required}>{label}</FieldLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`bg-white border-stone-200 focus:border-green-600 focus:ring-green-600/20 ${error ? "border-red-400" : ""}`}>
          <SelectValue placeholder={placeholder ?? "Choose…"} />
        </SelectTrigger>
        <SelectContent>
          {options.map(o => (
            <SelectItem key={o} value={o}>{o}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function StyledInput({
  value, onChange, placeholder, type = "text", maxLength, error, className = "",
}: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  type?: string; maxLength?: number; error?: string; className?: string;
}) {
  return (
    <div>
      <Input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`border-stone-200 focus:border-green-600 focus:ring-green-600/20 bg-white ${error ? "border-red-400" : ""} ${className}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// ── Step Progress Bar ─────────────────────────────────────────────────────────
function StepProgress({ step, total, stepNames }: { step: number; total: number; stepNames: string[] }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-1.5 mb-3">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < step ? "bg-green-700" : i === step ? "bg-green-500" : "bg-stone-200"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-green-700">
          {STEP_ICONS[stepNames[step]]}
          <span className="text-sm font-semibold capitalize">
            {stepNames[step] === "creditcard" ? "Payment Info" :
             stepNames[step] === "waterfeature" ? "Water Feature" :
             stepNames[step].charAt(0).toUpperCase() + stepNames[step].slice(1)}
          </span>
        </div>
        <span className="text-xs text-stone-400 font-medium">Step {step + 1} of {total}</span>
      </div>
    </div>
  );
}

// ── Info Box ──────────────────────────────────────────────────────────────────
function InfoBox({ children, variant = "green" }: { children: React.ReactNode; variant?: "green" | "amber" | "blue" }) {
  const styles = {
    green: "bg-green-50 border-green-200 text-green-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    blue: "bg-blue-50 border-blue-200 text-blue-900",
  };
  return (
    <div className={`border rounded-xl p-4 text-sm ${styles[variant]}`}>
      {children}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ScheduleServices() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.submissions.create.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => { const n = { ...e }; delete n[key]; return n; });
  };

  // Determine which service-specific step to show
  const svc = form.serviceType;
  const isWarranty = svc === "> Warranty";
  const isMaintenance = svc === "Maintenance: Weekly or One-Time Landscape Clean Ups";
  const isIrrigation = svc === "> Irrigation Services: Including backflow test, repairs";
  const isLighting = svc === "> Lighting addition or repair";
  const isWaterFeature = svc === "> Water Feature service (Including clean-outs, maintenance repairs)";
  const isDesign = svc === "> Landscape Design" || svc === "> New Landscape Installation";
  const isAeration = svc === "> Aeration, fertilization and top dressing";
  const needsCC = CC_SERVICES.has(svc);

  // Build dynamic step list
  const steps = ["contact", "service"];
  if (isWarranty) steps.push("warranty");
  if (isMaintenance) steps.push("maintenance");
  if (isIrrigation) steps.push("irrigation");
  if (isLighting) steps.push("lighting");
  if (isWaterFeature) steps.push("waterfeature");
  if (needsCC) steps.push("creditcard");
  if (isDesign) steps.push("design");
  steps.push("scheduling");
  steps.push("final");

  const currentStepName = steps[step];
  const totalSteps = steps.length;

  // ── Validation ──────────────────────────────────────────────────────────────
  function validateStep(): boolean {
    const e: Record<string, string> = {};
    if (currentStepName === "contact") {
      if (!form.email) e.email = "Email is required";
      if (!form.firstName) e.firstName = "First name is required";
      if (!form.lastName) e.lastName = "Last name is required";
      if (!form.phone) e.phone = "Phone number is required";
      if (!form.siteAddress) e.siteAddress = "Site address is required";
    }
    if (currentStepName === "service") {
      if (!form.serviceType) e.serviceType = "Please choose a service";
    }
    if (currentStepName === "warranty") {
      if (!form.warrantyDetails) e.warrantyDetails = "Please describe your warranty issue";
      if (!form.salesConsultant) e.salesConsultant = "Sales consultant name is required";
      if (!form.projectManager) e.projectManager = "Project manager name is required";
    }
    if (currentStepName === "creditcard") {
      if (!form.creditCardNumber) e.creditCardNumber = "Credit card number is required";
      if (!form.creditCardExpiration) e.creditCardExpiration = "Expiration date is required";
      if (!form.creditCardCvv) e.creditCardCvv = "Security code is required";
      if (!form.creditCardAuthSignature) e.creditCardAuthSignature = "Authorization signature is required";
    }
    if (currentStepName === "design") {
      if (!form.budget) e.budget = "Please select a budget range";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validateStep()) return;
    setStep(s => Math.min(s + 1, totalSteps - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep(s => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    if (!validateStep()) return;
    submitMutation.mutate({
      email: form.email,
      usedBefore: form.usedBefore || undefined,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      siteAddress: form.siteAddress,
      billingAddress: form.billingAddress || undefined,
      howHeard: form.howHeard.join(", ") || undefined,
      serviceType: form.serviceType,
      warrantyDetails: form.warrantyDetails || undefined,
      salesConsultant: form.salesConsultant || undefined,
      projectManager: form.projectManager || undefined,
      maintenanceTypes: form.maintenanceTypes.join(", ") || undefined,
      maintenanceNotes: form.maintenanceNotes || undefined,
      irrigationTypes: form.irrigationTypes.join(", ") || undefined,
      irrigationNotes: form.irrigationNotes || undefined,
      winterizationDate: form.winterizationDate || undefined,
      lightingTypes: form.lightingTypes.join(", ") || undefined,
      lightingNotes: form.lightingNotes || undefined,
      waterFeatureTypes: form.waterFeatureTypes.join(", ") || undefined,
      waterFeatureNotes: form.waterFeatureNotes || undefined,
      waterFeatureRepairDesc: form.waterFeatureRepairDesc || undefined,
      creditCardNumber: form.creditCardNumber || undefined,
      creditCardExpiration: form.creditCardExpiration || undefined,
      creditCardCvv: form.creditCardCvv || undefined,
      creditCardAuthSignature: form.creditCardAuthSignature || undefined,
      concreteServiceType: form.concreteServiceType || undefined,
      concreteElements: form.concreteElements.join(", ") || undefined,
      concreteDimensions: form.concreteDimensions || undefined,
      concreteHasStairs: form.concreteHasStairs || undefined,
      concreteAttachedToBuilding: form.concreteAttachedToBuilding || undefined,
      hasExistingDesign: form.hasExistingDesign || undefined,
      needsHoaApproval: form.needsHoaApproval || undefined,
      landscapeElements: form.landscapeElements.join(", ") || undefined,
      budget: form.budget || undefined,
      budgetOther: form.budgetOther || undefined,
      designConsultationAccepted: form.designConsultationAccepted || undefined,
      idealCompletionDate: form.idealCompletionDate || undefined,
      flexibleScheduling: form.flexibleScheduling,
      isRentalProperty: form.isRentalProperty || undefined,
      isPropertyOwner: form.isPropertyOwner || undefined,
      hasPets: form.hasPets || undefined,
      comments: form.comments || undefined,
    });
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
        <Navbar />
        {/* Top padding clears the fixed Navbar (44px top bar + ~160px main nav) */}
        <div className="pt-[204px] pb-24 px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-700" />
            </div>
            <h1 className="text-3xl font-bold text-stone-900 mb-3">Request Received!</h1>
            <p className="text-stone-600 mb-2 text-lg">
              Thank you, <strong>{form.firstName}</strong>!
            </p>
            <p className="text-stone-500 mb-2">
              We've received your service request and will be in touch shortly.
            </p>
            <p className="text-stone-400 text-sm mb-10">
              A confirmation has been sent to <strong>{form.email}</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => window.location.href = "/"}
                className="bg-green-700 hover:bg-green-800 text-white px-8"
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = "tel:5416178873"}
                className="border-stone-300 text-stone-700"
              >
                <Phone className="w-4 h-4 mr-2" />
                (541) 617-8873
              </Button>
            </div>
            {/* Trust row */}
            <div className="flex flex-wrap justify-center gap-4 mt-12 text-xs text-stone-400">
              <span>✓ Licensed & Bonded · LCB #9153</span>
              <span>✓ Serving Central Oregon since 2003</span>
              <span>✓ 400+ Properties Maintained</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Form layout ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.005 80)" }}>
      <Navbar />

      {/* ── Hero header — clears fixed Navbar (44px top bar + 160px main nav = 204px) ── */}
      <div
        className="relative overflow-hidden"
        style={{
          paddingTop: "204px",
          background: "linear-gradient(135deg, oklch(0.25 0.08 145) 0%, oklch(0.32 0.10 150) 60%, oklch(0.28 0.07 160) 100%)",
        }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-2xl mx-auto px-4 py-10 text-center">
          <img
            src={LOGO_URL}
            alt="Newport Avenue Landscaping"
            className="h-16 mx-auto mb-5 opacity-95"
          />
          <p className="text-green-300 text-xs font-semibold uppercase tracking-widest mb-2">
            Newport Avenue Landscaping · LCB #9153
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
            Transform Your Outdoors
          </h1>
          <p className="text-green-200 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Join us for landscaping excellence — quick and easy, completed in just 4 minutes on average.
          </p>
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {["Licensed & Bonded", "Since 2003", "400+ Properties"].map(b => (
              <span key={b} className="bg-white/10 text-green-100 text-xs px-3 py-1 rounded-full border border-white/20">
                ✓ {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Licensing disclaimer ── */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-3 items-start">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Licensing Disclaimer (LCB #9153):</strong> Newport Ave Landscaping is not licensed to
            perform electrical or plumbing work. This includes outlets for pumps, irrigation timers, water
            features, or any connections to potable water systems. Services requiring a licensed plumber or
            electrician must be coordinated separately.
          </p>
        </div>
      </div>

      {/* ── Form card ── */}
      <div className="max-w-2xl mx-auto px-4 py-10 pb-16">
        <div
          className="rounded-2xl shadow-lg border border-stone-200/80 overflow-hidden"
          style={{ backgroundColor: "oklch(1 0 0)" }}
        >
          {/* Card top accent bar */}
          <div className="h-1 bg-gradient-to-r from-green-700 via-green-500 to-green-700" />

          <div className="p-6 sm:p-8">
            <StepProgress step={step} total={totalSteps} stepNames={steps} />

            {/* ── Step: Contact Info ─────────────────────────────────────────── */}
            {currentStepName === "contact" && (
              <div className="space-y-5">
                <SectionHeader
                  title="Client Contact Info"
                  description="Tell us about yourself so we can reach you."
                  icon={<Phone className="w-4 h-4" />}
                />
                <div className="space-y-1.5">
                  <FieldLabel required>Email Address</FieldLabel>
                  <StyledInput
                    type="email"
                    value={form.email}
                    onChange={v => set("email", v)}
                    placeholder="you@example.com"
                    error={errors.email}
                  />
                </div>
                <SelectField
                  label="Have you used Newport Avenue Landscaping in the past?"
                  value={form.usedBefore}
                  onChange={v => set("usedBefore", v)}
                  options={["Yes", "No"]}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <FieldLabel required>First Name</FieldLabel>
                    <StyledInput value={form.firstName} onChange={v => set("firstName", v)} error={errors.firstName} />
                  </div>
                  <div className="space-y-1.5">
                    <FieldLabel required>Last Name</FieldLabel>
                    <StyledInput value={form.lastName} onChange={v => set("lastName", v)} error={errors.lastName} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel required>Best Phone Number</FieldLabel>
                  <StyledInput
                    type="tel"
                    value={form.phone}
                    onChange={v => set("phone", v)}
                    placeholder="(541) 000-0000"
                    error={errors.phone}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel required>Site Address (Full Address)</FieldLabel>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input
                      value={form.siteAddress}
                      onChange={e => set("siteAddress", e.target.value)}
                      placeholder="123 Main St, Bend, OR 97701"
                      className={`pl-9 border-stone-200 focus:border-green-600 bg-white ${errors.siteAddress ? "border-red-400" : ""}`}
                    />
                  </div>
                  {errors.siteAddress && <p className="text-xs text-red-500">{errors.siteAddress}</p>}
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Billing Address (if different)</FieldLabel>
                  <Textarea
                    value={form.billingAddress}
                    onChange={e => set("billingAddress", e.target.value)}
                    rows={2}
                    className="border-stone-200 focus:border-green-600 bg-white resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel>How did you hear about Newport Ave Landscaping?</FieldLabel>
                  <CheckboxGroup
                    options={HOW_HEARD_OPTIONS}
                    value={form.howHeard}
                    onChange={v => set("howHeard", v)}
                  />
                </div>
              </div>
            )}

            {/* ── Step: Service Type ─────────────────────────────────────────── */}
            {currentStepName === "service" && (
              <div className="space-y-5">
                <SectionHeader
                  title="Service Type"
                  description="Choose the service you'd like to request."
                  icon={<Leaf className="w-4 h-4" />}
                />
                <div className="space-y-1.5">
                  <FieldLabel required>Choose Your Desired Service</FieldLabel>
                  <Select value={form.serviceType} onValueChange={v => set("serviceType", v)}>
                    <SelectTrigger className={`bg-white border-stone-200 focus:border-green-600 ${errors.serviceType ? "border-red-400" : ""}`}>
                      <SelectValue placeholder="Choose…" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.serviceType && <p className="text-xs text-red-500">{errors.serviceType}</p>}
                </div>
                {isAeration && (
                  <InfoBox variant="green">
                    <p className="font-semibold mb-2">Aeration Pricing</p>
                    <ul className="space-y-1 text-green-800">
                      <li>• First hour: <strong>$205</strong></li>
                      <li>• Each additional man-hour: <strong>$95</strong></li>
                    </ul>
                  </InfoBox>
                )}
              </div>
            )}

            {/* ── Step: Warranty ─────────────────────────────────────────────── */}
            {currentStepName === "warranty" && (
              <div className="space-y-5">
                <SectionHeader
                  title="Warranty Request"
                  description="Please describe your warranty issue in detail so we can prepare to help."
                  icon={<Shield className="w-4 h-4" />}
                />
                <div className="space-y-1.5">
                  <FieldLabel required>Warranty Details</FieldLabel>
                  <p className="text-xs text-stone-500 mb-1">Provide a comprehensive description of your issue so we have an understanding of how we can help.</p>
                  <Textarea
                    value={form.warrantyDetails}
                    onChange={e => set("warrantyDetails", e.target.value)}
                    rows={5}
                    className={`border-stone-200 focus:border-green-600 bg-white ${errors.warrantyDetails ? "border-red-400" : ""}`}
                  />
                  {errors.warrantyDetails && <p className="text-xs text-red-500">{errors.warrantyDetails}</p>}
                </div>
                <div className="space-y-1.5">
                  <FieldLabel required>Sales Consultant</FieldLabel>
                  <StyledInput
                    value={form.salesConsultant}
                    onChange={v => set("salesConsultant", v)}
                    placeholder="Name of your sales consultant"
                    error={errors.salesConsultant}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel required>Project Manager</FieldLabel>
                  <StyledInput
                    value={form.projectManager}
                    onChange={v => set("projectManager", v)}
                    placeholder="Name of your project manager"
                    error={errors.projectManager}
                  />
                </div>
              </div>
            )}

            {/* ── Step: Maintenance ──────────────────────────────────────────── */}
            {currentStepName === "maintenance" && (
              <div className="space-y-5">
                <SectionHeader
                  title="Maintenance Services"
                  description="Select all maintenance services you're interested in."
                  icon={<Wrench className="w-4 h-4" />}
                />
                <div className="space-y-2">
                  <FieldLabel>Type of Maintenance Needed</FieldLabel>
                  <CheckboxGroup
                    options={MAINTENANCE_TYPES}
                    value={form.maintenanceTypes}
                    onChange={v => set("maintenanceTypes", v)}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Additional Notes</FieldLabel>
                  <Textarea
                    value={form.maintenanceNotes}
                    onChange={e => set("maintenanceNotes", e.target.value)}
                    rows={4}
                    placeholder="Any specific instructions or details…"
                    className="border-stone-200 focus:border-green-600 bg-white"
                  />
                </div>
              </div>
            )}

            {/* ── Step: Irrigation ───────────────────────────────────────────── */}
            {currentStepName === "irrigation" && (
              <div className="space-y-5">
                <SectionHeader
                  title="Irrigation Services"
                  description="Select all irrigation services you need."
                  icon={<Droplets className="w-4 h-4" />}
                />
                <div className="space-y-2">
                  <FieldLabel>Type of Irrigation Service</FieldLabel>
                  <CheckboxGroup
                    options={IRRIGATION_TYPES}
                    value={form.irrigationTypes}
                    onChange={v => set("irrigationTypes", v)}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Winterization Date (if applicable)</FieldLabel>
                  <Input
                    type="date"
                    value={form.winterizationDate}
                    onChange={e => set("winterizationDate", e.target.value)}
                    className="border-stone-200 focus:border-green-600 bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Additional Notes</FieldLabel>
                  <Textarea
                    value={form.irrigationNotes}
                    onChange={e => set("irrigationNotes", e.target.value)}
                    rows={4}
                    placeholder="Any specific instructions or details…"
                    className="border-stone-200 focus:border-green-600 bg-white"
                  />
                </div>
              </div>
            )}

            {/* ── Step: Lighting ─────────────────────────────────────────────── */}
            {currentStepName === "lighting" && (
              <div className="space-y-5">
                <SectionHeader
                  title="Lighting Services"
                  description="Select all lighting services you need."
                  icon={<Lightbulb className="w-4 h-4" />}
                />
                <div className="space-y-2">
                  <FieldLabel>Type of Lighting Service</FieldLabel>
                  <CheckboxGroup
                    options={LIGHTING_TYPES}
                    value={form.lightingTypes}
                    onChange={v => set("lightingTypes", v)}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Additional Notes</FieldLabel>
                  <Textarea
                    value={form.lightingNotes}
                    onChange={e => set("lightingNotes", e.target.value)}
                    rows={4}
                    placeholder="Any specific instructions or details…"
                    className="border-stone-200 focus:border-green-600 bg-white"
                  />
                </div>
              </div>
            )}

            {/* ── Step: Water Feature ────────────────────────────────────────── */}
            {currentStepName === "waterfeature" && (
              <div className="space-y-5">
                <SectionHeader
                  title="Water Feature Service"
                  description="Select all water feature services you need."
                  icon={<Droplets className="w-4 h-4" />}
                />
                <div className="space-y-2">
                  <FieldLabel>Type of Water Feature Service</FieldLabel>
                  <CheckboxGroup
                    options={WATER_FEATURE_TYPES}
                    value={form.waterFeatureTypes}
                    onChange={v => set("waterFeatureTypes", v)}
                    columns={1}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Water Feature Repair Description</FieldLabel>
                  <p className="text-xs text-stone-500">Required if "Water Feature Repair" is selected above.</p>
                  <Textarea
                    value={form.waterFeatureRepairDesc}
                    onChange={e => set("waterFeatureRepairDesc", e.target.value)}
                    rows={3}
                    className="border-stone-200 focus:border-green-600 bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Additional Notes</FieldLabel>
                  <Textarea
                    value={form.waterFeatureNotes}
                    onChange={e => set("waterFeatureNotes", e.target.value)}
                    rows={3}
                    placeholder="Any specific instructions or details…"
                    className="border-stone-200 focus:border-green-600 bg-white"
                  />
                </div>
              </div>
            )}

            {/* ── Step: Credit Card ──────────────────────────────────────────── */}
            {currentStepName === "creditcard" && (
              <div className="space-y-5">
                <SectionHeader
                  title="Payment Information"
                  description="A credit card is required on file for this service."
                  icon={<CreditCard className="w-4 h-4" />}
                />
                <InfoBox variant="amber">
                  <p className="font-semibold mb-1">Credit Card Authorization</p>
                  <p className="text-amber-800 text-xs leading-relaxed">
                    By providing your credit card information, you authorize Newport Ave Landscaping to charge
                    the card for services rendered. This authorization also allows for any additional debits or
                    credits to your account in the event it becomes delinquent.
                  </p>
                </InfoBox>
                <div className="space-y-1.5">
                  <FieldLabel required>Credit Card Number</FieldLabel>
                  <StyledInput
                    value={form.creditCardNumber}
                    onChange={v => set("creditCardNumber", v)}
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength={19}
                    error={errors.creditCardNumber}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <FieldLabel required>Expiration Date</FieldLabel>
                    <StyledInput
                      value={form.creditCardExpiration}
                      onChange={v => set("creditCardExpiration", v)}
                      placeholder="MM/YY"
                      maxLength={5}
                      error={errors.creditCardExpiration}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <FieldLabel required>Security Code (CVV)</FieldLabel>
                    <StyledInput
                      value={form.creditCardCvv}
                      onChange={v => set("creditCardCvv", v)}
                      placeholder="123"
                      maxLength={4}
                      error={errors.creditCardCvv}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel required>Authorization Signature (Type your full name)</FieldLabel>
                  <StyledInput
                    value={form.creditCardAuthSignature}
                    onChange={v => set("creditCardAuthSignature", v)}
                    placeholder="Full legal name"
                    error={errors.creditCardAuthSignature}
                  />
                </div>
              </div>
            )}

            {/* ── Step: Landscape Design ─────────────────────────────────────── */}
            {currentStepName === "design" && (
              <div className="space-y-5">
                <SectionHeader
                  title="Landscape Design"
                  description="Help us gather some basic information so we can be prepared to meet with you about your new project."
                  icon={<TreePine className="w-4 h-4" />}
                />
                <SelectField
                  label="Do you already have a landscape design for your project?"
                  value={form.hasExistingDesign}
                  onChange={v => set("hasExistingDesign", v)}
                  options={["Yes", "No"]}
                />
                <SelectField
                  label="Will your project need to pass Design Review (HOA approval)?"
                  value={form.needsHoaApproval}
                  onChange={v => set("needsHoaApproval", v)}
                  options={["Yes", "No", "I don't Know"]}
                />
                <div className="space-y-2">
                  <FieldLabel>Choose all elements you'd like to include in the landscape</FieldLabel>
                  <CheckboxGroup
                    options={LANDSCAPE_ELEMENTS}
                    value={form.landscapeElements}
                    onChange={v => set("landscapeElements", v)}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel required>Preliminary Budget</FieldLabel>
                  <p className="text-xs text-stone-500 mb-1 leading-relaxed">
                    All projects require an established budget by the end of the initial consultation. Most of
                    our construction projects range from $25,000 to $150,000, with a minimum project investment
                    of $10,000.
                  </p>
                  <Select value={form.budget} onValueChange={v => set("budget", v)}>
                    <SelectTrigger className={`bg-white border-stone-200 focus:border-green-600 ${errors.budget ? "border-red-400" : ""}`}>
                      <SelectValue placeholder="Choose a budget range…" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGET_OPTIONS.map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.budget && <p className="text-xs text-red-500">{errors.budget}</p>}
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Other Budget Notes</FieldLabel>
                  <StyledInput
                    value={form.budgetOther}
                    onChange={v => set("budgetOther", v)}
                    placeholder="Any additional budget notes…"
                  />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Design Consultation Terms</FieldLabel>
                  <InfoBox variant="blue">
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Newport Ave Landscaping charges a <strong>$250 design consultation fee</strong> for new
                      landscape design projects. This fee is applied toward the project cost if you choose to
                      proceed. The consultation includes a site visit, design concepts, and a detailed estimate.
                    </p>
                  </InfoBox>
                  <RadioGroup
                    value={form.designConsultationAccepted}
                    onValueChange={v => set("designConsultationAccepted", v)}
                    className="space-y-2 mt-2"
                  >
                    <div className="flex items-start gap-3 p-3 rounded-lg border border-stone-200 hover:border-green-300 transition-colors cursor-pointer">
                      <RadioGroupItem value="accepted" id="dc-accept" className="mt-0.5" />
                      <Label htmlFor="dc-accept" className="text-sm cursor-pointer">I understand and accept these terms</Label>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg border border-stone-200 hover:border-green-300 transition-colors cursor-pointer">
                      <RadioGroupItem value="declined" id="dc-decline" className="mt-0.5" />
                      <Label htmlFor="dc-decline" className="text-sm cursor-pointer">I do not want any landscape design or consultation services at this point</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Ideally, when would you like your project to be completed?</FieldLabel>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input
                      type="date"
                      value={form.idealCompletionDate}
                      onChange={e => set("idealCompletionDate", e.target.value)}
                      className="pl-9 border-stone-200 focus:border-green-600 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── Step: Scheduling ───────────────────────────────────────────── */}
            {currentStepName === "scheduling" && (
              <div className="space-y-5">
                <SectionHeader
                  title="Scheduling"
                  description="Help us understand your scheduling preferences."
                  icon={<Calendar className="w-4 h-4" />}
                />
                <div className="p-4 rounded-xl border border-stone-200 hover:border-green-300 transition-colors">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={form.flexibleScheduling}
                      onCheckedChange={v => set("flexibleScheduling", v === true)}
                      className="mt-0.5 border-stone-400 data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700"
                    />
                    <div>
                      <span className="text-sm font-medium text-stone-800 block">Flexible Scheduling</span>
                      <span className="text-xs text-stone-500 leading-snug">
                        NAL can schedule my service and come anytime without notice{" "}
                        <span className="text-green-700 font-medium">(This is the quickest way to complete service)</span>
                      </span>
                    </div>
                  </label>
                </div>
                <SelectField
                  label="Is this a rental property?"
                  value={form.isRentalProperty}
                  onChange={v => set("isRentalProperty", v)}
                  options={["Yes", "No"]}
                />
                <SelectField
                  label="Are you the property owner?"
                  value={form.isPropertyOwner}
                  onChange={v => set("isPropertyOwner", v)}
                  options={["Yes", "No"]}
                />
                <SelectField
                  label="Are there dogs & other pets at the property we should know about?"
                  value={form.hasPets}
                  onChange={v => set("hasPets", v)}
                  options={["Yes", "No"]}
                />
              </div>
            )}

            {/* ── Step: Final / Comments ─────────────────────────────────────── */}
            {currentStepName === "final" && (
              <div className="space-y-5">
                <SectionHeader
                  title="Almost Done!"
                  description="Please feel free to forward this signup to anyone that you think would like our services."
                  icon={<Star className="w-4 h-4" />}
                />
                <div className="space-y-1.5">
                  <FieldLabel>Comments or Questions</FieldLabel>
                  <Textarea
                    value={form.comments}
                    onChange={e => set("comments", e.target.value)}
                    rows={5}
                    placeholder="Any additional information you'd like us to know…"
                    className="border-stone-200 focus:border-green-600 bg-white"
                  />
                </div>
                {/* Summary card */}
                <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 text-sm">
                  <p className="font-semibold text-stone-700 mb-2">Your Request Summary</p>
                  <div className="space-y-1 text-stone-600">
                    <p><span className="text-stone-400">Name:</span> {form.firstName} {form.lastName}</p>
                    <p><span className="text-stone-400">Service:</span> {form.serviceType || "—"}</p>
                    <p><span className="text-stone-400">Address:</span> {form.siteAddress || "—"}</p>
                  </div>
                </div>
                {submitMutation.isError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex gap-3">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Something went wrong. Please try again or call us at <strong>(541) 617-8873</strong>.</span>
                  </div>
                )}
              </div>
            )}

            {/* ── Navigation buttons ─────────────────────────────────────────── */}
            <div className="flex justify-between mt-8 pt-6 border-t border-stone-100">
              {step > 0 ? (
                <Button
                  variant="outline"
                  onClick={back}
                  className="gap-2 border-stone-300 text-stone-700 hover:bg-stone-50"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
              ) : (
                <div />
              )}
              {step < totalSteps - 1 ? (
                <Button
                  onClick={next}
                  className="bg-green-700 hover:bg-green-800 text-white gap-2 px-6"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending}
                  className="bg-green-700 hover:bg-green-800 text-white gap-2 min-w-[160px] px-6"
                >
                  {submitMutation.isPending ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                  ) : (
                    <>Submit Request <CheckCircle2 className="w-4 h-4" /></>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom trust row */}
        <div className="flex flex-wrap justify-center gap-5 mt-6 text-xs text-stone-400">
          <span>✓ Licensed & Bonded · LCB #9153</span>
          <span>✓ Serving Central Oregon since 2003</span>
          <span>✓ 400+ Properties Maintained</span>
        </div>
      </div>

      <Footer />
    </div>
  );
}
