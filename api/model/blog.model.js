import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,  // Title is mandatory
    },
    content: {
        type: String,
        required: true,  // Content is mandatory
    },
    author: {
        type: String,
        required: true,  // Content is mandatory
    },
  
  owner:{
    type: mongoose.Schema.Types.ObjectId,  // Assuming author is a reference to the User model
    ref: 'User',  // Reference to the User model
    required: true,  // Author is mandatory
  }
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
