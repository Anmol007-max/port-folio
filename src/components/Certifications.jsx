import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';
import { HiCheckBadge } from 'react-icons/hi2';

const certifications = [
  { name: 'AI Aware Badge', issuer: 'AI For All', year: '2024' },
  { name: 'AI Appreciate Badge', issuer: 'AI For All', year: '2024' },
  { name: 'Wireless 4G/5G Enabling Technologies', issuer: 'Industry Certification', year: '2024' },
  { name: 'Google Generative AI Studio', issuer: 'Google', year: '2024' },
];

const marqueeItems = [...certifications, ...certifications, ...certifications];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="certifications" ref={ref} style={{ overflow: 'hidden' }}>
      <div className="container">
        <SectionHeading number="04" title="Certifications" />
      </div>

      <motion.div
        className="cert-marquee-wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="cert-marquee">
          {marqueeItems.map((cert, i) => (
            <div key={`${cert.name}-${i}`} className="cert-card glass-card">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.6rem', background: 'var(--grad-subtle)', borderRadius: '12px', color: 'var(--violet)' }}>
                  <HiCheckBadge size={24} />
                </div>
                <div>
                  <h4 className="cert-name" style={{ marginBottom: '0.2rem' }}>{cert.name}</h4>
                  <p className="cert-issuer" style={{ margin: 0 }}>{cert.issuer}</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span className="cert-year skill-pill">{cert.year}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;
