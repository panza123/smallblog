import User from '../model/auth.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// SignUp function
export const signUp = async (req, res) => {
    const { email, name, password } = req.body;

    // Validate input
    if (!email || !name || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            email,
            name,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d' // Token expires in 7 days
        });

        // Set token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure only in production
        });

        // Return success response without password
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...newUser._doc,
                password: null, // Don't send back the password
                token
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// SignIn function
export const signIn = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        // Set token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure only in production
        });

        // Return success response without password
        return res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            user: {
                ...user._doc,
                password: null, // Don't send back the password
                token
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Profile function
export const profile = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(403).json({ msg: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(403).json({ msg: "Access denied" });
    }
};

// Logout function
export const logout = (req, res) => {
    try {
        res.clearCookie('token'); // Clear the token cookie
        return res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });
    } catch (err) {
        console.error('Logout Error:', err);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
