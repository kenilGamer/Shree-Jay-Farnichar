# Bhumi Interior Solution - Interior Design Management System

A full-stack application for managing interior design projects, gallery, and client interactions.

## 🏗️ Project Structure

```
shree-jay-furniture/
├── backend/                 # Node.js/Express API server
│   ├── models/             # Database models
│   ├── uploads/            # File uploads directory
│   ├── app.js              # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React.js frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── partials/       # Reusable partials
│   │   └── index.css       # Global styles
│   └── package.json        # Frontend dependencies
├── package.json            # Root package.json for scripts
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd shree-jay-furniture
   ```

2. **Install all dependencies**
   ```bash
   npm run setup
   ```

3. **Set up environment variables**
   
   Create `backend/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shree-jay-furniture
   JWT_SECRET=your-jwt-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

   Create `frontend/.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

### Root Level Commands
- `npm run dev` - Start both backend and frontend in development mode
- `npm run backend` - Start only the backend server
- `npm run frontend` - Start only the frontend development server
- `npm run setup` - Install all dependencies for both projects
- `npm run build` - Build the frontend for production
- `npm run start` - Start the backend in production mode
- `npm run clean` - Remove all node_modules folders

### Backend Commands (from backend/ directory)
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start in production mode
- `npm run logs` - Show server logs

### Frontend Commands (from frontend/ directory)
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Dashboard**: http://localhost:5173/dashboard
- **Gallery**: http://localhost:5173/gallery

## 🔧 Development Workflow

### 1. Starting Development
```bash
# Start both servers
npm run dev

# Or start individually
npm run backend    # Terminal 1
npm run frontend   # Terminal 2
```

### 2. Making Changes
- **Backend changes**: Server auto-restarts with nodemon
- **Frontend changes**: Hot reload with Vite
- **Database changes**: Restart backend server

### 3. Testing
- **Backend**: Test API endpoints with Postman or curl
- **Frontend**: Test in browser at http://localhost:5173

## 📁 Key Directories

### Backend (`/backend`)
- `models/` - MongoDB schemas (User, Gallery)
- `uploads/` - File storage for images/videos
- `app.js` - Express server configuration
- `multer.js` - File upload configuration

### Frontend (`/frontend`)
- `src/components/` - React components
  - `Home.jsx` - Landing page
  - `Dashboard.jsx` - Admin panel
  - `Gallery.jsx` - Gallery display
  - `Updateanddelete.jsx` - Content management
- `src/partials/` - Reusable components
  - `Navbar.jsx` - Navigation bar
  - `Topbar.jsx` - Top information bar
- `public/` - Static assets

## 🔐 Authentication

- **Admin Login**: `/login`
- **Forgot Password**: `/forgot-password`
- **Dashboard Access**: Requires admin authentication

## 📊 API Endpoints

### Gallery Management
- `GET /gallery` - Get all gallery items
- `POST /gallery` - Upload new gallery item
- `PUT /gallery/:id` - Update gallery item
- `DELETE /gallery/:id` - Delete gallery item

### Authentication
- `POST /login` - Admin login
- `POST /register` - Admin registration

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build and start the server:
   ```bash
   cd backend
   npm start
   ```

### Frontend Deployment
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist/` folder to your hosting service

## 🛠️ Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 5000
   npx kill-port 5000
   
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **MongoDB connection issues**
   - Ensure MongoDB is running
   - Check connection string in `.env`

3. **File upload issues**
   - Check `uploads/` directory permissions
   - Verify multer configuration

4. **Frontend build issues**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shree-jay-furniture
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Bhumi Interior Solution
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: bhumiinteriorsolution@gmail.com
- Phone: +91 92281 04285

---

**Happy Coding! 🎨**
