import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookiesParser from 'cookie-parser';
import { connectDB } from './config/connectDB.config.js';
import authRoutes from './routes/auth.route.js';
import blogRoutes from './routes/blog.route.js'; 
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// CORS Setup (adjust origin in production)
app.use(cors({
origin: 'http://localhost:5173', // Using env for production URL
    credentials: true,
}));

// Middleware Setup
app.use(express.json());
app.use(cookiesParser());

// Routes
app.use('/', authRoutes);
app.use('/', blogRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    // Fix for __dirname in ES modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    app.use(express.static(path.join(__dirname, 'client/dist')));

    // Catch-all route to serve index.html for frontend routing
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
    })
}else{
app.get("/", (req, res) => {
    res.send("Server is ready");
})
}

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
