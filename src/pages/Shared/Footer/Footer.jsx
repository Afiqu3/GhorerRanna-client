import React from 'react';
import {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import logoImg from '../../../assets/logo.png';
import { Link } from 'react-router';
import { motion } from 'motion/react';

const Footer = () => {
  const socialLinks = [
    {
      Icon: FaFacebookF,
      label: 'Facebook',
      href: 'https://www.facebook.com/afique.hossain.J/',
    },
    { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/Afiqu3' },
    { Icon: SiX, label: 'X', href: 'https://x.com/' },
    {
      Icon: FaLinkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/md-afique-hossain',
    },
  ];

  const quickLinks = [
    ['Home', '/'],
    ['Chefs', '/chefs'],
    ['Menu', '/menu'],
    ['Track Order', '/track'],
  ];

  const supportLinks = [
    ['About Us', '/about'],
    ['FAQ', '/faq'],
    ['Contact', '/contact'],
    ['Privacy Policy', '/privacy'],
  ];

  return (
    <footer className="relative bg-primary text-gray-300 pt-15 border-t border-white/10 sm:[clip-path:polygon(0_0%,100%_25%,100%_100%,0_100%)] [clip-path:polygon(0_0%,100%_15%,100%_100%,0_100%)]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Section */}
          <motion.div
            className="col-span-1 lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <img className="h-12 w-12 object-contain" src={logoImg} alt="GhorerRanna Logo" />
              <div>
                <h3 className="text-white text-xl font-bold">GhorerRanna</h3>
                <p className="text-xs text-gray-400">Fresh Homemade Food Near You</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-300/90 leading-6">
              GhorerRanna connects home cooks with food lovers looking for fresh,
              affordable, and hygienic meals prepared in local kitchens — straight from 
              their home to your plate!
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  href={href}
                  key={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group p-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:ring-secondary/60 hover:-translate-y-0.5 transition cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-gray-300 group-hover:text-secondary" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(([name, link]) => (
                <li key={name}>
                  <Link to={link} className="hover:text-secondary transition">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              {supportLinks.map(([name, link]) => (
                <li key={name}>
                  <Link to={link} className="hover:text-secondary transition">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Hours */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h4 className="text-white font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="w-4 h-4 text-secondary" />
                <span>+880 1400 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4 text-secondary" />
                <span>support@ghorerranna.com</span>
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4 text-secondary" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold mt-5 mb-2 text-sm">Working Hours</h4>
            <p className="text-xs text-gray-400 leading-5">
              Sat – Thu: 10:00 AM – 10:00 PM <br />
              Friday: Closed (Family Day)
            </p>
          </motion.div>
        </div>

        <div className="my-8 border border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} <span className="text-secondary font-semibold">GhorerRanna</span> — All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-secondary transition">Privacy</Link>
            <Link to="/terms" className="hover:text-secondary transition">Terms</Link>
            <Link to="/cookies" className="hover:text-secondary transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
