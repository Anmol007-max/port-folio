import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';
import { HiAcademicCap } from 'react-icons/hi2';

const education = [
  {
    degree: 'B.Tech — Computer Science Engineering (AI)',
    school: 'Galgotias College of Engineering and Technology',
    university: 'AKTU',
    date: 'Sep 2024 — Jun 2028',
    coursework: 'Data Structures & Algorithms, Machine Learning, Neural Networks, OOP, DBMS, Operating Systems',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section" id="about" ref={ref} style={{ position: 'relative' }}>
      {/* Decorative background blob */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(45,106,79,0.05), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />
      
      <div className="container">
        <SectionHeading number="01" title="About Me" />

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              I'm a <span className="about-highlight gradient-text">results-driven Computer Science Engineering</span> student 
              specializing in Artificial Intelligence. With hands-on experience in{' '}
              <span className="about-highlight">Python, Java, and Generative AI</span>, I'm passionate about building 
              scalable intelligent systems that solve complex real-world problems.
            </p>
            <p>
              My work spans from building{' '}
              <span className="about-highlight">full-stack algorithm visualizers</span> to developing{' '}
              <span className="about-highlight">AI-powered chatbots with emotion detection</span>. I have a strong 
              foundation in algorithms, OOP, and NLP, and I'm constantly exploring new frontiers in 
              software engineering and AI/ML.
            </p>
            <p>
              When I'm not coding, I'm diving deep into{' '}
              <span className="about-highlight">prompt engineering</span> and{' '}
              <span className="about-highlight">LLM optimization</span> — finding ways to make AI systems 
              more efficient and accessible.
            </p>
          </motion.div>

          <motion.div
            className="education-timeline"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {education.map((edu, i) => (
              <motion.div
                key={i}
                className="education-item"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                  <div style={{ padding: '0.5rem', background: 'var(--grad-subtle)', borderRadius: '8px', color: 'var(--violet)' }}>
                    <HiAcademicCap size={20} />
                  </div>
                  <div className="education-degree">{edu.degree}</div>
                </div>
                <div className="education-school" style={{ paddingLeft: '2.8rem' }}>
                  {edu.school} • {edu.university}
                </div>
                <div className="education-date" style={{ paddingLeft: '2.8rem' }}>{edu.date}</div>
                {edu.coursework && (
                  <div className="education-coursework" style={{ paddingLeft: '2.8rem' }}>
                    <strong>Coursework:</strong> {edu.coursework}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
