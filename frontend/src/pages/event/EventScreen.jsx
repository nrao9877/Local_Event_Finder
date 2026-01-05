import React, { useState, useEffect, useContext } from "react";
import EventCard from "../../components/event/EventCard";
import { UserContext } from "../../contexts/UserContext";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services/BaseUrl";
import { Config } from "../../services/Config";

const EventScreen = () => {
  const [events, setEvents] = useState([]); // Store all events
  const [filteredEvents, setFilteredEvents] = useState([]); // Store filtered events
  const [filterCategory, setFilterCategory] = useState(""); // Current category filter
  const [filterLocation, setFilterLocation] = useState(""); // Current location filter

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const res = await axiosInstance.get("/events");

        const today = new Date();

        // Filter events to show only future or present events
        const futureEvents = res.data.filter(event => new Date(event.date) >= today);

        setEvents(futureEvents); // Set both events and filteredEvents initially
        setFilteredEvents(futureEvents);
      } catch (err) {
        console.log(err);
      }
    };
    getAllEvents(); // Only call this once when the component mounts
  }, []);

  // Handle filtering based on category
  const handleFilterChange = (e) => {
    const category = e.target.value;
    setFilterCategory(category);

    filterEvents(category, filterLocation);
  };

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setFilterLocation(location);

    filterEvents(filterCategory, location);
  };

  const filterEvents = (category, location) => {
    let filtered = events;

    if (category) {
      filtered = filtered.filter((event) => event.category === category);
    }

    if (location) {
      filtered = filtered.filter((event) => event.location === location);
    }

    setFilteredEvents(filtered);
  };

  // Delete event handler
  const handleDeleteEvent = async (eventId) => {
    try {
      await axiosInstance.delete(`/events/${eventId}`, Config());
      // Remove the event from the events state
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
      setFilteredEvents((prevFilteredEvents) =>
        prevFilteredEvents.filter((event) => event._id !== eventId)
      );
      console.log("Event deleted successfully");
    } catch (err) {
      console.log("Error deleting event:", err);
    }
  };

  const handleAddEvent = () => {
    navigate("/addEvent");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <div className="container mx-auto">
        {/* Filter Dropdowns placed at right side */}
        <div className="flex justify-end mb-8 space-x-4 pr-2">
          {user && user.isAdmin && (
            <div
              onClick={handleAddEvent}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <IoIosAddCircle className="text-4xl" />
              <span>Add Event</span>
            </div>
          )}

          {/* Category Filter */}
          <select
            className="p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none"
            value={filterCategory}
            onChange={handleFilterChange}
          >
            <option value="">All Events</option>
            <option value="concert">Concert</option>
            <option value="sport">Sport</option>
            <option value="workshop">Workshop</option>
            <option value="networking_event">Networking event</option>
            <option value="conference">Conference</option>
            <option value="product_launch">Product Launch</option>
            <option value="seminar">Seminar</option>
          </select>

          {/* Location Filter */}
          <select
            className="p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none"
            value={filterLocation}
            onChange={handleLocationChange}
          >
            <option value="">All Locations</option>
            <option value="Arlington">Arlington</option>
            <option value="Dallas">Dallas</option>
            <option value="Fort Worth">Fort Worth</option>
            <option value="Houston">Houston</option>
            {/* Add more locations as needed */}
          </select>
        </div>

        {/* Event Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onDelete={handleDeleteEvent} // Pass delete handler to EventCard
              />
            ))}
          </div>
        </div>

        {/* No Events Found */}
        {filteredEvents.length === 0 && (
          <div className="text-center mt-8 text-gray-500">
            No events found for this category or location.
          </div>
        )}
      </div>
    </div>
  );
};

export default EventScreen;
