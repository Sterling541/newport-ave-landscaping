/* ============================================================
   SCHEDULE SERVICES PAGE — Newport Avenue Landscaping
   Premium two-column design: dark green sidebar + warm parchment form.
   All 9 service branches, all fields and dropdown options are
   IDENTICAL to the original Google Form. Only the visual design changed.
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
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2, ChevronLeft, ChevronRight, Loader2, AlertCircle,
  Leaf, Phone, Calendar, CreditCard, Shield, Wrench, Droplets,
  Lightbulb, TreePine, Star, User, Settings,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SprinklerGame from "@/components/SprinklerGame";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/logo-transparent-stacked_ff350b79.png";

type FormData = {
  email: string; usedBefore: string; firstName: string; lastName: string;
  phone: string; siteAddress: string; billingAddress: string; howHeard: string[];
  serviceType: string;
  warrantyDetails: string; salesConsultant: string; projectManager: string;
  maintenanceTypes: string[]; maintenanceNotes: string;
  irrigationTypes: string[]; irrigationNotes: string; winterizationDate: string;
  lightingTypes: string[]; lightingNotes: string;
  waterFeatureTypes: string[]; waterFeatureNotes: string; waterFeatureRepairDesc: string;
  creditCardNumber: string; creditCardExpiration: string; creditCardCvv: string; creditCardAuthSignature: string;
  concreteServiceType: string; concreteElements: string[]; concreteDimensions: string;
  concreteHasStairs: string; concreteAttachedToBuilding: string;
  hasExistingDesign: string; needsHoaApproval: string; landscapeElements: string[];
  budget: string; budgetOther: string; designConsultationAccepted: string; idealCompletionDate: string;
  flexibleScheduling: boolean; isRentalProperty: string; isPropertyOwner: string; hasPets: string;
  comments: string;
};

const INITIAL_FORM: FormData = {
  email: "", usedBefore: "", firstName: "", lastName: "", phone: "",
  siteAddress: "", billingAddress: "", howHeard: [], serviceType: "",
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
  "$10,000\u2013$20,000", "$20,000\u2013$35,000", "$35,000\u2013$60,000",
  "$60,000\u2013$100,000", "$100,000+",
];
const CC_SERVICES = new Set([
  "Maintenance: Weekly or One-Time Landscape Clean Ups",
  "> Irrigation Services: Including backflow test, repairs",
  "> Lighting addition or repair",
  "> Water Feature service (Including clean-outs, maintenance repairs)",
  "Sprinkler Winterization",
]);

type StepMeta = { icon: React.ReactNode; label: string; desc: string };
const STEP_META: Record<string, StepMeta> = {
  contact:      { icon: <User className="w-4 h-4" />,        label: "Contact Info",    desc: "Tell us how to reach you" },
  service:      { icon: <Settings className="w-4 h-4" />,    label: "Service Type",    desc: "What can we help with?" },
  warranty:     { icon: <Shield className="w-4 h-4" />,      label: "Warranty",        desc: "Describe your issue" },
  maintenance:  { icon: <Wrench className="w-4 h-4" />,      label: "Maintenance",     desc: "Select services needed" },
  irrigation:   { icon: <Droplets className="w-4 h-4" />,    label: "Irrigation",      desc: "Irrigation details" },
  lighting:     { icon: <Lightbulb className="w-4 h-4" />,   label: "Lighting",        desc: "Lighting service details" },
  waterfeature: { icon: <Droplets className="w-4 h-4" />,    label: "Water Feature",   desc: "Water feature service" },
  creditcard:   { icon: <CreditCard className="w-4 h-4" />,  label: "Payment Info",    desc: "Card on file required" },
  design:       { icon: <TreePine className="w-4 h-4" />,    label: "Design Details",  desc: "Your vision & budget" },
  scheduling:   { icon: <Calendar className="w-4 h-4" />,    label: "Scheduling",      desc: "Property details" },
  final:        { icon: <Star className="w-4 h-4" />,        label: "Almost Done!",    desc: "Final notes & review" },
};

function toggleItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <Label className="text-sm font-semibold text-stone-700 mb-1.5 block tracking-tight">
      {children}{required && <span className="text-red-500 ml-1">*</span>}
    </Label>
  );
}

function StyledInput({ value, onChange, placeholder, type = "text", maxLength, error, className = "" }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  type?: string; maxLength?: number; error?: string; className?: string;
}) {
  return (
    <div>
      <Input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} maxLength={maxLength}
        className={`border-amber-200 focus:border-green-600 focus:ring-green-600/20 bg-amber-50/30 placeholder:text-stone-400 ${error ? "border-red-400" : ""} ${className}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function StyledTextarea({ value, onChange, placeholder, rows = 4, error }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; error?: string;
}) {
  return (
    <div>
      <Textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
        placeholder={placeholder}
        className={`border-amber-200 focus:border-green-600 focus:ring-green-600/20 bg-amber-50/30 placeholder:text-stone-400 resize-none ${error ? "border-red-400" : ""}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder, required, error }: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder?: string; required?: boolean; error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <FieldLabel required={required}>{label}</FieldLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`border-amber-200 focus:border-green-600 bg-amber-50/30 ${error ? "border-red-400" : ""}`}>
          <SelectValue placeholder={placeholder ?? "Choose\u2026"} />
        </SelectTrigger>
        <SelectContent>
          {options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function CheckboxGroup({ options, value, onChange, columns = 2 }: {
  options: string[]; value: string[]; onChange: (v: string[]) => void; columns?: number;
}) {
  return (
    <div className={`grid gap-2 ${columns === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
      {options.map(opt => (
        <label key={opt} className={`flex items-start gap-3 cursor-pointer p-2.5 rounded-xl border-2 transition-all ${
          value.includes(opt) ? "border-green-500 bg-green-50" : "border-stone-200 bg-white hover:border-amber-300 hover:bg-amber-50/50"
        }`}>
          <Checkbox checked={value.includes(opt)} onCheckedChange={() => onChange(toggleItem(value, opt))}
            className="mt-0.5 border-stone-400 data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700 shrink-0" />
          <span className="text-sm text-stone-700 leading-snug">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-7 w-1 rounded-full bg-green-600 shrink-0" />
        <h3 className="text-xl font-bold text-stone-900">{title}</h3>
      </div>
      {description && <p className="text-sm text-stone-500 ml-4 leading-relaxed">{description}</p>}
    </div>
  );
}

function InfoBox({ children, variant = "green" }: { children: React.ReactNode; variant?: "green" | "amber" | "blue" }) {
  const s = { green: "bg-green-50 border-green-200", amber: "bg-amber-50 border-amber-200", blue: "bg-sky-50 border-sky-200" };
  return <div className={`border rounded-xl p-4 text-sm ${s[variant]}`}>{children}</div>;
}

function FormSidebar({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  const pct = Math.round((currentStep / Math.max(steps.length - 1, 1)) * 100);
  return (
    <div
      className="hidden lg:flex flex-col justify-between p-7 rounded-l-2xl shrink-0"
      style={{
        background: "linear-gradient(160deg, oklch(0.20 0.07 148) 0%, oklch(0.27 0.09 155) 100%)",
        width: "260px",
      }}
    >
      <div>
        <img src={LOGO_URL} alt="Newport Avenue Landscaping" className="h-14 mb-8 drop-shadow-sm" />
        <div className="space-y-1">
          {steps.map((s, i) => {
            const meta = STEP_META[s] ?? { icon: <Leaf className="w-4 h-4" />, label: s, desc: "" };
            const done = i < currentStep;
            const active = i === currentStep;
            return (
              <div key={s} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${active ? "bg-white/15" : done ? "opacity-60" : "opacity-35"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  done ? "bg-emerald-400 text-white" : active ? "bg-white text-green-900" : "bg-white/20 text-white"
                }`}>
                  {done ? <CheckCircle2 className="w-4 h-4" /> : meta.icon}
                </div>
                <div>
                  <p className={`text-xs font-semibold leading-none ${active ? "text-white" : "text-green-200"}`}>{meta.label}</p>
                  {active && <p className="text-green-300/80 text-xs mt-0.5">{meta.desc}</p>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-xs text-green-400 mb-1.5">
            <span>Progress</span><span>{pct}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-green-300 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
      <div className="space-y-2 mt-8">
        {["Licensed & Bonded \u00b7 LCB #9153", "Serving Central Oregon since 2005", "400+ Properties Maintained"].map(b => (
          <div key={b} className="flex items-center gap-2 text-green-300/80 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
            <span>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileProgress({ step, total, stepName }: { step: number; total: number; stepName: string }) {
  const meta = STEP_META[stepName] ?? { icon: <Leaf className="w-4 h-4" />, label: stepName, desc: "" };
  return (
    <div className="mb-6 pb-5 border-b border-amber-200">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
            i < step ? "bg-green-600" : i === step ? "bg-amber-400" : "bg-stone-200"
          }`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center shrink-0">{meta.icon}</div>
          <div>
            <p className="text-sm font-bold text-stone-900 leading-none">{meta.label}</p>
            <p className="text-xs text-stone-500 mt-0.5">{meta.desc}</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-stone-400 bg-stone-100 px-2 py-1 rounded-full">{step + 1} / {total}</span>
      </div>
    </div>
  );
}

export default function ScheduleServices() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.submissions.create.useMutation({ onSuccess: () => setSubmitted(true) });

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => { const n = { ...e }; delete n[key]; return n; });
  };

  const svc = form.serviceType;
  const isWarranty     = svc === "> Warranty";
  const isMaintenance  = svc === "Maintenance: Weekly or One-Time Landscape Clean Ups";
  const isIrrigation   = svc === "> Irrigation Services: Including backflow test, repairs";
  const isLighting     = svc === "> Lighting addition or repair";
  const isWaterFeature = svc === "> Water Feature service (Including clean-outs, maintenance repairs)";
  const isDesign       = svc === "> Landscape Design" || svc === "> New Landscape Installation";
  const needsCC        = CC_SERVICES.has(svc);

  const steps = ["contact", "service"];
  if (isWarranty)     steps.push("warranty");
  if (isMaintenance)  steps.push("maintenance");
  if (isIrrigation)   steps.push("irrigation");
  if (isLighting)     steps.push("lighting");
  if (isWaterFeature) steps.push("waterfeature");
  if (needsCC)        steps.push("creditcard");
  if (isDesign)       steps.push("design");
  steps.push("scheduling");
  steps.push("final");

  const currentStepName = steps[step];
  const totalSteps = steps.length;

  function validateStep(): boolean {
    const e: Record<string, string> = {};
    if (currentStepName === "contact") {
      if (!form.email)       e.email       = "Email is required";
      if (!form.firstName)   e.firstName   = "First name is required";
      if (!form.lastName)    e.lastName    = "Last name is required";
      if (!form.phone)       e.phone       = "Phone number is required";
      if (!form.siteAddress) e.siteAddress = "Site address is required";
    }
    if (currentStepName === "service" && !form.serviceType) e.serviceType = "Please choose a service";
    if (currentStepName === "warranty") {
      if (!form.warrantyDetails)   e.warrantyDetails   = "Please describe your warranty issue";
      if (!form.salesConsultant)   e.salesConsultant   = "Sales consultant name is required";
      if (!form.projectManager)    e.projectManager    = "Project manager name is required";
    }
    if (currentStepName === "creditcard") {
      if (!form.creditCardNumber)        e.creditCardNumber        = "Credit card number is required";
      if (!form.creditCardExpiration)    e.creditCardExpiration    = "Expiration date is required";
      if (!form.creditCardCvv)           e.creditCardCvv           = "Security code is required";
      if (!form.creditCardAuthSignature) e.creditCardAuthSignature = "Authorization signature is required";
    }
    if (currentStepName === "design" && !form.budget) e.budget = "Please select a budget range";
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
      email: form.email, usedBefore: form.usedBefore || undefined,
      firstName: form.firstName, lastName: form.lastName, phone: form.phone,
      siteAddress: form.siteAddress, billingAddress: form.billingAddress || undefined,
      howHeard: form.howHeard.join(", ") || undefined, serviceType: form.serviceType,
      warrantyDetails: form.warrantyDetails || undefined, salesConsultant: form.salesConsultant || undefined,
      projectManager: form.projectManager || undefined,
      maintenanceTypes: form.maintenanceTypes.join(", ") || undefined, maintenanceNotes: form.maintenanceNotes || undefined,
      irrigationTypes: form.irrigationTypes.join(", ") || undefined, irrigationNotes: form.irrigationNotes || undefined,
      winterizationDate: form.winterizationDate || undefined,
      lightingTypes: form.lightingTypes.join(", ") || undefined, lightingNotes: form.lightingNotes || undefined,
      waterFeatureTypes: form.waterFeatureTypes.join(", ") || undefined, waterFeatureNotes: form.waterFeatureNotes || undefined,
      waterFeatureRepairDesc: form.waterFeatureRepairDesc || undefined,
      creditCardNumber: form.creditCardNumber || undefined, creditCardExpiration: form.creditCardExpiration || undefined,
      creditCardCvv: form.creditCardCvv || undefined, creditCardAuthSignature: form.creditCardAuthSignature || undefined,
      concreteServiceType: form.concreteServiceType || undefined, concreteElements: form.concreteElements.join(", ") || undefined,
      concreteDimensions: form.concreteDimensions || undefined, concreteHasStairs: form.concreteHasStairs || undefined,
      concreteAttachedToBuilding: form.concreteAttachedToBuilding || undefined,
      hasExistingDesign: form.hasExistingDesign || undefined, needsHoaApproval: form.needsHoaApproval || undefined,
      landscapeElements: form.landscapeElements.join(", ") || undefined,
      budget: form.budget || undefined, budgetOther: form.budgetOther || undefined,
      designConsultationAccepted: form.designConsultationAccepted || undefined, idealCompletionDate: form.idealCompletionDate || undefined,
      flexibleScheduling: form.flexibleScheduling,
      isRentalProperty: form.isRentalProperty || undefined, isPropertyOwner: form.isPropertyOwner || undefined,
      hasPets: form.hasPets || undefined, comments: form.comments || undefined,
    });
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="pt-[204px] pb-24 px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-green-700 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-900/20">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-stone-900 mb-3">Request Received!</h1>
            <p className="text-stone-600 mb-2 text-lg">Thank you, <strong>{form.firstName}</strong>!</p>
            <p className="text-stone-500 mb-2">We've received your service request and will be in touch shortly.</p>
            <p className="text-stone-400 text-sm mb-10">A confirmation has been sent to <strong>{form.email}</strong>.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => window.location.href = "/"} className="bg-green-700 hover:bg-green-800 text-white px-8">Back to Home</Button>
              <Button variant="outline" onClick={() => window.location.href = "tel:5416178873"} className="border-stone-300 text-stone-700">
                <Phone className="w-4 h-4 mr-2" />(541) 617-8873
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.012 75)" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, oklch(0.20 0.07 148) 0%, oklch(0.30 0.09 150) 100%)", paddingTop: "204px" }}>
        <div className="max-w-5xl mx-auto px-4 py-8 lg:hidden text-center">
          <img src={LOGO_URL} alt="Newport Avenue Landscaping" className="h-12 mx-auto mb-3 drop-shadow-sm" />
          <h1 className="text-2xl font-bold text-white mb-1">Schedule Services</h1>
          <p className="text-green-200 text-sm">Quick and easy — completed in just 4 minutes on average.</p>
        </div>
        <div className="hidden lg:block max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-white">Schedule Services</h1>
          <p className="text-green-200 text-sm mt-1">Quick and easy — completed in just 4 minutes on average.</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex gap-3 items-start">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>Licensing Disclaimer (LCB #9153):</strong> Newport Ave Landscaping is not licensed to perform electrical or plumbing work. This includes outlets for pumps, irrigation timers, water features, or any connections to potable water systems. Services requiring a licensed plumber or electrician must be coordinated separately.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-4 py-8 pb-16">
        <div className="flex rounded-2xl shadow-2xl overflow-hidden border border-stone-200/60">
          <FormSidebar steps={steps} currentStep={step} />

          <div className="flex-1 p-6 sm:p-8" style={{ backgroundColor: "oklch(0.975 0.010 75)" }}>
            <div className="lg:hidden">
              <MobileProgress step={step} total={totalSteps} stepName={currentStepName} />
            </div>

            {/* Contact */}
            {currentStepName === "contact" && (
              <div className="space-y-5">
                <SectionHeader title="Client Contact Info" description="Tell us about yourself so we can reach you." />
                <div className="space-y-1.5">
                  <FieldLabel required>Email Address</FieldLabel>
                  <StyledInput type="email" value={form.email} onChange={v => set("email", v)} placeholder="you@example.com" error={errors.email} />
                </div>
                <SelectField label="Have you used Newport Avenue Landscaping in the past?" value={form.usedBefore} onChange={v => set("usedBefore", v)} options={["Yes", "No"]} />
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
                  <StyledInput type="tel" value={form.phone} onChange={v => set("phone", v)} placeholder="(541) 000-0000" error={errors.phone} />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel required>Site Address (Full Address)</FieldLabel>
                  <StyledInput value={form.siteAddress} onChange={v => set("siteAddress", v)} placeholder="123 Main St, Bend, OR 97701" error={errors.siteAddress} />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Billing Address (if different)</FieldLabel>
                  <StyledTextarea value={form.billingAddress} onChange={v => set("billingAddress", v)} rows={2} placeholder="Leave blank if same as site address" />
                </div>
                <div className="space-y-2">
                  <FieldLabel>How did you hear about Newport Ave Landscaping?</FieldLabel>
                  <CheckboxGroup options={HOW_HEARD_OPTIONS} value={form.howHeard} onChange={v => set("howHeard", v)} />
                </div>
              </div>
            )}

            {/* Service */}
            {currentStepName === "service" && (
              <div className="space-y-5">
                <SectionHeader title="Choose Your Desired Service" description="Select the service you're requesting." />
                <div className="space-y-1.5">
                  <FieldLabel required>Service Type</FieldLabel>
                  <Select value={form.serviceType} onValueChange={v => set("serviceType", v)}>
                    <SelectTrigger className={`border-amber-200 focus:border-green-600 bg-amber-50/30 ${errors.serviceType ? "border-red-400" : ""}`}>
                      <SelectValue placeholder="Choose a service\u2026" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.serviceType && <p className="text-xs text-red-500">{errors.serviceType}</p>}
                </div>
                {form.serviceType === "> Aeration, fertilization and top dressing" && (
                  <InfoBox variant="green">
                    <p className="font-semibold mb-1 text-green-900">Aeration, Fertilization &amp; Top Dressing</p>
                    <p className="text-xs text-green-800 leading-relaxed">Our aeration and fertilization services are priced per square foot. After submitting this form, we'll reach out to schedule a site visit and provide a quote.</p>
                  </InfoBox>
                )}
                {form.serviceType === "Sprinkler Winterization" && (
                  <InfoBox variant="blue">
                    <p className="font-semibold mb-1 text-sky-900">Sprinkler Winterization</p>
                    <p className="text-xs text-sky-800 leading-relaxed">Winterization is a seasonal service. We'll contact you to confirm scheduling and pricing.</p>
                  </InfoBox>
                )}
              </div>
            )}

            {/* Warranty */}
            {currentStepName === "warranty" && (
              <div className="space-y-5">
                <SectionHeader title="Warranty Service" description="Please provide details about your warranty issue." />
                <div className="space-y-1.5">
                  <FieldLabel required>Warranty Details</FieldLabel>
                  <StyledTextarea value={form.warrantyDetails} onChange={v => set("warrantyDetails", v)} rows={5} placeholder="Describe the issue in detail\u2026" error={errors.warrantyDetails} />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel required>Sales Consultant Name</FieldLabel>
                  <StyledInput value={form.salesConsultant} onChange={v => set("salesConsultant", v)} error={errors.salesConsultant} />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel required>Project Manager Name</FieldLabel>
                  <StyledInput value={form.projectManager} onChange={v => set("projectManager", v)} error={errors.projectManager} />
                </div>
              </div>
            )}

            {/* Maintenance */}
            {currentStepName === "maintenance" && (
              <div className="space-y-5">
                <SectionHeader title="Maintenance / Clean Up" description="Select all maintenance services you need." />
                <div className="space-y-2">
                  <FieldLabel>Type of Maintenance</FieldLabel>
                  <CheckboxGroup options={MAINTENANCE_TYPES} value={form.maintenanceTypes} onChange={v => set("maintenanceTypes", v)} />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Additional Notes</FieldLabel>
                  <StyledTextarea value={form.maintenanceNotes} onChange={v => set("maintenanceNotes", v)} rows={4} placeholder="Any specific instructions or details\u2026" />
                </div>
              </div>
            )}

            {/* Irrigation */}
            {currentStepName === "irrigation" && (
              <div className="space-y-5">
                <SectionHeader title="Irrigation Services" description="Select all irrigation services you need." />
                <div className="space-y-2">
                  <FieldLabel>Type of Irrigation Service</FieldLabel>
                  <CheckboxGroup options={IRRIGATION_TYPES} value={form.irrigationTypes} onChange={v => set("irrigationTypes", v)} />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Winterization Date</FieldLabel>
                  <p className="text-xs text-stone-500 mb-1">If requesting winterization, please indicate your preferred date.</p>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input type="date" value={form.winterizationDate} onChange={e => set("winterizationDate", e.target.value)}
                      className="pl-9 border-amber-200 focus:border-green-600 bg-amber-50/30" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Additional Notes</FieldLabel>
                  <StyledTextarea value={form.irrigationNotes} onChange={v => set("irrigationNotes", v)} rows={4} placeholder="Any specific instructions or details\u2026" />
                </div>
              </div>
            )}

            {/* Lighting */}
            {currentStepName === "lighting" && (
              <div className="space-y-5">
                <SectionHeader title="Lighting Service" description="Select all lighting services you need." />
                <div className="space-y-2">
                  <FieldLabel>Type of Lighting Service</FieldLabel>
                  <CheckboxGroup options={LIGHTING_TYPES} value={form.lightingTypes} onChange={v => set("lightingTypes", v)} />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Additional Notes</FieldLabel>
                  <StyledTextarea value={form.lightingNotes} onChange={v => set("lightingNotes", v)} rows={4} placeholder="Any specific instructions or details\u2026" />
                </div>
              </div>
            )}

            {/* Water Feature */}
            {currentStepName === "waterfeature" && (
              <div className="space-y-5">
                <SectionHeader title="Water Feature Service" description="Select all water feature services you need." />
                <div className="space-y-2">
                  <FieldLabel>Type of Water Feature Service</FieldLabel>
                  <CheckboxGroup options={WATER_FEATURE_TYPES} value={form.waterFeatureTypes} onChange={v => set("waterFeatureTypes", v)} columns={1} />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Water Feature Repair Description</FieldLabel>
                  <p className="text-xs text-stone-500">Required if "Water Feature Repair" is selected above.</p>
                  <StyledTextarea value={form.waterFeatureRepairDesc} onChange={v => set("waterFeatureRepairDesc", v)} rows={3} />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Additional Notes</FieldLabel>
                  <StyledTextarea value={form.waterFeatureNotes} onChange={v => set("waterFeatureNotes", v)} rows={3} placeholder="Any specific instructions or details\u2026" />
                </div>
              </div>
            )}

            {/* Credit Card */}
            {currentStepName === "creditcard" && (
              <div className="space-y-5">
                <SectionHeader title="Payment Information" description="A credit card is required on file for this service." />
                <InfoBox variant="amber">
                  <p className="font-semibold mb-1 text-amber-900">Credit Card Authorization</p>
                  <p className="text-amber-800 text-xs leading-relaxed">By providing your credit card information, you authorize Newport Ave Landscaping to charge the card for services rendered. This authorization also allows for any additional debits or credits to your account in the event it becomes delinquent.</p>
                </InfoBox>
                <div className="space-y-1.5">
                  <FieldLabel required>Credit Card Number</FieldLabel>
                  <StyledInput value={form.creditCardNumber} onChange={v => set("creditCardNumber", v)} placeholder="XXXX XXXX XXXX XXXX" maxLength={19} error={errors.creditCardNumber} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <FieldLabel required>Expiration Date</FieldLabel>
                    <StyledInput value={form.creditCardExpiration} onChange={v => set("creditCardExpiration", v)} placeholder="MM/YY" maxLength={5} error={errors.creditCardExpiration} />
                  </div>
                  <div className="space-y-1.5">
                    <FieldLabel required>Security Code (CVV)</FieldLabel>
                    <StyledInput value={form.creditCardCvv} onChange={v => set("creditCardCvv", v)} placeholder="123" maxLength={4} error={errors.creditCardCvv} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel required>Authorization Signature (Type Full Name)</FieldLabel>
                  <StyledInput value={form.creditCardAuthSignature} onChange={v => set("creditCardAuthSignature", v)} placeholder="Your full name" error={errors.creditCardAuthSignature} />
                </div>
              </div>
            )}

            {/* Design */}
            {currentStepName === "design" && (
              <div className="space-y-5">
                <SectionHeader
                  title={svc === "> New Landscape Installation" ? "New Landscape Installation" : "Landscape Design"}
                  description="Tell us about your vision and budget."
                />
                <SelectField label="Do you have an existing design for your project?" value={form.hasExistingDesign} onChange={v => set("hasExistingDesign", v)} options={["Yes", "No"]} />
                <SelectField label="Will your project need to pass Design Review (HOA approval)?" value={form.needsHoaApproval} onChange={v => set("needsHoaApproval", v)} options={["Yes", "No", "I don't Know"]} />
                <div className="space-y-2">
                  <FieldLabel>Choose all elements you'd like to include in the landscape</FieldLabel>
                  <CheckboxGroup options={LANDSCAPE_ELEMENTS} value={form.landscapeElements} onChange={v => set("landscapeElements", v)} />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel required>Preliminary Budget</FieldLabel>
                  <p className="text-xs text-stone-500 mb-1 leading-relaxed">All projects require an established budget by the end of the initial consultation. Most of our construction projects range from $25,000 to $150,000, with a minimum project investment of $10,000.</p>
                  <Select value={form.budget} onValueChange={v => set("budget", v)}>
                    <SelectTrigger className={`border-amber-200 focus:border-green-600 bg-amber-50/30 ${errors.budget ? "border-red-400" : ""}`}>
                      <SelectValue placeholder="Choose a budget range\u2026" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGET_OPTIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.budget && <p className="text-xs text-red-500">{errors.budget}</p>}
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Other Budget Notes</FieldLabel>
                  <StyledInput value={form.budgetOther} onChange={v => set("budgetOther", v)} placeholder="Any additional budget notes\u2026" />
                </div>
                <div className="space-y-2">
                  <FieldLabel>Design Consultation Terms</FieldLabel>
                  <InfoBox variant="blue">
                    <p className="text-xs text-sky-800 leading-relaxed">Newport Ave Landscaping charges a <strong>$250 design consultation fee</strong> for new landscape design projects. This fee is applied toward the project cost if you choose to proceed. The consultation includes a site visit, design concepts, and a detailed estimate.</p>
                  </InfoBox>
                  <RadioGroup value={form.designConsultationAccepted} onValueChange={v => set("designConsultationAccepted", v)} className="space-y-2 mt-2">
                    <div className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${form.designConsultationAccepted === "accepted" ? "border-green-500 bg-green-50" : "border-stone-200 hover:border-green-300"}`}>
                      <RadioGroupItem value="accepted" id="dc-accept" className="mt-0.5" />
                      <Label htmlFor="dc-accept" className="text-sm cursor-pointer">I understand and accept these terms</Label>
                    </div>
                    <div className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${form.designConsultationAccepted === "declined" ? "border-amber-400 bg-amber-50" : "border-stone-200 hover:border-amber-300"}`}>
                      <RadioGroupItem value="declined" id="dc-decline" className="mt-0.5" />
                      <Label htmlFor="dc-decline" className="text-sm cursor-pointer">I do not want any landscape design or consultation services at this point</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-1.5">
                  <FieldLabel>Ideally, when would you like your project to be completed?</FieldLabel>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <Input type="date" value={form.idealCompletionDate} onChange={e => set("idealCompletionDate", e.target.value)}
                      className="pl-9 border-amber-200 focus:border-green-600 bg-amber-50/30" />
                  </div>
                </div>
              </div>
            )}

            {/* Scheduling */}
            {currentStepName === "scheduling" && (
              <div className="space-y-5">
                <SectionHeader title="Scheduling & Property Details" description="Help us prepare for your service." />
                <label className={`flex items-start gap-3 cursor-pointer p-3 rounded-xl border-2 transition-all ${form.flexibleScheduling ? "border-green-500 bg-green-50" : "border-stone-200 hover:border-amber-300"}`}>
                  <Checkbox checked={form.flexibleScheduling} onCheckedChange={v => set("flexibleScheduling", !!v)}
                    className="mt-0.5 border-stone-400 data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700 shrink-0" />
                  <span className="text-sm text-stone-700 leading-snug">NAL can schedule my service and come anytime without notice <span className="text-green-700 font-medium">(This is the quickest way to complete service)</span></span>
                </label>
                <SelectField label="Is this a rental property?" value={form.isRentalProperty} onChange={v => set("isRentalProperty", v)} options={["Yes", "No"]} />
                <SelectField label="Are you the property owner?" value={form.isPropertyOwner} onChange={v => set("isPropertyOwner", v)} options={["Yes", "No"]} />
                <SelectField label="Are there dogs & other pets at the property we should know about?" value={form.hasPets} onChange={v => set("hasPets", v)} options={["Yes", "No"]} />
              </div>
            )}

            {/* Final */}
            {currentStepName === "final" && (
              <div className="space-y-5">
                <SectionHeader title="Almost Done!" description="Please feel free to forward this signup to anyone that you think would like our services." />
                <div className="space-y-1.5">
                  <FieldLabel>Comments or Questions</FieldLabel>
                  <StyledTextarea value={form.comments} onChange={v => set("comments", v)} rows={5} placeholder="Any additional information you'd like us to know\u2026" />
                </div>
                <div className="rounded-xl border-2 border-amber-200 p-4 text-sm bg-amber-50/40">
                  <p className="font-semibold text-stone-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Your Request Summary
                  </p>
                  <div className="space-y-1.5 text-stone-600">
                    <div className="flex gap-2"><span className="text-stone-400 w-20 shrink-0">Name:</span><span className="font-medium">{form.firstName} {form.lastName}</span></div>
                    <div className="flex gap-2"><span className="text-stone-400 w-20 shrink-0">Service:</span><span className="font-medium">{form.serviceType || "\u2014"}</span></div>
                    <div className="flex gap-2"><span className="text-stone-400 w-20 shrink-0">Address:</span><span className="font-medium">{form.siteAddress || "\u2014"}</span></div>
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

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-5 border-t border-amber-200">
              {step > 0 ? (
                <Button variant="outline" onClick={back} className="gap-2 border-stone-300 text-stone-700 hover:bg-stone-50">
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
              ) : <div />}
              {step < totalSteps - 1 ? (
                <Button onClick={next} className="bg-green-700 hover:bg-green-800 text-white gap-2 px-7 shadow-md shadow-green-900/20">
                  Continue <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={submitMutation.isPending}
                  className="bg-green-700 hover:bg-green-800 text-white gap-2 min-w-[160px] px-7 shadow-md shadow-green-900/20">
                  {submitMutation.isPending
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting&hellip;</>
                    : <>Submit Request <CheckCircle2 className="w-4 h-4" /></>}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-5 mt-5 text-xs text-stone-400">
          <span>&#10003; Licensed &amp; Bonded &middot; LCB #9153</span>
          <span>&#10003; Serving Central Oregon since 2005</span>
          <span>&#10003; 400+ Properties Maintained</span>
        </div>
      </div>
      {/* ── Sprinkler Dodge Game ── */}
      <div className="w-full bg-gradient-to-b from-green-50 to-white border-t border-green-100">
        <div className="max-w-3xl mx-auto">
          <SprinklerGame />
        </div>
      </div>
      <Footer />
    </div>
  );
}
