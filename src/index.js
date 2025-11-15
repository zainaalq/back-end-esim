import express from 'express';
// read .env file
import 'dotenv/config';

import mediaRouter from './routes/media-router.js';
import userRouter from './routes/user-router.js';
import likesRouter from './routes/likes-router.js';

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const app = express();


app.use(express.json());

// Serve static files
app.use('/', express.static('public'));
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/api/media', mediaRouter);
app.use('/api/users', userRouter);
app.use('/api/likes', likesRouter);

// Start server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
