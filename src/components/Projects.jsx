import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiArrowUpRight, HiLink } from 'react-icons/hi2';
import SectionHeading from './SectionHeading';

const projects = [
  {
    number: '01',
    title: 'Algorythm',
    year: '2026',
    tech: ['React 18', 'Vite', 'Tailwind CSS', 'D3.js', 'Framer Motion', 'Zustand', 'Express.js'],
    description: [
      'Built a full-stack DSA algorithm visualizer supporting sorting, graph traversal (BFS, DFS, Dijkstra), and tree algorithms with real-time animated step-by-step breakdowns.',
      'Integrated an in-browser Monaco Editor and an AI assistant to explain algorithmic logic interactively.',
      'Deployed as a production-grade web app with smooth UI transitions powered by Framer Motion and global state via Zustand.',
    ],
    liveUrl: 'https://anmol007-max.github.io/Algorythm',
    githubUrl: 'https://github.com/anmol007-max/Algorythm',
  },
  {
    number: '02',
    title: 'MINDBOT',
    year: '2025',
    tech: ['Python', 'NLP', 'Emotion Detection', 'Generative AI'],
    description: [
      'Developed an AI-powered mental health chatbot capable of detecting user emotions from text using NLP classification techniques.',
      'Designed empathetic conversational flows that adapt responses based on detected emotional state, improving contextual relevance.',
      'Applied text preprocessing, tokenization, and sentiment analysis pipelines to ensure accurate and safe user interactions.',
    ],
    githubUrl: '#',
  },
  {
    number: '03',
    title: 'Token Optimizer',
    year: '2026',
    tech: ['Java', 'Regex', 'Prompt Engineering', 'LLM Tokenization'],
    description: [
      'Built a Java-based tokenization engine using regex pattern matching to parse and segment natural language text into structured token streams.',
      'Developed a PromptTester module to benchmark and compare prompt formats across multiple LLM input scenarios, enabling data-driven prompt optimization.',
      'Maintained versioned prompt datasets across iterative test cycles, reducing redundant token usage and improving LLM inference efficiency.',
    ],
    githubUrl: '#',
  },
];

const projectVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="container">
        <SectionHeading number="03" title="Featured Projects" />

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="project-card"
              custom={i}
              variants={projectVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ y: -4 }}
            >
              <div className="project-number">{project.number}</div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-year">{project.year}</span>
                </div>

                <div className="project-tech">
                  {project.tech.map((t) => (
                    <motion.span
                      key={t}
                      className="skill-pill"
                      whileHover={{ scale: 1.05 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

                <ul className="project-description">
                  {project.description.map((desc, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.15 + j * 0.08, duration: 0.5 }}
                    >
                      {desc}
                    </motion.li>
                  ))}
                </ul>

                <div className="project-links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      <HiLink size={16} />
                      Live Demo
                      <HiArrowUpRight size={14} />
                    </a>
                  )}
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub
                      <HiArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
