# College Alumni Network - Backend API

## Tech Stack
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB Atlas + Mongoose
- **Auth**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Password hashing**: bcryptjs

---

## Project Structure

```
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Register, Login, GetMe
│   ├── profileController.js
│   ├── eventController.js
│   └── jobController.js
├── middleware/
│   ├── auth.js            # JWT protect middleware
│   └── errorHandler.js    # Global error handler
├── models/
│   ├── User.js
│   ├── Profile.js
│   ├── Event.js
│   └── Job.js
├── routes/
│   ├── authRoutes.js
│   ├── profileRoutes.js
│   ├── eventRoutes.js
│   └── jobRoutes.js
├── .env.example
├── server.js
└── package.json
```

---

## Setup Steps

### 1. Install dependencies
```bash
npm install
```

### 2. Set up MongoDB Atlas
1. Go to https://cloud.mongodb.com and create a free account
2. Create a new cluster (M0 Free tier)
3. Click "Connect" → "Connect your application"
4. Copy the connection string

### 3. Create .env file
```bash
cp .env.example .env
```
Edit `.env` and fill in:
```
PORT=5000
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<any long random string>
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 4. Run the server
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login user |
| GET | /api/auth/me | Private | Get logged-in user |

### Profile
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/profile | Private | Get all profiles (with filters) |
| GET | /api/profile/me | Private | Get my profile |
| PUT | /api/profile/me | Private | Update my profile |
| GET | /api/profile/:userId | Private | Get profile by user ID |

### Events
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/events | Private | Get all events |
| POST | /api/events | Private | Create event |
| GET | /api/events/:id | Private | Get single event |
| PUT | /api/events/:id | Private | Update event (organizer) |
| DELETE | /api/events/:id | Private | Delete event (organizer) |
| POST | /api/events/:id/rsvp | Private | RSVP to event |
| DELETE | /api/events/:id/rsvp | Private | Cancel RSVP |

### Jobs
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/jobs | Private | Get all jobs |
| POST | /api/jobs | Private | Post a job |
| GET | /api/jobs/my-posts | Private | My posted jobs |
| GET | /api/jobs/:id | Private | Get single job |
| PUT | /api/jobs/:id | Private | Update job (poster) |
| DELETE | /api/jobs/:id | Private | Delete job (poster) |
| POST | /api/jobs/:id/apply | Private | Apply to job |

---

## Connecting to React Frontend

In your React app, store the JWT token and send it with every request:

```javascript
// After login
localStorage.setItem('token', response.data.token);

// In your axios setup (axiosConfig.js)
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```
