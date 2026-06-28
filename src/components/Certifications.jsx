import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import SectionHeading from './SectionHeading';
import { HiCheckBadge } from 'react-icons/hi2';

const certifications = [
  { name: 'AI Aware Badge', issuer: 'AI For All', year: '2024' },
  { name: 'AI Appreciate Badge', issuer: 'AI For All', year: '2024' },
  { name: 'Wireless 4G/5G Enabling Technologies', issuer: 'Industry Certification', year: '2024' },
  { name: 'Google Generative AI Studio', issuer: 'Google', year: '2024' },
];

const marqueeItems = [...certifications, ...certifications, ...certifications];

/* ── Lightweight inline 3D tilt for marquee cards (no full Tilt3DCard needed) ── */
const CertCard = ({ cert }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className="cert-card glass-card depth-shadow"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ y: -6, scale: 1.03 }}
      style={{ transformStyle: 'preserve-3d', perspective: '600px' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
        <div
          className="depth-pop-sm"
          style={{
            padding: '0.6rem',
            background: 'var(--grad-subtle)',
            borderRadius: '12px',
            color: 'var(--violet)',
            transformStyle: 'preserve-3d',
          }}
        >
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
    </motion.div>
  );
};

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="certifications" ref={ref} style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Floating 3D diamond decoration */}
      <motion.div
        className="section-deco"
        style={{ top: '10%', left: '5%' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="geo-diamond" style={{ width: '25px', height: '25px' }} />
      </motion.div>

      <div className="container">
        <SectionHeading number="04" title="Certifications" />
      </div>

      <motion.div
        className="cert-marquee-wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: '800px' }}
      >
        <div className="cert-marquee">
          {marqueeItems.map((cert, i) => (
            <CertCard key={`${cert.name}-${i}`} cert={cert} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;
