import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiCodeBracket, HiCpuChip, HiGlobeAlt, HiWrenchScrewdriver, HiAcademicCap } from 'react-icons/hi2';
import SectionHeading from './SectionHeading';

const skillCategories = [
  {
    title: 'Languages',
    icon: <HiCodeBracket />,
    skills: ['Python', 'Java'],
  },
  {
    title: 'AI / ML',
    icon: <HiCpuChip />,
    skills: ['NLP', 'LLMs', 'Prompt Engineering', 'Emotion Detection'],
  },
  {
    title: 'Backend',
    icon: <HiGlobeAlt />,
    skills: ['Spring Boot', 'Spring Framework'],
  },
  {
    title: 'CS Fundamentals',
    icon: <HiAcademicCap />,
    skills: ['Data Structures', 'Algorithms', 'OOP'],
  },
  {
    title: 'Dev Environment',
    icon: <HiCodeBracket />,
    skills: ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA'],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="container">
        <SectionHeading label="02 — Skills" title="What I Work With" />

        <motion.div
          className="skills-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="skill-category"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            >
              <div className="skill-category-icon">{cat.icon}</div>
              <h3 className="skill-category-title">{cat.title}</h3>
              <div className="skill-tags">
                {cat.skills.map((skill) => (
                  <span key={skill} className="mono-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
