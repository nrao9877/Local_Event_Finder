import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-cover bg-center h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <div className="text-center text-white p-6 bg-opacity-70 bg-black rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Discover Local Events Near You.
        </h1>
        <h3 className="text-3xl font-semibold mb-6 drop-shadow-md">
          Find, Book, and Enjoy Your Favorite Events
        </h3>
        <p className="text-xl mb-8">
          Concerts, Sports, Workshops, and more.
        </p>
        <button onClick={()=> navigate("/events")} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
