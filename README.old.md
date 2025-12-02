# Skill Board - Frontend

A modern React.js frontend application for Skill Board with authentication and a beautiful UI.

## Features

- ✅ User authentication (Login & Signup)
- ✅ Protected routes
- ✅ Modern, responsive UI design
- ✅ JWT token-based authentication
- ✅ Beautiful gradient backgrounds and animations
- ✅ Dashboard with user information

## Tech Stack

- **React 18** - UI library
- **React Router** - Routing
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file (optional):**
   Create a `.env` file if you need to customize the API URL:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3001`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Login component
│   │   ├── Signup.jsx         # Signup component
│   │   ├── Dashboard.jsx      # Dashboard component
│   │   ├── Auth.css           # Auth page styles
│   │   └── Dashboard.css      # Dashboard styles
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication context
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styles
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── vite.config.js             # Vite configuration
└── package.json
```

## API Integration

The frontend connects to the backend API at `http://localhost:3000` by default. Make sure your backend server is running before using the frontend.

### Available Routes

- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Protected dashboard (requires authentication)
- `/` - Redirects to dashboard

## Features

### Authentication
- Login with email and password
- Signup with name, email, and password
- Automatic login after successful signup
- Protected routes that redirect to login if not authenticated
- Token stored in localStorage

### UI/UX
- Modern gradient design
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Loading states
- Error handling and display
- Form validation

## Development

The app uses Vite for fast development with hot module replacement (HMR). Changes to your code will be reflected immediately in the browser.

## Notes

- The frontend expects the backend to be running on `http://localhost:3000`
- JWT tokens are stored in localStorage
- The app automatically redirects to login if the token is invalid or expired
- All API requests include the authentication token in the Authorization header

# skillboard_frontend
