import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error before making the request

    axios
      .post("/login", { email, password }) // Changed to /login
      .then((res) => {
        setLoading(false);
        // Optionally reset the form state here
        // setEmail('');
        // setPassword('');
        navigate("/"); // Redirect after successful login
      })
      .catch((err) => {
        setLoading(false);
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Log In
        </h1>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}{" "}
        {/* Display error message */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <MdOutlineEmail className="text-xl text-gray-600 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="flex-grow outline-none bg-transparent text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <RiLockPasswordLine className="text-xl text-gray-600 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="flex-grow outline-none bg-transparent text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full py-2 ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold rounded-lg shadow-md transition duration-300`}
              disabled={loading} // Disable button when loading
            >
              {loading ? "Logging..." : "Login"}
            </button>
            <div>
              <p className="text-center mt-4 text-gray-600">
                Don't have an account yet?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
