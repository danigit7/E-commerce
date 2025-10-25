# 🚀 Getting Started with JWT Authentication

## Quick Setup (5 Minutes)

### Step 1: Configure Environment Variables

Edit your `backend/.env` file and add:

```env
# Generate strong secrets with this command:
# node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

JWT_ACCESS_SECRET=your_generated_secret_here_minimum_32_characters
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_SECRET=your_generated_secret_here_different_from_above
JWT_REFRESH_EXPIRE=7d
```

### Step 2: Start the Server

```bash
cd backend
npm run dev
```

You should see:
```
🚀 SERVER STARTED SUCCESSFULLY
📍 Port:        5000
🌍 Environment: development
```

### Step 3: Test Authentication

#### A. Register a User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### B. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Note**: Copy the `accessToken` value for the next step.

#### C. Access Protected Route

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -b cookies.txt
```

Replace `YOUR_ACCESS_TOKEN_HERE` with the token from step B.

**Expected Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "wishlist": [],
  "createdAt": "...",
  "updatedAt": "..."
}
```

✅ **Success!** Your authentication is working!

---

## Using Postman (Recommended)

### 1. Import Collection

1. Open Postman
2. Click **Import**
3. Select `backend/POSTMAN_AUTH_COLLECTION.json`
4. Collection will appear in left sidebar

### 2. Create Environment

1. Click the gear icon (⚙️) in top right
2. Click **Add**
3. Environment Name: `E-commerce Local`
4. Add variables:
   - `baseUrl`: `http://localhost:5000/api`
   - `accessToken`: (leave empty, auto-filled)

### 3. Test Endpoints

The collection includes automatic token management:

1. **Register User** → Saves token automatically
2. **Login User** → Updates token automatically
3. **Get Current User** → Uses saved token
4. **Refresh Token** → Gets new token
5. **Logout** → Clears token

Just run the requests in order!

---

## Create Admin User

After registering a user, make them admin:

### Option 1: MongoDB Compass

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Navigate to `ecommerce` database → `users` collection
4. Find your user
5. Click edit (pencil icon)
6. Change `"role": "user"` to `"role": "admin"`
7. Click **Update**

### Option 2: MongoDB Shell

```bash
mongosh
use ecommerce
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { role: "admin" } }
)
```

### Option 3: Node.js Script

Create `backend/scripts/makeAdmin.js`:

```javascript
import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const makeAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const user = await User.findOneAndUpdate(
      { email },
      { role: 'admin' },
      { new: true }
    );
    
    if (user) {
      console.log(`✅ ${email} is now an admin!`);
    } else {
      console.log(`❌ User not found: ${email}`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Run: node backend/scripts/makeAdmin.js
makeAdmin('john@example.com');
```

Run it:
```bash
node backend/scripts/makeAdmin.js
```

---

## Frontend Integration

Your frontend API is already configured! Just use it:

### Login Example

```javascript
import api from './utils/api';

const login = async (email, password) => {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    
    // Save token
    localStorage.setItem('accessToken', data.accessToken);
    
    // Save user
    localStorage.setItem('user', JSON.stringify({
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role
    }));
    
    return data;
  } catch (error) {
    console.error('Login failed:', error.response?.data);
    throw error;
  }
};
```

### Access Protected Route

```javascript
import api from './utils/api';

const getProfile = async () => {
  try {
    const { data } = await api.get('/auth/me');
    return data;
  } catch (error) {
    console.error('Failed to get profile:', error);
    throw error;
  }
};
```

**Token is automatically added from localStorage!**

### Logout Example

```javascript
import api from './utils/api';

const logout = async () => {
  try {
    await api.post('/auth/logout');
    
    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    
    // Redirect to login
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
```

---

## React Hook Example

Create `frontend/src/hooks/useAuth.js`:

```javascript
import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
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
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, loading, login, register, logout, checkAuth };
};
```

### Use in Component

```javascript
import { useAuth } from '../hooks/useAuth';

function Dashboard() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## Testing

### Run Test Suite

```bash
cd backend
npm test
```

**Tests included:**
- ✅ User registration
- ✅ User login
- ✅ Token generation
- ✅ Protected routes
- ✅ Token refresh
- ✅ Admin middleware
- ✅ Password hashing
- ✅ Error handling

---

## Troubleshooting

### Problem: "Not authorized, no token"

**Solution**: Make sure you're including the Authorization header:
```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Problem: "Invalid refresh token"

**Solution**: User needs to login again. Refresh token has expired (7 days).

### Problem: CORS Error

**Solution**: 
1. Make sure `CLIENT_URL` in `.env` matches your frontend URL
2. Use `withCredentials: true` in axios config
3. Check that cookies are being sent

### Problem: "Account is deactivated"

**Solution**: Admin has deactivated the account. Reactivate in database:
```javascript
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { isActive: true } }
)
```

---

## Security Checklist

Before deploying to production:

- [ ] Change all JWT secrets to strong, unique values
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Update `CLIENT_URL` to production URL
- [ ] Use environment variables for all secrets
- [ ] Enable security features (already configured):
  - [x] Rate limiting
  - [x] Helmet.js
  - [x] CORS
  - [x] HTTP-only cookies
  - [x] Password hashing
  - [x] Input validation

---

## Available Endpoints

### Public (No Authentication)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Protected (Requires Access Token)
- `GET /api/auth/me` - Get current user
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout user
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `GET /api/wishlist` - Get wishlist
- `GET /api/orders/my-orders` - Get user orders
- ... and more

### Admin Only (Requires Access Token + Admin Role)
- `GET /api/admin/stats` - Get admin stats
- `GET /api/admin/users` - Get all users
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- ... and more

---

## Quick Reference

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Check if Server is Running
```bash
curl http://localhost:5000/api/health
```

### Test Authentication
```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# 2. Save the accessToken from response

# 3. Test protected route
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Documentation

- **Full Documentation**: `backend/AUTH_DOCUMENTATION.md`
- **Quick Reference**: `backend/AUTH_QUICK_REFERENCE.md`
- **Implementation Details**: `backend/JWT_AUTH_IMPLEMENTATION_COMPLETE.md`
- **Summary**: `JWT_AUTH_SUMMARY.md`

---

## Need Help?

1. Check error messages in server logs
2. Review documentation files
3. Test with Postman collection
4. Run test suite: `npm test`
5. Verify environment variables are set correctly

---

**🎉 You're ready to go! Happy coding!**

