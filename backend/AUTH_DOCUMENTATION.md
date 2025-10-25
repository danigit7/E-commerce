# 🔐 JWT Authentication System Documentation

## Overview

This e-commerce application implements a **robust JWT-based authentication system** with access and refresh tokens, providing secure user authentication and authorization.

---

## 🎯 Features Implemented

### ✅ Core Authentication Features

1. **User Registration** - Create new accounts with email, name, and password
2. **User Login** - Authenticate and receive JWT tokens
3. **User Logout** - Securely clear authentication tokens
4. **Token Refresh** - Automatically refresh expired access tokens
5. **Password Reset** - Request and reset forgotten passwords
6. **Protected Routes** - Middleware to secure private endpoints
7. **Admin Routes** - Role-based authorization for admin users
8. **Input Validation** - Validate user input on registration and login

---

## 🏗️ Architecture

### Dual Token System

The system uses **two types of JWT tokens**:

#### 1. Access Token
- **Purpose**: Used for API authentication
- **Lifespan**: 15 minutes (short-lived)
- **Storage**: Client-side (localStorage/state)
- **Usage**: Sent in `Authorization: Bearer <token>` header
- **Secret**: `JWT_ACCESS_SECRET`

#### 2. Refresh Token
- **Purpose**: Used to obtain new access tokens
- **Lifespan**: 7 days (long-lived)
- **Storage**: HTTP-only secure cookie
- **Usage**: Automatically sent with requests
- **Secret**: `JWT_REFRESH_SECRET`

### Why Two Tokens?

- **Security**: If an access token is compromised, it expires quickly
- **User Experience**: Users stay logged in for 7 days without re-authentication
- **Best Practice**: Refresh tokens in HTTP-only cookies prevent XSS attacks

---

## 📁 File Structure

```
backend/
├── models/
│   └── User.js                    # User model with password hashing
├── controllers/
│   └── authController.js          # Authentication logic
├── middleware/
│   ├── authMiddleware.js          # protect & admin middleware
│   └── validationMiddleware.js    # Input validation rules
├── routes/
│   └── authRoutes.js              # Auth endpoints
└── utils/
    └── generateToken.js           # Token generation utilities
```

---

## 🔑 Environment Variables

Add these to your `.env` file:

```env
# JWT Access Token (short-lived)
JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_ACCESS_EXPIRE=15m

# JWT Refresh Token (long-lived)
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_REFRESH_EXPIRE=7d
```

> **Important**: Use strong, unique secrets in production!

---

## 🚀 API Endpoints

### Public Endpoints (No Authentication Required)

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
*Also sets `refreshToken` as HTTP-only cookie*

---

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
*Also sets `refreshToken` as HTTP-only cookie*

---

#### 3. Refresh Access Token
```http
POST /api/auth/refresh
Cookie: refreshToken=<refresh_token>
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### 4. Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset email sent"
}
```

---

#### 5. Reset Password
```http
POST /api/auth/reset-password/:token
Content-Type: application/json

{
  "password": "newSecurePassword123"
}
```

**Response:**
```json
{
  "message": "Password reset successful"
}
```

---

### Protected Endpoints (Authentication Required)

#### 6. Logout User
```http
POST /api/auth/logout
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

---

#### 7. Get Current User Profile
```http
GET /api/auth/me
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "wishlist": [],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

#### 8. Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "valid": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## 🛡️ Middleware

### 1. `protect` Middleware

Verifies JWT access token and attaches user to `req.user`.

**Usage:**
```javascript
import { protect } from '../middleware/authMiddleware.js';

router.get('/profile', protect, getUserProfile);
```

**What it does:**
1. Extracts token from `Authorization: Bearer <token>` header
2. Verifies token with `JWT_ACCESS_SECRET`
3. Finds user by decoded ID
4. Checks if user is active
5. Attaches user to `req.user`

**Error Responses:**
- `401` - No token provided
- `401` - Invalid or expired token
- `403` - Account is deactivated

---

### 2. `admin` Middleware

Verifies user has admin role (must be used with `protect`).

**Usage:**
```javascript
import { protect, admin } from '../middleware/authMiddleware.js';

router.delete('/users/:id', protect, admin, deleteUser);
```

**What it does:**
1. Checks if `req.user.role === 'admin'`
2. Allows access or returns 403 error

**Error Response:**
- `403` - Not authorized as admin

---

## 🔒 Security Features

### 1. Password Hashing
```javascript
// In User model (User.js)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

- Passwords are **never stored in plain text**
- Uses **bcrypt** with salt rounds for hashing
- Automatic hashing on user creation and password updates

---

### 2. Secure Cookie Configuration
```javascript
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,           // Prevents JavaScript access (XSS protection)
  secure: true,             // HTTPS only in production
  sameSite: 'strict',       // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
});
```

---

### 3. Password Selection Control
```javascript
// In User model
password: {
  type: String,
  required: true,
  select: false  // Exclude from queries by default
}
```

---

### 4. Input Validation
```javascript
// Registration validation
export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];
```

---

### 5. Rate Limiting
```javascript
// In server.js
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                  // 100 requests per IP
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);
```

---

## 🧪 Testing Authentication

### Using cURL

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"john@example.com","password":"password123"}'
```

#### Access Protected Route
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -b cookies.txt
```

#### Refresh Token
```bash
curl -X POST http://localhost:5000/api/auth/refresh \
  -b cookies.txt
```

---

### Using Postman

1. **Create Environment Variables:**
   - `baseUrl`: `http://localhost:5000`
   - `accessToken`: (will be set automatically)

2. **Setup Tests Script** (for auto-saving tokens):
```javascript
// In Login request "Tests" tab
if (pm.response.code === 200) {
  const response = pm.response.json();
  pm.environment.set("accessToken", response.accessToken);
}
```

3. **Setup Authorization:**
   - Type: `Bearer Token`
   - Token: `{{accessToken}}`

---

## 🎭 User Roles

### User (Default)
- Can access their own profile
- Can manage their cart and wishlist
- Can place orders
- Can write reviews

### Admin
- All user permissions
- Can manage all users
- Can manage all products
- Can manage all orders
- Can view analytics

**Promoting a User to Admin:**
```javascript
// Direct database update (MongoDB)
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
);

// Or use Mongoose
await User.findOneAndUpdate(
  { email: "admin@example.com" },
  { role: "admin" }
);
```

---

## 🔄 Token Flow Diagram

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ 1. POST /api/auth/login
       │    { email, password }
       ▼
┌─────────────────────────────────┐
│          Server                 │
│  ┌──────────────────────────┐  │
│  │ Verify credentials       │  │
│  │ Generate access token    │  │
│  │ Generate refresh token   │  │
│  └──────────────────────────┘  │
└──────┬──────────────────┬───────┘
       │                  │
       │ 2. Response      │ 3. Set HTTP-only cookie
       │    { accessToken }    { refreshToken }
       ▼                  ▼
┌──────────────────────────────┐
│  Client stores accessToken   │
│  Browser stores refreshToken │
│  (in cookie)                 │
└──────┬───────────────────────┘
       │
       │ 4. API requests with
       │    Authorization: Bearer <accessToken>
       ▼
┌─────────────────────────────┐
│  Server verifies token      │
│  Returns protected data     │
└─────────────────────────────┘
       │
       │ 5. When accessToken expires
       ▼
┌──────────────────────────────┐
│  POST /api/auth/refresh      │
│  (refreshToken in cookie)    │
└──────┬───────────────────────┘
       │
       │ 6. New accessToken
       ▼
┌──────────────────────────────┐
│  Retry original request      │
└──────────────────────────────┘
```

---

## 📚 Protected Routes Overview

### Cart Routes (`/api/cart/*`)
- ✅ All routes protected with `protect` middleware

### Order Routes (`/api/orders/*`)
- ✅ User orders protected with `protect`
- ✅ Admin routes protected with `protect` + `admin`

### Wishlist Routes (`/api/wishlist/*`)
- ✅ All routes protected with `protect` middleware

### Product Routes (`/api/products/*`)
- ✅ Public: GET products, GET product by ID
- ✅ Admin only: POST, PUT, DELETE (protected with `protect` + `admin`)

### Admin Routes (`/api/admin/*`)
- ✅ All routes protected with `protect` + `admin` middleware

---

## 🐛 Common Issues & Solutions

### 1. "Not authorized, no token"
**Problem**: No token provided in request
**Solution**: Include `Authorization: Bearer <token>` header

### 2. "Not authorized, token failed"
**Problem**: Invalid or expired access token
**Solution**: Use refresh token endpoint to get new access token

### 3. "Invalid refresh token"
**Problem**: Refresh token expired or invalid
**Solution**: User must log in again

### 4. "User not found"
**Problem**: User was deleted after token was issued
**Solution**: Log in again or create new account

### 5. "Account is deactivated"
**Problem**: Admin deactivated the account
**Solution**: Contact support

---

## 🔐 Best Practices

### ✅ Do's

1. **Store refresh tokens in HTTP-only cookies** (prevents XSS)
2. **Use short expiration for access tokens** (15-30 minutes)
3. **Use HTTPS in production** (prevents token interception)
4. **Validate all user input** (prevent injection attacks)
5. **Rate limit authentication endpoints** (prevent brute force)
6. **Hash passwords with bcrypt** (never store plain text)
7. **Use strong JWT secrets** (long, random strings)
8. **Implement token refresh flow** (better UX)

### ❌ Don'ts

1. **Don't store sensitive data in JWT payload** (it's not encrypted)
2. **Don't share JWT secrets** (keep them secret!)
3. **Don't use weak passwords** (enforce strong requirements)
4. **Don't expose user passwords in responses** (use `select: false`)
5. **Don't skip HTTPS in production** (tokens can be intercepted)

---

## 🚀 Frontend Integration

### React Example with Axios

```javascript
// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Send cookies with requests
});

// Add access token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh
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
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

---

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed, select: false),
  role: String ('user' | 'admin'),
  wishlist: [ObjectId],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎉 Summary

Your e-commerce backend now has a **complete, production-ready JWT authentication system** with:

- ✅ User registration with bcrypt password hashing
- ✅ Login with access + refresh tokens
- ✅ HTTP-only secure cookies for refresh tokens
- ✅ Protected routes with `protect` middleware
- ✅ Admin routes with `admin` middleware
- ✅ Token refresh endpoint
- ✅ Logout with cookie clearing
- ✅ Password reset functionality
- ✅ Input validation
- ✅ Rate limiting
- ✅ Security best practices

**The system is ready to use!** 🚀

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the error messages
3. Check server logs
4. Verify environment variables

---

**Happy coding!** 🎉

