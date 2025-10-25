# 🔐 JWT Authentication - Quick Reference

## 🚀 Quick Start

### 1. Environment Setup
```env
JWT_ACCESS_SECRET=your_access_secret_minimum_32_characters
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_SECRET=your_refresh_secret_minimum_32_characters
JWT_REFRESH_EXPIRE=7d
```

### 2. Generate Strong Secrets
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use online generator: https://www.grc.com/passwords.htm
```

---

## 📡 API Endpoints Cheatsheet

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ Public | Register new user |
| `POST` | `/api/auth/login` | ❌ Public | Login user |
| `POST` | `/api/auth/logout` | ✅ Protected | Logout user |
| `POST` | `/api/auth/refresh` | ❌ Public | Refresh access token |
| `GET` | `/api/auth/me` | ✅ Protected | Get current user |
| `GET` | `/api/auth/verify` | ✅ Protected | Verify token |
| `POST` | `/api/auth/forgot-password` | ❌ Public | Request password reset |
| `POST` | `/api/auth/reset-password/:token` | ❌ Public | Reset password |

---

## 🔑 Token Usage

### Sending Access Token
```http
Authorization: Bearer <your_access_token>
```

### Refresh Token (Automatic)
Stored in HTTP-only cookie, automatically sent with requests.

---

## 💻 Code Examples

### Register User
```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include', // Important: includes cookies
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securePass123'
  })
});

const data = await response.json();
// Store accessToken
localStorage.setItem('accessToken', data.accessToken);
```

### Login User
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'securePass123'
  })
});

const data = await response.json();
localStorage.setItem('accessToken', data.accessToken);
```

### Access Protected Route
```javascript
const token = localStorage.getItem('accessToken');

const response = await fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include'
});

const userData = await response.json();
```

### Refresh Token
```javascript
const response = await fetch('http://localhost:5000/api/auth/refresh', {
  method: 'POST',
  credentials: 'include' // Sends refresh token cookie
});

const data = await response.json();
localStorage.setItem('accessToken', data.accessToken);
```

### Logout
```javascript
const token = localStorage.getItem('accessToken');

await fetch('http://localhost:5000/api/auth/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include'
});

localStorage.removeItem('accessToken');
```

---

## 🛡️ Middleware Usage

### Protect Route (Authenticated Users Only)
```javascript
import { protect } from '../middleware/authMiddleware.js';

router.get('/profile', protect, getProfile);
```

### Admin Only Route
```javascript
import { protect, admin } from '../middleware/authMiddleware.js';

router.delete('/users/:id', protect, admin, deleteUser);
```

### Access User in Controller
```javascript
export const getProfile = async (req, res) => {
  // User is available at req.user
  const userId = req.user._id;
  const userRole = req.user.role;
  
  res.json(req.user);
};
```

---

## 🔧 Common Tasks

### Make User Admin (MongoDB)
```javascript
// Using MongoDB shell
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
);

// Using Mongoose
await User.findOneAndUpdate(
  { email: "admin@example.com" },
  { role: "admin" }
);
```

### Check if User is Admin
```javascript
// In middleware (already done)
if (req.user && req.user.role === 'admin') {
  // User is admin
}

// In frontend
if (user.role === 'admin') {
  // Show admin UI
}
```

---

## ⚡ Axios Interceptor (Auto Token Refresh)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post('/auth/refresh');
        localStorage.setItem('accessToken', data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

---

## 🧪 Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Login (save cookies)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"test@test.com","password":"test123"}'

# Access protected route
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -b cookies.txt

# Refresh token
curl -X POST http://localhost:5000/api/auth/refresh \
  -b cookies.txt

# Logout
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -b cookies.txt
```

---

## ❌ Error Codes

| Code | Message | Meaning | Solution |
|------|---------|---------|----------|
| `400` | User already exists | Email is taken | Use different email |
| `400` | Invalid user data | Missing required fields | Check request body |
| `400` | Validation errors | Invalid input format | Fix validation errors |
| `401` | Invalid credentials | Wrong email/password | Check credentials |
| `401` | No token provided | Missing authorization | Add Bearer token |
| `401` | Token failed | Invalid/expired token | Refresh or re-login |
| `403` | Account deactivated | User account disabled | Contact support |
| `403` | Not authorized as admin | User is not admin | Admin access required |
| `404` | User not found | User doesn't exist | Check email |
| `500` | Server error | Internal error | Check logs |

---

## 🔐 Security Checklist

- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ Access tokens expire in 15 minutes
- ✅ Refresh tokens expire in 7 days
- ✅ Refresh tokens stored in HTTP-only cookies
- ✅ CORS configured with credentials
- ✅ Rate limiting enabled (100 req/15min)
- ✅ Helmet.js for security headers
- ✅ Input validation on all auth endpoints
- ✅ Password select: false in User model
- ✅ User active status check
- ✅ Token verification on every protected route

---

## 📱 React Hook Example

```javascript
// hooks/useAuth.js
import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('accessToken', data.accessToken);
    setUser(data);
    return data;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return { user, loading, login, register, logout };
};
```

---

## 🎯 Token Expiration Strategy

| Token Type | Expires In | Storage | Purpose |
|------------|------------|---------|---------|
| Access Token | 15 minutes | localStorage | API authentication |
| Refresh Token | 7 days | HTTP-only cookie | Get new access token |

**Flow:**
1. User logs in → receives both tokens
2. Access token used for API calls
3. When access token expires → use refresh token to get new one
4. When refresh token expires → user must log in again

---

## 💡 Pro Tips

1. **Always include `credentials: 'include'`** in fetch requests to send cookies
2. **Store access tokens in localStorage**, not cookies (easier to access)
3. **Never log tokens** in production
4. **Use environment variables** for secrets
5. **Implement auto-refresh** on 401 responses
6. **Clear tokens on logout** from both localStorage and cookies
7. **Validate tokens** before making API calls
8. **Handle network errors** gracefully

---

## 📞 Quick Troubleshooting

**Problem:** "Not authorized, no token"
```javascript
// Make sure you're sending the token
headers: { 'Authorization': `Bearer ${token}` }
```

**Problem:** "Invalid refresh token"
```javascript
// User needs to login again
localStorage.removeItem('accessToken');
window.location.href = '/login';
```

**Problem:** CORS error
```javascript
// Make sure withCredentials is set
fetch(url, { credentials: 'include' })
// or with axios
axios.create({ withCredentials: true })
```

---

## 🎉 You're All Set!

Your authentication system is fully functional and production-ready!

For detailed documentation, see: `AUTH_DOCUMENTATION.md`

