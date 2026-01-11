import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import useTheme from '../../../hooks/useTheme';

const faqs = [
  {
    question: 'How does GhorerRanna work?',
    answer:
      "GhorerRanna connects you with talented home chefs in your area. Browse our menu, select your favorite homemade meals, place an order, and enjoy fresh, authentic food delivered to your doorstep. It's that simple!",
  },
  {
    question: 'How do I become a chef on GhorerRanna?',
    answer:
      'Becoming a chef is easy! Simply register on our platform, submit a request to become a chef from your profile, and once approved by our admin team, you can start creating meal listings, managing orders, and earning money from your home kitchen.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major payment methods through our secure Stripe payment gateway, including credit cards, debit cards, and mobile banking. All transactions are encrypted and secure for your safety.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      "Delivery times vary based on the chef's preparation time and your location. Each meal listing shows an estimated delivery time. Most orders are delivered within 30-60 minutes, ensuring your food arrives fresh and hot.",
  },
  {
    question: 'Can I track my order?',
    answer:
      'Yes! Once your order is accepted by the chef, you can track its status in real-time from your "My Orders" page. You\'ll receive updates when your order is being prepared, ready for delivery, and on its way to you.',
  },
  {
    question: 'What if I have dietary restrictions or allergies?',
    answer:
      'Each meal listing includes a complete ingredient list. You can review all ingredients before ordering to ensure the meal meets your dietary needs. We recommend contacting the chef directly if you have specific questions about ingredients or preparation methods.',
  },
  {
    question: 'How do I leave a review?',
    answer:
      'After your order is delivered, you can leave a rating and review from the meal details page. Your honest feedback helps other customers make informed decisions and helps our chefs improve their offerings.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'Orders can be cancelled before they are accepted by the chef. Once a chef accepts your order and begins preparation, cancellation is not possible. If there are any issues with your order, please contact our support team immediately.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { theme } = useTheme();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="my-30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col justify-center items-center mb-15"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold ${
              theme === 'dark' ? '' : 'text-primary'
            } mb-2`}
          >
            Frequently Asked Questions
          </h2>

          <div className="h-0.5 bg-secondary w-30"></div>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={`border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'border-secondary shadow-lg'
                    : 'border-gray-200 hover:border-secondary/50'
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-primary pr-8">
                    {faq.question}
                  </span>
                  <FaChevronDown
                    className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer */}
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-5 bg-gray-50 border-t-2 border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
