// Simple test endpoint for debugging Vercel deployment
export default function handler(req, res) {
  res.status(200).json({
    success: true,
    message: '✅ Vercel function is working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    headers: req.headers,
  });
}
