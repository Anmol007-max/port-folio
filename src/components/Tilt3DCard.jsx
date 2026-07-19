import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Tilt3DCard — Subtle mouse-tracking 3D perspective tilt.
 * Used on project rows for tactile depth.
 * No glare overlay — clean editorial feel.
 */
const Tilt3DCard = ({
  children,
  className = '',
  style = {},
  tiltMax = 3,
  scale = 1.01,
  ...props
}) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTilt({
      x: (y - 0.5) * -tiltMax * 2,
      y: (x - 0.5) * tiltMax * 2,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
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
        damping: 25,
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
    </motion.div>
  );
};

export default Tilt3DCard;
