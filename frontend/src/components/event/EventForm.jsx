import React, { useState } from "react";
import { postEvent } from "../../services/EventService";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};

    // Validate the title
    if (!formData.title) formErrors.title = "Title is required";

    // Validate the description
    if (!formData.description)
      formErrors.description = "Description is required";

    // Validate the location
    if (!formData.location) formErrors.location = "Location is required";

    // Validate the date (cannot be in the past)
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    if (!formData.date) {
      formErrors.date = "Date is required";
    } else if (formData.date < today) {
      formErrors.date = "Date cannot be in the past";
    }

    // Validate the price (must be a valid number)
    if (!formData.price || isNaN(formData.price))
      formErrors.price = "Valid price is required";

    // Validate the category
    if (!formData.category) formErrors.category = "Category is required";

    // Validate the image URL
    if (!formData.imageUrl) formErrors.imageUrl = "Image URL is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Submit form data to the backend (API call)
        const data = await postEvent(formData);
        navigate("/events");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <div className="max-w-3xl mx-auto p-6 shadow-md bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
        <h1 className="text-2xl font-bold text-center mb-6">Create Event</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Title */}
          <div className="mb-4">
            <label className="block text-black">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4 col-span-1 sm:col-span-2">
            <label className="block text-black">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
              placeholder="Enter event description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-black">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.location ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
              placeholder="Enter event location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-black">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.date ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-black">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
              placeholder="Enter event price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-black">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.category ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="concert">Concert</option>
              <option value="sport">Sport</option>
              <option value="workshop">Workshop</option>
              <option value="networking_event">Networking event</option>
              <option value="conference">Conference</option>
              <option value="product_launch">Product Launche</option>
              <option value="seminar">Seminar</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-black">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className={`w-full p-3 border ${
                errors.imageUrl ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
              placeholder="Enter event image URL"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm">{errors.imageUrl}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition col-span-1 sm:col-span-2 font-bold"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
