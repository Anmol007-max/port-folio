import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const linesRef = useRef([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          const exitTl = gsap.timeline({
            onComplete: () => onComplete?.(),
          });

          exitTl
            .to('.loader-content', {
              scale: 0.95,
              opacity: 0,
              duration: 0.4,
              ease: 'power3.in',
            })
            .to(
              '.loader-curtain-top',
              {
                yPercent: -100,
                duration: 0.7,
                ease: 'power4.inOut',
              },
              '-=0.1'
            )
            .to(
              '.loader-curtain-bottom',
              {
                yPercent: 100,
                duration: 0.7,
                ease: 'power4.inOut',
              },
              '<'
            )
            .to(
              loaderRef.current,
              {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.out',
              },
              '-=0.15'
            );
        },
      });

      // Animate decorative lines
      tl.fromTo(
        linesRef.current.filter(Boolean),
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );

      // Name reveal
      tl.fromTo(
        nameRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // Progress bar
      tl.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.8,
          ease: 'power2.inOut',
          onUpdate: function () {
            const progress = Math.round(this.progress() * 100);
            setCount(progress);
          },
        },
        '-=0.2'
      );
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="loader-overlay" ref={loaderRef}>
      <div className="loader-curtain-top" />
      <div className="loader-curtain-bottom" />

      <div className="loader-content">
        <div className="loader-lines">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="loader-line"
              ref={(el) => (linesRef.current[i] = el)}
              style={{ width: `${40 + i * 15}px` }}
            />
          ))}
        </div>

        <div className="loader-name" ref={nameRef}>
          <span>A</span>
          <span className="loader-dot" />
          <span>M</span>
        </div>

        <p className="loader-tagline" ref={taglineRef}>
          Building Digital Experiences
        </p>

        <div className="loader-progress-wrapper">
          <div className="loader-progress-track">
            <div className="loader-progress-bar" ref={progressRef} />
          </div>
          <span className="loader-counter">{count}%</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
