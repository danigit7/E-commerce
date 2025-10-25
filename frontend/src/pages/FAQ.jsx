import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Browse our collection, add items to your cart, and proceed to checkout. Follow the prompts to enter your shipping information and payment details.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express) through our secure Stripe payment gateway.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. Free shipping is offered on orders over $500.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unworn items in original condition with tags attached. Contact our customer service to initiate a return.',
    },
    {
      question: 'Are your products authentic?',
      answer: 'Yes, we guarantee 100% authenticity for all our luxury products. Each item comes with a certificate of authenticity.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Check our shipping page for more details.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you will receive a tracking number via email. You can also view your order status in your account dashboard.',
    },
    {
      question: 'Can I modify my order after placing it?',
      answer: 'Please contact us immediately if you need to modify your order. We can make changes before the order is processed for shipping.',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory py-12">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="section-subtitle">
            Find answers to common questions about our products and services
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-ivory transition-colors"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-charcoal-700">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;

