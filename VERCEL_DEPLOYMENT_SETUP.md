# Vercel Deployment Guide - Complete Setup

This guide will help you deploy your full-stack e-commerce application to Vercel.

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free tier available)
3. **MongoDB Atlas** - For database hosting (recommended)
4. **Environment Variables** - All required credentials ready

## Step-by-Step Deployment

### Step 1: Push Code to GitHub

Make sure your code is pushed to a GitHub repository:

```bash
git add .
git commit -m "Configure Vercel deployment"
git push origin main
```

### Step 2: Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Select your repository and click **"Import"**

### Step 3: Configure Project Settings

Vercel should auto-detect your settings, but verify:

- **Framework Preset**: Leave as "Other" (we're using custom config)
- **Root Directory**: `./` (root)
- **Build Command**: `npm run vercel-build` (already in vercel.json)
- **Output Directory**: `frontend/dist` (already in vercel.json)

**Important**: You don't need to change these manually as they're configured in `vercel.json`.

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add the following:

#### Backend Environment Variables

```
NODE_ENV=production
PORT=5000
VERCEL=1
MONGO_URI=your_mongodb_atlas_connection_string
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRE=7d
CLIENT_URL=https://your-project-name.vercel.app
```

#### OAuth & Services (Optional but Recommended)

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-project-name.vercel.app/api/auth/google/callback
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_FROM=noreply@yourstore.com
```

#### Frontend Environment Variables

```
VITE_API_URL=https://your-project-name.vercel.app/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

**Important Notes:**

- Replace `your-project-name.vercel.app` with your actual Vercel deployment URL
- After first deployment, Vercel will provide your URL - you may need to update `CLIENT_URL` and `GOOGLE_CALLBACK_URL` after the first deploy
- Use MongoDB Atlas connection string (not localhost)
- Generate strong secrets for JWT tokens

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for the build to complete (usually 2-5 minutes)
3. Vercel will provide you with a deployment URL

### Step 6: Update Configuration After First Deploy

After your first deployment, you'll get a URL like: `https://your-project-name.vercel.app`

1. Go to **Project Settings** → **Environment Variables**
2. Update `CLIENT_URL` to: `https://your-project-name.vercel.app`
3. Update `GOOGLE_CALLBACK_URL` to: `https://your-project-name.vercel.app/api/auth/google/callback`
4. Update `VITE_API_URL` to: `https://your-project-name.vercel.app/api`
5. Go to **Google Cloud Console** and update OAuth redirect URIs
6. Redeploy (triggered automatically when env vars change, or manually redeploy)

### Step 7: Update External Services

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client
4. Add authorized redirect URI: `https://your-project-name.vercel.app/api/auth/google/callback`

#### MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Navigate to **Network Access**
3. Add IP Address: `0.0.0.0/0` (allows all IPs) OR add Vercel's IP ranges
4. Ensure your database user has proper permissions

#### Stripe Webhooks (if using)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **Webhooks**
3. Add endpoint: `https://your-project-name.vercel.app/api/stripe/webhook`
4. Copy the webhook secret and update `STRIPE_WEBHOOK_SECRET`

## Project Structure for Vercel

```
e-commerce/
├── api/
│   └── index.js           # Serverless function wrapper
├── backend/               # Express backend
│   ├── server.js
│   └── ...
├── frontend/              # React frontend
│   ├── dist/             # Build output
│   └── ...
├── vercel.json            # Vercel configuration
└── package.json           # Root package.json
```

## How It Works

1. **Frontend**: Built as a static site from `frontend/dist`
2. **Backend API**: Runs as serverless functions via `api/index.js`
3. **Routing**:
   - `/api/*` routes to serverless functions
   - All other routes serve the React app

## Testing Your Deployment

After deployment, test these endpoints:

1. **Health Check**: `https://your-project-name.vercel.app/api/health`
2. **Test Endpoint**: `https://your-project-name.vercel.app/api/test`
3. **Root**: `https://your-project-name.vercel.app/`
4. **Frontend**: `https://your-project-name.vercel.app/` (should show your React app)

## Troubleshooting

### Build Fails

1. **Check Build Logs**: Go to **Deployments** → Click on failed deployment → View logs
2. **Common Issues**:
   - Missing environment variables
   - Node.js version mismatch
   - Dependency installation errors

### API Routes Return 404

- Verify `api/index.js` exists and exports correctly
- Check that routes in `vercel.json` are correct
- Ensure backend dependencies are installed

### CORS Errors

- Update `CLIENT_URL` environment variable to your Vercel URL
- Check CORS configuration in `backend/server.js`
- Verify environment variables are set correctly

### Database Connection Fails

- Verify MongoDB Atlas whitelist includes Vercel IPs or `0.0.0.0/0`
- Check `MONGO_URI` or `MONGODB_URI` environment variable
- Ensure MongoDB connection string is correct

### Frontend Can't Connect to API

- Set `VITE_API_URL` to `https://your-project-name.vercel.app/api`
- Redeploy after updating environment variables
- Check browser console for CORS errors

## Using Vercel CLI (Alternative Method)

If you prefer CLI deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# For production
vercel --prod
```

## Custom Domain Setup (Optional)

1. Go to **Project Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update environment variables with new domain

## Environment Variables Reference

### Required (Minimum)

- `MONGO_URI` or `MONGODB_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CLIENT_URL` (after first deployment)

### Optional (For Full Features)

- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`
- `CLOUDINARY_*` variables
- `EMAIL_*` variables

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- Check deployment logs in Vercel dashboard

## Security Notes

1. **Never commit `.env` files** - Use Vercel environment variables
2. **Use strong secrets** for JWT tokens
3. **Restrict MongoDB access** if possible (specific IPs instead of 0.0.0.0/0)
4. **Enable rate limiting** (already configured in backend)
5. **Use HTTPS only** (Vercel provides this automatically)

---

**Happy Deploying! 🚀**
