// Assuming your environment supports ES Modules or is configured appropriately

import express from 'express';
import { 
  createBlog, 
  deleteBlog, 
  editBlog, 
  fetchUser, 
  getBlogs, 
  getBlogById, 

} from '../controller/blog.controller.js';

const router = express.Router();  

// Create a new blog
router.post('/blogs',  createBlog);  

// Get all blogs
router.get('/blogs', getBlogs); 

// Get blogs by a specific user
router.get('/user-blogs', fetchUser);

// Get a specific blog by ID
router.get('/blogs/:id', getBlogById);  

// Update a specific blog by ID
router.put('/edit/:id', editBlog);  

// Delete a specific blog by ID
router.delete('/delete/:id', deleteBlog);  

export default router;  
