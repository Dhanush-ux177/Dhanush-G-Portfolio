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
        if (typedText.length < fullTitle.length) {
          setTypedText(fullTitle.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(fullTitle.slice(0, typedText.length - 1));
        } else {
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
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors ${theme === 'dark' ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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

      {/* Hero */}
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
              href="/Dhanush_G___Resume.pdf"
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

      {/* Projects, Skills, About, Contact unchanged – keep your existing code */}
      {/* ... (copy your existing sections for Projects, Skills, About, Contact, Footer) ... */}

    </div>
  );
};

export default Portfolio;