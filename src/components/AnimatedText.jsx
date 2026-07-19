import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedText = ({ text, className = '', as: Tag = 'span', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const chars = text.split('');
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 12,
            delay: delay + i * 0.035,
          }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
};

export default AnimatedText;
