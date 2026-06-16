import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';

const certifications = [
  { name: 'AI Aware Badge', issuer: 'AI For All', year: '2024' },
  { name: 'AI Appreciate Badge', issuer: 'AI For All', year: '2024' },
  { name: 'Wireless 4G/5G Enabling Technologies', issuer: 'Industry Certification', year: '2024' },
  { name: 'Google Generative AI Studio', issuer: 'Google', year: '2024' },
];

// Double the array for seamless infinite scroll
const marqueeItems = [...certifications, ...certifications, ...certifications];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="certifications" ref={ref}>
      <div className="container">
        <SectionHeading number="04" title="Certifications" />
      </div>

      <motion.div
        className="cert-marquee-wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="cert-marquee">
          {marqueeItems.map((cert, i) => (
            <div key={`${cert.name}-${i}`} className="cert-card">
              <h4 className="cert-name">{cert.name}</h4>
              <p className="cert-issuer">{cert.issuer}</p>
              <span className="cert-year">{cert.year}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;
