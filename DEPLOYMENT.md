# Setup and Deployment Guide

## Quick Start Guide

### 5-Minute Local Setup

```bash
# 1. Clone and install
git clone <your-repo>
cd portfolio

# 2. Install dependencies
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# 3. Setup environment
cp .env.example .env

# 4. Run development servers (open 2 terminals)
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev

# Open http://localhost:3000
```

---

## Local Development Setup

### Prerequisites Checklist
- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm 7+ installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command Prompt

### Step-by-Step Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install Dependencies**
   ```bash
   # Root level
   npm install
   
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp ../.env.example ../.env
   # Edit .env with your settings
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev
   
   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

5. **Verify Installation**
   - Backend: http://localhost:5000/api/health
   - Frontend: http://localhost:3000
   - Both should load without errors

---

## Project Customization

### Step 1: Update Personal Information

**In `backend/data/projects.json`:**
```json
{
  "id": 1,
  "title": "Your Awesome Project",
  "description": "What it does",
  "technologies": ["React", "Node.js"],
  "link": "https://project-demo.com",
  "github": "https://github.com/yourname/project",
  "image": "🎨",
  "featured": true
}
```

**In `backend/data/skills.json`:**
```json
{
  "category": "Frontend",
  "items": ["React", "TypeScript", "Next.js", "Tailwind CSS"]
}
```

**In `src/App.jsx`:**
- Update name and title in hero section
- Update about section text
- Update social media links

### Step 2: Design Customization

**Colors** - Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      blue: {
        500: '#0066ff',  // Change primary color
      }
    }
  }
}
```

**Fonts** - Add to `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
```

Update `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Inter', 'sans-serif'],
}
```

### Step 3: Add Your Content

1. **Add Projects**
   - Edit `backend/data/projects.json`
   - Restart backend server
   - New projects appear automatically

2. **Update Skills**
   - Edit `backend/data/skills.json`
   - Refresh frontend
   - Skills categories update

3. **Modify Homepage**
   - Edit `src/App.jsx`
   - Change hero text, about section
   - Update social links

---

## Docker Deployment (Recommended)

### Docker Desktop Installation

1. [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Install and run
3. Verify: `docker --version`

### Deploy with Docker Compose

```bash
# From project root
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: localhost:5432

### Docker Debugging

```bash
# Execute commands in running container
docker-compose exec backend npm run dev

# Get shell access
docker-compose exec backend sh

# View container output
docker-compose logs -f backend --tail 50

# Restart specific service
docker-compose restart backend
```

---

## Production Deployment

### Vercel (Frontend)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Set build command: `cd frontend && npm run build`
   - Set output directory: `frontend/dist`

3. **Set Environment Variables**
   - Add in Vercel dashboard:
   ```
   VITE_API_URL=https://your-api.com
   ```

### Heroku (Backend)

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows/Other
   # Download from heroku.com/download
   ```

2. **Deploy**
   ```bash
   heroku login
   heroku create portfolio-api
   
   # Set environment variables
   heroku config:set NODE_ENV=production
   heroku config:set PORT=5000
   
   # Deploy
   git push heroku main
   ```

3. **Verify**
   ```bash
   heroku open
   heroku logs -t
   ```

### AWS EC2 (Full Stack)

1. **Launch EC2 Instance**
   - Choose Ubuntu 22.04 LTS
   - t2.micro or larger
   - Configure security groups (ports 22, 80, 443)

2. **Setup Server**
   ```bash
   # SSH into instance
   ssh -i your-key.pem ubuntu@your-instance-ip
   
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install Docker
   curl -fsSL https://get.docker.com | sudo sh
   sudo usermod -aG docker ubuntu
   ```

3. **Deploy Application**
   ```bash
   git clone your-repo
   cd portfolio
   docker-compose up -d
   ```

4. **Setup Domain**
   - Point domain to EC2 IP
   - Use Nginx for HTTPS (included in docker-compose)

### Railway.app (Simple Full Stack)

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "GitHub repo"
4. Select your portfolio repository
5. Add PostgreSQL (optional)
6. Set environment variables
7. Deploy

---

## Performance Optimization

### Frontend Optimization

1. **Enable Code Splitting**
   ```javascript
   // In App.jsx
   const Projects = React.lazy(() => import('./Projects'))
   ```

2. **Image Optimization**
   ```bash
   npm install --save-dev sharp
   ```

3. **Monitor Performance**
   ```bash
   npm run build
   # Check dist size
   du -sh dist/
   ```

### Backend Optimization

1. **Add Caching**
   ```javascript
   app.use((req, res, next) => {
     res.set('Cache-Control', 'public, max-age=3600');
     next();
   });
   ```

2. **Enable Compression**
   ```bash
   npm install compression
   ```

3. **Use Connection Pool** (when using real DB)

---

## Database Migration

### From File-Based to MongoDB

1. **Install MongoDB**
   ```bash
   npm install mongoose
   ```

2. **Update server.js**
   ```javascript
   import mongoose from 'mongoose';
   
   mongoose.connect(process.env.MONGODB_URI);
   ```

3. **Create Models**
   ```javascript
   const projectSchema = new mongoose.Schema({
     title: String,
     description: String,
     technologies: [String]
   });
   ```

4. **Update Routes**
   ```javascript
   app.get('/api/projects', async (req, res) => {
     const projects = await Project.find();
     res.json(projects);
   });
   ```

---

## Monitoring & Maintenance

### Setup Monitoring

1. **Uptime Monitoring**
   - [UptimeRobot](https://uptimerobot.com) - Free
   - Monitor `/api/health` endpoint

2. **Error Tracking**
   - [Sentry](https://sentry.io)
   - Add 1 line of code for error tracking

3. **Performance Monitoring**
   - [New Relic](https://newrelic.com)
   - [DataDog](https://www.datadoghq.com)

### Backup Strategy

```bash
# Backup data directory
tar -czf backup-$(date +%Y%m%d).tar.gz backend/data/

# Backup database
pg_dump -U portfolio_user portfolio > backup.sql

# Store in cloud (AWS S3)
aws s3 cp backup.sql s3://your-bucket/backups/
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process on port 5000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Ensure `REACT_APP_API_URL` is set correctly and CORS is enabled in backend.

### Build Fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Clear build
rm -rf dist/
npm run build
```

### Docker Won't Start
```bash
# Check logs
docker-compose logs backend

# Rebuild images
docker-compose up --build -d

# Remove stopped containers
docker-compose down -v
docker-compose up -d
```

---

## Security Checklist

- [ ] Environment variables configured (not in git)
- [ ] HTTPS enabled in production
- [ ] CORS configured properly
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (if using DB)
- [ ] XSS protection (CSP headers)
- [ ] CSRF tokens for forms
- [ ] Rate limiting on API
- [ ] Helmet.js for security headers
- [ ] Regular dependency updates

---

## Continuous Integration Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: echo "Deploying to production..."
```

---

## Support & Resources

### Documentation
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev)

### Hosting Platforms
- [Vercel](https://vercel.com) - Frontend
- [Heroku](https://heroku.com) - Backend
- [Railway.app](https://railway.app) - Full stack
- [Render.com](https://render.com) - Full stack
- [AWS](https://aws.amazon.com) - Enterprise

### Community
- [GitHub Discussions](https://github.com)
- [Stack Overflow](https://stackoverflow.com)
- [Dev.to](https://dev.to)

---

## Next Steps After Deployment

1. **Monitor Performance**
   - Check page load times
   - Monitor API response times

2. **Gather Analytics**
   - Add Google Analytics
   - Track user behavior

3. **Improve SEO**
   - Submit sitemap to Google
   - Monitor search rankings

4. **Add Features**
   - Blog section
   - Dark mode toggle
   - Contact form notifications
   - Admin dashboard

5. **Engage Users**
   - Newsletter signup
   - Social media links
   - GitHub integration

---

Happy deploying! 🚀
