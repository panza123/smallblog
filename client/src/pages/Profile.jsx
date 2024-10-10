import React, { useContext } from 'react';
import { UserContext } from '../context/ContextProvider.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    axios.post('/logout')
      .then((res) => {
        console.log('Logged out');
        navigate('/');
        setUser(null); // Clear user from context after logout
      }).catch((err) => {
        console.log('Error logging out');
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Profile</h1>
        <div className="mb-4">
          <p className="text-lg text-gray-600">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <button
          onClick={logout}
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300 shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
