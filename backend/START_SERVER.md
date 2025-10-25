# 🚀 How to Start the Server and Test with Postman

## Step 1: Start the Server

### PowerShell (Windows):
```powershell
# Navigate to backend directory
cd backend

# Start the server
npm run dev
```

### Expected Output:
```
============================================================
🚀 SERVER STARTED SUCCESSFULLY
============================================================
📍 Port:        5000
🌍 Environment: development
⏰ Started at:  [current date/time]
============================================================
📌 Available Endpoints:
   - Root:      http://localhost:5000/
   - Test:      http://localhost:5000/api/test
   - Health:    http://localhost:5000/api/health
   - API Routes: http://localhost:5000/api/*
============================================================
✅ Server is ready to accept connections
```

---

## Step 2: Test with Postman

### Test Route 1: Server Test ✅
- **Method:** GET
- **URL:** `http://localhost:5000/api/test`
- **Expected Response:**
```json
{
  "success": true,
  "message": "✅ Server is running successfully!",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### Test Route 2: Health Check ✅
- **Method:** GET
- **URL:** `http://localhost:5000/api/health`
- **Expected Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "uptime": 123.456,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test Route 3: API Documentation ✅
- **Method:** GET
- **URL:** `http://localhost:5000/`
- **Expected Response:**
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
    ...
  }
}
```

---

## Postman Setup Instructions

### 1. Open Postman
- Launch Postman application or use web version

### 2. Create New Request
- Click "New" → "HTTP Request"

### 3. Configure Request
- Method: **GET**
- URL: `http://localhost:5000/api/test`
- Click **Send**

### 4. View Response
- Check status code: **200 OK**
- View JSON response in the body

---

## Quick Postman Collection

Create these requests in Postman:

| Name | Method | URL |
|------|--------|-----|
| Test Server | GET | `http://localhost:5000/api/test` |
| Health Check | GET | `http://localhost:5000/api/health` |
| API Docs | GET | `http://localhost:5000/` |
| Get Products | GET | `http://localhost:5000/api/products` |
| Get Orders | GET | `http://localhost:5000/api/orders` |

---

## Troubleshooting

### Port Already in Use?
```powershell
npx kill-port 5000
```

### MongoDB Not Connected?
Make sure MongoDB is running:
```powershell
mongod
```

### Can't Connect?
1. Check server is running (see console logs)
2. Verify URL: `http://localhost:5000` (not https)
3. Check firewall settings

---

**✅ You're ready to test!**

