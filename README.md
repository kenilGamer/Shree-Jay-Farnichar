# 🏠 Lumelight Interior
### *Transforming Spaces with Excellence - Interior Design Management System*

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green.svg)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A comprehensive full-stack web application for managing interior design projects, showcasing portfolios, and facilitating client interactions. Built with modern technologies to provide a seamless experience for both administrators and clients.

## ✨ Features

### 🎨 **For Clients**
- **Interactive Gallery**: Browse through stunning interior design projects
- **Service Showcase**: Explore comprehensive interior design services
- **Contact Integration**: Easy communication with design experts
- **Responsive Design**: Optimized for all devices and screen sizes

### 🔧 **For Administrators**
- **Dashboard Management**: Complete control over content and media
- **Gallery Management**: Upload, edit, and organize project images
- **User Authentication**: Secure admin access with JWT tokens
- **File Upload System**: Support for images and videos
- **Real-time Updates**: Instant content updates across the platform

### 🚀 **Technical Features**
- **Modern Stack**: React 18 + Node.js + Express + MongoDB
- **Fast Development**: Vite for lightning-fast frontend builds
- **File Management**: Multer for efficient file uploads
- **Security**: JWT authentication and secure password handling
- **Responsive UI**: Tailwind CSS for beautiful, mobile-first design

## 🏗️ Architecture Overview

```mermaid
graph TB
    A[Client Browser] --> B[React Frontend]
    B --> C[Express API Server]
    C --> D[MongoDB Database]
    C --> E[File Storage]
    
    subgraph "Frontend Components"
        F[Home Page]
        G[Gallery]
        H[Dashboard]
        I[Authentication]
    end
    
    subgraph "Backend Services"
        J[User Management]
        K[Gallery API]
        L[File Upload]
        M[Authentication]
    end
    
    B --> F
    B --> G
    B --> H
    B --> I
    
    C --> J
    C --> K
    C --> L
    C --> M
```

## 📁 Project Structure

```
Shree-Jay-Farnichar/
├── 📁 backend/                    # Node.js/Express API Server
│   ├── 📁 models/                 # MongoDB Schemas
│   │   ├── 📄 UserModel.js        # User authentication model
│   │   └── 📄 Gallery.js          # Gallery items model
│   ├── 📁 uploads/                # File storage directory
│   ├── 📁 https/                  # SSL certificates
│   ├── 📄 app.js                  # Main server application
│   ├── 📄 multer.js               # File upload configuration
│   ├── 📄 package.json            # Backend dependencies
│   └── 📄 Dockerfile              # Docker configuration
├── 📁 frontend/                   # React.js Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 components/         # React Components
│   │   │   ├── 📄 Home.jsx        # Landing page
│   │   │   ├── 📄 Dashboard.jsx   # Admin dashboard
│   │   │   ├── 📄 Gallery.jsx     # Gallery display
│   │   │   ├── 📄 Login.jsx       # Authentication
│   │   │   └── 📄 ...             # Other components
│   │   ├── 📁 partials/           # Reusable UI Components
│   │   │   ├── 📄 Navbar.jsx      # Navigation bar
│   │   │   └── 📄 Topbar.jsx      # Top information bar
│   │   ├── 📄 App.jsx             # Main app component
│   │   ├── 📄 main.jsx            # Application entry point
│   │   └── 📄 index.css           # Global styles
│   ├── 📁 public/                 # Static assets
│   ├── 📄 package.json            # Frontend dependencies
│   ├── 📄 tailwind.config.js      # Tailwind CSS configuration
│   ├── 📄 vite.config.js          # Vite build configuration
│   └── 📄 Dockerfile              # Docker configuration
├── 📄 docker-compose.yml          # Docker orchestration
├── 📄 package.json                # Root package.json
├── 📄 start-dev.bat               # Windows development script
├── 📄 start-dev.sh                # Linux/Mac development script
└── 📄 README.md                   # This file
```

## 🚀 Quick Start Guide

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **MongoDB** (v5.0 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

### 🔧 Installation Steps

#### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/Shree-Jay-Farnichar.git
cd Shree-Jay-Farnichar
```

#### 2. **Install Dependencies**
```bash
# Install all dependencies for both frontend and backend
npm run setup

# Or install individually
cd backend && npm install
cd ../frontend && npm install
```

#### 3. **Environment Configuration**

Create environment files for both frontend and backend:

**Backend Environment** (`backend/.env`):
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/lumelight-interior

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d

# Email Configuration (for password reset)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

**Frontend Environment** (`frontend/.env`):
```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Lumelight Interior
VITE_APP_VERSION=1.0.0

# Development Configuration
VITE_DEV_MODE=true
```

#### 4. **Database Setup**
```bash
# Start MongoDB (if running locally)
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod

# Or use MongoDB Compass for GUI management
```

#### 5. **Start Development Servers**
```bash
# Start both frontend and backend simultaneously
npm run dev

# Or start them individually in separate terminals
npm run backend    # Terminal 1: Backend server
npm run frontend   # Terminal 2: Frontend server
```

## 🌐 Application URLs

Once the servers are running, you can access:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Main application interface |
| **Backend API** | http://localhost:5000 | REST API endpoints |
| **Admin Dashboard** | http://localhost:5173/dashboard | Administrative panel |
| **Gallery** | http://localhost:5173/gallery | Public gallery view |
| **API Documentation** | http://localhost:5000/api-docs | API endpoint documentation |

## 📋 Available Scripts

### 🏠 Root Level Commands
```bash
npm run dev          # Start both frontend and backend in development mode
npm run backend      # Start only the backend server
npm run frontend     # Start only the frontend development server
npm run setup        # Install all dependencies for both projects
npm run build        # Build the frontend for production
npm run start        # Start the backend in production mode
npm run clean        # Remove all node_modules folders
npm run test         # Run all tests
npm run lint         # Lint all code
```

### 🔧 Backend Commands (from `backend/` directory)
```bash
npm run dev          # Start with nodemon (auto-restart on changes)
npm start            # Start in production mode
npm run logs         # Show server logs
npm run test         # Run backend tests
npm run seed         # Seed database with sample data
```

### 🎨 Frontend Commands (from `frontend/` directory)
```bash
npm run dev          # Start Vite development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run test         # Run frontend tests
npm run lint         # Lint frontend code
```

## 🔧 Development Workflow

### 🚀 Starting Development
```bash
# Option 1: Start everything at once
npm run dev

# Option 2: Start individually (recommended for debugging)
npm run backend    # Terminal 1: Backend server (port 5000)
npm run frontend   # Terminal 2: Frontend server (port 5173)
```

### 🔄 Making Changes
- **Backend Changes**: Server automatically restarts with nodemon
- **Frontend Changes**: Hot reload with Vite for instant updates
- **Database Changes**: Restart backend server to apply schema changes
- **Environment Changes**: Restart both servers

### 🧪 Testing Your Changes
- **Backend API**: Test endpoints using Postman, curl, or browser
- **Frontend**: Test in browser at http://localhost:5173
- **Database**: Use MongoDB Compass or mongo shell
- **File Uploads**: Test with various image formats and sizes

## 📁 Key Directories & Files

### 🔧 Backend (`/backend`)
| Directory/File | Purpose |
|----------------|---------|
| `models/` | MongoDB schemas and data models |
| `uploads/` | File storage for images and videos |
| `https/` | SSL certificates for HTTPS |
| `app.js` | Main Express server configuration |
| `multer.js` | File upload middleware configuration |
| `package.json` | Backend dependencies and scripts |

### 🎨 Frontend (`/frontend`)
| Directory/File | Purpose |
|----------------|---------|
| `src/components/` | Main React components |
| `src/partials/` | Reusable UI components |
| `public/` | Static assets (images, videos, etc.) |
| `tailwind.config.js` | Tailwind CSS configuration |
| `vite.config.js` | Vite build tool configuration |

### 📄 Key Components
| Component | Description |
|-----------|-------------|
| `Home.jsx` | Landing page with hero section and features |
| `Dashboard.jsx` | Admin panel for content management |
| `Gallery.jsx` | Public gallery display with filtering |
| `Login.jsx` | Authentication and admin login |
| `Updateanddelete.jsx` | Content management interface |
| `Navbar.jsx` | Main navigation component |
| `Topbar.jsx` | Top information bar |

## 🔐 Authentication & Security

### 🔑 Authentication Flow
1. **Admin Login**: Access via `/login` route
2. **JWT Tokens**: Secure session management
3. **Password Reset**: Email-based password recovery
4. **Protected Routes**: Dashboard requires authentication

### 🛡️ Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **File Upload Validation**: Type and size restrictions
- **CORS Configuration**: Cross-origin request security
- **Environment Variables**: Sensitive data protection

## 📊 API Endpoints

### 🖼️ Gallery Management
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `GET` | `/api/gallery` | Get all gallery items | Public |
| `POST` | `/api/gallery` | Upload new gallery item | Admin |
| `PUT` | `/api/gallery/:id` | Update gallery item | Admin |
| `DELETE` | `/api/gallery/:id` | Delete gallery item | Admin |
| `GET` | `/api/gallery/:id` | Get specific gallery item | Public |

### 👤 User Management
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `POST` | `/api/auth/login` | Admin login | Public |
| `POST` | `/api/auth/register` | Admin registration | Public |
| `POST` | `/api/auth/forgot-password` | Password reset request | Public |
| `POST` | `/api/auth/reset-password` | Reset password | Public |
| `GET` | `/api/auth/profile` | Get user profile | Admin |
| `PUT` | `/api/auth/profile` | Update user profile | Admin |

### 📁 File Management
| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `POST` | `/api/upload` | Upload files | Admin |
| `GET` | `/api/files/:filename` | Serve uploaded files | Public |
| `DELETE` | `/api/files/:filename` | Delete files | Admin |

## 🚀 Deployment Guide

### 🌐 Production Deployment

#### Backend Deployment
1. **Set Production Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   JWT_SECRET=your-production-jwt-secret
   ```

2. **Build and Start**
   ```bash
   cd backend
   npm install --production
   npm start
   ```

#### Frontend Deployment
1. **Build for Production**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting service:
   - **Vercel**: `vercel --prod`
   - **Netlify**: Drag and drop `dist/` folder
   - **AWS S3**: Upload `dist/` contents to S3 bucket

### 🐳 Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build

# Or run individually
docker build -t backend ./backend
docker build -t frontend ./frontend
```

### ☁️ Cloud Deployment Options

| Platform | Backend | Frontend | Database |
|----------|---------|----------|----------|
| **Vercel** | ✅ | ✅ | MongoDB Atlas |
| **Netlify** | ❌ | ✅ | MongoDB Atlas |
| **Heroku** | ✅ | ✅ | MongoDB Atlas |
| **AWS** | ✅ | ✅ | MongoDB Atlas |
| **DigitalOcean** | ✅ | ✅ | MongoDB Atlas |

## 🛠️ Troubleshooting

### 🚨 Common Issues & Solutions

#### 1. **Port Already in Use**
```bash
# Kill process on port 5000 (Backend)
npx kill-port 5000

# Kill process on port 5173 (Frontend)
npx kill-port 5173

# Or find and kill manually
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

#### 2. **MongoDB Connection Issues**
```bash
# Check if MongoDB is running
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl status mongod

# Test connection
mongosh "mongodb://localhost:27017"
```

#### 3. **File Upload Issues**
- Check `uploads/` directory permissions
- Verify file size limits in multer configuration
- Ensure supported file types are configured

#### 4. **Frontend Build Issues**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run build
```

#### 5. **Environment Variable Issues**
- Ensure `.env` files are in correct directories
- Check for typos in variable names
- Restart servers after changing environment variables

#### 6. **CORS Issues**
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS configuration in backend `app.js`
- Ensure both servers are running on correct ports

### 🔍 Debugging Tips

1. **Check Server Logs**
   ```bash
   # Backend logs
   cd backend && npm run logs
   
   # Frontend logs (in browser console)
   # Open Developer Tools (F12) → Console tab
   ```

2. **Database Connection Test**
   ```bash
   # Test MongoDB connection
   mongosh "your-connection-string"
   ```

3. **API Testing**
   ```bash
   # Test API endpoints
   curl http://localhost:5000/api/gallery
   ```

## 📝 Environment Variables Reference

### 🔧 Backend Environment Variables
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | `5000` | ✅ |
| `NODE_ENV` | Environment mode | `development` | ✅ |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/db` | ✅ |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` | ✅ |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` | ❌ |
| `EMAIL_USER` | Email username | `user@gmail.com` | ❌ |
| `EMAIL_PASS` | Email password | `app-password` | ❌ |
| `EMAIL_HOST` | SMTP host | `smtp.gmail.com` | ❌ |
| `EMAIL_PORT` | SMTP port | `587` | ❌ |
| `MAX_FILE_SIZE` | Max upload size | `10485760` | ❌ |
| `UPLOAD_PATH` | Upload directory | `./uploads` | ❌ |

### 🎨 Frontend Environment Variables
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` | ✅ |
| `VITE_APP_NAME` | Application name | `Lumelight Interior` | ❌ |
| `VITE_APP_VERSION` | Application version | `1.0.0` | ❌ |
| `VITE_DEV_MODE` | Development mode flag | `true` | ❌ |

## 🧪 Testing

### 🔬 Running Tests
```bash
# Run all tests
npm run test

# Run backend tests only
cd backend && npm test

# Run frontend tests only
cd frontend && npm test

# Run tests with coverage
npm run test:coverage
```

### 📊 Test Coverage
- **Backend**: API endpoints, models, and utilities
- **Frontend**: Components, hooks, and utilities
- **Integration**: End-to-end user workflows

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### 🔀 Contribution Workflow
1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Submit a pull request**

### 📋 Contribution Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

## 📞 Support & Contact

### 🆘 Getting Help
- **Documentation**: Check this README and inline code comments
- **Issues**: Create a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions

### 📧 Contact Information
- **Email**: lumelightinterior@gmail.com
- **Phone**: +91 92281 04285
- **Website**: [Your Website URL]
- **LinkedIn**: [Your LinkedIn Profile]

### 🐛 Reporting Bugs
When reporting bugs, please include:
- Operating system and version
- Node.js and npm versions
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots or error messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing frontend framework
- **Express.js Team** - For the robust backend framework
- **MongoDB Team** - For the flexible database solution
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS Team** - For the utility-first CSS framework

---

<div align="center">

**🌟 If you found this project helpful, please give it a star! 🌟**

Made with ❤️ by [Your Name/Team]

[![GitHub stars](https://img.shields.io/github/stars/your-username/Shree-Jay-Farnichar.svg?style=social&label=Star)](https://github.com/your-username/Shree-Jay-Farnichar)
[![GitHub forks](https://img.shields.io/github/forks/your-username/Shree-Jay-Farnichar.svg?style=social&label=Fork)](https://github.com/your-username/Shree-Jay-Farnichar/fork)

</div>
