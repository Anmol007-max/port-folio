import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';

const education = [
  {
    degree: 'B.Tech — Computer Science Engineering (AI)',
    school: 'Galgotias College of Engineering and Technology, Greater Noida',
    university: 'AKTU',
    date: 'Sep 2024 — Jun 2028',
    coursework: 'Data Structures & Algorithms, Machine Learning, Neural Networks, OOP, DBMS, Operating Systems',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <SectionHeading number="01" title="About Me" />

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              I'm a <span className="about-highlight">results-driven Computer Science Engineering</span> student 
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
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {education.map((edu, i) => (
              <motion.div
                key={i}
                className="education-item"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              >
                <div className="education-degree">{edu.degree}</div>
                <div className="education-school">
                  {edu.school} • {edu.university}
                </div>
                <div className="education-date">{edu.date}</div>
                {edu.coursework && (
                  <div className="education-coursework">
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
