import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';

const contactLinks = [
  {
    label: 'Email',
    value: 'anmolmishran0@gmail.com',
    href: 'mailto:anmolmishran0@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/anmolmishra24',
    href: 'https://linkedin.com/in/anmolmishra24',
  },
  {
    label: 'GitHub',
    value: 'github.com/Anmol007-max',
    href: 'https://github.com/Anmol007-max',
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="container">
        <SectionHeading label="05 — Contact" title="Say Hello" />

        <div className="contact-section">
          <motion.p
            className="contact-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision. The simplest way to reach me is a good old email.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton
              className="contact-cta"
              onClick={() => window.location.href = 'mailto:anmolmishran0@gmail.com'}
            >
              <span>anmolmishran0@gmail.com</span>
              <span>→</span>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="contact-links"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact-link-item"
              >
                <span className="contact-link-label">{item.label}</span>
                <span className="contact-link-value">{item.value}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
