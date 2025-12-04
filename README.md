# SkillBoard – Frontend  
### Modern Job Portal UI | React + Axios + Context API | Fully Hosted on Vercel

SkillBoard is a modern job search platform frontend built with **React**, offering job listings, filtering, sorting, authentication views, dashboards, and a clean, modern UI.

### 🔗 Live Demo  
https://skillboard-frontend.vercel.app/

### 🔗 Backend API  
https://skillboard-backend.onrender.com/api

---

## 🚀 Features

### 🔐 Authentication UI
- Login & Signup pages  
- JWT-based authentication handled via Axios interceptor  
- Role-based navigation (`applicant`, `employer`, `admin`)

### 🧭 Job Search & Filters
- Keyword search (title, skills, company)
- Location search
- Sort by salary / newest
- Filter by job type & salary range
- Pagination through backend API

### 📊 Dashboards
#### Applicant Dashboard
- View applied jobs  
- See application statuses  

#### Employer Dashboard
- Post jobs  
- Manage job listings  
- Edit and delete jobs  

#### Admin Dashboard
- View all users (pagination)  
- View all jobs (pagination)  
- Delete users or jobs  

### 🎨 UI
- Modern, clean theme inspired by TealHQ  
- Fully responsive  
- Custom components and styling  

---

## 🏗️ Tech Stack

| Tech | Purpose |
|------|---------|
| React.js | UI Framework |
| Axios | API handling |
| React Router | Navigation |
| Context API | Auth state |
| Lucide Icons | Icons |
| CSS | Styling |
| Vercel | Deployment |

---

## 📁 Folder Structure
skillboard-frontend/
├── public/
├── src/
│   ├── api/
│   │    └── axios.js
│   ├── components/
│   ├── context/
│   │    └── AuthContext.js
│   ├── pages/
│   ├── styles/
│   ├── App.js
│   ├── index.js
└── package.json

---

## 🔗 API Integration

Frontend uses a custom Axios instance:

```
import axios from "axios";

const api = axios.create({
  baseURL: "https://skillboard-backend.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("skillboard-user"));
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default api;
```
⚙️ Installation & Setup

1. Install dependencies
   ```npm install```
2. Start development server
   ```npm start```
3. Create production build
   ```npm run build```

🚀 Deployment

Frontend is deployed on Vercel:

https://skillboard-frontend.vercel.app/
