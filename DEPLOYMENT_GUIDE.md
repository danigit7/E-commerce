# 🚀 Deployment Guide - Luxury E-Commerce Platform

This guide covers deployment to various platforms including Vercel, Render, Railway, and using Docker.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Database Setup (MongoDB Atlas)](#database-setup)
- [Cloudinary Setup](#cloudinary-setup)
- [Stripe Setup](#stripe-setup)
- [Backend Deployment (Render/Railway)](#backend-deployment)
- [Frontend Deployment (Vercel)](#frontend-deployment)
- [Docker Deployment](#docker-deployment)
- [Post-Deployment](#post-deployment)

## Prerequisites

- Node.js 18+ installed locally
- Git installed
- Accounts on:
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - [Cloudinary](https://cloudinary.com/)
  - [Stripe](https://stripe.com/)
  - [Vercel](https://vercel.com/) or [Render](https://render.com/)

## Environment Setup

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier is fine)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `myFirstDatabase` with your database name (e.g., `luxury-ecommerce`)

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/luxury-ecommerce?retryWrites=true&w=majority
```

### 2. Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret

### 3. Stripe Setup

1. Sign up at [Stripe](https://stripe.com/)
2. Go to Developers → API Keys
3. Copy:
   - Publishable key (starts with `pk_`)
   - Secret key (starts with `sk_`)
4. For webhooks:
   - Go to Developers → Webhooks
   - Add endpoint: `https://your-backend-url.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`
   - Copy webhook secret

## Backend Deployment

### Option 1: Deploy to Render

1. **Prepare Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create New Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: luxury-ecommerce-backend
     - **Environment**: Node
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`
     - **Plan**: Free (or paid for production)

3. **Add Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_ACCESS_SECRET=your_strong_random_secret
   JWT_REFRESH_SECRET=your_strong_random_secret
   JWT_ACCESS_EXPIRE=15m
   JWT_REFRESH_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   CLIENT_URL=https://your-frontend-url.vercel.app
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_FROM=noreply@luxurystore.com
   ADMIN_EMAIL=admin@luxurystore.com
   ADMIN_PASSWORD=Admin@123456
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL: `https://your-app.onrender.com`

### Option 2: Deploy to Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   railway init
   railway up
   ```

3. **Add Environment Variables**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set MONGODB_URI=your_mongodb_uri
   # ... add all other variables
   ```

4. **Generate Domain**
   ```bash
   railway domain
   ```

## Frontend Deployment

### Deploy to Vercel

1. **Prepare Frontend**
   
   Update `frontend/.env.production`:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com/api
   VITE_STRIPE_PUBLIC_KEY=pk_test_your_public_key
   ```

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel login
   vercel
   ```

4. **Configure**
   - Follow prompts
   - Select "Yes" to override settings
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Add Environment Variables in Vercel Dashboard**
   - Go to your project → Settings → Environment Variables
   - Add:
     - `VITE_API_URL`
     - `VITE_STRIPE_PUBLIC_KEY`

6. **Redeploy**
   ```bash
   vercel --prod
   ```

### Alternative: Deploy Frontend to Render

1. Create new Static Site on Render
2. Connect repository
3. Configure:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add environment variables
5. Deploy

## Docker Deployment

### Local Docker Setup

1. **Build and Run**
   ```bash
   docker-compose up -d
   ```

2. **Access Application**
   - Frontend: http://localhost:80
   - Backend: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

### Deploy to Docker Hub + VPS

1. **Build and Push Images**
   ```bash
   # Backend
   cd backend
   docker build -t your-username/luxury-backend .
   docker push your-username/luxury-backend

   # Frontend
   cd ../frontend
   docker build -t your-username/luxury-frontend .
   docker push your-username/luxury-frontend
   ```

2. **On Your VPS (Ubuntu)**
   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh

   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose

   # Clone repo
   git clone your-repo-url
   cd e-commerce

   # Update docker-compose.yml with your images
   # Add environment variables

   # Run
   docker-compose up -d
   ```

## Post-Deployment

### 1. Seed Database

```bash
# If using Render
curl -X POST https://your-backend-url.onrender.com/api/admin/seed

# Or manually via backend terminal
cd backend
npm run seed
```

### 2. Update Stripe Webhook

1. Go to Stripe Dashboard → Webhooks
2. Update webhook URL to: `https://your-backend-url.onrender.com/api/stripe/webhook`
3. Update `STRIPE_WEBHOOK_SECRET` in environment variables

### 3. Test Application

1. **Test Authentication**
   - Register new user
   - Login
   - Check profile

2. **Test Products**
   - Browse products
   - View product details
   - Add to cart

3. **Test Checkout**
   - Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Complete order

4. **Test Admin Dashboard**
   - Login as admin (credentials from seed)
   - View dashboard
   - Manage products
   - Update orders

## Performance Optimization

### Frontend Optimizations

1. **Enable Caching**
   - Already configured in `nginx.conf`

2. **Lazy Loading**
   - Images load on demand
   - Route-based code splitting

3. **CDN**
   - Vercel automatically uses CDN
   - For custom deployment, use Cloudflare

### Backend Optimizations

1. **Database Indexing**
   ```javascript
   // Add to models
   schema.index({ field: 1 });
   ```

2. **Caching**
   ```bash
   npm install redis
   ```

3. **Rate Limiting**
   - Already configured in server.js

## Monitoring & Logging

### Render

- Automatic logs in dashboard
- Set up alerts for errors

### Custom Monitoring

```bash
# Install PM2 for process management
npm install -g pm2

# Run backend with PM2
pm2 start backend/server.js --name luxury-backend
pm2 startup
pm2 save
```

## Security Checklist

- [ ] Strong JWT secrets (use random generator)
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] Environment variables secure
- [ ] Rate limiting enabled
- [ ] CORS configured correctly
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Stripe webhook signature verification enabled
- [ ] Admin password changed from default

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `CLIENT_URL` in backend env
   - Verify frontend is using correct API URL

2. **MongoDB Connection Failed**
   - Check MongoDB Atlas IP whitelist (allow all: 0.0.0.0/0)
   - Verify connection string format

3. **Stripe Webhook Not Working**
   - Verify webhook URL
   - Check webhook secret
   - Test in Stripe CLI locally first

4. **Images Not Uploading**
   - Verify Cloudinary credentials
   - Check file size limits

### Logs

**Render:**
```bash
# View logs in dashboard
```

**Railway:**
```bash
railway logs
```

**Docker:**
```bash
docker-compose logs -f
```

## Scaling

### Horizontal Scaling

1. **Add More Backend Instances**
   - Render: Increase instance count
   - Add load balancer

2. **Database Scaling**
   - MongoDB Atlas: Upgrade to M10+ tier
   - Enable replica sets

3. **CDN**
   - Use Cloudflare for static assets
   - Cache API responses where appropriate

## Support

For deployment issues:
- Check logs first
- Review environment variables
- Test locally with production env variables
- Open issue on GitHub

---

🎉 **Congratulations!** Your luxury e-commerce platform is now live!

