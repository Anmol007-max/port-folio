import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';

const certifications = [
  { name: 'Quantitative Research Virtual Experience, Forage', issuer: 'JPMorgan', year: 'Jul 2026' },
  { name: 'Cybersecurity Virtual Experience, Forage', issuer: 'Mastercard', year: 'Mar 2026' },
  { name: 'Programming Fundamentals using Python, Part 1', issuer: 'Infosys Springboard', year: 'Dec 2025' },
  { name: 'Solutions Architecture Virtual Experience, Forage', issuer: 'AWS APAC', year: 'Oct 2025' },
  { name: 'AI Aware Badge', issuer: 'AI For All', year: '2024' },
  { name: 'AI Appreciate Badge', issuer: 'AI For All', year: '2024' },
  { name: 'Wireless 4G/5G Enabling Technologies', issuer: 'Industry Cert', year: '2024' },
  { name: 'Google Generative AI Studio', issuer: 'Google', year: '2024' },
];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="certifications" ref={ref}>
      <div className="container">
        <SectionHeading label="04 — Credentials" title="Certifications" />

        <div className="cert-list">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="cert-row"
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="cert-issuer">{cert.issuer}</span>
              <span className="cert-name">{cert.name}</span>
              <span className="cert-year">{cert.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
