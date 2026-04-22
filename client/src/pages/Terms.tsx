import Navbar from "@/components/Navbar";

export default function Terms() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <Navbar />
      <div style={{ paddingTop: "204px" }}>
        {/* Hero */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "220px",
            backgroundColor: "oklch(0.15 0.005 0)",
          }}
        >
          <div className="text-center">
            <p className="font-label mb-2" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              LEGAL
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Terms &amp; Conditions
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none" style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="text-sm mb-8" style={{ color: "oklch(0.45 0.005 0)" }}>
              Last updated: January 1, 2024
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Agreement to Terms</h2>
            <p className="mb-6">
              By accessing and using the services of Newport Avenue Landscaping, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Services</h2>
            <p className="mb-6">
              Newport Avenue Landscaping provides residential and commercial landscaping, irrigation, and maintenance services throughout Central Oregon. All services are subject to availability and our current service area. We reserve the right to refuse service to anyone for any reason.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Estimates and Pricing</h2>
            <p className="mb-6">
              All estimates provided are valid for 30 days from the date of issue. Prices are subject to change based on material costs, labor requirements, and site conditions. Final pricing will be confirmed in a written agreement before work begins. Additional charges may apply for work outside the original scope of the estimate.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Payment Terms</h2>
            <p className="mb-4">Payment terms vary by service type:</p>
            <ul className="mb-6 space-y-2 pl-6 list-disc">
              <li>Maintenance services: invoiced monthly, due upon receipt</li>
              <li>Installation projects: deposit required at contract signing, balance due upon completion</li>
              <li>One-time services: payment due at time of service</li>
            </ul>
            <p className="mb-6">
              Late payments may be subject to a 1.5% monthly finance charge. Newport Avenue Landscaping reserves the right to suspend services for accounts more than 30 days past due.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Warranty</h2>
            <p className="mb-6">
              Newport Avenue Landscaping provides a warranty on workmanship for installation projects. Warranty terms vary by project type and are specified in the project agreement. Plant material warranties are subject to proper care and maintenance by the client. Irrigation system components carry manufacturer warranties in addition to our workmanship warranty.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Cancellation Policy</h2>
            <p className="mb-6">
              Maintenance service agreements may be cancelled with 30 days written notice. Cancellation of scheduled installation projects may result in forfeiture of the deposit if cancellation occurs within 14 days of the scheduled start date. Newport Avenue Landscaping reserves the right to cancel or reschedule services due to weather conditions or other circumstances beyond our control.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Limitation of Liability</h2>
            <p className="mb-6">
              Newport Avenue Landscaping shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with our services. Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>License Information</h2>
            <p className="mb-2">Newport Avenue Landscaping is licensed, bonded, and insured.</p>
            <address className="not-italic mb-6" style={{ color: "oklch(0.35 0.005 0)" }}>
              LCB # 9153 — "All Phase" license with the Oregon Landscape Contractors Board<br />
              Oregon Landscape Contractors Board<br />
              2111 Front St NE Ste 2-101<br />
              Salem, Oregon 97301<br />
              (503) 967-6291
            </address>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Contact Us</h2>
            <address className="not-italic" style={{ color: "oklch(0.35 0.005 0)" }}>
              Newport Avenue Landscaping<br />
              61535 S Hwy 97<br />
              Bend, OR 97702<br />
              <a href="tel:5416178873" style={{ color: "oklch(0.46 0.20 25)" }}>(541) 617-8873</a><br />
              <a href="mailto:info@newportavelandscaping.com" style={{ color: "oklch(0.46 0.20 25)" }}>info@newportavelandscaping.com</a>
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}
