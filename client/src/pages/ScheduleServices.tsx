/* ============================================================
   SCHEDULE SERVICES PAGE
   Multi-step form replicating the Newport Ave Landscaping
   Google Form — all 9 service branches, conditional sections.
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
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Types ─────────────────────────────────────────────────────────────────────

type FormData = {
  // Contact
  email: string;
  usedBefore: string;
  firstName: string;
  lastName: string;
  phone: string;
  siteAddress: string;
  billingAddress: string;
  howHeard: string[];

  // Service
  serviceType: string;

  // Warranty
  warrantyDetails: string;
  salesConsultant: string;
  projectManager: string;

  // Maintenance
  maintenanceTypes: string[];
  maintenanceNotes: string;

  // Irrigation
  irrigationTypes: string[];
  irrigationNotes: string;
  winterizationDate: string;

  // Lighting
  lightingTypes: string[];
  lightingNotes: string;

  // Water Feature
  waterFeatureTypes: string[];
  waterFeatureNotes: string;
  waterFeatureRepairDesc: string;

  // Credit Card
  creditCardNumber: string;
  creditCardExpiration: string;
  creditCardCvv: string;
  creditCardAuthSignature: string;

  // Concrete
  concreteServiceType: string;
  concreteElements: string[];
  concreteDimensions: string;
  concreteHasStairs: string;
  concreteAttachedToBuilding: string;

  // Landscape Design
  hasExistingDesign: string;
  needsHoaApproval: string;
  landscapeElements: string[];
  budget: string;
  budgetOther: string;
  designConsultationAccepted: string;
  idealCompletionDate: string;

  // Scheduling
  flexibleScheduling: boolean;
  isRentalProperty: string;
  isPropertyOwner: string;
  hasPets: string;

  // Final
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

const CONCRETE_ELEMENTS = [
  "Stamping", "Exposed Aggregate Concrete", "Free Standing Walls",
  "Small Pad under 100 Sq ft", "Medium Pad 200–600 Sq ft",
  "Larger Jobs over 600–700 Sq ft", "Steps / Stairs / Staircase", "Sidewalk",
];

const BUDGET_OPTIONS = [
  "$10,000–$20,000", "$20,000–$35,000", "$35,000–$60,000",
  "$60,000–$100,000", "$100,000+",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function toggleItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
}

/** Services that require credit card info on file */
const CC_SERVICES = new Set([
  "Maintenance: Weekly or One-Time Landscape Clean Ups",
  "> Irrigation Services: Including backflow test, repairs",
  "> Lighting addition or repair",
  "> Water Feature service (Including clean-outs, maintenance repairs)",
  "Sprinkler Winterization",
]);

// ── Sub-components ────────────────────────────────────────────────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <Label className="text-sm font-semibold text-stone-800 mb-1 block">
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
    <div className={`grid gap-2 ${columns === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
      {options.map(opt => (
        <label key={opt} className="flex items-start gap-2 cursor-pointer group">
          <Checkbox
            checked={value.includes(opt)}
            onCheckedChange={() => onChange(toggleItem(value, opt))}
            className="mt-0.5 border-stone-400"
          />
          <span className="text-sm text-stone-700 group-hover:text-stone-900 leading-snug">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="border-l-4 border-green-700 pl-4 mb-6">
      <h3 className="text-lg font-bold text-stone-900">{title}</h3>
      {description && <p className="text-sm text-stone-500 mt-1">{description}</p>}
    </div>
  );
}

function SelectField({
  label, value, onChange, options, placeholder, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="space-y-1">
      <FieldLabel required={required}>{label}</FieldLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white border-stone-300">
          <SelectValue placeholder={placeholder ?? "Choose…"} />
        </SelectTrigger>
        <SelectContent>
          {options.map(o => (
            <SelectItem key={o} value={o}>{o}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all ${
            i < step ? "bg-green-700" : i === step ? "bg-green-400" : "bg-stone-200"
          }`}
        />
      ))}
      <span className="text-xs text-stone-500 ml-2 whitespace-nowrap">
        Step {step + 1} of {total}
      </span>
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
  const isConcrete = false; // Concrete not in the 9 service options but included as section
  const isDesign = svc === "> Landscape Design" || svc === "> New Landscape Installation";
  const isAeration = svc === "> Aeration, fertilization and top dressing";
  const isWinterization = svc === "Sprinkler Winterization";
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
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Request Received!</h1>
          <p className="text-stone-600 mb-2">
            Thank you, <strong>{form.firstName}</strong>! We've received your service request and will be in touch shortly.
          </p>
          <p className="text-stone-500 text-sm mb-8">
            A confirmation has been sent to <strong>{form.email}</strong>.
          </p>
          <Button
            onClick={() => window.location.href = "/"}
            className="bg-green-700 hover:bg-green-800 text-white"
          >
            Back to Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Form layout ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero banner */}
      <div className="bg-green-900 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-2">Newport Avenue Landscaping · LCB #9153</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Transform Your Outdoors</h1>
          <p className="text-green-200 text-base">
            Join us for landscaping excellence — quick and easy, completed in just 4 minutes on average.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-3 items-start">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800">
            <strong>Licensing Disclaimer (LCB #9153):</strong> Newport Ave Landscaping is not licensed to perform electrical or plumbing work. This includes outlets for pumps, irrigation timers, water features, or any connections to potable water systems. Services requiring a licensed plumber or electrician must be coordinated separately.
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-8">
          <StepIndicator step={step} total={totalSteps} />

          {/* ── Step: Contact Info ─────────────────────────────────────────── */}
          {currentStepName === "contact" && (
            <div className="space-y-5">
              <SectionHeader title="Client Contact Info" />

              <div className="space-y-1">
                <FieldLabel required>Email Address</FieldLabel>
                <Input
                  type="email"
                  value={form.email}
                  onChange={e => set("email", e.target.value)}
                  placeholder="you@example.com"
                  className={errors.email ? "border-red-400" : "border-stone-300"}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <SelectField
                label="Have you used Newport Avenue Landscaping in the past?"
                value={form.usedBefore}
                onChange={v => set("usedBefore", v)}
                options={["Yes", "No"]}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <FieldLabel required>First Name</FieldLabel>
                  <Input
                    value={form.firstName}
                    onChange={e => set("firstName", e.target.value)}
                    className={errors.firstName ? "border-red-400" : "border-stone-300"}
                  />
                  {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                </div>
                <div className="space-y-1">
                  <FieldLabel required>Last Name</FieldLabel>
                  <Input
                    value={form.lastName}
                    onChange={e => set("lastName", e.target.value)}
                    className={errors.lastName ? "border-red-400" : "border-stone-300"}
                  />
                  {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <FieldLabel required>Best Phone Number</FieldLabel>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={e => set("phone", e.target.value)}
                  placeholder="(541) 000-0000"
                  className={errors.phone ? "border-red-400" : "border-stone-300"}
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-1">
                <FieldLabel required>Site Address (Full Address)</FieldLabel>
                <Input
                  value={form.siteAddress}
                  onChange={e => set("siteAddress", e.target.value)}
                  placeholder="123 Main St, Bend, OR 97701"
                  className={errors.siteAddress ? "border-red-400" : "border-stone-300"}
                />
                {errors.siteAddress && <p className="text-xs text-red-500">{errors.siteAddress}</p>}
              </div>

              <div className="space-y-1">
                <FieldLabel>Billing Address (if different)</FieldLabel>
                <Textarea
                  value={form.billingAddress}
                  onChange={e => set("billingAddress", e.target.value)}
                  rows={2}
                  className="border-stone-300 resize-none"
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
              <SectionHeader title="Service Type" />
              <div className="space-y-1">
                <FieldLabel required>Choose Your Desired Service</FieldLabel>
                <Select value={form.serviceType} onValueChange={v => set("serviceType", v)}>
                  <SelectTrigger className={`bg-white ${errors.serviceType ? "border-red-400" : "border-stone-300"}`}>
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
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-900">
                  <p className="font-semibold mb-1">Aeration Pricing</p>
                  <ul className="list-disc list-inside space-y-1 text-green-800">
                    <li>First hour: <strong>$205</strong></li>
                    <li>Each additional man-hour: <strong>$95</strong></li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* ── Step: Warranty ─────────────────────────────────────────────── */}
          {currentStepName === "warranty" && (
            <div className="space-y-5">
              <SectionHeader title="Warranty Request" />
              <div className="space-y-1">
                <FieldLabel required>Warranty Details</FieldLabel>
                <p className="text-xs text-stone-500 mb-1">Provide a comprehensive description of your issue so we have an understanding of how we can help.</p>
                <Textarea
                  value={form.warrantyDetails}
                  onChange={e => set("warrantyDetails", e.target.value)}
                  rows={5}
                  className={errors.warrantyDetails ? "border-red-400" : "border-stone-300"}
                />
                {errors.warrantyDetails && <p className="text-xs text-red-500">{errors.warrantyDetails}</p>}
              </div>
              <div className="space-y-1">
                <FieldLabel required>Sales Consultant Name</FieldLabel>
                <Input
                  value={form.salesConsultant}
                  onChange={e => set("salesConsultant", e.target.value)}
                  placeholder="If you recall…"
                  className={errors.salesConsultant ? "border-red-400" : "border-stone-300"}
                />
                {errors.salesConsultant && <p className="text-xs text-red-500">{errors.salesConsultant}</p>}
              </div>
              <div className="space-y-1">
                <FieldLabel required>Project Manager Name</FieldLabel>
                <Input
                  value={form.projectManager}
                  onChange={e => set("projectManager", e.target.value)}
                  placeholder="If you recall…"
                  className={errors.projectManager ? "border-red-400" : "border-stone-300"}
                />
                {errors.projectManager && <p className="text-xs text-red-500">{errors.projectManager}</p>}
              </div>
            </div>
          )}

          {/* ── Step: Maintenance ──────────────────────────────────────────── */}
          {currentStepName === "maintenance" && (
            <div className="space-y-5">
              <SectionHeader title="Maintenance Details" />
              <div className="space-y-2">
                <FieldLabel>What type of maintenance service(s) are you interested in?</FieldLabel>
                <CheckboxGroup
                  options={MAINTENANCE_TYPES}
                  value={form.maintenanceTypes}
                  onChange={v => set("maintenanceTypes", v)}
                />
              </div>
              <div className="space-y-1">
                <FieldLabel>Additional Notes</FieldLabel>
                <Textarea
                  value={form.maintenanceNotes}
                  onChange={e => set("maintenanceNotes", e.target.value)}
                  rows={4}
                  className="border-stone-300"
                />
              </div>
            </div>
          )}

          {/* ── Step: Irrigation ───────────────────────────────────────────── */}
          {currentStepName === "irrigation" && (
            <div className="space-y-5">
              <SectionHeader title="Irrigation Service Details" />
              <div className="space-y-2">
                <FieldLabel>What type of irrigation service(s) are you interested in?</FieldLabel>
                <CheckboxGroup
                  options={IRRIGATION_TYPES}
                  value={form.irrigationTypes}
                  onChange={v => set("irrigationTypes", v)}
                />
              </div>
              <div className="space-y-1">
                <FieldLabel>Additional Notes</FieldLabel>
                <Textarea
                  value={form.irrigationNotes}
                  onChange={e => set("irrigationNotes", e.target.value)}
                  rows={4}
                  className="border-stone-300"
                />
              </div>
              <div className="space-y-1">
                <FieldLabel>Preferred Winterization Date (if applicable)</FieldLabel>
                <Input
                  type="date"
                  value={form.winterizationDate}
                  onChange={e => set("winterizationDate", e.target.value)}
                  className="border-stone-300"
                />
              </div>
            </div>
          )}

          {/* ── Step: Lighting ─────────────────────────────────────────────── */}
          {currentStepName === "lighting" && (
            <div className="space-y-5">
              <SectionHeader title="Lighting Service Details" />
              <div className="space-y-2">
                <FieldLabel>What type of lighting service(s) are you interested in?</FieldLabel>
                <CheckboxGroup
                  options={LIGHTING_TYPES}
                  value={form.lightingTypes}
                  onChange={v => set("lightingTypes", v)}
                />
              </div>
              <div className="space-y-1">
                <FieldLabel>Additional Notes</FieldLabel>
                <Textarea
                  value={form.lightingNotes}
                  onChange={e => set("lightingNotes", e.target.value)}
                  rows={4}
                  className="border-stone-300"
                />
              </div>
            </div>
          )}

          {/* ── Step: Water Feature ────────────────────────────────────────── */}
          {currentStepName === "waterfeature" && (
            <div className="space-y-5">
              <SectionHeader title="Water Feature Service Details" />
              <div className="space-y-2">
                <FieldLabel>What type of water feature service(s) are you interested in?</FieldLabel>
                <CheckboxGroup
                  options={WATER_FEATURE_TYPES}
                  value={form.waterFeatureTypes}
                  onChange={v => set("waterFeatureTypes", v)}
                  columns={1}
                />
              </div>
              <div className="space-y-1">
                <FieldLabel>Additional Notes</FieldLabel>
                <Textarea
                  value={form.waterFeatureNotes}
                  onChange={e => set("waterFeatureNotes", e.target.value)}
                  rows={3}
                  className="border-stone-300"
                />
              </div>
              {form.waterFeatureTypes.some(t => t.includes("Repair")) && (
                <div className="space-y-1">
                  <FieldLabel>Water Feature Repair Description</FieldLabel>
                  <p className="text-xs text-stone-500 mb-1">Please describe the work needed (e.g., leak, rebuild falls, additional rock needed).</p>
                  <Textarea
                    value={form.waterFeatureRepairDesc}
                    onChange={e => set("waterFeatureRepairDesc", e.target.value)}
                    rows={4}
                    className="border-stone-300"
                  />
                </div>
              )}
            </div>
          )}

          {/* ── Step: Credit Card ──────────────────────────────────────────── */}
          {currentStepName === "creditcard" && (
            <div className="space-y-5">
              <SectionHeader
                title="Credit Card Info"
                description="It is mandatory for us to have a form of payment on file for irrigation and other services we offer."
              />
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                By providing your credit card information, you authorize Newport Ave Landscaping to debit your account for the specified amount following each service rendered. This authorization covers the transaction for the service provided and also allows for any additional debits or credits to your account in the event it becomes delinquent.
              </div>
              <div className="space-y-1">
                <FieldLabel required>Credit Card Number</FieldLabel>
                <Input
                  value={form.creditCardNumber}
                  onChange={e => set("creditCardNumber", e.target.value)}
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={19}
                  className={errors.creditCardNumber ? "border-red-400" : "border-stone-300"}
                />
                {errors.creditCardNumber && <p className="text-xs text-red-500">{errors.creditCardNumber}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <FieldLabel required>Expiration Date</FieldLabel>
                  <Input
                    value={form.creditCardExpiration}
                    onChange={e => set("creditCardExpiration", e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={errors.creditCardExpiration ? "border-red-400" : "border-stone-300"}
                  />
                  {errors.creditCardExpiration && <p className="text-xs text-red-500">{errors.creditCardExpiration}</p>}
                </div>
                <div className="space-y-1">
                  <FieldLabel required>Security Code (CVV)</FieldLabel>
                  <Input
                    value={form.creditCardCvv}
                    onChange={e => set("creditCardCvv", e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    className={errors.creditCardCvv ? "border-red-400" : "border-stone-300"}
                  />
                  {errors.creditCardCvv && <p className="text-xs text-red-500">{errors.creditCardCvv}</p>}
                </div>
              </div>
              <div className="space-y-1">
                <FieldLabel required>Authorization Signature (Type your full name)</FieldLabel>
                <Input
                  value={form.creditCardAuthSignature}
                  onChange={e => set("creditCardAuthSignature", e.target.value)}
                  placeholder="Full legal name"
                  className={errors.creditCardAuthSignature ? "border-red-400" : "border-stone-300"}
                />
                {errors.creditCardAuthSignature && <p className="text-xs text-red-500">{errors.creditCardAuthSignature}</p>}
              </div>
            </div>
          )}

          {/* ── Step: Landscape Design ─────────────────────────────────────── */}
          {currentStepName === "design" && (
            <div className="space-y-5">
              <SectionHeader
                title="Landscape Design"
                description="Help us gather some basic information so we can be prepared to meet with you about your new project."
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
              <div className="space-y-1">
                <FieldLabel required>Preliminary Budget</FieldLabel>
                <p className="text-xs text-stone-500 mb-1">
                  All projects require an established budget by the end of the initial consultation. Most of our construction projects range from $25,000 to $150,000, with a minimum project investment of $10,000.
                </p>
                <Select value={form.budget} onValueChange={v => set("budget", v)}>
                  <SelectTrigger className={`bg-white ${errors.budget ? "border-red-400" : "border-stone-300"}`}>
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
              {form.budget === "$100,000+" && (
                <div className="space-y-1">
                  <FieldLabel>Please specify your budget</FieldLabel>
                  <Input
                    value={form.budgetOther}
                    onChange={e => set("budgetOther", e.target.value)}
                    placeholder="e.g., $150,000–$200,000"
                    className="border-stone-300"
                  />
                </div>
              )}
              <div className="space-y-2">
                <FieldLabel>Landscape Design Consultation Terms</FieldLabel>
                <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded border border-stone-200">
                  Our landscape design consultation rates are <strong>$140 per hour</strong>. Our first meeting with you is on us. If you contract your landscape construction with us, any of these services will be included in the cost of your project. If you do not contract landscape construction with us, we will invoice you for any landscape design or consultation that we provide you, after our initial meeting.
                </p>
                <RadioGroup value={form.designConsultationAccepted} onValueChange={v => set("designConsultationAccepted", v)}>
                  <div className="flex items-start gap-2">
                    <RadioGroupItem value="I understand and accept these terms" id="terms-yes" className="mt-0.5" />
                    <Label htmlFor="terms-yes" className="text-sm cursor-pointer">I understand and accept these terms</Label>
                  </div>
                  <div className="flex items-start gap-2">
                    <RadioGroupItem value="I do not want any landscape design or consultation services at this point" id="terms-no" className="mt-0.5" />
                    <Label htmlFor="terms-no" className="text-sm cursor-pointer">I do not want any landscape design or consultation services at this point</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-1">
                <FieldLabel>Ideally, when would you like your project to be completed?</FieldLabel>
                <Input
                  type="date"
                  value={form.idealCompletionDate}
                  onChange={e => set("idealCompletionDate", e.target.value)}
                  className="border-stone-300"
                />
              </div>
            </div>
          )}

          {/* ── Step: Scheduling ───────────────────────────────────────────── */}
          {currentStepName === "scheduling" && (
            <div className="space-y-5">
              <SectionHeader title="Scheduling" />
              <div className="space-y-2">
                <FieldLabel>Scheduling Options</FieldLabel>
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={form.flexibleScheduling}
                    onCheckedChange={v => set("flexibleScheduling", v === true)}
                    className="mt-0.5 border-stone-400"
                  />
                  <span className="text-sm text-stone-700 leading-snug">
                    NAL can schedule my service and come anytime without notice{" "}
                    <span className="text-stone-500">(This is the quickest way to complete service)</span>
                  </span>
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
              <SectionHeader title="Almost Done!" description="Please feel free to forward this signup to anyone that you think would like our services." />
              <div className="space-y-1">
                <FieldLabel>Comments or Questions</FieldLabel>
                <Textarea
                  value={form.comments}
                  onChange={e => set("comments", e.target.value)}
                  rows={5}
                  placeholder="Any additional information you'd like us to know…"
                  className="border-stone-300"
                />
              </div>
              {submitMutation.isError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                  Something went wrong. Please try again or call us at <strong>(541) 410-0000</strong>.
                </div>
              )}
            </div>
          )}

          {/* ── Navigation buttons ─────────────────────────────────────────── */}
          <div className="flex justify-between mt-8 pt-6 border-t border-stone-100">
            {step > 0 ? (
              <Button variant="outline" onClick={back} className="gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
            ) : (
              <div />
            )}

            {step < totalSteps - 1 ? (
              <Button onClick={next} className="bg-green-700 hover:bg-green-800 text-white gap-2">
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="bg-green-700 hover:bg-green-800 text-white gap-2 min-w-[140px]"
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

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-stone-500">
          <span>✓ Licensed & Bonded · LCB #9153</span>
          <span>✓ Serving Central Oregon since 2003</span>
          <span>✓ 400+ Properties Maintained</span>
        </div>
      </div>

      <Footer />
    </div>
  );
}
