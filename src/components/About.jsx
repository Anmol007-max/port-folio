import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from './SectionHeading';

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
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <SectionHeading label="01 — About" title="Who I Am" />

        <div className="about-column">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
          </motion.div>

          <motion.blockquote
            className="about-pullquote"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            When I'm not coding, I'm diving deep into prompt engineering and LLM optimization —
            finding ways to make AI systems more efficient and accessible.
          </motion.blockquote>

          <motion.div
            className="education-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="education-label">Education</div>
            {education.map((edu, i) => (
              <div key={i}>
                <div className="education-degree">{edu.degree}</div>
                <div className="education-school">{edu.school} · {edu.university}</div>
                <div className="education-date">{edu.date}</div>
                {edu.coursework && (
                  <div className="education-coursework">
                    <strong>Coursework:</strong> {edu.coursework}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
