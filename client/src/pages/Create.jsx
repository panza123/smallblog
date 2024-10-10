import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    if (!title || !content || !author) {
      setMessage("Please fill in all fields.");
      return;
    }

    const formData = { title, content, author };

    setLoading(true); // Start loading

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/blogs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Post created successfully!");
      navigate("/");
      clearForm();
    } catch (error) {
      console.error("Error creating post:", error);
      const errorMessage = error.response?.data?.message || "Error creating post. Please try again.";
      setMessage(errorMessage);
    } finally {
      setLoading(false); // End loading
    }
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setAuthor("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-5">
      <div className="w-full max-w-2xl bg-gray-200 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create a Blog Post</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              id="title"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content</label>
            <textarea
              id="content"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content here..."
              rows="5"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-gray-700 font-semibold mb-2">Author</label>
            <input
              type="text"
              id="author"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author's name"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Submitting..." : "Submit Post"}
            </button>
          </div>

          {/* Success/Error Message */}
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};
