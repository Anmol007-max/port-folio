import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';
import HeroScene from './HeroScene';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);

  return (
    <section className="hero" id="hero" ref={containerRef}>
      <motion.div className="hero-grid" style={{ opacity: heroOpacity }}>
        <div className="hero-text">
          <h1 className="hero-name">
            <AnimatedText text="Anmol" delay={0.3} />
            <br />
            <AnimatedText text="Mishra" delay={0.6} />
          </h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 1.0 }}
          >
            computer science & AI student crafting intelligent systems with
            Python, Java & Generative AI — building the future one algorithm at a time.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 1.3 }}
          >
            <MagneticButton
              className="btn-primary"
              onClick={() => {
                const link = document.createElement('a');
                link.href = import.meta.env.BASE_URL + 'resume.pdf';
                link.download = 'Anmol_Mishra_Resume.pdf';
                link.click();
              }}
            >
              <span>Download Resume</span>
              <span>→</span>
            </MagneticButton>
            <MagneticButton
              className="btn-secondary"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Say Hello</span>
              <span>→</span>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="hero-3d-col"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-3d-canvas-wrap">
            <HeroScene />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
};

export default Hero;
