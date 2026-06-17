import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Github, Linkedin, Mail, ArrowRight, Code2, Briefcase, User, Send } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

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
      github:'https://github.com/Dhanush-ux177/yolo-webcam-Detection.git',
      image: '📹',
    },

    {
      id: 5,
      title: 'InternShield',
      description:'InternShield – AI‑powered scam detector for students. Paste a job description or internship offer to instantly check for red flags like upfront fees, vague requirements, and phishing signs. Built with React + Vite.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Node.js'],
      github:'https://github.com/Dhanush-ux177/InternShield.git',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center font-bold">D</div>
              <span className="font-bold text-lg">Portfolio</span>
            </div>
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)} className={`transition-colors ${activeSection === item.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-300 hover:text-white'}`}>
                  {item.label}
                </button>
              ))}
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)} className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded">
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Full-Stack Developer &amp;
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">AI&ML Enthusiast</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Crafting elegant solutions to complex problems. Specialized in building scalable applications with modern technologies and best practices.
            </p>
            <div className="flex gap-4 mb-8">
              <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                View My Work
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-8 py-3 border-2 border-slate-400 rounded-lg font-semibold hover:border-white transition-colors">
                Get In Touch
              </button>
            </div>
            <div className="flex gap-4 text-slate-400">
              <a href="https://github.com/Dhanush-ux177" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2" aria-label="GitHub"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/dhanush-g-46b54b299" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2" aria-label="LinkedIn"><Linkedin size={24} /></a>
              <a href="mailto:dhanushdhanushd54@gmail.com" className="hover:text-white transition-colors p-2" aria-label="Email"><Mail size={24} /></a>
            </div>
          </div>

          {/* PROFILE PHOTO + DOWNLOAD RESUME */}
          <div className="hidden md:block">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-slate-700 flex items-center justify-center h-full">
                {/* 👇 CHANGE this file name if your photo is not called "profile.jpg" */}
                <img 
                  src="/profile.png" 
                  alt="Dhanush G - Profile"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <a 
                href="/Dhanush_G_Resume1.pdf" 
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all text-sm"
              >
                <ArrowRight size={18} /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 flex items-center gap-3"><Briefcase className="text-blue-400" /> Featured Projects</h2>
        <p className="text-slate-400 mb-12">A selection of recent work demonstrating full-stack capabilities</p>
        {loading ? (
          <div className="text-center py-12"><p className="text-slate-400">Loading projects...</p></div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {(projects.length > 0 ? projects : defaultProjects).map((project) => (
              <div key={project.id} className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="text-5xl mb-4">{project.image}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a href={project.github} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
                    Code <Github size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Skills Section */}
      <section id="skills" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 flex items-center gap-3"><Code2 className="text-blue-400" /> Technical Skills</h2>
        <p className="text-slate-400 mb-12">Technologies and tools I work with</p>
        {loading ? (
          <div className="text-center py-12"><p className="text-slate-400">Loading skills...</p></div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {(skills.length > 0 ? skills : defaultSkills).map((skillGroup) => (
              <div key={skillGroup.category} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all">
                <h3 className="text-xl font-bold text-blue-400 mb-6">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-slate-700/50 rounded-lg font-medium text-slate-200 hover:bg-blue-500/20 hover:text-blue-300 transition-all cursor-pointer">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 flex items-center gap-3"><User className="text-blue-400" /> About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              I'm a passionate full-stack developer and  proficient in building end-to-end ML pipelines, web interfaces, and computer vision solutions. Adapt at collaborating in team environments and delivering projects under tight deadlines.
            </p>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              I specialize in creating seamless user experiences paired with robust backend systems and hands-on experience in Python, Machine Learning, and AI-powered application development.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><div className="w-3 h-3 bg-blue-400 rounded-full"></div><span>Master's in Computer Application</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 bg-blue-400 rounded-full"></div><span>Fresher</span></div>
              <div className="flex items-center gap-3"><div className="w-3 h-3 bg-blue-400 rounded-full"></div><span>Open Source Contributor</span></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700">
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
                  <div><p className="font-semibold text-white">{milestone.title}</p><p className="text-slate-400 text-sm">{milestone.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 flex items-center gap-3"><Mail className="text-blue-400" /> Get In Touch</h2>
        <p className="text-slate-400 mb-12">Have a question or want to work together? Send me a message!</p>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Your Name *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-white" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-white" placeholder="john@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message *</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows="5" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-white resize-none" placeholder="Tell me about your project or inquiry..."></textarea>
            </div>
            {formStatus.message && (
              <div className={`p-4 rounded-lg ${formStatus.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/50' : 'bg-red-500/20 text-red-300 border border-red-500/50'}`}>
                {formStatus.message}
              </div>
            )}
            <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50">
              {isSubmitting ? 'Sending...' : <>Send Message <Send size={18} /></>}
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-700 bg-slate-900/50 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; 2025 Dhanush G. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;