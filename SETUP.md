# 🚀 MERN E-Commerce Setup Guide

This is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application with a modern tech stack.

## 📁 Project Structure

```
e-commerce/
├── frontend/                # React + Vite + Tailwind + Redux Toolkit
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux Toolkit slices
│   │   └── utils/          # Utility functions
│   ├── .eslintrc.json      # ESLint configuration
│   ├── .prettierrc.json    # Prettier configuration
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                 # Node.js + Express + MongoDB
│   ├── config/             # Database & service configs
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── .eslintrc.json      # ESLint configuration
│   ├── .prettierrc.json    # Prettier configuration
│   ├── .gitignore
│   ├── package.json
│   └── server.js           # Entry point
│
├── .gitignore              # Root gitignore
├── package.json            # Root package with scripts
└── README.md
```

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe** - Payment processing
- **Cloudinary** - Image management

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Concurrently** - Run multiple commands
- **Nodemon** - Auto-restart server
- **Jest** - Testing framework

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. **Install all dependencies**

   ```bash
   # Install root dependencies (concurrently)
   npm install

   # Install frontend dependencies
   npm run install:client

   # Install backend dependencies
   npm run install:server

   # Or install all at once
   npm run install:all
   ```

3. **Environment Variables**

   Create `.env` file in the `backend` directory:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Email (NodeMailer)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   EMAIL_FROM=noreply@ecommerce.com
   ```

   Create `.env` file in the `frontend` directory:

   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

## 🚀 Running the Application

### Development Mode

**Run both frontend and backend concurrently:**

```bash
npm run dev
```

**Run frontend only:**

```bash
npm run client
```

**Run backend only:**

```bash
npm run server
```

### Individual Commands

**Frontend (from frontend directory):**

```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting
```

**Backend (from backend directory):**

```bash
cd backend
npm run dev          # Start with nodemon
npm start            # Start production server
npm run seed         # Seed database
npm run test         # Run tests
npm run lint         # Lint code
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting
```

## 🏗️ Building for Production

1. **Build frontend:**

   ```bash
   npm run build
   ```

2. **Start backend:**
   ```bash
   cd backend
   npm start
   ```

## 📝 Available Scripts (Root)

- `npm run dev` - Run both client and server concurrently
- `npm run client` - Run frontend only
- `npm run server` - Run backend only
- `npm run install:client` - Install frontend dependencies
- `npm run install:server` - Install backend dependencies
- `npm run install:all` - Install all dependencies
- `npm run build` - Build frontend for production
- `npm start` - Start backend in production mode

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

## 📚 API Documentation

The API runs on `http://localhost:5000/api`

See `POSTMAN_COLLECTION.json` for complete API documentation.

## 🔧 Code Quality

### ESLint

Both frontend and backend are configured with ESLint for code quality.

```bash
# Lint frontend
cd frontend && npm run lint

# Lint backend
cd backend && npm run lint
```

### Prettier

Code formatting is handled by Prettier.

```bash
# Format frontend
cd frontend && npm run format

# Format backend
cd backend && npm run format
```

## 📄 License

MIT License

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

**Note:** If you want to rename directories from `frontend/backend` to `client/server`, you can do so by:

1. Close all open editors/terminals using those directories
2. Rename the directories manually or via command:
   - `move frontend client` (Windows)
   - `mv frontend client` (Mac/Linux)
   - `move backend server` (Windows)
   - `mv backend server` (Mac/Linux)
3. Update all references in `package.json` scripts accordingly
