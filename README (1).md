# College Alumni Network Platform - Frontend

## 🚀 Quick Start (Run in 60 seconds)

```bash
# Navigate to project folder
cd college-alumni-network

# Install dependencies
npm install

# Start dev server
npm run dev
```

Then open http://localhost:5173 in your browser.

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Root component + routing
├── main.jsx                 # Entry point
├── styles/
│   └── global.css           # Global styles, CSS variables
├── components/
│   └── Navbar.jsx           # Top navigation bar
└── pages/
    ├── LandingPage.jsx      # Public landing page
    ├── LoginPage.jsx        # Login page
    ├── RegisterPage.jsx     # Registration page
    ├── Dashboard.jsx        # Main dashboard (after login)
    ├── Directory.jsx        # Alumni search & connect
    ├── Jobs.jsx             # Job board
    ├── Events.jsx           # Events & reunions
    └── Profile.jsx          # User profile (editable)
```

## 🎯 Pages & Features

| Page | Features |
|------|----------|
| Landing | Hero, stats, features, CTA |
| Login | Email/password, college SSO |
| Register | Full form with batch/dept |
| Dashboard | Stats, recent alumni, jobs, events |
| Directory | Search, filter by batch/dept, connect |
| Jobs | Search, filter, two-panel detail view, apply |
| Events | Filter by type, register, detail modal |
| Profile | View & edit profile, skills, experience, education |

## 🔌 Backend Integration (Next Steps)

Replace the mock data in each page file with API calls:

```js
// Example: Fetch alumni in Directory.jsx
useEffect(() => {
  fetch('/api/alumni')
    .then(r => r.json())
    .then(data => setAlumniData(data));
}, []);
```

### API Endpoints to Build (Node.js + MongoDB)

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/alumni          - Get all alumni (with filters)
GET    /api/alumni/:id      - Get single profile
PUT    /api/alumni/:id      - Update profile
GET    /api/jobs            - List jobs
POST   /api/jobs            - Post a job
GET    /api/events          - List events
POST   /api/events/:id/register
POST   /api/connect/:id     - Connect with alumni
```

## 🛠 Tech Stack
- **React 18** with Vite
- **CSS-in-JS** (inline styles) - no extra CSS library needed
- **Google Fonts** - Playfair Display + DM Sans
- **No external UI library** - fully custom components
