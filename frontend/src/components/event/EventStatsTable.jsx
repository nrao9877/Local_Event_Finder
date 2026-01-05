import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../services/BaseUrl";
import { useNavigate } from "react-router-dom";

const EventStatsTable = () => {
  const [eventStats, setEventStats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event stats from the API
    const fetchEventStats = async () => {
      try {
        const response = await axiosInstance.get("/dashboard/event-stats");
        console.log(response)
        setEventStats(response.data);
      } catch (error) {
        console.error("Error fetching event stats:", error);
      }
    };

    fetchEventStats();
  }, []);

  const handleShowAnalytics = () => {
    navigate("/analytics");
  };

  return (
    <div className="bg-cover bg-center h-screen bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <div className="container mx-auto p-5">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-grow text-center">
            <h2 className="text-2xl font-bold">Event Statistics</h2>
          </div>
          <button
            className="bg-gradient-to-r from-purple-300 to-indigo-400 hover:from-indigo-300 hover:to-purple-200 text-black font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 mr-2"
            onClick={handleShowAnalytics}
          >
            Show Analytics
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border">Event Name</th>
                <th className="py-2 px-4 border">Total Tickets Sold</th>
                <th className="py-2 px-4 border">Accepted RSVPs</th>
              </tr>
            </thead>
            <tbody>
              {eventStats.length > 0 ? (
                eventStats.map((event) => (
                  <tr key={event._id} className="text-center">
                    <td className="py-2 px-4 border">{event.eventName}</td>
                    <td className="py-2 px-4 border">
                      {event.totalPurchasedTickets}
                    </td>
                    <td className="py-2 px-4 border">{event.acceptedRSVPs}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-2 px-4 border text-center">
                    No event stats available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventStatsTable;
