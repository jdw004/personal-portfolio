import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const PortfolioWebsite = () => {
  const [typingText, setTypingText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const experienceMenuRefs = useRef([]);

  const fullText = "Hey there, I'm\nJohn Welch\nI write code.";
  
  // Define experiences data
  const experiences = [
    {
      company: 'OCV, LLC',
      position: 'Software Engineer Intern',
      period: 'January 2025 - Present',
      details: [
        'Built an analytics platform to calculate and serve classical core datasets (engagement, retention, acquisition, monetization)',
        'Developed an event ingestion pipeline (10GB/s) to enable analysis for internal business intelligence',
        'Designed and implemented an Analytics SDK to empower creators to measure and analyze user interactions'
      ]
    },
    {
      company: 'LPL Financial',
      position: 'Software Engineer Intern',
      period: 'June 2024 - August 2024',
      details: [
        'Created responsive web applications using React and TypeScript',
        'Implemented complex data visualizations for business analytics dashboard',
        'Led a team of 3 developers to redesign the company\'s main product interface'
      ]
    },
    {
      company: 'Welch Sneaks',
      position: 'Founder',
      period: 'March 2021 - May 2023',
      details: [
        'Developed and maintained RESTful APIs using Node.js',
        'Built UI components using modern frontend frameworks',
        'Participated in agile development processes and sprint planning'
      ]
    }
  ];

  // Define projects data
  const projects = [
    {
      name: 'Mars Meteo',
      description: 'A platform that allows for the development, testing, and deploying of algorithmic trading strategies.',
      details: 'Developers are able to create standalone signal and position algorithms, test arbitrary pairs of each on historical data, and deploy a given pair to run in a live environment.',
      tags: ['python', 'events', 'stats']
    },
    {
      name: 'Lyric Vibe',
      description: 'A chess bot that plays live and tries not to suck.',
      details: 'The bot plays in blitz chess against live players using a trained machine learning model and tracks its progress over time.',
      tags: ['python', 'machine-learning', 'game']
    }
  ];
  
  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      const sections = ['home', 'experience', 'projects', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (
            scrollPosition >= offsetTop - 100 && 
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (typingText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypingText(fullText.slice(0, typingText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typingText, fullText]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

   // This runs right after the DOM is updated, before paint.
   useLayoutEffect(() => {
    // Trim the refs array to match experiences
    experienceMenuRefs.current = experienceMenuRefs.current.slice(0, experiences.length);

    // If the first item is valid, set the initial position
    if (experienceMenuRefs.current[0] && experienceMenuRefs.current[0].offsetTop) {
      setIndicatorPosition(experienceMenuRefs.current[0].offsetTop);
    }
  }, [experiences.length]);

  // Update indicator position when currentExperience changes
  useLayoutEffect(() => {
    const currentRef = experienceMenuRefs.current[currentExperience];
    if (currentRef && currentRef.offsetTop) {
      setIndicatorPosition(currentRef.offsetTop);
    }
  }, [currentExperience]);
  
  // Initialize experience menu refs
  useEffect(() => {
    experienceMenuRefs.current = experienceMenuRefs.current.slice(0, experiences.length);
    // Set initial indicator position
    if (experienceMenuRefs.current[0] && experienceMenuRefs.current[0].offsetTop) {
      setIndicatorPosition(experienceMenuRefs.current[0].offsetTop);
    }
  }, [experiences.length]);
  
  // Update indicator position when changing experience
  useEffect(() => {
    if (experienceMenuRefs.current[currentExperience] && experienceMenuRefs.current[currentExperience].offsetTop) {
      setIndicatorPosition(experienceMenuRefs.current[currentExperience].offsetTop);
    }
  }, [currentExperience]);

  return (
    <div className="bg-gray-900 text-white min-h-screen text-3xl" style={{ scrollBehavior: 'smooth' }}>
      <header className="p-6 flex justify-between items-center fixed top-0 left-0 right-0 bg-gray-900 z-50">
        <a href="#home" className="text-cyan-400">
          <div className="font-bold text-4xl font-mono">JW</div>
        </a>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a 
                href="#home" 
                style={{ 
                  color: activeSection === 'home' ? 'rgb(34 211 238)' : 'rgb(209 213 219)',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== 'home') e.currentTarget.style.color = 'rgb(34 211 238)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== 'home') e.currentTarget.style.color = 'rgb(209 213 219)';
                }}
              >
                About Me
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                style={{ 
                  color: activeSection === 'experience' ? 'rgb(34 211 238)' : 'rgb(209 213 219)',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== 'experience') e.currentTarget.style.color = 'rgb(34 211 238)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== 'experience') e.currentTarget.style.color = 'rgb(209 213 219)';
                }}
              >
                Experience
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                style={{ 
                  color: activeSection === 'projects' ? 'rgb(34 211 238)' : 'rgb(209 213 219)',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== 'projects') e.currentTarget.style.color = 'rgb(34 211 238)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== 'projects') e.currentTarget.style.color = 'rgb(209 213 219)';
                }}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                style={{ 
                  color: activeSection === 'contact' ? 'rgb(34 211 238)' : 'rgb(209 213 219)',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== 'contact') e.currentTarget.style.color = 'rgb(34 211 238)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== 'contact') e.currentTarget.style.color = 'rgb(209 213 219)';
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Side links with icons */}
      <div className="fixed left-6 bottom-0 flex flex-col items-center z-40 text-2xl">
        <div className="flex flex-col space-y-6 mb-8">
          <a 
            href="https://github.com/jdw004" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group"
            aria-label="GitHub"
            style={{ color: 'rgb(156 163 175)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(34 211 238)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156 163 175)'}
          >
            <Github size={42} />
          </a>
          <a 
            href="https://www.linkedin.com/in/johnd-welch/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group"
            aria-label="LinkedIn"
            style={{ color: 'rgb(156 163 175)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(34 211 238)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156 163 175)'}
          >
            <Linkedin size={42} />
          </a>
          <a 
            href="mailto:jwelch04@outlook.com" 
            className="group"
            aria-label="Email"
            style={{ color: 'rgb(156 163 175)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(34 211 238)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156 163 175)'}
          >
            <Mail size={42} />
          </a>
        </div>
        <div className="h-24 w-px bg-gray-700"></div>
      </div>

      {/* Right side links */}
      {/* text-2xl for bigger text on the right side */}
      <div className="fixed right-6 bottom-0 flex flex-col items-center z-40 text-3xl">
        <div className="flex flex-col space-y-6 mb-8">
          <a
            href="mailto:jwelch04@outlook.com"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 writing-mode-vertical-right"
          >
            jwelch04@outlook.com
          </a>
        </div>
        <div className="h-24 w-px bg-gray-700"></div>
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 pt-24">
        {/* Home Section */}
        <section id="home" className="h-screen flex flex-col items-center justify-center">
          <div className="text-left font-mono text-white text-7xl mb-8">
            <pre className="whitespace-pre-wrap">
              {typingText}
              {showCursor && <span className="text-cyan-400">_</span>}
            </pre>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen py-24">
          <h2 className="text-cyan-400 font-mono text-2xl mb-16">/hdng/Experience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-8 gap-6 mx-auto max-w-5xl">
            {/* Experience Menu (Left Side) */}
            <div className="md:col-span-3 relative">
              <div className="font-mono sticky top-24">
                {/* Moving indicator */}
                <div 
                  className="absolute w-2 h-8 bg-cyan-400 transition-all duration-300 ease-in-out" 
                  style={{ 
                    top: `${indicatorPosition}px`, 
                    left: "-10px"
                  }}
                />
                
                {/* Experience Menu Items */}
                {experiences.map((exp, index) => (
                  <div 
                    key={index}
                    ref={el => experienceMenuRefs.current[index] = el}
                    className={`py-2 mb-4 pl-4 cursor-pointer transition-colors duration-300 ${
                      index === currentExperience ? 'text-white' : 'text-gray-400'
                    }`}
                    onClick={() => setCurrentExperience(index)}
                  >
                    /job/{exp.company}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Experience Content (Right Side) */}
            <div className="md:col-span-9">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className={`transition-opacity duration-500 ${
                    index === currentExperience ? 'opacity-100 block' : 'opacity-0 hidden'
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="text-white text-xl font-mono">
                      Software Engineer @ 
                      <span className="text-cyan-400"> {exp.company}</span>
                    </h3>
                    <p className="text-gray-300 font-mono">{exp.period}</p>
                  </div>
                  
                  <div className="mt-8">
                    {exp.details.map((detail, idx) => (
                      <div key={idx} className="mb-6 font-mono">
                        <span className="text-cyan-400">{'>'}</span>
                        <span className="ml-4 text-white">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-24">
          <h2 className="text-cyan-400 font-mono text-2xl mb-16">/hdng/Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-20">
              <h3 className="text-cyan-400 font-mono text-xl mb-6">
                /proj/<span className="text-white">{project.name}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="font-mono text-right md:text-left border border-gray-700 bg-gray-800 p-4 rounded-lg shadow-lg">
                  {/* Placeholder for project image/visualization */}
                  <div className="h-40 flex items-center justify-center border border-dashed border-gray-600 rounded">
                    <span className="text-gray-400">{project.name} Interface</span>
                  </div>
                </div>
                <div className="font-mono text-right">
                  <p className="text-white mb-6">{project.description}</p>
                  <p className="text-gray-300 text-sm mb-8">{project.details}</p>
                  <div className="flex flex-wrap justify-end gap-4">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-cyan-400">/tag/{tag}</span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <a href="#" className="text-cyan-400 hover:text-white transition-colors duration-300"> Github</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 flex flex-col items-center">
          <h2 className="text-cyan-400 font-mono text-2xl mb-16">/hdng/Contact-Me</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white font-mono mb-12">
              I am currently looking for new opportunities, and my inbox is always open. 
              Please don't hesitate to reach out with any questions or just to say hello.
              I'll get back to you as soon as I can!
            </p>
            <div className="flex justify-center gap-6">
              <a href="mailto:jwelch04@outlook.com" className="text-cyan-400 hover:text-white transition-colors duration-300 flex items-center">
                <Mail size={18} className="mr-2" /> Email
              </a>
            </div>
          </div>
          <div className="mt-32 text-gray-400 text-xl font-mono">
            Built with inspo from  
            <a href="https://github.com/wumphlett/willhumphlett" className="text-cyan-400 mx-1 hover:text-white transiti on-colors duration-300"> Will Humphlett</a> &
            <a href="https://github.com/jmurrah/personal-portfolio" className="text-cyan-400 mx-1 hover:text-white transition-colors duration-300"> Jacob Murrah</a>
            <div className="mt-2 text-center">
              Source on <a href="https://github.com/jdw004/personal-portfolio" className="text-cyan-400 hover:text-white transition-colors duration-300">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      {/* Global styles for vertical text */}
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
        
        .writing-mode-vertical-right {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
};

export default PortfolioWebsite;
