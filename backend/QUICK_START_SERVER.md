# 🚀 Backend Quick Start

## ✅ What's Already Configured

Your Express server is **fully configured** with:

- ✅ **Express app** with modular routes
- ✅ **MongoDB** connection with Mongoose
- ✅ **dotenv** for environment variables
- ✅ **CORS** enabled for frontend
- ✅ **Helmet** for security headers
- ✅ **Rate limiting** (100 req/15min)
- ✅ **express.json()** for JSON parsing
- ✅ **Error handling** middleware
- ✅ **Test route** at `/api/test`

---

## ⚡ Quick Start (3 Steps)

### 1️⃣ Create `.env` File

Create `backend/.env` with these **required** variables:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
```

**💡 Tip:** See `ENV_TEMPLATE.txt` for all available variables

### 2️⃣ Start MongoDB

```bash
# If using local MongoDB:
mongod

# If using MongoDB Atlas:
# Just use the connection string in MONGO_URI
```

### 3️⃣ Start the Server

```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

**Expected Output:**
```
✅ MongoDB Connected: localhost
📊 Database: ecommerce
🚀 Server running in development mode on port 5000
```

---

## 🧪 Test the Server

Open your browser or use curl:

```bash
# Test route (confirms server works)
curl http://localhost:5000/api/test

# Root route (lists all endpoints)
curl http://localhost:5000/

# Health check
curl http://localhost:5000/api/health
```

**Success Response from `/api/test`:**
```json
{
  "success": true,
  "message": "✅ Server is running successfully!",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

---

## 📁 Routes Available

All routes are accessible at `http://localhost:5000/api/`:

| Endpoint | Purpose |
|----------|---------|
| `GET /api/test` | ✅ Test server is running |
| `GET /api/health` | Health check with uptime |
| `POST /api/auth/register` | User registration |
| `POST /api/auth/login` | User login |
| `GET /api/users/profile` | Get user profile |
| `GET /api/products` | Get all products |
| `GET /api/orders` | Get user orders |
| `POST /api/cart` | Add to cart |
| `GET /api/admin/*` | Admin routes |

**💡 See root route `/` for complete endpoint list**

---

## 🗂️ Route Files

Routes are organized in `backend/routes/`:

```
routes/
├── authRoutes.js       ✅ Authentication (login, register)
├── userRoutes.js       ✅ User management (profile)
├── productRoutes.js    ✅ Products CRUD
├── orderRoutes.js      ✅ Orders management
├── cartRoutes.js       ✅ Shopping cart
├── wishlistRoutes.js   ✅ User wishlist
├── reviewRoutes.js     ✅ Product reviews
├── uploadRoutes.js     ✅ File uploads
├── adminRoutes.js      ✅ Admin operations
└── stripeRoutes.js     ✅ Payment processing
```

---

## 🔒 Middleware Configured

**Security & Parsing:**
1. `helmet()` - Security headers
2. `rateLimit()` - Prevent abuse (100/15min)
3. `cors()` - Frontend communication
4. `express.json()` - Parse JSON
5. `express.urlencoded()` - Parse forms
6. `cookieParser()` - Parse cookies
7. `errorHandler()` - Custom error handling

---

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Development (auto-reload)
npm run dev

# Production
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Seed database
npm run seed
```

---

## 🆘 Troubleshooting

### MongoDB Connection Error
```
❌ Error connecting to MongoDB
```
**Fix:** Start MongoDB or check connection string
```bash
mongod  # Start local MongoDB
```

### Port Already in Use
```
Error: EADDRINUSE :::5000
```
**Fix:** Kill the process
```bash
npx kill-port 5000
```

### Missing .env File
```
Error: MongoDB URI is not defined
```
**Fix:** Create `.env` file with required variables

### CORS Errors
**Fix:** Set `CLIENT_URL=http://localhost:5173` in `.env`

---

## 📊 Server Status

Once running, check status at:

- **Test:** http://localhost:5000/api/test
- **Health:** http://localhost:5000/api/health
- **API Docs:** http://localhost:5000/

---

## ✅ You're Ready!

Your backend server is fully configured and ready to handle requests!

**Next steps:**
1. Create `.env` file
2. Start MongoDB
3. Run `npm run dev`
4. Test at http://localhost:5000/api/test

**🎉 That's it! Server is ready to go!**

---

## 📚 More Documentation

- `SERVER_SETUP.md` - Detailed setup guide
- `ENV_TEMPLATE.txt` - Environment variables template
- `POSTMAN_COLLECTION.json` - API testing collection (in root)

