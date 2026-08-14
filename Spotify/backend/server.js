require('dotenv').config();
const connectDB = require('./src/db/db');
const app = require('./src/app');

console.log('[SERVER] Starting server...');
console.log('[SERVER] Environment:', process.env.NODE_ENV || 'development');
console.log('[SERVER] Frontend URL:', process.env.FRONTEND_URL);

(async () => {
  try {
    console.log('[SERVER] Connecting to database...');
    await connectDB();
    
    app.listen(3000, () => {
      console.log('[SERVER] ✓ Server is running on port 3000')
    })
  } catch (error) {
    console.error('[SERVER] ✗ Failed to start:', error.message);
    process.exit(1);
  }
})();
