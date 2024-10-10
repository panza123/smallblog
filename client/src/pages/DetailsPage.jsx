import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
    const [blog, setBlog] = useState(null); // State to hold blog details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const { id } = useParams(); // Extracting ID from URL parameters

    useEffect(() => {
        axios.get(`/blogs/${id}`)
            .then((res) => {
                setBlog(res.data); // Set the response data to blog
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((err) => {
                setError(err.message); // Handle error if the request fails
                setLoading(false); // Set loading to false in case of error
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold text-blue-600">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold text-red-500">Error: {error}</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold text-gray-500">Blog not found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.title}</h1>
                <p className="text-gray-600 mb-4">{blog.content}</p>
                <p className="text-sm text-gray-500"><strong>Author:</strong> {blog.author}</p>
                <p className="text-sm text-gray-500"><strong>Published On:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-6">
                <a href="/" className="text-blue-500 hover:underline">Back to Blogs</a>
            </div>
        </div>
    );
}

export default DetailsPage;
