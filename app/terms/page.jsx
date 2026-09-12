import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export const metadata = {
  title: "Terms of Service — ANSA",
  description:
    "Read the Terms of Service for ANSA. Understand the rules, rights, and responsibilities when using our website and purchasing our products.",
  keywords: [
    "ANSA terms of service",
    "terms and conditions luxury menswear",
    "online shopping terms India",
    "purchase terms ANSA",
  ],
  openGraph: {
    title: "Terms of Service — ANSA",
    description: "Terms and conditions governing your use of ansadesigner.cloud and purchase of our products.",
    url: "https://www.ansadesigner.cloud/terms",
  },
  alternates: { canonical: "https://www.ansadesigner.cloud/terms" },
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using the ANSA website (ansadesigner.cloud) or placing an order with us, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website or services.

These terms apply to all visitors, users, and customers of our website. We reserve the right to update these terms at any time. Continued use of the site after changes constitutes your acceptance of the revised terms.`,
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    content: `You must be at least 18 years of age to place an order on ansadesigner.cloud. By using this site, you represent and warrant that you are 18 years or older and legally capable of entering into a binding contract.

If you are placing an order on behalf of a business or wedding party, you warrant that you have authority to bind that entity to these terms.`,
  },
  {
    id: "products",
    title: "3. Products & Pricing",
    content: `All products listed on our website are subject to availability. We reserve the right to discontinue any product or fabric weave at any time without notice.

Prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes. Prices are subject to change without notice; however, orders already placed will be honoured at the price at the time of purchase.

We make every effort to display fabric textures, colors, and craftsmanship accurately, but device screen variations may cause slight differences in appearance. If you are unsatisfied with a product, our exchange policy applies.`,
  },
  {
    id: "orders",
    title: "4. Orders & Payment",
    content: `Placing an order on our website constitutes an offer to purchase. We reserve the right to accept or decline any order at our discretion — for example, if a fabric is out of stock, if the order contains a pricing error, or if we suspect fraudulent activity.

Payment is processed securely via Razorpay. We accept UPI, debit/credit cards, net banking, and wallet payments. You agree to provide accurate and complete payment information.

You will receive an order confirmation email once your order is accepted. An order is not confirmed until you receive this email.`,
  },
  {
    id: "shipping",
    title: "5. Shipping & Delivery",
    content: `We ship across India via trusted logistics partners. Estimated delivery times are 5–8 business days for standard shipping and 2–4 business days for express shipping. These are estimates and not guarantees.

ANSA is not responsible for delays caused by courier logistics, regional disruptions, or natural events beyond our control. If your order is significantly delayed, please contact us and we will investigate promptly.

Free shipping is available on all orders above ₹999. A flat ₹99 shipping charge applies to orders below this threshold.`,
  },
  {
    id: "returns",
    title: "6. Exchanges & Returns",
    content: `We offer a 7-day exchange window from the date of delivery. Products must be unused, unwashed, and in original packaging with tags intact.

Please refer to our full Exchange Policy for details on eligible items and the exchange procedure.

Return shipping costs for exchanges are borne by the customer unless the exchange is due to a defect or error on our part.`,
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual Property",
    content: `All content on ansadesigner.cloud — including product imagery, designs, silhouettes, logos, branding, and copy — is the exclusive property of ANSA and is protected by Indian copyright and intellectual property laws.

You may not reproduce, distribute, or commercially exploit any content from our website without our prior written permission.`,
  },
  {
    id: "prohibited",
    title: "8. Prohibited Uses",
    content: `You agree not to use our website to: (a) violate any applicable laws or regulations; (b) transmit spam, malware, or harmful code; (c) harvest user data without permission; (d) interfere with the security or functionality of the site; (e) post false or defamatory content; (f) engage in fraudulent transactions or chargebacks.

We reserve the right to suspend or terminate any account or order found in violation of these terms.`,
  },
  {
    id: "liability",
    title: "9. Limitation of Liability",
    content: `To the maximum extent permitted by law, ANSA shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability to you for any claim shall not exceed the amount you paid for the specific product in question.`,
  },
  {
    id: "governing-law",
    title: "10. Governing Law & Disputes",
    content: `These Terms of Service are governed by the laws of India. Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in Ajmer, Rajasthan, India.

If you have a concern, we encourage you to contact us first at ansadesigner.in@gmail.com to resolve the matter amicably.`,
  },
  {
    id: "contact-terms",
    title: "11. Contact Details",
    content: `For questions about these Terms of Service, please contact us at:
Email: ansadesigner.in@gmail.com
Phone: +91 96100 13835
Address: ANSA Designer Lounge, Railway Station, Police Chowki, Cinema Road, opp. Sardar Light, Dayanand Colony, Ajmer, Rajasthan 305001, India`,
  },
];

export default function TermsPage() {
  const lastUpdated = "1 January 2025";

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <section className="bg-gradient-to-br from-[#f5f3ef] to-white border-b border-[#7a3b00]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-xs text-[#7a3b00] font-semibold tracking-widest uppercase mb-3 font-serif">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-4 font-serif">
            Terms of Service
          </h1>
          <p className="text-gray-500 text-sm font-serif">Last updated: <strong className="text-gray-700">{lastUpdated}</strong></p>
          <p className="text-gray-600 text-sm mt-2 max-w-xl leading-relaxed font-serif">
            Please read these terms carefully before using our website or placing an order. They govern your relationship with ANSA Designer Lounge.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="sticky top-28 space-y-1 text-sm font-serif">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block py-1.5 text-gray-600 hover:text-[#7a3b00] transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          <main className="flex-1 space-y-10">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="text-xl font-serif font-semibold text-gray-900 mb-3 border-b border-[#7a3b00]/15 pb-2">
                  {s.title}
                </h2>
                <div className="text-sm leading-relaxed text-gray-600 font-serif whitespace-pre-line">
                  {s.content}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
