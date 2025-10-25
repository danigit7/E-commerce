# Vercel Deployment Guide

## Prerequisites
- GitHub repository with your e-commerce application
- Vercel account (free tier available)
- Environment variables ready

## Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository: `danigit7/E-commerce`

## Step 2: Configure Build Settings

### Frontend Configuration
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Backend Configuration
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Output Directory**: (leave empty for Node.js)

## Step 3: Environment Variables

Add these environment variables in Vercel dashboard:

### Backend Environment Variables
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-domain.vercel.app/api/auth/google/callback
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### Frontend Environment Variables
```
VITE_API_URL=https://your-domain.vercel.app/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Step 4: Deploy

1. Click "Deploy" in Vercel dashboard
2. Wait for the build to complete
3. Your application will be available at the provided Vercel URL

## Step 5: Update CORS and Callback URLs

After deployment, update these in your environment variables:
- Update `GOOGLE_CALLBACK_URL` to your Vercel domain
- Update Google OAuth settings in Google Cloud Console
- Update Stripe webhook URLs

## Step 6: Database Setup

Make sure your MongoDB database is accessible from Vercel:
- Use MongoDB Atlas (recommended)
- Whitelist Vercel's IP addresses
- Use connection string with proper authentication

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check Node.js version compatibility
2. **Environment Variables**: Ensure all required variables are set
3. **CORS Issues**: Update frontend API URL to Vercel domain
4. **Database Connection**: Verify MongoDB connection string

### Useful Commands:
```bash
# Check Vercel CLI
npx vercel --version

# Deploy from local
npx vercel

# Check logs
npx vercel logs
```

## Production Checklist

- [ ] All environment variables configured
- [ ] Database connection working
- [ ] OAuth callbacks updated
- [ ] Stripe webhooks configured
- [ ] CORS settings updated
- [ ] SSL certificate active
- [ ] Domain configured (optional)

## Support

For issues with Vercel deployment:
- Check Vercel documentation
- Review build logs in dashboard
- Contact Vercel support if needed
