import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ponytail: Using inline SVG and system cursive fonts to avoid external dependencies.
// The sequence is timed precisely: signature (0-1.6s) -> flourish (1.5-2.4s) -> stamp (2.5s) -> exit (3.7s).
const Loader = ({ onComplete }) => {
  const [stampTriggered, setStampTriggered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Tie to real load state in heavy production apps. Here, 2.5s guarantees the minimum sequence plays out.
    const stampTimer = setTimeout(() => {
      setStampTriggered(true);
      setTimeout(() => setIsExiting(true), 1200);
    }, 2500);

    return () => clearTimeout(stampTimer);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#F7F4EE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Signature Reveal */}
            <motion.div
              style={{
                fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                fontSize: '44px',
                color: '#1B1B18',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                lineHeight: 1,
                padding: '0 8px', // Prevent cursive tail clipping
              }}
              initial={{ width: 0 }}
              animate={{ width: '280px' }} // Measured width for "Anmol Mishra"
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            >
              Anmol Mishra
            </motion.div>

            {/* Flourish Draw */}
            <motion.svg
              width="240"
              height="24"
              viewBox="0 0 240 24"
              fill="none"
              style={{ marginTop: '2px' }}
            >
              <motion.path
                d="M 10 12 Q 60 22, 120 12 T 230 12"
                stroke="#2F4A3C"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 1.5, ease: 'easeInOut' }}
              />
            </motion.svg>

            {/* Wax Seal Stamp */}
            {stampTriggered && (
              <motion.div
                style={{
                  position: 'absolute',
                  right: '-30px',
                  bottom: '-25px',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1.5px solid #2F4A3C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F7F4EE',
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, mass: 1 }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '0.5px solid #2F4A3C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      color: '#2F4A3C',
                      fontSize: '16px',
                      lineHeight: 1,
                      marginTop: '2px', // Optical baseline adjustment
                    }}
                  >
                    AM
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
