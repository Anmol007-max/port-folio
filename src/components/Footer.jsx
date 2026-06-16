import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa6';
import { HiEnvelope, HiArrowUp } from 'react-icons/hi2';

const socialLinks = [
  { icon: <FaLinkedinIn />, href: 'https://linkedin.com/in/anmolmishra24', label: 'LinkedIn' },
  { icon: <FaGithub />, href: 'https://github.com/anmol007-max', label: 'GitHub' },
  { icon: <HiEnvelope />, href: 'mailto:anmolmishran0@gmail.com', label: 'Email' },
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <motion.div
          className="footer-socials"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label={link.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className="footer-text"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          © {new Date().getFullYear()} Anmol Mishra. Crafted with passion & code.
        </motion.p>

        <motion.button
          className="footer-back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ y: -2 }}
        >
          <HiArrowUp size={14} />
          Back to top
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
