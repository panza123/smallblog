import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  const [blogs, setBlogs] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    axios.get('/blogs') // Ensure the correct endpoint
      .then((res) => {
        setBlogs(res.data); // Set the response data to blogs
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError(err.message); // Handle error if the request fails
        setLoading(false);
      });
  }, []);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Blogs</h1>
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow-md rounded-lg p-6">
              {/* Use Link component to navigate to the blog detail page */}
              <Link to={`blogs/${blog._id}`}>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.content.slice(0,100)}</p>
                <p className="text-sm text-gray-500"><strong>Author:</strong> {blog.author}</p>
              </Link>
           
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs available.</p>
      )}
    </div>
  );
}

export default Home;
