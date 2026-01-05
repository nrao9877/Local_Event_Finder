import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Load the Stripe publishable key

function BookingSummary() {
  const { eventId } = useParams(); // Get event ID from URL parameters
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  // Get user details (including _id) from localStorage
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user object is stored in localStorage

  const TAX_RATE = 0.10; // 10% Tax rate
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        // Fetch event data by ID
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch event details');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!event || !user) {
    return <div>No event or user found.</div>;
  }

  // Calculate tax and total cost
  const tax = event.price * TAX_RATE;
  const totalCost = event.price + tax;

  const handleConfirmRegistration = async () => {
    try {
      // Send the booking request to the server, including user ID from localStorage
      const bookingResponse = await axios.post(
        `http://localhost:5000/api/bookings`,
        { 
          event: eventId, 
          user: user._id, // Pass user._id from localStorage
          numberOfTickets: 1, 
          totalAmount: totalCost 
        }
      );

      // Navigate to the payment page with the booking ID and total cost
      navigate(`/payment/${bookingResponse.data._id}?totalCost=${totalCost}`);
    } catch (error) {
      console.error(error); // Log the error for debugging
      alert('User Already Registered');
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
        {/* Event Details */}
        <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
        <h3 className="text-xl font-semibold mb-2">Event: {event.title}</h3>
        <p className="text-gray-700"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p className="text-gray-700"><strong>Location:</strong> {event.location}</p>
        <p className="text-gray-700"><strong>Price:</strong> ${event.price}</p>

        {/* User Information */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold">User Information</h4>
          <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
          <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
        </div>

        {/* Tax and Total Cost */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Cost Breakdown</h4>
          <p className="text-gray-700"><strong>Tax (10%):</strong> ${tax.toFixed(2)}</p>
          <p className="text-gray-700"><strong>Total Cost:</strong> ${totalCost.toFixed(2)}</p>
        </div>

        {/* Confirm Registration Button */}
        <button
          onClick={handleConfirmRegistration}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Confirm Registration
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;
