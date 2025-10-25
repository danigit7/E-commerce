# ⚡ Quick Start Guide

Get your luxury e-commerce platform running in 5 minutes!

## 🚀 Installation

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### 2. Setup Environment Variables

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with minimum required values:
```env
MONGODB_URI=mongodb://localhost:27017/luxury-ecommerce
JWT_ACCESS_SECRET=your_secret_key_here
JWT_REFRESH_SECRET=your_refresh_key_here
CLIENT_URL=http://localhost:5173
```

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key
```

### 3. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (update MONGODB_URI in .env)
```

### 4. Seed Database

```bash
cd backend
npm run seed
```

This creates:
- Admin account: `admin@luxurystore.com` / `Admin@123456`
- Sample users: `john@example.com` / `Password123`
- 12 luxury products

### 5. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:5173

## 🎯 Test the Application

### 1. Browse as Customer

1. Open http://localhost:5173
2. Click "Sign Up" or use existing user:
   - Email: `john@example.com`
   - Password: `Password123`
3. Browse products
4. Add items to cart
5. View wishlist
6. Go to checkout (use Stripe test card: `4242 4242 4242 4242`)

### 2. Access Admin Dashboard

1. Login with admin credentials:
   - Email: `admin@luxurystore.com`
   - Password: `Admin@123456`
2. Visit http://localhost:5173/admin
3. View dashboard statistics
4. Manage products, orders, and users

## 📁 Project Structure

```
e-commerce/
├── backend/          # Node.js + Express API
├── frontend/         # React + Vite app
├── docker-compose.yml
├── README.md
├── DEPLOYMENT_GUIDE.md
└── QUICK_START.md   # This file
```

## 🛠️ Common Commands

### Backend
```bash
npm run dev         # Development mode
npm start           # Production mode
npm run seed        # Seed database
npm test            # Run tests
```

### Frontend
```bash
npm run dev         # Development mode
npm run build       # Production build
npm run preview     # Preview production build
```

### Docker
```bash
docker-compose up -d           # Start all services
docker-compose logs -f         # View logs
docker-compose down            # Stop services
docker-compose restart backend # Restart backend
```

## 🎨 Features Checklist

### Customer Features
- [x] Browse products with filters
- [x] Search functionality
- [x] Product details with reviews
- [x] Shopping cart
- [x] Wishlist
- [x] Secure checkout with Stripe
- [x] Order tracking
- [x] User profile
- [x] Order history

### Admin Features
- [x] Dashboard with analytics
- [x] Product management (CRUD)
- [x] Image upload to Cloudinary
- [x] Order management
- [x] User management
- [x] Sales statistics

### Technical Features
- [x] JWT authentication with refresh tokens
- [x] Password hashing with bcrypt
- [x] Stripe payment integration
- [x] Cloudinary image hosting
- [x] Email notifications (optional)
- [x] Input validation
- [x] Rate limiting
- [x] CORS security
- [x] Responsive design
- [x] Framer Motion animations

## 🔐 Security

- Passwords are hashed with bcrypt
- JWT tokens stored securely
- HttpOnly cookies for refresh tokens
- Rate limiting on API endpoints
- Input validation on all forms
- CORS configured
- Helmet.js for security headers

## 📝 API Endpoints

### Auth
- POST `/api/auth/register` - Register
- POST `/api/auth/login` - Login
- POST `/api/auth/logout` - Logout
- POST `/api/auth/refresh` - Refresh token
- GET `/api/auth/me` - Get profile

### Products
- GET `/api/products` - List products
- GET `/api/products/:id` - Get product
- POST `/api/products` - Create (Admin)
- PUT `/api/products/:id` - Update (Admin)
- DELETE `/api/products/:id` - Delete (Admin)

### Cart
- GET `/api/cart` - Get cart
- POST `/api/cart` - Add to cart
- PUT `/api/cart/:productId` - Update quantity
- DELETE `/api/cart/:productId` - Remove item

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders/my-orders` - User orders
- GET `/api/orders/:id` - Get order
- PUT `/api/orders/:id/status` - Update status (Admin)

For complete API documentation, import `POSTMAN_COLLECTION.json` into Postman.

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Stripe Test Card
Use this card for testing payments:
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

## 📚 Learn More

- [Full README](README.md) - Complete documentation
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Production deployment
- [Postman Collection](POSTMAN_COLLECTION.json) - API testing

## 🆘 Need Help?

1. Check the console for error messages
2. Review environment variables
3. Ensure MongoDB is running
4. Check if ports 5000 and 5173 are available
5. Clear browser cache and cookies

## 🎉 Next Steps

1. Customize the design and colors
2. Add your own products
3. Configure Stripe with your account
4. Setup Cloudinary for image uploads
5. Configure email service
6. Deploy to production!

---

Happy coding! 🚀

