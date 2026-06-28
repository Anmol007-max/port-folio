import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { HiArrowRight, HiArrowDown } from 'react-icons/hi2';
import { useState, useEffect, useRef, useCallback } from 'react';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';

const roles = [
  'AI & ML Enthusiast',
  'Full-Stack Developer',
  'Problem Solver',
  'Open Source Contributor',
];

const stats = [
  { value: '7+', label: 'Projects' },
  { value: '8+', label: 'Certifications' },
  { value: '3+', label: 'Languages' },
];

const ParticleSphere = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const count = 140;
    const points = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      points.push({
        x: Math.cos(theta) * radius,
        y: y,
        z: Math.sin(theta) * radius,
      });
    }

    const sphereRadius = 125; 
    let rotY = 0;
    let rotX = 0;
    const baseRotSpeed = 0.003;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const project = (px, py, pz) => {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      let x = px * cosY - pz * sinY;
      let z = px * sinY + pz * cosY;
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      let y = py * cosX - z * sinX;
      let z2 = py * sinX + z * cosX;

      const fov = 500;
      const scale = fov / (fov + z2 * sphereRadius);
      return {
        sx: x * sphereRadius * scale,
        sy: y * sphereRadius * scale,
        z: z2,
        scale,
      };
    };

    const colors = ['45, 106, 79', '27, 122, 120', '30, 58, 95', '196, 89, 58'];

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      rotY += baseRotSpeed + mouseRef.current.x * 0.002;
      rotX += mouseRef.current.y * 0.001;

      const projected = points.map((p, i) => {
        const proj = project(p.x, p.y, p.z);
        return { ...proj, idx: i };
      });

      projected.sort((a, b) => a.z - b.z);

      const connectionDist = 0.45;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i], b = projected[j];
          if (a.z < -0.3 && b.z < -0.3) continue; 
          const dx = points[a.idx].x - points[b.idx].x;
          const dy = points[a.idx].y - points[b.idx].y;
          const dz = points[a.idx].z - points[b.idx].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < connectionDist) {
            const avgZ = (a.z + b.z) / 2;
            const alpha = Math.max(0, Math.min(0.12, (avgZ + 1) * 0.08));
            ctx.beginPath();
            ctx.moveTo(cx + a.sx, cy + a.sy);
            ctx.lineTo(cx + b.sx, cy + b.sy);
            ctx.strokeStyle = `rgba(45, 106, 79, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      projected.forEach((p) => {
        const alpha = Math.max(0.1, Math.min(0.85, (p.z + 1) * 0.5));
        const size = Math.max(1, 3 * p.scale);
        const colorIdx = p.idx % colors.length;

        ctx.beginPath();
        ctx.arc(cx + p.sx, cy + p.sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors[colorIdx]}, ${alpha})`;
        ctx.fill();

        if (p.z > 0.3) {
          ctx.beginPath();
          ctx.arc(cx + p.sx, cy + p.sy, size * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            cx + p.sx, cy + p.sy, 0,
            cx + p.sx, cy + p.sy, size * 3
          );
          gradient.addColorStop(0, `rgba(${colors[colorIdx]}, ${alpha * 0.2})`);
          gradient.addColorStop(1, `rgba(${colors[colorIdx]}, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-3d-canvas" />;
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
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 25 });

  const tiltX = useTransform(smoothY, [-10, 10], [1.5, -1.5]);
  const tiltY = useTransform(smoothX, [-10, 10], [-1.5, 1.5]);

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  return (
    <section className="hero" id="hero" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="hero-mesh-bg">
        <motion.div
          className="hero-mesh-blob hero-mesh-1"
          animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-mesh-blob hero-mesh-2"
          animate={{ x: [0, -50, 40, 0], y: [0, 30, -50, 0], scale: [1, 0.85, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-mesh-blob hero-mesh-3"
          animate={{ x: [0, 35, -45, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="hero-split"
        style={{ rotateX: tiltX, rotateY: tiltY, scale: heroScale, opacity: heroOpacity }}
      >
        <div className="hero-text-col">
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
                transition={{ duration: 0.5, delay: 1.5 + i * 0.15 }}
                whileHover={{ y: -4, scale: 1.05 }}
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
        </div>

        <motion.div
          className="hero-3d-col"
          initial={{ opacity: 0, scale: 0.8, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <ParticleSphere />

          <motion.div
            className="hero-geo geo-decoration"
            style={{ top: '10%', right: '15%' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <div className="geo-cube">
              {[...Array(6)].map((_, i) => <div key={i} className="geo-cube-face" />)}
            </div>
          </motion.div>

          <motion.div
            className="hero-geo geo-decoration"
            style={{ bottom: '15%', left: '5%' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <div className="geo-ring" />
          </motion.div>

          <motion.div
            className="hero-geo geo-decoration"
            style={{ top: '65%', right: '5%' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <div className="geo-diamond" />
          </motion.div>

          <motion.div
            className="hero-geo geo-decoration"
            style={{ top: '25%', left: '-5%' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
          >
            <div className="geo-pyramid">
              <div className="geo-pyramid-face geo-pyramid-front" />
              <div className="geo-pyramid-face geo-pyramid-back" />
              <div className="geo-pyramid-face geo-pyramid-left" />
              <div className="geo-pyramid-face geo-pyramid-right" />
              <div className="geo-pyramid-base" />
            </div>
          </motion.div>

          <div className="hero-orbit-ring" />
          <div className="hero-orbit-ring hero-orbit-ring-2" />
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span>Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
};

export default Hero;
