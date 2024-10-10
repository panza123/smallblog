import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookiesParser from 'cookie-parser';
import { connectDB } from './config/connectDB.config.js';
import authRoutes from './routes/auth.route.js';
import blogRoutes from './routes/blog.route.js'; 
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware Setup
app.use(cors({
    origin:'smallblog-beta.vercel.app',
    credentials: true,
}));

app.use(express.json());
app.use(cookiesParser());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads"))); 

// Use path.resolve for better cross-platform compatibility

// Routes
app.use('/', authRoutes);
app.use('/', blogRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
});
