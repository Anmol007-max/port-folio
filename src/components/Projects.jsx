import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';
import Tilt3DCard from './Tilt3DCard';

const projects = [
  {
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

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="container">
        <SectionHeading label="03 — Work" title="Featured Projects" />

        <div className="projects-list">
          {projects.map((project, i) => (
            <Tilt3DCard key={project.title} tiltMax={2} scale={1.005}>
              <motion.div
                className="project-row"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-year">{project.year}</span>
                </div>

                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="mono-tag">{t}</span>
                  ))}
                </div>

                <ul className="project-description">
                  {project.description.map((desc, j) => (
                    <li key={j}>{desc}</li>
                  ))}
                </ul>

                <div className="project-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </motion.div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
