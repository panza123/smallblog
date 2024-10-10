import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';  // Corrected from cookiesParser to cookieParser
import { connectDB } from './config/connectDB.config.js';
import authRoutes from './routes/auth.route.js';
import blogRoutes from './routes/blog.route.js';
import path from 'path';

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware Setup
app.use(cors({
    origin: 'https://smallblog-beta.vercel.app',  // Ensure to include https:// for production
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser()); // Fixed the import and function name

// Routes
app.use('/', authRoutes);
app.use('/', blogRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React frontend app
    app.use(express.static(path.join(__dirname, 'client', 'dist')));

    // Handle any other routes and serve the frontend
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, async () => {
    try {
        await connectDB();  // Ensure MongoDB connection is made
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
});
