// Portfolio.js
import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ParticleBackground from './ParticleBackground';
import { useTheme } from '../ThemeContext';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { darkMode } = useTheme();

  // Navigation data
  const navigation = [
    { name: 'Home', href: '#home', section: 'home' },
    { name: 'About', href: '#about', section: 'about' },
    { name: 'Skills', href: '#skills', section: 'skills' },
    { name: 'Projects', href: '#projects', section: 'projects' },
    { name: 'Contact', href: '#contact', section: 'contact' },
  ];

  // Skills data
  const skills = [
    { 
      category: 'Programming', 
      items: ['JavaScript', 'Python', 'Java', 'React.js', 'Node.js'] 
    },
    { 
      category: 'Tools & Technologies', 
      items: ['Git', 'Docker', 'AWS', 'MongoDB', 'SQL'] 
    },
    { 
      category: 'Soft Skills', 
      items: ['Problem Solving', 'Team Leadership', 'Communication', 'Project Management'] 
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-b from-[#2D1B69] to-black text-white' 
        : 'bg-gradient-to-b from-white to-gray-100 text-gray-900'
    }`}>
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full backdrop-blur-md z-50 ${
        darkMode ? 'bg-black/50' : 'bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo if needed */}
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    activeSection === item.section
                      ? darkMode 
                        ? 'text-[#FF008C] border-b-2 border-[#FF008C] neon-text'
                        : 'text-[#FF008C] border-b-2 border-[#FF008C]'
                      : darkMode
                        ? 'text-white hover:text-[#00F0FF] hover:neon-blue-text'
                        : 'text-gray-900 hover:text-[#00F0FF]'
                  } transition-all duration-200 cyberpunk-text py-1`}
                  onClick={() => setActiveSection(item.section)}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${
                  darkMode ? 'text-white hover:text-[#FF008C]' : 'text-gray-900 hover:text-[#FF008C]'
                } transition-colors duration-200`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden backdrop-blur-md animate-fade-in ${
            darkMode ? 'bg-black/90' : 'bg-white/90'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md transition-colors duration-200 cyberpunk-text ${
                    darkMode
                      ? 'text-white hover:text-[#FF008C] hover:bg-[#FF008C]/10'
                      : 'text-gray-900 hover:text-[#FF008C] hover:bg-[#FF008C]/10'
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveSection(item.section);
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>{/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden">
        <ParticleBackground />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className={`text-6xl font-bold cyberpunk-text mb-6 ${
            darkMode ? 'animate-cyber-glow' : ''
          }`}>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF008C] to-[#00F0FF] animate-text-shimmer">
              Mehara Rothila Ranawaka
            </span>
          </h1>
          <p className={`text-2xl cyberpunk-text mb-8 animate-float ${
            darkMode ? 'text-[#FF008C]/90' : 'text-[#FF008C]'
          }`} 
             style={{ animationDelay: '0.2s' }}>
            Information Technology & Management Undergraduate
          </p>
          <p className={`text-lg cyberpunk-text mb-12 animate-float ${
            darkMode ? 'text-[#00F0FF]/80' : 'text-[#00F0FF]'
          }`} 
             style={{ animationDelay: '0.4s' }}>
            University of Moratuwa
          </p>
          <div className="flex justify-center space-x-6 animate-float" 
               style={{ animationDelay: '0.6s' }}>
            <a href="https://github.com/mehara-rothila" 
               target="_blank"
               rel="noopener noreferrer"
               className={`transform hover:scale-110 transition-all duration-200 ${
                 darkMode ? 'text-[#FF008C] hover:text-[#00F0FF]' : 'text-[#FF008C] hover:text-[#00F0FF]'
               }`}>
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/mehara-rothila-6956a2255" 
               target="_blank"
               rel="noopener noreferrer"
               className={`transform hover:scale-110 transition-all duration-200 ${
                 darkMode ? 'text-[#FF008C] hover:text-[#00F0FF]' : 'text-[#FF008C] hover:text-[#00F0FF]'
               }`}>
              <Linkedin size={24} />
            </a>
            <a href="mailto:rothilamehara22@gmail.com" 
               className={`transform hover:scale-110 transition-all duration-200 ${
                 darkMode ? 'text-[#FF008C] hover:text-[#00F0FF]' : 'text-[#FF008C] hover:text-[#00F0FF]'
               }`}>
              <Mail size={24} />
            </a>
          </div>
          <div className="mt-12 animate-bounce-slow">
            <ChevronDown size={32} className={`mx-auto ${
              darkMode ? 'text-[#00F0FF]' : 'text-[#00F0FF]'
            }`} />
          </div>
        </div>
      </section>{/* About Section */}
      <section id="about" className="cyberpunk-section py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 cyberpunk-text">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF008C] to-[#00F0FF] animate-text-shimmer">
              About Me
            </span>
          </h2>

          <div className={`max-w-3xl mx-auto cyberpunk-card p-8 rounded-xl transform hover:scale-105 
            transition-all duration-300 ${
              darkMode ? 'bg-black/30' : 'bg-white/90'
            }`}>
            <p className={`text-lg leading-relaxed ${
              darkMode ? 'text-white/90' : 'text-gray-800'
            }`}>
              I am an undergraduate student pursuing a BSc (Hons) in Information Technology and Management 
              at the University of Moratuwa. Passionate about technology and its application in solving 
              real-world problems, I am constantly learning and expanding my skill set in various areas 
              of software development and IT management.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="cyberpunk-section py-20 relative overflow-hidden">
        <ParticleBackground />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 cyberpunk-text">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF008C] to-[#00F0FF] animate-text-shimmer">
              Skills
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} 
                className={`cyberpunk-card p-6 rounded-xl transform hover:-translate-y-2 
                  transition-all duration-300 ${
                    darkMode ? 'bg-black/30' : 'bg-white/90'
                  }`}>
                <h3 className="text-xl cyberpunk-text text-[#FF008C] mb-4">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} 
                        className={`transition-colors duration-200 ${
                          darkMode 
                            ? 'text-white/80 hover:text-[#00F0FF]'
                            : 'text-gray-800 hover:text-[#00F0FF]'
                        }`}>
                      <span className="text-[#FF008C]">></span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>{/* Projects Section */}
      <section id="projects" className="cyberpunk-section py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 cyberpunk-text">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF008C] to-[#00F0FF] animate-text-shimmer">
              Projects
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className={`cyberpunk-card p-6 rounded-xl transform hover:-translate-y-2 
              transition-all duration-300 ${darkMode ? 'bg-black/30' : 'bg-white/90'}`}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl cyberpunk-text text-[#FF008C]">
                  Quiz App
                </h3>
                <span className={`text-sm cyberpunk-text ${
                  darkMode ? 'text-[#00F0FF]' : 'text-[#00F0FF]'
                }`}>
                  Sep 2024 - Oct 2024
                </span>
              </div>
              <p className={`mb-4 ${
                darkMode ? 'text-white/80' : 'text-gray-700'
              }`}>
                A dynamic, interactive platform that tests users' knowledge across multiple programming 
                languages such as JavaScript, Python, React, SQL, C, and Java.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/mehara-rothila/Quiz-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center transition-colors duration-200 cyberpunk-text ${
                    darkMode 
                      ? 'text-[#FF008C] hover:text-[#00F0FF]'
                      : 'text-[#FF008C] hover:text-[#00F0FF]'
                  }`}
                >
                  <Github size={16} className="mr-1" /> View Code
                </a>
                <a
                  href="https://mrr-quiz.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center transition-colors duration-200 cyberpunk-text ${
                    darkMode 
                      ? 'text-[#00F0FF] hover:text-[#FF008C]'
                      : 'text-[#00F0FF] hover:text-[#FF008C]'
                  }`}
                >
                  <ExternalLink size={16} className="mr-1" /> Live Demo
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className={`cyberpunk-card p-6 rounded-xl transform hover:-translate-y-2 
              transition-all duration-300 ${darkMode ? 'bg-black/30' : 'bg-white/90'}`}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl cyberpunk-text text-[#FF008C]">
                  Portfolio Website
                </h3>
                <span className={`text-sm cyberpunk-text ${
                  darkMode ? 'text-[#00F0FF]' : 'text-[#00F0FF]'
                }`}>
                  Oct 2024
                </span>
              </div>
              <p className={`mb-4 ${
                darkMode ? 'text-white/80' : 'text-gray-700'
              }`}>
                A cyberpunk-themed personal portfolio website built with React and Tailwind CSS, 
                featuring custom animations, theme switching, and responsive design.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/mehara-rothila/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center transition-colors duration-200 cyberpunk-text ${
                    darkMode 
                      ? 'text-[#FF008C] hover:text-[#00F0FF]'
                      : 'text-[#FF008C] hover:text-[#00F0FF]'
                  }`}
                >
                  <Github size={16} className="mr-1" /> View Code
                </a>
                <a
                  href="https://portf-cyber.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center transition-colors duration-200 cyberpunk-text ${
                    darkMode 
                      ? 'text-[#00F0FF] hover:text-[#FF008C]'
                      : 'text-[#00F0FF] hover:text-[#FF008C]'
                  }`}
                >
                  <ExternalLink size={16} className="mr-1" /> Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>{/* Contact Section */}
      <section id="contact" className="cyberpunk-section py-20 relative overflow-hidden">
        <ParticleBackground />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 cyberpunk-text">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF008C] to-[#00F0FF] animate-text-shimmer">
              Get In Touch
            </span>
          </h2>
          <div className="max-w-xl mx-auto">
            <div className={`cyberpunk-card p-8 rounded-xl transform hover:-translate-y-2 
              transition-all duration-300 ${darkMode ? 'bg-black/30' : 'bg-white/90'}`}>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <Mail className={`${
                    darkMode 
                      ? 'text-[#FF008C] group-hover:text-[#00F0FF]'
                      : 'text-[#FF008C] group-hover:text-[#00F0FF]'
                  } transition-colors duration-200`} />
                  <a href="mailto:rothilamehara22@gmail.com" 
                     className={`transition-colors duration-200 cyberpunk-text ${
                       darkMode 
                         ? 'text-white/80 hover:text-[#00F0FF]'
                         : 'text-gray-800 hover:text-[#00F0FF]'
                     }`}>
                    rothilamehara22@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-4 group">
                  <Linkedin className={`${
                    darkMode 
                      ? 'text-[#FF008C] group-hover:text-[#00F0FF]'
                      : 'text-[#FF008C] group-hover:text-[#00F0FF]'
                  } transition-colors duration-200`} />
                  <a href="https://linkedin.com/in/mehara-rothila-6956a2255" 
                     target="_blank"
                     rel="noopener noreferrer"
                     className={`transition-colors duration-200 cyberpunk-text ${
                       darkMode 
                         ? 'text-white/80 hover:text-[#00F0FF]'
                         : 'text-gray-800 hover:text-[#00F0FF]'
                     }`}>
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center space-x-4 group">
                  <Github className={`${
                    darkMode 
                      ? 'text-[#FF008C] group-hover:text-[#00F0FF]'
                      : 'text-[#FF008C] group-hover:text-[#00F0FF]'
                  } transition-colors duration-200`} />
                  <a href="https://github.com/mehara-rothila" 
                     target="_blank"
                     rel="noopener noreferrer"
                     className={`transition-colors duration-200 cyberpunk-text ${
                       darkMode 
                         ? 'text-white/80 hover:text-[#00F0FF]'
                         : 'text-gray-800 hover:text-[#00F0FF]'
                     }`}>
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 backdrop-blur-md ${
        darkMode ? 'bg-black/50' : 'bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={`cyberpunk-text ${
            darkMode ? 'text-white/60' : 'text-gray-600'
          }`}>
            © {new Date().getFullYear()} <span className="text-[#FF008C]">Mehara Rothila Ranawaka</span>.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
