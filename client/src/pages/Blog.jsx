import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('/user-blogs');
                setBlog(res.data);
            } catch (error) {
                setError("Error fetching blogs");
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        
        fetchBlogs();
    }, []); 

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await axios.delete(`/delete/${id}`);
                setBlog(blog.filter(b => b._id !== id)); // Update the state to remove the deleted blog
            } catch (error) {
                console.error("Error deleting blog:", error);
                alert("Error deleting the blog. Please try again.");
            }
        }
    };

    if (loading) return <p className="text-center">Loading...</p>; // Loading state
    if (error) return <p className="text-center text-red-500">{error}</p>; // Error state

    return (
        <div className="max-w-3xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-6">My Blogs</h1>
            {blog.length === 0 ? ( // Empty state
                <p className="text-center text-gray-500">No blogs available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {blog.map((blogs) => (
                        <div 
                            key={blogs._id} 
                            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg relative"
                        >
                            <Link to={`/account/blog/edit/${blogs._id}`}>

                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2">{blogs.title}</h2>
                                    <p className="text-gray-600 mb-2">{blogs.content.slice(0, 100)}...</p>
                                    <p className="text-gray-500">Author: {blogs.author}</p>
                               
                               
                                </div>


                            </Link>
                            <div className="absolute top-2 right-2 flex space-x-2">
                            <Link to={`/account/blog/edit/${blogs._id}`} className="text-blue-500">
                                    <FaEdit size={20} />
                                </Link>
                                <button 
                                    onClick={() => handleDelete(blogs._id)} 
                                    className="text-red-500"
                                >
                                    <FaTrash size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blog;
