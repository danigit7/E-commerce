# 🚀 START HERE - Quick Setup Guide

## ✅ Setup Complete!

Your MERN e-commerce app is fully configured with:

- ✅ React + Vite + Tailwind + Redux Toolkit + Framer Motion
- ✅ Node.js + Express + MongoDB + Mongoose
- ✅ ESLint + Prettier for code quality
- ✅ Single command to run both servers

---

## ⚡ Quick Start (3 Steps)

### 1️⃣ Install Dependencies

```bash
npm run install:all
```

### 2️⃣ Set Up Environment Variables

**Create `backend/.env`:**

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d

# Optional services
STRIPE_SECRET_KEY=sk_test_...
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_password
```

**Create `frontend/.env`:**

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3️⃣ Run the App

```bash
npm run dev
```

**Open browser:**

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 📚 Documentation

| File                     | Purpose                     |
| ------------------------ | --------------------------- |
| **CHECKLIST.md**         | ✅ Complete setup checklist |
| **SETUP.md**             | 📖 Detailed setup guide     |
| **PROJECT_STRUCTURE.md** | 📁 Visual project structure |
| **COMPLETED_SETUP.md**   | 🎉 What was configured      |
| **FILES_CREATED.md**     | 📝 List of all new files    |
| **SETUP_SUMMARY.txt**    | 📊 Visual summary           |

---

## 🎯 Most Used Commands

```bash
# Development (run both servers)
npm run dev

# Run individually
npm run client    # Frontend only
npm run server    # Backend only

# Code quality
cd frontend && npm run lint:fix
cd backend && npm run lint:fix

# Build for production
npm run build
```

---

## ✨ What's Been Configured

### Frontend (`/frontend`)

- ✅ ESLint for React
- ✅ Prettier for formatting
- ✅ Already has: React 18, Vite, Tailwind, Redux Toolkit, Framer Motion

### Backend (`/backend`)

- ✅ ESLint for Node.js
- ✅ Prettier for formatting
- ✅ Already has: Express, MongoDB, Mongoose, JWT, Stripe

### Root

- ✅ Concurrently to run both servers
- ✅ VS Code settings (auto-format on save)

---

## 🆘 Need Help?

1. **Can't install dependencies?**

   - Make sure Node.js v18+ is installed
   - Try: `npm cache clean --force`

2. **Backend won't start?**

   - Make sure MongoDB is running
   - Check your `.env` file exists

3. **Port already in use?**

   ```bash
   npx kill-port 5000    # Backend
   npx kill-port 5173    # Frontend
   ```

4. **ESLint errors?**
   ```bash
   npm run lint:fix
   ```

---

## 💡 Pro Tips

1. Run `npm run dev` from the **root** directory (not frontend or backend)
2. VS Code will auto-format code on save if you have Prettier extension
3. Use `npm run lint:fix` to auto-fix most code issues
4. MongoDB must be running before starting the backend
5. Check the console for errors when running `npm run dev`

---

## 🎨 Directory Structure

```
e-commerce/
├── frontend/          # React app (port 5173)
│   ├── src/
│   ├── .eslintrc.json
│   └── package.json
│
├── backend/           # Express API (port 5000)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .eslintrc.json
│   └── package.json
│
└── package.json       # Root (with concurrently)
```

---

## ✅ You're Ready!

```bash
# 1. Install
npm run install:all

# 2. Configure (create .env files)
# See section 2️⃣ above

# 3. Run
npm run dev

# 4. Open browser
# http://localhost:5173
```

**Happy Coding! 🚀**

---

**Note:** The directories are currently named `frontend` and `backend`. If you want to rename them to `client` and `server`, close all editors/terminals, rename the folders, and update the scripts in root `package.json`.
