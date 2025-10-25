# 🏪 Luxury E-Commerce Platform - MERN Stack

A complete, production-ready full-stack luxury e-commerce platform built with the MERN stack, featuring JWT authentication, Stripe payments, Cloudinary image upload, admin dashboard, and modern animated UI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-v18+-green.svg)
![React](https://img.shields.io/badge/react-v18+-blue.svg)

## ✨ Features

### 🎨 **Luxury Design**
- **Premium UI/UX**: Deep Emerald, Gold, Charcoal, and Ivory color scheme
- **Framer Motion Animations**: Smooth transitions, hover effects, and micro-interactions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Typography**: Inter + Playfair Display font combination

### 🛍️ **Customer Features**
- **Product Browsing**: Advanced filtering (category, price, rating), sorting, and search
- **Product Details**: Image gallery, reviews, ratings, and stock status
- **Shopping Cart**: Add/remove/update items with real-time calculations
- **Wishlist**: Save favorite products
- **Secure Checkout**: Stripe payment integration
- **Order Tracking**: View order history and status updates
- **User Authentication**: JWT-based with refresh tokens
- **Password Reset**: Email-based password recovery

### 👨‍💼 **Admin Features**
- **Dashboard Analytics**: Sales stats, order count, low stock alerts
- **Product Management**: Full CRUD operations with image upload
- **Order Management**: Update order status, view customer details
- **User Management**: View/ban/unban users
- **Sales Reports**: Best sellers, revenue tracking

### 🔐 **Security**
- JWT access & refresh tokens
- HttpOnly secure cookies
- bcrypt password hashing
- Input validation with express-validator
- Helmet.js for security headers
- Rate limiting on API endpoints
- CORS configuration

### ⚡ **Technical Stack**

#### **Frontend**
- React 18 + Vite
- Redux Toolkit (state management)
- React Router DOM v6
- Tailwind CSS
- Framer Motion
- Axios
- React Hot Toast
- React Icons

#### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- Stripe payments
- Cloudinary (image hosting)
- Nodemailer (email)
- Express rate limiting
- Helmet.js

## 📁 Project Structure

```
e-commerce/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── stripe.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── cartController.js
│   │   ├── wishlistController.js
│   │   ├── reviewController.js
│   │   ├── uploadController.js
│   │   ├── adminController.js
│   │   └── stripeController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── uploadRoutes.js
│   │   ├── adminRoutes.js
│   │   └── stripeRoutes.js
│   ├── scripts/
│   │   └── seed.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── emailService.js
│   ├── __tests__/
│   │   └── auth.test.js
│   ├── .env.example
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Layout.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Terms.jsx
│   │   │   ├── Privacy.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   └── ResetPassword.jsx
│   │   │   └── Admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminProducts.jsx
│   │   │       ├── AdminOrders.jsx
│   │   │       └── AdminUsers.jsx
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── productSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   ├── wishlistSlice.js
│   │   │   │   └── orderSlice.js
│   │   │   └── store.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
├── POSTMAN_COLLECTION.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js v18+ and npm
- MongoDB (local or Atlas)
- Stripe account
- Cloudinary account

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd e-commerce
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file (see .env.example)
cp .env.example .env

# Update .env with your credentials

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

Backend runs on **http://localhost:5000**

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Create .env file (see .env.example)
cp .env.example .env

# Update VITE_API_URL and VITE_STRIPE_PUBLIC_KEY

# Start development server
npm run dev
```

Frontend runs on **http://localhost:5173**

## 🔑 Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

MONGODB_URI=mongodb://localhost:27017/luxury-ecommerce

JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@luxurystore.com

ADMIN_EMAIL=admin@luxurystore.com
ADMIN_PASSWORD=Admin@123456
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_public_key
```

## 📊 Default Admin Credentials

After running the seed script:

- **Email**: admin@luxurystore.com
- **Password**: Admin@123456

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services:
- Frontend: http://localhost:80
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📮 API Documentation

Import `POSTMAN_COLLECTION.json` into Postman for complete API documentation with examples.

### Key Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

#### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

#### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

#### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart

#### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist/:productId` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

#### Stripe
- `POST /api/stripe/create-checkout-session` - Create checkout
- `POST /api/stripe/webhook` - Stripe webhook handler

#### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/toggle-status` - Ban/unban user

## 🎯 Features Roadmap

- [ ] Email notifications for orders
- [ ] Product CSV import/export
- [ ] Advanced analytics dashboard
- [ ] Multi-currency support
- [ ] Guest checkout
- [ ] Product recommendations
- [ ] Live chat support
- [ ] PWA support
- [ ] Social media login

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for the luxury e-commerce community

## 📞 Support

For support, email support@luxurystore.com or open an issue in the repository.

---

⭐ Star this repo if you find it helpful!

#   E - c o m m e r c e  
 