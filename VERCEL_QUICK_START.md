# Vercel Quick Start Guide

## Quick Deployment Steps

1. **Push to GitHub** (if not already done)

   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Import"

3. **Add Minimum Environment Variables**

   In Vercel Dashboard → Settings → Environment Variables:

   **Required:**

   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_connection_string
   JWT_ACCESS_SECRET=your_secret_key
   JWT_REFRESH_SECRET=your_secret_key
   ```

4. **Deploy**

   - Click "Deploy"
   - Wait for build to complete
   - Get your URL: `https://your-project.vercel.app`

5. **Update After First Deploy**

   Add these with your actual URL:

   ```
   CLIENT_URL=https://your-project.vercel.app
   VITE_API_URL=https://your-project.vercel.app/api
   ```

6. **Redeploy** (automatic when env vars change)

## Verify Deployment

Test these URLs:

- Frontend: `https://your-project.vercel.app`
- API Health: `https://your-project.vercel.app/api/health`
- API Test: `https://your-project.vercel.app/api/test`

## Common Commands

```bash
# Deploy via CLI (alternative)
npm i -g vercel
vercel login
vercel

# View logs
vercel logs

# Check status
vercel ls
```

## Need More Details?

See `VERCEL_DEPLOYMENT_SETUP.md` for complete guide.
