import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <Navbar />
      <div style={{ paddingTop: "328px" }}>
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
              Privacy Policy
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none" style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="text-sm mb-8" style={{ color: "oklch(0.45 0.005 0)" }}>
              Last updated: January 1, 2024
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Information We Collect</h2>
            <p className="mb-6">
              Newport Avenue Landscaping collects information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us by phone or email. This may include your name, email address, phone number, property address, and details about the landscaping services you are interested in.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="mb-6 space-y-2 pl-6 list-disc">
              <li>Respond to your inquiries and provide landscaping services</li>
              <li>Send you quotes, invoices, and service confirmations</li>
              <li>Schedule appointments and service visits</li>
              <li>Send you updates about your service or account</li>
              <li>Improve our services and customer experience</li>
            </ul>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Information Sharing</h2>
            <p className="mb-6">
              We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our business, conducting our operations, or servicing you, so long as those parties agree to keep this information confidential.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Cookies</h2>
            <p className="mb-6">
              Our website may use cookies to enhance your browsing experience. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Data Security</h2>
            <p className="mb-6">
              We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Contact Us</h2>
            <p className="mb-2">If you have any questions about this Privacy Policy, please contact us:</p>
            <address className="not-italic" style={{ color: "oklch(0.35 0.005 0)" }}>
              Newport Avenue Landscaping<br />
              64625 N. HWY 97<br />
              Bend, OR 97701<br />
              <a href="tel:5416178873" style={{ color: "oklch(0.46 0.20 25)" }}>(541) 617-8873</a><br />
              <a href="mailto:info@newportavelandscaping.com" style={{ color: "oklch(0.46 0.20 25)" }}>info@newportavelandscaping.com</a>
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}
