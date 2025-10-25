import { motion } from 'framer-motion';

function Terms() {
  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          <h1 className="text-4xl font-serif font-bold mb-8">Terms & Conditions</h1>

          <div className="space-y-6 text-charcoal-700">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on Luxury Store's website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Disclaimer</h2>
              <p>
                The materials on Luxury Store's website are provided on an 'as is' basis. Luxury Store makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Limitations</h2>
              <p>
                In no event shall Luxury Store or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Luxury Store's website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on Luxury Store's website could include technical, typographical, or photographic errors. Luxury Store does not warrant that any of the materials on its website are accurate, complete or current.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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

export default Terms;

