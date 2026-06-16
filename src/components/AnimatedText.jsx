import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedText = ({ text, className = '', as: Tag = 'span', delay = 0, splitBy = 'char' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  if (splitBy === 'word') {
    const words = text.split(' ');
    return (
      <Tag ref={ref} className={className} aria-label={text}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', marginRight: '0.3em' }}
            initial={{ opacity: 0, y: 40, rotateX: -40 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    );
  }

  const chars = text.split('');
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 50, rotateX: -60 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
};

export default AnimatedText;
