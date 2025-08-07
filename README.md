# SportsBuddy

A full-stack web application for connecting sports enthusiasts and organizing team activities. Built with React frontend, Node.js backend, and MongoDB database.

## 🌐 Live Demo

**Live Application**: [http://13.211.191.173:5174/](http://13.211.191.173:5174/)  
**API Documentation**: [http://13.211.191.173:5001/api-docs](http://13.211.191.173:5001/api-docs)

## 🏗️ Tech Stack

### Frontend
- React 18 with Vite
- Ant Design UI Library
- Zustand State Management
- React Router DOM
- Less CSS

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- Swagger/OpenAPI Documentation

### Infrastructure
- Docker & Docker Compose
- GitHub Actions CI/CD
- AWS EC2 Deployment

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Docker & Docker Compose

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sherry3333/SportsBuddy
   cd SportsBuddy
   ```

2. **Start with Docker (Recommended)**
   ```bash
   docker compose up
   ```
   Access the application at http://localhost:3000

3. **Manual Setup**
   ```bash
   # Backend
   cd backend
   npm install
   npm run init-db
   npm run dev

   # Frontend (new terminal)
   cd frontend
   npm install
   npm run dev
   ```

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## 🔄 CI/CD Pipeline

Automated deployment using GitHub Actions:
- **Trigger**: Push to `main` branch
- **Build**: Node.js setup and dependency installation
- **Test**: Automated testing for backend
- **Deploy**: Build Docker images and deploy to AWS EC2

## 👨‍💻 My Contributions

### Backend Development & DevOps

- **Backend API Development**
  - RESTful APIs using Express.js
  - MongoDB schemas with Mongoose
  - JWT authentication and authorization
  - Swagger/OpenAPI documentation
  - API response middleware

- **Database Design & Management**
  - MongoDB schemas for Users, Teams, Sports, and Locations
  - Database initialization scripts
  - Data validation and error handling

- **CI/CD Pipeline Implementation**
  - GitHub Actions workflow for automated deployment
  - Docker containerization for frontend and backend
  - Path-based deployment triggers
  - Automated testing integration

- **AWS EC2 Deployment & Infrastructure**
  - AWS EC2 instance configuration
  - Docker Hub integration
  - Automated deployment from GitHub
  - Environment variables and secrets management

**Technologies**: Node.js, Express.js, MongoDB, Mongoose, JWT, Docker, GitHub Actions, AWS EC2

## 📁 Project Structure

```
SportsBuddy/
├── frontend/                 # React application
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── domain/          # Business logic
│   │   └── assets/          # Static assets
│   └── Dockerfile
├── backend/                  # Node.js API
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── data/            # Database schemas
│   │   └── middleware/      # Express middleware
│   └── Dockerfile
├── .github/workflows/        # CI/CD
└── docker-compose.yml        # Multi-container setup
```

## 📝 License

This project is part of CS732 coursework at the University of Auckland.