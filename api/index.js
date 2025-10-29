// Vercel Serverless Function wrapper for Express app
// This file acts as the entry point for all /api/* routes on Vercel
import app from "../backend/server.js";

// Export the Express app - Vercel will handle it as a serverless function
export default app;
