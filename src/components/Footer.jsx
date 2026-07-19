import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiArrowUp } from 'react-icons/hi2';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <motion.div
          className="footer-inner"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="footer-wordmark">Anmol Mishra</span>

          <div className="footer-links">
            <a
              href="https://linkedin.com/in/anmolmishra24"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Anmol007-max"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            <a
              href="mailto:anmolmishran0@gmail.com"
              className="footer-link"
            >
              Email
            </a>
          </div>

          <span className="footer-copy">
            © {new Date().getFullYear()} — crafted with care
          </span>

          <button
            className="footer-back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <HiArrowUp size={14} />
            Top
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
