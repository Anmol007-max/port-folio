import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiCodeBracket, HiCpuChip, HiGlobeAlt, HiWrenchScrewdriver, HiAcademicCap } from 'react-icons/hi2';
import SectionHeading from './SectionHeading';

const skillCategories = [
  {
    title: 'Languages',
    icon: <HiCodeBracket />,
    skills: ['Python', 'Java', 'C++'],
    span: false,
  },
  {
    title: 'AI / ML',
    icon: <HiCpuChip />,
    skills: ['Generative AI', 'Prompt Engineering', 'LLMs', 'NLP', 'Emotion Detection', 'Google Gen AI Studio'],
    span: true,
  },
  {
    title: 'Web & Frameworks',
    icon: <HiGlobeAlt />,
    skills: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Express.js', 'FastAPI'],
    span: true,
  },
  {
    title: 'Tools & Libraries',
    icon: <HiWrenchScrewdriver />,
    skills: ['D3.js', 'Zustand', 'Monaco Editor', 'Git', 'GitHub', 'VS Code', 'IntelliJ IDEA'],
    span: false,
  },
  {
    title: 'CS Fundamentals',
    icon: <HiAcademicCap />,
    skills: ['Data Structures', 'Algorithms', 'OOP', 'System Design', 'DBMS', 'Tokenization'],
    span: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="container">
        <SectionHeading number="02" title="Skills & Tools" />

        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className={`skill-card ${cat.span ? 'span-2' : ''}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className="skill-card-icon">{cat.icon}</div>
              <h3 className="skill-card-title">{cat.title}</h3>
              <div className="skill-card-pills">
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skill-pill"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
