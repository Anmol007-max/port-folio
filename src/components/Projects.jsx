import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiArrowUpRight, HiLink, HiFolder } from 'react-icons/hi2';
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
    githubUrl: 'https://github.com/Anmol007-max/Ai-Based-Mental-Health-Chatbot-With-Emotion-Detection',
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
    githubUrl: 'https://github.com/Anmol007-max/token-optimizer',
  },
];

const projectVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
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
    <section className="section" id="projects" ref={ref} style={{ position: 'relative' }}>
      {/* Decorative background blob */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '0',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(196,89,58,0.03), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        <SectionHeading number="03" title="Featured Projects" />

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="project-card glass-card"
              custom={i}
              variants={projectVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ y: -8, scale: 1.01 }}
            >
              <div className="project-number">
                <HiFolder style={{ opacity: 0.5, marginRight: '1rem', color: 'var(--violet)' }} />
                {project.number}
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-year">{project.year}</span>
                </div>

                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="skill-pill"
                      style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                    >
                      {t}
                    </span>
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
                      <HiLink size={18} />
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
