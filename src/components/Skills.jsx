import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiCodeBracket, HiCpuChip, HiGlobeAlt, HiWrenchScrewdriver, HiAcademicCap } from 'react-icons/hi2';
import SectionHeading from './SectionHeading';
import Tilt3DCard from './Tilt3DCard';

const skillCategories = [
  {
    title: 'Languages',
    icon: <HiCodeBracket />,
    skills: ['Python', 'Java', 'C++'],
    span: 1,
  },
  {
    title: 'AI / ML',
    icon: <HiCpuChip />,
    skills: ['Generative AI', 'Prompt Engineering', 'LLMs', 'NLP', 'Emotion Detection', 'Google Gen AI Studio'],
    span: 2,
  },
  {
    title: 'Web & Frameworks',
    icon: <HiGlobeAlt />,
    skills: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Express.js', 'FastAPI'],
    span: 3,
  },
  {
    title: 'Tools & Libraries',
    icon: <HiWrenchScrewdriver />,
    skills: ['D3.js', 'Zustand', 'Monaco Editor', 'Git', 'GitHub', 'VS Code', 'IntelliJ IDEA'],
    span: 2,
  },
  {
    title: 'CS Fundamentals',
    icon: <HiAcademicCap />,
    skills: ['Data Structures', 'Algorithms', 'OOP', 'System Design', 'DBMS', 'Tokenization'],
    span: 1,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      delay: 0.2 + i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="skills" ref={ref} style={{ position: 'relative', perspective: '1000px' }}>
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(30,58,95,0.04), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      {/* Floating 3D diamond decoration */}
      <motion.div
        className="section-deco section-deco-1"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.06 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="geo-diamond" />
      </motion.div>

      <div className="container">
        <SectionHeading number="02" title="Skills & Tools" />

        <div className="skills-grid" style={{ perspective: '800px' }}>
          {skillCategories.map((cat, i) => (
            <Tilt3DCard
              key={cat.title}
              className={`skill-card glass-card depth-shadow ${cat.span > 1 ? `span-${cat.span}` : ''}`}
              tiltMax={5}
              glare={true}
              scale={1.02}
              as="div"
            >
              <motion.div
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="skill-card-icon depth-pop">{cat.icon}</div>
                <h3 className="skill-card-title depth-pop-sm">{cat.title}</h3>
                <div className="skill-card-pills">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      className="skill-pill"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 + j * 0.05, duration: 0.4 }}
                      whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(45,106,79,0.1)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
