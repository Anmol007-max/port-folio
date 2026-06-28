import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa6';
import { HiEnvelope, HiArrowUp } from 'react-icons/hi2';

const socialLinks = [
  { icon: <FaLinkedinIn />, href: 'https://linkedin.com/in/anmolmishra24', label: 'LinkedIn', color: '#0077B5' },
  { icon: <FaGithub />, href: 'https://github.com/anmol007-max', label: 'GitHub', color: '#333' },
  { icon: <HiEnvelope />, href: 'mailto:anmolmishran0@gmail.com', label: 'Email', color: 'var(--violet)' },
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer className="footer" ref={ref} style={{ padding: '4rem 0', background: 'var(--grad-subtle)', perspective: '600px' }}>
      <div className="container">
        <motion.div
          className="footer-socials"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ perspective: '500px' }}
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link glass-card"
              aria-label={link.label}
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, type: 'spring', stiffness: 150 }}
              whileHover={{ 
                scale: 1.15, 
                y: -5,
                rotateY: 10,
                color: '#fff',
                backgroundColor: link.color,
                borderColor: link.color,
                boxShadow: `0 10px 25px ${link.color}40` 
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
            AM<span style={{ color: 'var(--violet)' }}>.</span>
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} Anmol Mishra. Crafted with passion & code.
          </p>
        </motion.div>

        <motion.button
          className="footer-back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ y: -4, color: 'var(--orange)', scale: 1.05 }}
          style={{ background: 'rgba(255,255,255,0.8)', padding: '0.6rem 1.2rem', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginTop: '2rem' }}
        >
          <HiArrowUp size={16} />
          Back to top
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
