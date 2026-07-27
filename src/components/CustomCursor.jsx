import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom cursor: a small ring that fills/scales on interactive hover.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 * All styling lives in index.css (.custom-cursor).
 */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  // Check for pointer:fine at mount — if not, render nothing
  const isPointerFine = typeof window !== 'undefined'
    && window.matchMedia('(pointer: fine)').matches;

  const render = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform =
        `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    }
    raf.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cursorRef.current?.classList.remove('hidden');
    };

    const onLeave = () => {
      cursorRef.current?.classList.add('hidden');
    };

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, .magnetic-btn, .btn-primary, .btn-secondary, .contact-cta, .project-link, .footer-link, .footer-back-top, .nav-link, .nav-mobile-toggle, .nav-wordmark, .cert-closing-link';

    const addHover = () => cursorRef.current?.classList.add('hovering');
    const removeHover = () => cursorRef.current?.classList.remove('hovering');

    // Delegate via pointerover / pointerout to avoid attaching per-element
    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE)) addHover();
    };
    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE)) removeHover();
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });

    raf.current = requestAnimationFrame(render);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      cancelAnimationFrame(raf.current);
    };
  }, [isPointerFine, render]);

  if (!isPointerFine) return null;

  return <div ref={cursorRef} className="custom-cursor hidden" />;
};

export default CustomCursor;
