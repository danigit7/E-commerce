import { motion } from 'framer-motion';

function Privacy() {
  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          <h1 className="text-4xl font-serif font-bold mb-8">Privacy Policy</h1>

          <div className="space-y-6 text-charcoal-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, including your name, email address, postal address, phone number, and payment information when you make a purchase or create an account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to process your orders, communicate with you about products and services, improve our website, and comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Information Sharing</h2>
              <p>
                We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information at any time. You may also opt out of receiving promotional communications from us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@luxurystore.com.
              </p>
            </section>
          </div>

          <p className="mt-8 text-sm text-charcoal-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Privacy;

