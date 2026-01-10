import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    if (e) e.preventDefault();

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual newsletter API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubscribed(true);
      toast.success('Successfully subscribed to our newsletter! 🎉', {
        duration: 4000,
      });

      // Reset after 3 seconds
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <section className="bg-primary relative py-30">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          className="flex flex-col justify-center items-center mb-15"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Stay Updated</h2>
          <div className="h-0.5 bg-secondary w-30"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Subscribe to our newsletter and never miss out on exclusive
              offers, new chef listings, special discounts, and delicious meal
              updates delivered straight to your inbox!
            </p>

            <div className="space-y-3">
              {[
                '🎁 Exclusive early access to new meals',
                '💰 Special subscriber-only discounts',
                '👨‍🍳 Featured chef spotlights',
                '📱 Weekly meal recommendations',
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <p className="text-gray-300">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                  <MdEmail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Join Our Community
                </h3>
                <p className="text-gray-400">
                  Get the latest updates and offers
                </p>
              </div>

              {isSubscribed ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-white mb-2">
                    You're All Set! 🎉
                  </h4>
                  <p className="text-gray-300">
                    Thank you for subscribing to our newsletter!
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text text-gray-300 font-semibold">
                        Email Address
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your email address"
                        className="input w-full bg-white/10 border-white/20 focus:border-secondary text-white placeholder-gray-400 pl-12"
                        disabled={isLoading}
                      />
                      <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubscribe}
                    disabled={isLoading}
                    className="w-full bg-secondary hover:bg-[#ffb73a] text-primary font-bold border-0 text-lg py-3 h-auto disabled:opacity-50 flex items-center justify-center gap-4 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="w-5 h-5" />
                        Subscribe Now
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">10K+</p>
                  <p className="text-sm text-gray-400">Subscribers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">50+</p>
                  <p className="text-sm text-gray-400">Weekly Offers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            Trusted by food lovers across Bangladesh
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-gray-500">🔒 100% Secure</div>
            <div className="w-1 h-1 bg-gray-500 rounded-full hidden md:block"></div>
            <div className="text-gray-500">📧 No Spam Guaranteed</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
