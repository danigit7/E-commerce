# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your e-commerce application.

## Prerequisites

1. A Google Cloud Console account
2. Your application running locally or deployed

## Step 1: Create Google OAuth Credentials

### 1.1 Go to Google Cloud Console

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

### 1.2 Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Choose **Web application** as the application type
4. Configure the following:

#### Authorized JavaScript origins:

- `http://localhost:5173` (for development)
- `http://localhost:5000` (for backend)
- Your production domain (when deployed)

#### Authorized redirect URIs:

- `http://localhost:5000/api/auth/google/callback` (for development)
- `https://yourdomain.com/api/auth/google/callback` (for production)

### 1.3 Get Your Credentials

After creating the OAuth client, you'll get:

- **Client ID**: `your_google_client_id`
- **Client Secret**: `your_google_client_secret`

## Step 2: Configure Environment Variables

### 2.1 Backend Environment (.env)

Add these variables to your `backend/.env` file:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### 2.2 Frontend Environment (.env)

Create a `frontend/.env` file with:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Test the Implementation

### 3.1 Start the Backend Server

```bash
cd backend
npm run dev
```

### 3.2 Start the Frontend Server

```bash
cd frontend
npm run dev
```

### 3.3 Test Google OAuth

1. Navigate to `http://localhost:5173/login`
2. Click "Continue with Google"
3. You should be redirected to Google's OAuth consent screen
4. After authorization, you'll be redirected back to your app

## Step 4: Production Deployment

### 4.1 Update Google OAuth Settings

1. Go back to Google Cloud Console
2. Update the authorized redirect URIs with your production domain:
   - `https://yourdomain.com/api/auth/google/callback`

### 4.2 Update Environment Variables

Update your production environment variables:

```env
# Backend
GOOGLE_CLIENT_ID=your_production_client_id
GOOGLE_CLIENT_SECRET=your_production_client_secret
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback
CLIENT_URL=https://yourdomain.com

# Frontend
VITE_API_URL=https://yourdomain.com/api
```

## Features Implemented

### Backend Features

- ✅ Google OAuth strategy with Passport.js
- ✅ User model updated to support Google OAuth
- ✅ Google OAuth routes (`/auth/google` and `/auth/google/callback`)
- ✅ Automatic user creation/linking for Google users
- ✅ JWT token generation for Google OAuth users

### Frontend Features

- ✅ Google OAuth button component
- ✅ Integration with Redux store
- ✅ Google OAuth success page
- ✅ Updated login and register pages with Google OAuth
- ✅ Automatic token handling and user state management

## Troubleshooting

### Common Issues

1. **"redirect_uri_mismatch" error**

   - Ensure the redirect URI in Google Console matches exactly
   - Check for trailing slashes and HTTP vs HTTPS

2. **"invalid_client" error**

   - Verify your Client ID and Client Secret are correct
   - Ensure the OAuth consent screen is configured

3. **CORS errors**

   - Check that your backend CORS configuration includes the frontend URL
   - Verify the CLIENT_URL environment variable

4. **Token not found errors**
   - Ensure the Google OAuth success page is properly handling the token
   - Check that the API URL is correctly configured

### Testing Checklist

- [ ] Google OAuth button appears on login page
- [ ] Google OAuth button appears on register page
- [ ] Clicking the button redirects to Google OAuth
- [ ] After Google authorization, user is redirected back
- [ ] User is automatically logged in after Google OAuth
- [ ] User data is properly stored and accessible
- [ ] Logout works correctly for Google OAuth users

## Security Considerations

1. **Environment Variables**: Never commit your `.env` files to version control
2. **HTTPS in Production**: Always use HTTPS in production
3. **Token Security**: JWT tokens are stored securely in HTTP-only cookies
4. **User Data**: Google profile data is stored securely in your database

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Passport.js Google Strategy](http://www.passportjs.org/packages/passport-google-oauth20/)
- [React Router Documentation](https://reactrouter.com/)

## Support

If you encounter any issues, check:

1. Google Cloud Console configuration
2. Environment variables
3. Network connectivity
4. Browser console for errors
5. Backend server logs

---

**Note**: This implementation supports both traditional email/password authentication and Google OAuth, giving users flexibility in how they sign up and log in.
