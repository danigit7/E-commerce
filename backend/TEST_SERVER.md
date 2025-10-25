# 🧪 Test Your Backend Server

## ✅ Server is Configured!

All routes and middleware are set up. Follow these steps to test your server.

---

## 🚀 Step 1: Start the Server

### Create `.env` file first:
```bash
# Minimum required variables:
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=mysecretkey123
CLIENT_URL=http://localhost:5173
```

### Start MongoDB:
```bash
# If using local MongoDB:
mongod
```

### Run the server:
```bash
npm run dev
```

**Expected Output:**
```
✅ MongoDB Connected: localhost
📊 Database: ecommerce
🚀 Server running in development mode on port 5000
```

---

## 🧪 Step 2: Test the Routes

### Test 1: Server Test Route ✅
```bash
curl http://localhost:5000/api/test
```

**Expected Response:**
```json
{
  "success": true,
  "message": "✅ Server is running successfully!",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### Test 2: Health Check ✅
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "uptime": 123.456,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test 3: Root Route (API Documentation) ✅
```bash
curl http://localhost:5000/
```

**Expected Response:**
```json
{
  "message": "🛍️ Luxury E-commerce API",
  "version": "1.0.0",
  "endpoints": {
    "test": "/api/test",
    "health": "/api/health",
    "auth": "/api/auth",
    "users": "/api/users",
    "products": "/api/products",
    "orders": "/api/orders",
    "cart": "/api/cart",
    "wishlist": "/api/wishlist",
    "reviews": "/api/reviews",
    "admin": "/api/admin",
    "upload": "/api/upload",
    "stripe": "/api/stripe"
  }
}
```

---

## 🌐 Test in Browser

Open your browser and visit:

- **Root:** http://localhost:5000
- **Test:** http://localhost:5000/api/test
- **Health:** http://localhost:5000/api/health

You should see JSON responses in your browser!

---

## 📮 Test with Postman/Insomnia

### Import Collection
1. Open Postman or Insomnia
2. Import the collection from root: `POSTMAN_COLLECTION.json`
3. Test all endpoints

### Quick Test Requests:

**GET** `http://localhost:5000/api/test`
- Should return success message

**GET** `http://localhost:5000/api/health`
- Should return health status

**GET** `http://localhost:5000/api/products`
- Should return products (if database is seeded)

---

## ✅ All Available Routes

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/` | API documentation | ✅ |
| GET | `/api/test` | Server test | ✅ |
| GET | `/api/health` | Health check | ✅ |
| POST | `/api/auth/register` | Register user | ✅ |
| POST | `/api/auth/login` | Login user | ✅ |
| GET | `/api/users/profile` | Get profile | ✅ |
| GET | `/api/products` | Get products | ✅ |
| POST | `/api/products` | Create product | ✅ |
| GET | `/api/orders` | Get orders | ✅ |
| POST | `/api/orders` | Create order | ✅ |
| GET | `/api/cart` | Get cart | ✅ |
| POST | `/api/cart` | Add to cart | ✅ |
| GET | `/api/wishlist` | Get wishlist | ✅ |
| POST | `/api/reviews` | Create review | ✅ |
| POST | `/api/upload` | Upload file | ✅ |
| GET | `/api/admin/*` | Admin routes | ✅ |
| POST | `/api/stripe/*` | Payment routes | ✅ |

---

## 🔍 Middleware Test

Your server has these middleware configured:

1. ✅ **Helmet** - Security headers (automatic)
2. ✅ **CORS** - Allows frontend requests
3. ✅ **Rate Limit** - Try 100+ requests in 15 min to test
4. ✅ **JSON Parser** - Send JSON in POST requests
5. ✅ **Error Handler** - Try invalid routes

### Test CORS:
```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     http://localhost:5000/api/test
```

### Test Rate Limiting:
```bash
# Run this 101 times quickly:
for i in {1..101}; do curl http://localhost:5000/api/test; done

# After 100 requests, you should get:
# "Too many requests from this IP, please try again later."
```

---

## 🎨 MongoDB Connection Test

### Check if MongoDB is connected:
Look at server logs when starting:
```
✅ MongoDB Connected: localhost
📊 Database: ecommerce
```

### Test database operations:
```bash
# Seed the database
npm run seed

# Then check if products exist
curl http://localhost:5000/api/products
```

---

## 🐛 Troubleshooting

### Server won't start?
```bash
# Check if port is in use
npx kill-port 5000

# Check if MongoDB is running
mongod --version
```

### Can't connect to MongoDB?
```bash
# Start MongoDB
mongod

# Or check your MONGO_URI in .env
```

### Getting 404 errors?
- Make sure you're using the correct route prefix: `/api/`
- Example: `/api/test` NOT `/test`

### CORS errors?
- Set `CLIENT_URL=http://localhost:5173` in `.env`
- Restart the server after changing `.env`

---

## 📊 Success Indicators

If everything is working, you should see:

✅ Server starts without errors
✅ MongoDB connection successful
✅ `/api/test` returns success message
✅ `/api/health` returns health status
✅ `/` returns list of endpoints
✅ No CORS errors from frontend
✅ Rate limiting works

---

## 🎯 What to Test

1. ✅ Server starts correctly
2. ✅ MongoDB connects successfully
3. ✅ Test route responds
4. ✅ Health check works
5. ✅ All endpoints are listed
6. ✅ CORS allows frontend requests
7. ✅ Rate limiting prevents abuse
8. ✅ Error handling works

---

## 💡 Pro Testing Tips

1. **Use browser DevTools** - Check Network tab for requests
2. **Check server logs** - See what's happening on the backend
3. **Test with curl** - Quick terminal testing
4. **Use Postman** - Full API testing suite
5. **Monitor MongoDB** - Use MongoDB Compass

---

## ✅ Quick Checklist

Before moving on, verify:

- [ ] Server starts without errors
- [ ] MongoDB connects successfully
- [ ] `/api/test` returns success
- [ ] `/api/health` returns status
- [ ] Can see all endpoints at `/`
- [ ] No errors in console
- [ ] Ready to build features!

---

## 🎉 Success!

If all tests pass, your backend is **fully operational**!

**Next steps:**
1. ✅ Implement authentication logic
2. ✅ Create product endpoints
3. ✅ Build order management
4. ✅ Connect to frontend
5. ✅ Test with real data

---

**Server URL:** http://localhost:5000
**Test Endpoint:** http://localhost:5000/api/test

**Happy Testing! 🚀**

