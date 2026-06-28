import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);
  const linesRef = useRef([]);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const orbsRef = useRef([]);
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
              scale: 0.9,
              opacity: 0,
              duration: 0.5,
              ease: 'power3.in',
            })
            .to(
              '.loader-curtain-top',
              {
                yPercent: -100,
                duration: 0.8,
                ease: 'power4.inOut',
              },
              '-=0.2'
            )
            .to(
              '.loader-curtain-bottom',
              {
                yPercent: 100,
                duration: 0.8,
                ease: 'power4.inOut',
              },
              '<'
            )
            .to(
              loaderRef.current,
              {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
              },
              '-=0.2'
            );
        },
      });

      orbsRef.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          x: `random(-40, 40)`,
          y: `random(-40, 40)`,
          duration: `random(3, 5)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });

      tl.fromTo(
        linesRef.current.filter(Boolean),
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );

      tl.fromTo(
        nameRef.current,
        { y: 60, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.4'
      );

      tl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.5'
      );

      tl.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: 'power2.inOut',
          onUpdate: function () {
            const progress = Math.round(this.progress() * 100);
            setCount(progress);
          },
        },
        '-=0.3'
      );

      gsap.to(nameRef.current, {
        textShadow: '0 0 40px rgba(45, 106, 79, 0.4)',
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.8,
      });
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="loader-overlay" ref={loaderRef}>
      {/* Curtain panels for the reveal */}
      <div className="loader-curtain-top" />
      <div className="loader-curtain-bottom" />

      {/* Floating gradient orbs */}
      <div
        className="loader-orb loader-orb-1"
        ref={(el) => (orbsRef.current[0] = el)}
      />
      <div
        className="loader-orb loader-orb-2"
        ref={(el) => (orbsRef.current[1] = el)}
      />
      <div
        className="loader-orb loader-orb-3"
        ref={(el) => (orbsRef.current[2] = el)}
      />

      <div className="loader-content">
        {/* Decorative animated lines */}
        <div className="loader-lines">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="loader-line"
              ref={(el) => (linesRef.current[i] = el)}
              style={{
                width: `${60 + i * 20}px`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* Animated initials */}
        <div className="loader-name" ref={nameRef}>
          <span className="loader-initial">A</span>
          <span className="loader-dot" />
          <span className="loader-initial">M</span>
        </div>

        {/* Tagline */}
        <p className="loader-tagline" ref={taglineRef}>
          Building Digital Experiences
        </p>

        {/* Progress bar */}
        <div className="loader-progress-wrapper">
          <div className="loader-progress-track">
            <div className="loader-progress-bar" ref={progressRef} />
          </div>
          <span className="loader-counter" ref={counterRef}>
            {count}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
