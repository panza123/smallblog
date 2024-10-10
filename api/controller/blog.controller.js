import jwt from 'jsonwebtoken';
import Blog from '../model/blog.model.js';
import User from '../model/auth.model.js';

// Get all blogs, sorted by creation date (desc)
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving blogs', error: err.message });
  }
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving blog by ID', error: err.message });
  }
};

// Create a new blog post
export const createBlog = async (req, res) => {
  const { token } = req.cookies;
  const { title, content, author } = req.body;

  // Validate required fields
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Check if user exists
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(401).json({ error: 'User not authenticated.' });
    }

    // Create the blog post
    const blog = await Blog.create({
      owner: foundUser._id,
      title,
      content,
      author
    });

    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ message: 'Error creating blog', error: err.message });
  }
};

// Edit a blog post by ID
export const editBlog = async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find the blog to edit
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Check if the user is authorized to edit the blog
    if (blog.owner.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to edit this blog.' });
    }

    // Update the blog post
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Error editing blog', error: err.message });
  }
};

// Fetch user info and their blogs
export const fetchUser = async (req, res) => {
  const { token } = req.cookies;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch user and their related blogs
    const user = await User.findById(userId).select('_id');
    const blogs = await Blog.find({ owner: user._id });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user info', error: err.message });
  }
};

// Delete a blog post by ID
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog', error: err.message });
  }
};
