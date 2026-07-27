import { useEffect, useRef } from 'react';

/**
 * Thin 1px vertical line on the left edge of the viewport
 * that fills downward as the user scrolls — reinforces the
 * editorial "reading a document" feel.
 */
const ScrollProgress = () => {
  const fillRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (fillRef.current) {
        fillRef.current.style.height = `${progress}%`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={fillRef} className="scroll-progress-fill" />
    </div>
  );
};

export default ScrollProgress;
