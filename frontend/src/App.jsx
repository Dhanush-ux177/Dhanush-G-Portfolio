import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ArrowRight, Code2, Briefcase, User, Send, MapPin, Phone, Sun, Moon } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('dark');

  // Typing effect – continuous loop
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const fullTitle = 'Full-Stack Developer & AI Enthusiast';

  useEffect(() => {
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseDuration = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (typedText.length < fullTitle.length) {
          setTypedText(fullTitle.slice(0, typedText.length + 1));
        } else {
          // Finished typing – pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (typedText.length > 0) {
          setTypedText(fullTitle.slice(0, typedText.length - 1));
        } else {
          // Finished deleting – reset and start again
          setIsDeleting(false);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, fullTitle]);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const [projectsRes, skillsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills')
      ]);
      const projectsData = await projectsRes.json();
      const skillsData = await skillsRes.json();
      setProjects(projectsData);
      setSkills(skillsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setProjects(defaultProjects);
      setSkills(defaultSkills);
    } finally {
      setLoading(false);
    }
  };

  const defaultProjects = [
    {
      id: 1,
      title: 'Know--ur--Disease-AI',
      description: 'An end to end, teaching oriented project that turns unstructured clinical notes into disease predictions.',
      technologies: ['Python', 'Machine Learning', 'NLP'],
      github: 'https://github.com/Dhanush-ux177/Know--ur--Disease-AI.git',
      image: '🩺',
      link: '#'
    },
    {
      id: 2,
      title: 'Image to Sketch-AI',
      description: 'AI-Powered Pencil Sketch Converter with Artistic Enhancement',
      technologies: ['Python', 'Image Processing', 'Machine Learning'],
      github: 'https://github.com/Dhanush-ux177/image-to-sketch.git',
      image: '🎨',
      link: '#'
    },
    {
      id: 3,
      title: 'Online Quiz System',
      description: 'Designed and developed a Online Quiz website with interactive features.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'SQLite'],
      github: 'https://github.com/Dhanush-ux177/Online-Quiz-System.git',
      image: '📝',
      link: '#'
    },
    {
      id: 4,
      title: 'Yolvo RealWebcam Detection',
      description: 'Interactive dashboard for visualizing complex datasets with real-time updates and custom reports.',
      technologies: ['Python', 'OpenCV', 'YOLOv5', 'Flask'],
      github: 'https://github.com/Dhanush-ux177/yolo-webcam-Detection.git',
      image: '📹',
    },
    {
      id: 5,
      title: 'InternShield',
      description: 'InternShield – AI‑powered scam detector for students. Paste a job description or internship offer to instantly check for red flags like upfront fees, vague requirements, and phishing signs. Built with React + Vite.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Node.js'],
      github: 'https://github.com/Dhanush-ux177/InternShield.git',
      image: '🛡️',
    }
  ];

  const defaultSkills = [
    { category: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] },
    { category: 'Backend', items: ['Python', 'FastAPI', 'Django'] },
    { category: 'Database', items: ['MySQL', 'SQLite'] },
    { category: 'AI & Machine Learning', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV'] },
    { category: 'Tools & DevOps', items: ['Git', 'Github', 'Google Colaboratory', 'VS Code'] }
  ];

  const scrollToSection = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formStatus.message) setFormStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: 'error', message: 'Please fill in all fields.' });
      setIsSubmitting(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: 'error', message: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Thank you! I will get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus({ type: 'error', message: data.error || 'Something went wrong.' });
      }
    } catch (error) {
      console.error('Contact error:', error);
      setFormStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 text-gray-800'}`}>
      {/* Navigation – without the "D" logo */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors ${theme === 'dark' ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Removed the "D" logo div */}
            <span className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Portfolio</span>

            <div className="hidden md:flex gap-8 items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors ${activeSection === item.id ? 'text-blue-400 border-b-2 border-blue-400' : theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-blue-600'}`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-blue-600'}`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded ${theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-40 md:w-56 md:h-56">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
              <div className={`relative rounded-full p-1 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-white'}`}>
                <img
                  src="/profile.png"
                  alt="Dhanush G - Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            I'm <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Dhanush G</span>
          </h1>

          <div className="h-10 md:h-12 flex justify-center items-center mb-6">
            <span className="text-xl md:text-2xl text-blue-400 font-medium">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <p className={`text-lg max-w-2xl mx-auto mb-8 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
            Hi, I'm Dhanush G – a Full‑Stack Developer who loves blending modern web technologies with machine learning. With hands‑on experience in AI/ML, I build applications that are not just functional, but smart.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all text-white"
            >
              View My Work
            </button>
            <a
              href="/Dhanush_G__Resume.pdf"
              download
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all border ${theme === 'dark' ? 'bg-slate-700/50 hover:bg-slate-700 border-slate-600 text-white' : 'bg-gray-200 hover:bg-gray-300 border-gray-300 text-gray-800'}`}
            >
              <ArrowRight size={18} /> Download Resume
            </a>
          </div>

          <div className={`flex justify-center gap-6 mt-10 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
            <a href="https://github.com/Dhanush-ux177" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors p-2"><Github size={28} /></a>
            <a href="https://www.linkedin.com/in/dhanush-g-46b54b299" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors p-2"><Linkedin size={28} /></a>
            <a href="mailto:dhanushdhanud54@gmail.com" className="hover:text-blue-400 transition-colors p-2"><Mail size={28} /></a>
          </div>
        </div>
      </section>

      {/* ========== PROJECTS (unchanged) ========== */}
      <section id="projects" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className={`text-4xl font-bold mb-4 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          <Briefcase className="text-blue-400" /> Featured Projects
        </h2>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>A selection of recent work demonstrating full-stack capabilities</p>
        {loading ? (
          <div className="text-center py-12"><p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>Loading projects...</p></div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {(projects.length > 0 ? projects : defaultProjects).map((project) => (
              <div key={project.id} className={`group rounded-xl p-6 border transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-blue-500/50' : 'bg-white border-gray-200 hover:border-blue-500/50'}`}>
                <div className="text-5xl mb-4">{project.image}</div>
                <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{project.title}</h3>
                <p className={theme === 'dark' ? 'text-slate-400 mb-4 text-sm leading-relaxed' : 'text-gray-500 mb-4 text-sm leading-relaxed'}>{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a href={project.github} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${theme === 'dark' ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                    Code <Github size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========== SKILLS (unchanged) ========== */}
      <section id="skills" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className={`text-4xl font-bold mb-4 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          <Code2 className="text-blue-400" /> Technical Skills
        </h2>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>Technologies and tools I work with</p>
        {loading ? (
          <div className="text-center py-12"><p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>Loading skills...</p></div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {(skills.length > 0 ? skills : defaultSkills).map((skillGroup) => (
              <div key={skillGroup.category} className={`rounded-xl p-8 border transition-all ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-blue-500/50' : 'bg-white border-gray-200 hover:border-blue-500/50'}`}>
                <h3 className="text-xl font-bold text-blue-400 mb-6">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill) => (
                    <span key={skill} className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${theme === 'dark' ? 'bg-slate-700/50 text-slate-200 hover:bg-blue-500/20 hover:text-blue-300' : 'bg-gray-200 text-gray-700 hover:bg-blue-500/20 hover:text-blue-600'}`}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========== ABOUT (unchanged) ========== */}
      <section id="about" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className={`text-4xl font-bold mb-4 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          <User className="text-blue-400" /> About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className={`text-lg mb-6 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
              I'm a passionate full-stack developer and proficient in building end-to-end ML pipelines, web interfaces, and computer vision solutions. Adapt at collaborating in team environments and delivering projects under tight deadlines.
            </p>
            <p className={`text-lg mb-6 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
              I specialize in creating seamless user experiences paired with robust backend systems and hands-on experience in Python, Machine Learning, and AI-powered application development.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><div className="w-3 h-3 bg-blue-400 rounded-full"></div><span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>Master's in Computer Application</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 bg-blue-400 rounded-full"></div><span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>Fresher</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 bg-blue-400 rounded-full"></div><span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>Open Source Contributor</span></div>
            </div>
          </div>
          <div className={`rounded-xl p-8 border ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
            <h3 className="text-2xl font-bold mb-6 text-blue-400">My Journey</h3>
            <div className="space-y-6">
              {[
                { year: '2024', title: 'Started Learning Web Dev', desc: 'Began with HTML, CSS, and JavaScript' },
                { year: '2025', title: 'First Professional Role', desc: 'Frontend developer at a startup' },
                { year: '2025', title: 'Advanced to Full-Stack', desc: 'Expanded expertise to backend systems' },
                { year: '2026', title: 'AI&ML Technologies', desc: 'Deeper knowledge in AI&ML Libraries' }
              ].map((milestone, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="min-w-fit"><span className="text-blue-400 font-bold">{milestone.year}</span></div>
                  <div><p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{milestone.title}</p><p className={theme === 'dark' ? 'text-slate-400 text-sm' : 'text-gray-500 text-sm'}>{milestone.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT (unchanged) ========== */}
      <section id="contact" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className={`text-4xl font-bold mb-4 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          <Mail className="text-blue-400" /> Get In Touch
        </h2>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>
          Have a question or want to work together? Send me a message!
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start mt-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Your Name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-800'}`} placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Email Address *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-800'}`} placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Message *</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows="5" className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 resize-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-800'}`} placeholder="Tell me about your project or inquiry..."></textarea>
              </div>
              {formStatus.message && (
                <div className={`p-4 rounded-lg ${formStatus.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/50' : 'bg-red-500/20 text-red-300 border border-red-500/50'}`}>
                  {formStatus.message}
                </div>
              )}
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 text-white">
                {isSubmitting ? 'Sending...' : <>Send Message <Send size={18} /></>}
              </button>
            </form>
          </div>

          <div className={`rounded-xl p-8 border ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
            <h3 className="text-2xl font-bold mb-6 text-blue-400">Contact Information</h3>
            <div className="space-y-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Byatarayanapura+Mysore+Road+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start gap-4 transition-colors group ${theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
              >
                <MapPin className="text-blue-400 mt-1 group-hover:text-blue-300" size={22} />
                <div>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Location</p>
                  <p className={`transition-colors ${theme === 'dark' ? 'text-slate-400 group-hover:text-blue-300' : 'text-gray-500 group-hover:text-blue-600'}`}>
                    Byatarayanapura, Mysore Road, Bangalore-26
                  </p>
                </div>
              </a>

              <a
                href="tel:+911234567891"
                className={`flex items-start gap-4 transition-colors group ${theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
              >
                <Phone className="text-blue-400 mt-1 group-hover:text-blue-300" size={22} />
                <div>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Phone</p>
                  <p className={`transition-colors ${theme === 'dark' ? 'text-slate-400 group-hover:text-blue-300' : 'text-gray-500 group-hover:text-blue-600'}`}>
                    +91 1234567891
                  </p>
                </div>
              </a>

              <div className={`flex items-start gap-4 transition-colors group ${theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                <Mail className="text-blue-400 mt-1 group-hover:text-blue-300" size={22} />
                <div>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Email</p>
                  <a
                    href="mailto:dhanushdhanud54@gmail.com"
                    className={`transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-blue-300' : 'text-gray-500 hover:text-blue-600'}`}
                  >
                    dhanushdhanud54@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className={`border-t py-8 px-4 ${theme === 'dark' ? 'border-slate-700 bg-slate-900/50' : 'border-gray-200 bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
            Designed & Built by <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent font-semibold">Dhanush G</span>
          </p>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>
            &copy; 2025 All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;