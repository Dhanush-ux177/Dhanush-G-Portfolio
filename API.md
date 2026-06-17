# API Documentation

Complete API reference for the Portfolio Web Application.

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-api-domain.com/api`

## Authentication

Currently, the API is public with no authentication required. For production:
- Implement JWT for protected routes
- Add API key validation
- Use OAuth2 for admin endpoints

## Response Format

All responses return JSON:

```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "error": null
}
```

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## Endpoints

### Projects

#### GET /api/projects

Get all projects.

**Query Parameters:**
- `featured` (boolean) - Filter by featured status
- `sort` (string) - Sort by: `date`, `title`, `featured`
- `limit` (number) - Limit results (default: all)

**Example:**
```bash
GET /api/projects
GET /api/projects?featured=true&sort=date
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "E-Commerce Platform",
    "description": "Full-stack e-commerce application",
    "longDescription": "A comprehensive solution...",
    "technologies": ["React", "Node.js", "MongoDB"],
    "link": "https://example.com",
    "github": "https://github.com/user/repo",
    "image": "🛒",
    "featured": true,
    "startDate": "2023-06",
    "endDate": "2024-02"
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

#### GET /api/projects/:id

Get a single project by ID.

**Parameters:**
- `id` (number, required) - Project ID

**Example:**
```bash
GET /api/projects/1
```

**Response:**
```json
{
  "id": 1,
  "title": "E-Commerce Platform",
  "description": "Full-stack e-commerce application",
  "longDescription": "Detailed description...",
  "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
  "link": "https://example.com",
  "github": "https://github.com/user/repo",
  "image": "🛒",
  "featured": true,
  "startDate": "2023-06",
  "endDate": "2024-02"
}
```

**Status Codes:**
- `200` - Success
- `404` - Project not found
- `500` - Server error

---

#### POST /api/projects

Create a new project. (Admin endpoint - add authentication)

**Request Body:**
```json
{
  "title": "New Project",
  "description": "Brief description",
  "longDescription": "Detailed description",
  "technologies": ["React", "Node.js"],
  "link": "https://example.com",
  "github": "https://github.com/user/repo",
  "image": "💼",
  "featured": false
}
```

**Required Fields:**
- `title` (string)
- `description` (string)
- `technologies` (array)

**Optional Fields:**
- `longDescription` (string)
- `link` (string)
- `github` (string)
- `image` (string, emoji)
- `featured` (boolean)

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI Chat",
    "description": "Chat with AI",
    "technologies": ["React", "Python"],
    "image": "🤖"
  }'
```

**Response:**
```json
{
  "id": 5,
  "title": "AI Chat",
  "description": "Chat with AI",
  "technologies": ["React", "Python"],
  "link": "#",
  "github": "#",
  "image": "🤖",
  "featured": false,
  "startDate": "2024-06-13"
}
```

**Status Codes:**
- `201` - Created
- `400` - Bad request (missing required fields)
- `500` - Server error

---

### Skills

#### GET /api/skills

Get all skill categories.

**Example:**
```bash
GET /api/skills
```

**Response:**
```json
[
  {
    "category": "Frontend",
    "items": [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Next.js",
      "Vue.js"
    ]
  },
  {
    "category": "Backend",
    "items": [
      "Node.js",
      "Express",
      "Python",
      "FastAPI",
      "GraphQL"
    ]
  },
  {
    "category": "Database",
    "items": [
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Firebase"
    ]
  },
  {
    "category": "Tools & DevOps",
    "items": [
      "Git",
      "Docker",
      "Kubernetes",
      "AWS",
      "CI/CD"
    ]
  }
]
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### Contact

#### POST /api/contact

Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here..."
}
```

**Required Fields:**
- `name` (string)
- `email` (string, valid email)
- `message` (string, min 10 characters)

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I would like to discuss a project with you."
  }'
```

**Response:**
```json
{
  "message": "Thank you for your message. I will get back to you soon!",
  "submission": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I would like to discuss a project with you.",
    "submittedAt": "2024-06-13T10:30:00.000Z"
  }
}
```

**Status Codes:**
- `201` - Created
- `400` - Bad request (missing or invalid fields)
- `500` - Server error

**Validation:**
- Email must be valid format
- Message must be at least 10 characters
- All fields are required

---

### Health & Status

#### GET /api/health

Health check endpoint.

**Example:**
```bash
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-06-13T10:30:00.000Z",
  "uptime": 3600
}
```

**Status Codes:**
- `200` - Healthy
- `503` - Service unavailable

**Use Cases:**
- Monitoring service availability
- Load balancer health checks
- Uptime monitoring services

---

## Error Handling

### Error Response Format

```json
{
  "error": "Description of what went wrong",
  "code": "ERROR_CODE",
  "timestamp": "2024-06-13T10:30:00.000Z"
}
```

### Common Errors

#### 400 - Bad Request
```json
{
  "error": "Missing required fields",
  "code": "VALIDATION_ERROR",
  "details": {
    "missing": ["title", "description"]
  }
}
```

#### 404 - Not Found
```json
{
  "error": "Project not found",
  "code": "NOT_FOUND"
}
```

#### 500 - Internal Server Error
```json
{
  "error": "Internal server error",
  "code": "SERVER_ERROR"
}
```

---

## Rate Limiting

**Current:** No rate limiting (implement before production)

**Recommended:** Add rate limiting middleware
```bash
npm install express-rate-limit
```

**Configuration:**
- General: 100 requests per 15 minutes
- API: 1000 requests per 15 minutes
- Contact form: 5 submissions per hour per IP

---

## Pagination

For endpoints returning multiple items, use pagination:

```bash
GET /api/projects?page=1&limit=10
```

**Query Parameters:**
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 10, max: 100)
- `offset` (number) - Alternative to pagination

**Response Headers:**
```
X-Total-Count: 25
X-Page: 1
X-Limit: 10
X-Pages: 3
```

---

## Filtering & Searching

### By Technology

```bash
GET /api/projects?technology=React&technology=Node.js
```

### By Date Range

```bash
GET /api/projects?startDate=2023-01&endDate=2024-01
```

### Search

```bash
GET /api/projects/search?q=ecommerce
```

---

## Sorting

```bash
# Sort by date (ascending)
GET /api/projects?sort=startDate

# Sort by date (descending)
GET /api/projects?sort=-startDate

# Sort by title
GET /api/projects?sort=title
```

---

## CORS

**Allowed Origins:**
- `http://localhost:3000` (development)
- `https://yourdomain.com` (production)

**Allowed Methods:**
- GET
- POST
- PUT
- DELETE
- OPTIONS

**Allowed Headers:**
- Content-Type
- Authorization

---

## Security

### Best Practices

1. **Always use HTTPS in production**
   ```
   https://your-api-domain.com/api
   ```

2. **Validate all inputs**
   - Check data types
   - Sanitize strings
   - Validate email format

3. **Implement authentication**
   - Use JWT tokens
   - Verify API keys
   - Add CSRF protection

4. **Use environment variables**
   - Never hardcode secrets
   - Use .env file locally
   - Use service credentials in production

5. **Add request logging**
   - Log all API calls
   - Monitor for suspicious activity
   - Use service like Sentry

---

## Testing

### Using cURL

```bash
# Get all projects
curl http://localhost:5000/api/projects

# Get specific project
curl http://localhost:5000/api/projects/1

# Create project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test","technologies":["React"]}'

# Submit contact
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message 12345"}'

# Health check
curl http://localhost:5000/api/health
```

### Using Postman

1. Import endpoints
2. Set environment variables
3. Create test collection
4. Run automated tests

### Using JavaScript/Fetch

```javascript
// Get projects
fetch('http://localhost:5000/api/projects')
  .then(res => res.json())
  .then(data => console.log(data));

// Create project
fetch('http://localhost:5000/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Project',
    description: 'Description',
    technologies: ['React']
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Submit contact
fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Your Name',
    email: 'your@email.com',
    message: 'Your message here with at least 10 characters'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Webhooks (Future)

To implement webhooks for contact form submissions:

```javascript
// Notify external service
const webhookURL = process.env.WEBHOOK_URL;
await fetch(webhookURL, {
  method: 'POST',
  body: JSON.stringify(submission)
});
```

---

## Versioning

Future API versions:
- `v1` - Current (implicit)
- `v2` - Planned improvements

**Endpoint with version:**
```
GET /api/v1/projects
GET /api/v2/projects
```

---

## Changelog

### v1.0.0 (Current)
- Initial API release
- Projects endpoints
- Skills endpoints
- Contact form
- Health check

### Future Versions
- User authentication
- Admin dashboard
- Blog endpoints
- Analytics endpoints
- Webhook support

---

## Support

For API issues:
1. Check status: `/api/health`
2. Verify request format
3. Check CORS settings
4. Review error messages
5. Open GitHub issue

---

**Last Updated:** June 2024
**API Version:** 1.0.0
