import { motion } from 'framer-motion';

const GradientOrb = ({ className, animate = true }) => {
  return (
    <motion.div
      className={`gradient-orb ${className}`}
      animate={
        animate
          ? {
              x: [0, 15, -10, 0],
              y: [0, -20, 10, 0],
            }
          : {}
      }
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export default GradientOrb;
