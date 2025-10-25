# 🚀 Backend Server Setup Documentation

## ✅ What's Configured

### Express Application
- ✅ Express server with modular route structure
- ✅ Environment variables with dotenv
- ✅ MongoDB connection with Mongoose
- ✅ Security middleware (Helmet)
- ✅ CORS enabled for frontend communication
- ✅ Rate limiting to prevent abuse
- ✅ JSON body parser
- ✅ Cookie parser
- ✅ Error handling middleware

### Middleware Stack (in order)

```javascript
1. helmet()                    // Security headers
2. rateLimit()                 // Rate limiting (100 req/15min)
3. cors()                      // Cross-Origin Resource Sharing
4. express.json()              // Parse JSON bodies
5. express.urlencoded()        // Parse URL-encoded bodies
6. cookieParser()              // Parse cookies
7. Routes                      // API routes
8. errorHandler()              // Custom error handling
```

---

## 📁 Routes Structure

All routes are prefixed with `/api`:

| Route | Purpose | Example Endpoints |
|-------|---------|-------------------|
| `/api/test` | Server test route | GET - Test server |
| `/api/health` | Health check | GET - Server status |
| `/api/auth` | Authentication | POST /login, /register |
| `/api/users` | User management | GET /profile, PUT /profile |
| `/api/products` | Products CRUD | GET, POST, PUT, DELETE |
| `/api/orders` | Orders management | GET, POST |
| `/api/cart` | Shopping cart | GET, POST, DELETE |
| `/api/wishlist` | User wishlist | GET, POST, DELETE |
| `/api/reviews` | Product reviews | GET, POST, PUT, DELETE |
| `/api/upload` | File uploads | POST - Image upload |
| `/api/admin` | Admin operations | Various admin routes |
| `/api/stripe` | Payment processing | POST - Create payment |

---

## 🔌 MongoDB Connection

**File:** `config/db.js`

- Connects to MongoDB using Mongoose
- Supports both `MONGO_URI` and `MONGODB_URI` env variables
- Automatic retry on connection failure
- Connection logging with host and database name

```javascript
// Example connection string:
MONGO_URI=mongodb://localhost:27017/ecommerce

// Or MongoDB Atlas:
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
```

---

## 🔒 Security Features

### 1. Helmet
Adds security headers to protect against common vulnerabilities:
- XSS protection
- Content Security Policy
- Hide X-Powered-By
- Prevent clickjacking

### 2. CORS
Configured to allow requests from frontend:
```javascript
cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
})
```

### 3. Rate Limiting
Prevents abuse by limiting requests:
- **100 requests** per IP per **15 minutes**
- Applied to all `/api/*` routes
- Custom error message on limit exceeded

### 4. Environment Variables
Sensitive data stored in `.env` file:
- Database credentials
- JWT secret
- API keys (Stripe, Cloudinary)
- Email credentials

---

## 🧪 Testing the Server

### 1. Start the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

### 2. Test Routes

```bash
# Test route
curl http://localhost:5000/api/test

# Health check
curl http://localhost:5000/api/health

# Root route (list all endpoints)
curl http://localhost:5000/
```

**Expected Response from `/api/test`:**
```json
{
  "success": true,
  "message": "✅ Server is running successfully!",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

---

## 📝 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Required Variables:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

### Optional Variables:
- `CLIENT_URL` - Frontend URL for CORS
- `STRIPE_SECRET_KEY` - For payment processing
- `CLOUDINARY_*` - For image uploads
- `EMAIL_*` - For email notifications

---

## 🗂️ Project Structure

```
backend/
├── config/
│   ├── db.js                  # MongoDB connection
│   ├── cloudinary.js          # Cloudinary config
│   └── stripe.js              # Stripe config
│
├── controllers/               # Route controllers
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   └── ...
│
├── middleware/
│   ├── authMiddleware.js      # JWT authentication
│   ├── errorMiddleware.js     # Error handling
│   └── validationMiddleware.js
│
├── models/                    # Mongoose models
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Cart.js
│
├── routes/                    # Express routes
│   ├── authRoutes.js          # ✅ Authentication
│   ├── userRoutes.js          # ✅ Users
│   ├── productRoutes.js       # ✅ Products
│   ├── orderRoutes.js         # ✅ Orders
│   ├── adminRoutes.js         # ✅ Admin
│   └── ...
│
├── utils/
│   ├── generateToken.js       # JWT utilities
│   └── emailService.js        # Email sending
│
├── .env                       # Environment variables
├── .env.example               # ✅ Template
├── server.js                  # ✅ Entry point
└── package.json
```

---

## 🚦 Startup Checklist

Before starting the server:

1. ✅ MongoDB is running
   ```bash
   # Local MongoDB
   mongod
   
   # Or using MongoDB Atlas (cloud)
   # Just use the connection string
   ```

2. ✅ `.env` file is configured
   ```bash
   # Check if .env exists
   ls -la .env
   ```

3. ✅ Dependencies installed
   ```bash
   npm install
   ```

4. ✅ Port 5000 is available
   ```bash
   # Kill process on port 5000 if needed
   npx kill-port 5000
   ```

---

## 📊 Server Logs

When you start the server, you should see:

```
✅ MongoDB Connected: localhost
📊 Database: ecommerce
🚀 Server running in development mode on port 5000
```

---

## 🔧 Common Issues & Solutions

### 1. MongoDB Connection Error
```
❌ Error connecting to MongoDB: connect ECONNREFUSED
```
**Solution:** Make sure MongoDB is running
```bash
# Start MongoDB
mongod

# Or check MongoDB Atlas connection string
```

### 2. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process or use different port
```bash
npx kill-port 5000
# Or change PORT in .env
```

### 3. Missing Environment Variables
```
Error: MongoDB URI is not defined
```
**Solution:** Create `.env` file with required variables
```bash
cp .env.example .env
# Edit .env with your values
```

### 4. CORS Errors
```
Access to fetch has been blocked by CORS policy
```
**Solution:** Check `CLIENT_URL` in `.env` matches your frontend URL

---

## 🎯 Next Steps

1. ✅ Server is configured and ready
2. ✅ Test route `/api/test` works
3. ✅ MongoDB connection established
4. ✅ All middleware configured
5. ✅ Routes structure in place

**Now you can:**
- Implement controller logic
- Create database models
- Add authentication
- Build API endpoints
- Test with Postman/Insomnia

---

## 📚 API Documentation

For complete API documentation, see:
- `POSTMAN_COLLECTION.json` - Import into Postman
- Individual route files for endpoint details

---

## 💡 Development Tips

1. **Use nodemon** - Auto-restart on file changes
   ```bash
   npm run dev
   ```

2. **Check logs** - Server logs show connection status and errors

3. **Test routes** - Use Postman, Insomnia, or curl

4. **Monitor rate limits** - Watch for 429 errors (too many requests)

5. **Validate env vars** - Make sure all required variables are set

---

**🎉 Server Setup Complete! Happy Coding!**

