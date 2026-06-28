import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Tilt3DCard — Subtle mouse-tracking 3D perspective tilt.
 * Feels handcrafted and premium, never gimmicky.
 *
 * @param {number} tiltMax - Max tilt angle in degrees (default: 6)
 * @param {boolean} glare  - Whether to show a soft highlight glare
 * @param {number} scale   - Hover scale factor (default: 1.02)
 */
const Tilt3DCard = ({
  children,
  className = '',
  style = {},
  tiltMax = 6,
  glare = false,
  scale = 1.02,
  as = 'div',
  ...props
}) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTilt({
      x: (y - 0.5) * -tiltMax * 2,  // rotateX
      y: (x - 0.5) * tiltMax * 2,    // rotateY
      glareX: x * 100,
      glareY: y * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      className={`tilt-3d-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovered ? scale : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        mass: 0.8,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '800px',
        ...style,
      }}
      {...props}
    >
      {children}
      {glare && (
        <div
          className="tilt-glare"
          style={{
            opacity: isHovered ? 0.12 : 0,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.5), transparent 60%)`,
          }}
        />
      )}
    </MotionTag>
  );
};

export default Tilt3DCard;
