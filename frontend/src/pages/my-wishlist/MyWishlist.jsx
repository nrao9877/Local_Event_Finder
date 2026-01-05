import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import { format, isValid } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function MyWishlist() {
  const [wishlistedEvents, setWishlistedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5000/api/wishlist/user/${user._id}`);
          console.log('Wishlist data:', response.data); // Log the fetched wishlist data
          setWishlistedEvents(response.data);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Handle case where user is not logged in
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${wishlistId}`);
      setWishlistedEvents((prev) => prev.filter((item) => item._id !== wishlistId));
      console.log('Event removed from wishlist');
    } catch (error) {
      console.error('Error removing event from wishlist:', error);
    }
  };

  const handleBookEvent = (eventId) => {
    navigate(`/booking-summary/${eventId}`); // Redirect to the booking page with eventId
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistedEvents.length > 0 ? (
          wishlistedEvents.map((wishlistItem) => (
            <div key={wishlistItem._id} className="flex flex-col bg-white p-4 rounded-lg shadow">
              <img
                src={wishlistItem.event.imageUrl || 'https://via.placeholder.com/400x300'}
                alt={wishlistItem.event.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900">{wishlistItem.event.title}</h3>
              <p className="text-gray-700">
                <strong>Category:</strong> {wishlistItem.event.category}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {wishlistItem.event.location}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong>{' '}
                {isValid(new Date(wishlistItem.event.date))
                  ? format(new Date(wishlistItem.event.date), 'PP')
                  : 'Invalid date'}
              </p>
              
              {/* Book Now Button */}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => handleBookEvent(wishlistItem.event._id)}
              >
                Book Now
              </button>

              {/* Remove from Wishlist Button */}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => handleRemoveFromWishlist(wishlistItem._id)}
              >
                Remove from Wishlist
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center">No events in your wishlist.</p>
        )}
      </div>
    </div>
  );
}

export default MyWishlist;
