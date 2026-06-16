import { motion } from 'framer-motion';
import { HiArrowDown, HiArrowRight } from 'react-icons/hi2';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';
import GradientOrb from './GradientOrb';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <GradientOrb className="orb-1" />
      <GradientOrb className="orb-2" />
      <GradientOrb className="orb-3" />

      <div className="hero-container">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="hero-badge-dot" />
          Open to Opportunities
        </motion.div>

        <h1 className="hero-name">
          <AnimatedText text="Anmol" className="gradient-text" delay={0.4} />
          <br />
          <AnimatedText text="Mishra" delay={0.7} />
        </h1>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Computer Science & AI student crafting intelligent systems with{' '}
          <strong>Python, Java & Generative AI</strong>. Building the future one algorithm at a time.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton
            className="btn-gradient"
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>View Projects</span>
            <HiArrowRight size={18} />
          </MagneticButton>
          <MagneticButton
            className="btn-outline"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Get in Touch</span>
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span>Scroll</span>
        <span className="scroll-line" />
      </motion.div>
    </section>
  );
};

export default Hero;
