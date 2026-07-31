import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database file paths (changed from ../data to ./data since we're in backend folder)
const PROJECTS_FILE = path.join(__dirname, './data/projects.json');
const SKILLS_FILE = path.join(__dirname, './data/skills.json');
const CONTACT_FILE = path.join(__dirname, './data/contact.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.mkdir(path.join(__dirname, './data'), { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
};

// Initialize data files with defaults
const initializeDataFiles = async () => {
  const defaultProjects = [
    {
      id: 1,
      title: 'Know--ur--Disease-AI',
      description: 'An end to end, teaching oriented project that turns unstructured clinical notes into disease predictions and integrated payment processing. Includes admin dashboard for inventory management and order tracking.',
      technologies: ['Python', 'Machine Learning', 'NLP'],
      github: 'https://github.com/Dhanush-ux177/Know--ur--Disease-AI.git',
      image: '🩺',
      featured: true,
      startDate: '2025-08',
      endDate: '2025-11'
    },
    {
      id: 2,
      title: 'Image to Sketch-AI',
      description: 'AI-Powered Pencil Sketch Converter with Artistic Enhancement',
      technologies: ['Python', 'Image Processing', 'Machine Learning'],
      github: 'https://github.com/Dhanush-ux177/image-to-sketch.git',
      image: '🎨',
      featured: true,
      startDate: '2026-02',
      endDate: '2026-03'
    },
    {
      id: 3,
      title: 'Online Quiz System',
      description: 'Designed and developed a Online Quiz website with interactive features and user-friendly interface.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'SQLite'],
      github: 'https://github.com/Dhanush-ux177/Online-Quiz-System.git',
      image: '📝',
      featured: true,
      startDate: '2026-03',
      endDate: '2026-03'
    },
    {
      id: 4,
      title: 'Yolvo RealWebcam Detection',
      description: 'Interactive dashboard for visualizing complex datasets with real-time updates and custom reports.',
      technologies: ['Python', 'OpenCV', 'YOLOv5', 'Flask'],
      github: 'https://github.com/Dhanush-ux177/yolo-webcam-Detection.git',
      image: '📹',
      featured: false,
      startDate: '2026-04',
      endDate: '2026-04'
    },
    {
      id: 5,
      title: 'InternShield',
      description: 'InternShield – AI‑powered scam detector for students. Paste a job description or internship offer to instantly check for red flags like upfront fees, vague requirements, and phishing signs. Built with React + Vite.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Node.js'],
      github: 'https://github.com/Dhanush-ux177/InternShield.git',
      image: '🛡️',
      featured: false,
      startDate: '2026-04',
      endDate: '2026-05'
    }
  ];

  const defaultSkills = [
    {
      category: 'Frontend',
      items: ['HTML', 'CSS', 'JavaScript']
    },
    {
      category: 'Backend',
      items: ['Python', 'FastAPI', 'Django']
    },
    {
      category: 'Database',
      items: ['MySQL', 'SQLite']
    },
    {
      category: 'AI & Machine Learning',
      items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV']
    },
    {
      category: 'Tools & DevOps',
      items: ['Git', 'Github', 'Google Colaboratory', 'VS Code']
    }
  ];

  try {
    // Initialize projects
    try {
      await fs.access(PROJECTS_FILE);
    } catch {
      await fs.writeFile(PROJECTS_FILE, JSON.stringify(defaultProjects, null, 2));
      console.log('✓ Projects file initialized');
    }

    // Initialize skills
    try {
      await fs.access(SKILLS_FILE);
    } catch {
      await fs.writeFile(SKILLS_FILE, JSON.stringify(defaultSkills, null, 2));
      console.log('✓ Skills file initialized');
    }

    // Initialize contact submissions
    try {
      await fs.access(CONTACT_FILE);
    } catch {
      await fs.writeFile(CONTACT_FILE, JSON.stringify([], null, 2));
      console.log('✓ Contact file initialized');
    }
  } catch (error) {
    console.error('Error initializing data files:', error);
  }
};

// API Routes
// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf-8');
    const projects = JSON.parse(data);
    res.json(projects);
  } catch (error) {
    console.error('Error reading projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf-8');
    const projects = JSON.parse(data);
    const project = projects.find(p => p.id === parseInt(req.params.id));
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error reading project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Get all skills
app.get('/api/skills', async (req, res) => {
  try {
    const data = await fs.readFile(SKILLS_FILE, 'utf-8');
    const skills = JSON.parse(data);
    res.json(skills);
  } catch (error) {
    console.error('Error reading skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// Create new project (admin endpoint)
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, technologies, link, github, image, featured } = req.body;
    
    if (!title || !description || !technologies) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = await fs.readFile(PROJECTS_FILE, 'utf-8');
    const projects = JSON.parse(data);
    
    const newProject = {
      id: Math.max(...projects.map(p => p.id), 0) + 1,
      title,
      description,
      technologies,
      link: link || '#',
      github: github || '#',
      image: image || '💼',
      featured: featured || false,
      startDate: new Date().toISOString().split('T')[0]
    };
    
    projects.push(newProject);
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = await fs.readFile(CONTACT_FILE, 'utf-8');
    const submissions = JSON.parse(data);
    
    const newSubmission = {
      id: submissions.length + 1,
      name,
      email,
      message,
      submittedAt: new Date().toISOString()
    };
    
    submissions.push(newSubmission);
    await fs.writeFile(CONTACT_FILE, JSON.stringify(submissions, null, 2));
    
    console.log('New contact submission:', newSubmission);
    
    res.status(201).json({ 
      message: 'Thank you for your message. I will get back to you soon!',
      submission: newSubmission 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Failed to process contact form' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize and start server
const startServer = async () => {
  await ensureDataDir();
  await initializeDataFiles();
  
  app.listen(PORT, () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;