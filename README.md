# Full-Stack Portfolio Web Application

A modern, responsive portfolio website built with React, Node.js, and Express. Features a beautiful dark-themed UI, multiple project showcases, and a contact system.

## 🎯 Overview

This is a complete full-stack application demonstrating:
- **Frontend**: React with Tailwind CSS and modern UI components
- **Backend**: Node.js/Express REST API with file-based data storage
- **Deployment**: Docker containerization for easy deployment
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Architecture**: Component-based React with hooks

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Development](#development)
- [Performance](#performance)
- [SEO & Accessibility](#seo--accessibility)

## ✨ Features

### Frontend
- 🎨 Modern dark-themed UI with gradient accents
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Fast page loads with Vite build tool
- 🎯 Smooth navigation between sections
- 🔍 SEO optimized with meta tags
- ♿ Accessible components with ARIA labels
- 🌙 Prefers reduced motion support

### Backend
- 🔌 RESTful API endpoints
- 📁 File-based data storage (easily upgradeable to MongoDB/PostgreSQL)
- 🔐 CORS enabled for security
- 📊 Contact form submission handling
- 🏥 Health check endpoint
- 📝 Comprehensive error handling

### Full-Stack
- 🐳 Docker & Docker Compose support
- 📦 Production-ready build configuration
- 🚀 Easy deployment to Vercel, Heroku, AWS
- 📚 Complete documentation
- 🧪 Ready for testing integration

## 🛠 Tech Stack

### Frontend
- React 18.2.0
- Tailwind CSS 3.3.5
- Vite 5.0.7
- Lucide React (Icons)

### Backend
- Node.js 18+
- Express.js 4.18.2
- CORS 2.8.5
- dotenv 16.3.1

### DevOps
- Docker & Docker Compose
- Nginx (reverse proxy)
- PostgreSQL 16 (optional database)

## 📁 Project Structure

```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 # Main React component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── public/
│   ├── index.html                 # HTML template
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js         # Tailwind configuration
│   ├── postcss.config.js          # PostCSS configuration
│   └── package.json
│
├── backend/
│   ├── server.js                  # Express server
│   ├── data/
│   │   ├── projects.json          # Projects database
│   │   ├── skills.json            # Skills database
│   │   └── contact.json           # Contact submissions
│   └── package.json
│
├── .env.example                   # Environment variables template
├── docker-compose.yml             # Docker Compose configuration
├── Dockerfile.backend             # Backend Docker configuration
├── Dockerfile.frontend            # Frontend Docker configuration
├── nginx.conf                     # Nginx configuration
├── README.md                      # This file
└── package.json                   # Root package.json
```

## 🚀 Installation

### Prerequisites
- Node.js 16+ and npm 7+
- Docker & Docker Compose (for containerized deployment)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..

   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000

# Frontend
VITE_API_URL=http://localhost:5000

# Optional: Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Optional: AWS S3
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket
```

### Customizing Portfolio Content

#### Update Projects
Edit `backend/data/projects.json`:
```json
{
  "id": 1,
  "title": "Your Project Title",
  "description": "Brief description",
  "longDescription": "Detailed description",
  "technologies": ["React", "Node.js"],
  "link": "https://example.com",
  "github": "https://github.com/username/project",
  "image": "🎨",
  "featured": true,
  "startDate": "2024-01",
  "endDate": "2024-03"
}
```

#### Update Skills
Edit `backend/data/skills.json`:
```json
{
  "category": "Frontend",
  "items": ["React", "TypeScript", "Tailwind CSS"]
}
```

## 🏃 Running the Application

### Development Mode

**Option 1: Separate Terminals**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run devcd frontend
npm run dev
# App runs on http://localhost:3000
```

**Option 2: Using Docker Compose**

```bash
docker-compose up
# Backend: http://localhost:5000
# Frontend: http://localhost:3000
# Database: http://localhost:5432
```

### Production Build

```bash
# Build frontend
cd frontend
npm run build
# Output: dist/

# Build backend Docker image
docker build -f Dockerfile.backend -t portfolio-backend .

# Run with Docker Compose
docker-compose -f docker-compose.yml up -d
```

## 📡 API Documentation

### Base URL
`http://localhost:5000/api`

### Endpoints

#### Get All Projects
```
GET /api/projects
Response: Array of project objects
```

#### Get Single Project
```
GET /api/projects/:id
Response: Single project object
```

#### Get All Skills
```
GET /api/skills
Response: Array of skill categories
```

#### Create Project (Admin)
```
POST /api/projects
Body: {
  "title": "string",
  "description": "string",
  "technologies": ["string"],
  "link": "string",
  "github": "string",
  "image": "string"
}
Response: Created project object
```

#### Submit Contact Form
```
POST /api/contact
Body: {
  "name": "string",
  "email": "string",
  "message": "string"
}
Response: {
  "message": "Thank you message",
  "submission": {...}
}
```

#### Health Check
```
GET /api/health
Response: {
  "status": "OK",
  "timestamp": "ISO timestamp"
}
```

## 🐳 Deployment

### Docker Deployment

1. **Build images**
   ```bash
   docker build -f Dockerfile.backend -t portfolio-backend .
   docker build -f Dockerfile.frontend -t portfolio-frontend .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Check status**
   ```bash
   docker-compose ps
   docker-compose logs -f backend
   ```

### Vercel Deployment (Frontend)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Heroku Deployment (Backend)

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create portfolio-api

# Set environment variables
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### AWS Deployment

Using EC2:
1. Launch EC2 instance
2. Install Node.js and Docker
3. Clone repository
4. Use Docker Compose to run services
5. Configure security groups
6. Setup domain with Route 53

## 🔧 Development

### Code Quality

```bash
# Lint frontend
cd frontend && npm run lint

# Lint backend
cd backend && npm run lint

# Format code (add prettier)
npm run format
```

### Testing

Add Jest and React Testing Library:

```bash
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

cd ../backend
npm install --save-dev jest supertest
```

### Adding New Features

1. **Add a new API endpoint**
   - Add route in `backend/server.js`
   - Create corresponding data file in `backend/data/`
   - Add error handling

2. **Update frontend**
   - Create new React component
   - Add fetch call using the new API
   - Update navigation if needed

3. **Test**
   - Local development
   - Docker container
   - Production simulation

## ⚡ Performance

### Frontend Optimization
- Lazy loading with React.lazy()
- Code splitting with Vite
- Image optimization with modern formats
- CSS minification with Tailwind
- Gzip compression in Nginx

### Backend Optimization
- Caching headers for static files
- Request compression with gzip
- Database query optimization
- Connection pooling (for real DB)

### Monitoring
- Use tools like New Relic or DataDog
- Monitor API response times
- Track error rates
- Analyze user behavior

## ♿ SEO & Accessibility

### SEO Features
- Meta tags (OG, Twitter)
- Semantic HTML
- Proper heading hierarchy
- XML sitemap (add later)
- robots.txt configuration

### Accessibility
- ARIA labels
- Keyboard navigation
- Color contrast compliance (WCAG AA)
- Focus indicators
- Reduced motion support

## 📝 License

MIT License - feel free to use this project as a template

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For questions or issues, please open an issue on GitHub.

---

**Happy coding! 🚀**

## Checklist for Customization

- [ ] Update personal information in About section
- [ ] Replace portfolio projects with your own
- [ ] Update skills list
- [ ] Configure email for contact form
- [ ] Update social media links
- [ ] Deploy to production
- [ ] Setup custom domain
- [ ] Configure analytics
- [ ] Add GitHub badge
- [ ] Update favicon and og:image

## Next Steps

1. **Enhance Backend**
   - Add MongoDB/PostgreSQL
   - Implement authentication
   - Add email notifications
   - Create admin dashboard

2. **Improve Frontend**
   - Add animations with Framer Motion
   - Implement dark/light mode toggle
   - Add blog section
   - Create project detail pages

3. **DevOps**
   - Setup CI/CD pipeline (GitHub Actions)
   - Add automated testing
   - Configure monitoring
   - Setup backup strategy
