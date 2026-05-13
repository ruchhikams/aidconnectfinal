# 🩸 AidConnect — Blood Donation Platform

A full-stack MERN application connecting blood donors with patients and blood centers.

---

## 📁 Project Structure

```
aidconnect/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── BloodCenter.js
│   │   ├── Appointment.js
│   │   └── BloodRequest.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── centersController.js
│   │   ├── appointmentsController.js
│   │   └── bloodRequestsController.js
│   └── routes/
│       ├── auth.js
│       ├── centers.js
│       ├── appointments.js
│       └── bloodRequests.js
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    ├── .env.example
    └── src/
        ├── index.js
        ├── index.css
        ├── App.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   └── ProtectedRoute.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   ├── DonateBlood.jsx
        │   ├── NeedBlood.jsx
        │   └── BloodCenters.jsx
        └── utils/
            ├── api.js
            └── AuthContext.jsx
```

---

## ⚙️ Prerequisites

- **Node.js** v16+ and npm
- **MongoDB** (local or MongoDB Atlas)

---

## 🚀 Setup & Running

### 1. Backend Setup

```bash
cd aidconnect/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/aidconnect
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
CLIENT_URL=http://localhost:3000
```

Start the backend:
```bash
# Development (with hot-reload)
npm run dev

# Or production
npm start
```

Backend runs at: **http://localhost:5000**

---

### 2. Frontend Setup

```bash
cd aidconnect/frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

Frontend runs at: **http://localhost:3000**

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user |

### Blood Centers
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/centers` | Private | Get all centers (supports `?bloodGroup=A+` filter) |
| POST | `/api/centers` | Private | Add new center |

### Appointments
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/appointments` | Private | Get user's appointments |
| POST | `/api/appointments` | Private | Book appointment |

### Blood Requests
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/blood-requests` | Private | Get all blood requests |
| POST | `/api/blood-requests` | Private | Create blood request |

---

## 🔐 Authentication

- JWT tokens stored in `localStorage` as `aidconnect_token`
- Axios interceptor auto-attaches Bearer token to all requests
- Protected routes redirect to `/login` if unauthenticated
- 401 responses automatically log users out

---

## 🛠 Tech Stack

**Frontend**
- React 18 + JSX
- Tailwind CSS
- React Router DOM v6
- Axios
- Framer Motion
- Lucide React Icons

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS + dotenv

---

## 💡 Features

- ✅ User registration & login with JWT auth
- ✅ Protected routes on frontend and backend
- ✅ Donate blood — fill form → find centers → book appointment
- ✅ Need blood — submit request → see matching centers
- ✅ Blood centers management — add/view/filter centers
- ✅ Real-time blood request feed
- ✅ Filter centers by blood group
- ✅ Responsive dark UI with smooth animations
- ✅ Loading states and error handling throughout

---

## 🐛 Troubleshooting

**MongoDB connection error**
- Make sure MongoDB is running: `mongod` (local) or verify Atlas connection string

**CORS errors**
- Ensure `CLIENT_URL` in backend `.env` matches frontend URL exactly

**API 401 errors**
- Token may be expired — log out and log back in

**Port conflicts**
- Backend: change `PORT` in `.env`
- Frontend: set `PORT=3001` in frontend `.env` and update `REACT_APP_API_URL`
