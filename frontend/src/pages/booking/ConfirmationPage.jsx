import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { bookingId } = location.state || {}; // Retrieve booking ID from the state passed during navigation
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user object is stored in localStorage

  const navigate = useNavigate();

  const handleHomeNavigation = () =>{
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Thank You for Your Booking!</h2>
        <p className="text-gray-700 mb-2">Your booking has been confirmed successfully.</p>
        
        <div className="mt-4">
          <h4 className="font-semibold">Booking Details:</h4>
          <p className="text-gray-600"><strong>Booking ID:</strong> {bookingId}</p>
          <p className="text-gray-600"><strong>Name:</strong> {user?.name}</p>
          <p className="text-gray-600"><strong>Email:</strong> {user?.email}</p>
          {/* Add more details as needed */}
        </div>

        <div className="mt-6">
          <p onClick={handleHomeNavigation}
            className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
          >
            Return to Home
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;

