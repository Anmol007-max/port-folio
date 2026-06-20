import { motion, useMotionValue, useSpring } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import { useState, useEffect, useRef } from 'react';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';
import GradientOrb from './GradientOrb';

const roles = [
  'AI & ML Enthusiast',
  'Full-Stack Developer',
  'Problem Solver',
  'Open Source Contributor',
];

const floatingShapes = [
  { size: 60, color: '#2d6a4f', x: '12%', y: '18%', delay: 0, rotate: 45, shape: 'square' },
  { size: 40, color: '#1b7a78', x: '85%', y: '22%', delay: 0.5, rotate: 0, shape: 'circle' },
  { size: 50, color: '#c4593a', x: '78%', y: '72%', delay: 1, rotate: 30, shape: 'triangle' },
  { size: 35, color: '#1e3a5f', x: '8%', y: '75%', delay: 1.5, rotate: -20, shape: 'circle' },
  { size: 28, color: '#d4a843', x: '25%', y: '85%', delay: 0.8, rotate: 60, shape: 'square' },
  { size: 45, color: '#2d6a4f', x: '90%', y: '48%', delay: 1.2, rotate: 15, shape: 'triangle' },
];

const stats = [
  { value: '7+', label: 'Projects' },
  { value: '8+', label: 'Certifications' },
  { value: '3+', label: 'Languages' },
];

const FloatingShape = ({ size, color, x, y, delay, rotate, shape }) => {
  const getShapeStyle = () => {
    const base = {
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      opacity: 0.15,
      zIndex: 0,
    };

    if (shape === 'circle') {
      return { ...base, borderRadius: '50%', background: color };
    }
    if (shape === 'square') {
      return { ...base, borderRadius: size * 0.2, background: color, transform: `rotate(${rotate}deg)` };
    }
    if (shape === 'triangle') {
      return {
        ...base,
        width: 0,
        height: 0,
        background: 'transparent',
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size}px solid ${color}`,
        opacity: 0.12,
      };
    }
    return base;
  };

  return (
    <motion.div
      style={getShapeStyle()}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: shape === 'triangle' ? 0.12 : 0.15,
        scale: 1,
        y: [0, -20, 0, 15, 0],
        x: [0, 10, 0, -8, 0],
        rotate: [rotate, rotate + 15, rotate, rotate - 10, rotate],
      }}
      transition={{
        opacity: { duration: 0.8, delay: delay + 1.5 },
        scale: { duration: 0.8, delay: delay + 1.5, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 8 + delay * 2, repeat: Infinity, ease: 'easeInOut' },
        x: { duration: 10 + delay * 2, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
  );
};

const RoleCycler = () => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="hero-role-cycler">
      {roles.map((role, i) => (
        <motion.span
          key={role}
          className="hero-role-text"
          initial={false}
          animate={{
            opacity: i === currentRole ? 1 : 0,
            y: i === currentRole ? 0 : 20,
            filter: i === currentRole ? 'blur(0px)' : 'blur(4px)',
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {role}
        </motion.span>
      ))}
    </span>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section className="hero" id="hero" ref={containerRef} onMouseMove={handleMouseMove}>
      {/* Animated gradient mesh background */}
      <div className="hero-mesh-bg">
        <motion.div
          className="hero-mesh-blob hero-mesh-1"
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-mesh-blob hero-mesh-2"
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 30, -50, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-mesh-blob hero-mesh-3"
          animate={{
            x: [0, 35, -45, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating geometric shapes */}
      {floatingShapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}

      <GradientOrb className="orb-1" />
      <GradientOrb className="orb-2" />
      <GradientOrb className="orb-3" />

      <motion.div className="hero-container" style={{ x: smoothX, y: smoothY }}>
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero-badge-dot" />
          Open to Opportunities
        </motion.div>

        <h1 className="hero-name">
          <AnimatedText text="Anmol" className="gradient-text" delay={0.4} />
          <br />
          <AnimatedText text="Mishra" delay={0.7} />
        </h1>

        {/* Animated role cycler */}
        <motion.div
          className="hero-role-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <RoleCycler />
        </motion.div>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Computer Science & AI student crafting intelligent systems with{' '}
          <strong>Python, Java & Generative AI</strong>. Building the future one algorithm at a time.
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="hero-stat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero-stat-value gradient-text">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
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
      </motion.div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span>Scroll</span>
        <span className="scroll-line" />
      </motion.div>
    </section>
  );
};

export default Hero;
