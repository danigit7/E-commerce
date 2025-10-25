# 🔧 Troubleshooting Guide

## SSL Error: WRONG_VERSION_NUMBER

### ❌ Error Message:

```
Error: write EPROTO 100843840:error:100000f7:SSL routines:OPENSSL_internal:WRONG_VERSION_NUMBER
```

### 🔍 What This Means:

You're trying to connect to an **HTTP** server using **HTTPS**. The backend runs on plain HTTP in development, but something is trying to use HTTPS.

---

## ✅ Solutions

### Solution 1: Check Postman Configuration

If testing in **Postman**:

1. **Check URL in Postman:**

   - ❌ Wrong: `https://localhost:5000/api/test`
   - ✅ Correct: `http://localhost:5000/api/test`

2. **Disable SSL Verification (if needed):**
   - Go to: Settings → General
   - Turn OFF: "SSL certificate verification"

---

### Solution 2: Check Frontend .env File

**File:** `frontend/.env`

Make sure it uses **HTTP** (not HTTPS):

```env
# ✅ Correct - Use HTTP for local development
VITE_API_URL=http://localhost:5000/api

# ❌ Wrong - Don't use HTTPS
# VITE_API_URL=https://localhost:5000/api
```

**After changing .env:**

```bash
# Stop the frontend server (Ctrl+C)
# Restart it
npm run dev
```

---

### Solution 3: Check Browser

If testing in **Browser**:

1. **Check URL bar:**

   - ✅ Should be: `http://localhost:5173` (not https)

2. **Clear browser cache:**

   - Press `Ctrl+Shift+Delete`
   - Clear cached images and files
   - Reload page

3. **Open in Incognito/Private mode:**
   - Bypasses cache and extensions

---

### Solution 4: Check Backend Server

Make sure backend is running on **HTTP**:

```bash
# Start backend
cd backend
npm run dev

# Should see:
# 🚀 SERVER STARTED SUCCESSFULLY
# 📍 Port: 5000
```

Backend runs on HTTP by default (no SSL certificate needed for development).

---

## 🎯 Quick Fix Checklist

- [ ] Backend server is running
- [ ] Using `http://` (not `https://`) in URLs
- [ ] Frontend `.env` has `VITE_API_URL=http://localhost:5000/api`
- [ ] Postman URL uses `http://localhost:5000`
- [ ] Browser is accessing `http://localhost:5173`
- [ ] Cleared browser cache

---

## 🧪 Test Commands

### Test Backend Directly (No SSL):

```bash
# Using curl (works from any terminal)
curl http://localhost:5000/api/test

# Expected: JSON response with "success": true
```

### Test in Browser:

```
Open: http://localhost:5000/api/test
```

### Test in Postman:

```
Method: GET
URL: http://localhost:5000/api/test
(Make sure it's HTTP, not HTTPS!)
```

---

## 📝 Other Common Errors

### 1. "connect ECONNREFUSED"

**Problem:** Server is not running
**Solution:**

```bash
cd backend
npm run dev
```

### 2. "Network Error" in browser

**Problem:** CORS or server not reachable
**Solution:** Check backend is running and CORS is configured

### 3. "MongoDB connection error"

**Problem:** MongoDB is not running
**Solution:**

```bash
mongod
```

### 4. "Port 5000 already in use"

**Problem:** Another process is using port 5000
**Solution:**

```bash
npx kill-port 5000
```

---

## 🔒 Production vs Development

### Development (Local):

- ✅ Uses **HTTP** (no SSL certificate needed)
- ✅ URL: `http://localhost:5000`
- ✅ No HTTPS configuration required

### Production (Deployed):

- ✅ Uses **HTTPS** (with SSL certificate)
- ✅ URL: `https://yourdomain.com`
- ✅ SSL certificate from hosting provider

---

## 💡 Prevention Tips

1. **Always use `http://` for localhost**
2. **Check .env files have correct protocols**
3. **Restart servers after changing .env**
4. **Use browser DevTools to check network requests**
5. **Verify Postman URLs before sending**

---

## 🆘 Still Having Issues?

1. **Check server logs** - Look at terminal where backend is running
2. **Check browser console** - F12 → Console tab
3. **Check Postman console** - View → Show Postman Console
4. **Verify ports:**
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:5173`

---

**✅ Remember: Local development uses HTTP, production uses HTTPS!**
