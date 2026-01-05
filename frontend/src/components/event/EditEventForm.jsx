import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../services/BaseUrl';
import { Config } from '../../services/Config';

const EditEventForm = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '', // Initially empty; will be set correctly after fetching
    price: '',
    category: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState({});

  // Fetch existing event data by ID when the component loads
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axiosInstance.get(`/events/${id}`, Config());
        
        // Set form data, ensure date is formatted correctly
        const eventData = res.data;
        setFormData({
          ...eventData,
          date: new Date(eventData.date).toISOString().split('T')[0], // Format date to YYYY-MM-DD
        });
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEvent();
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form, including date validation for past dates
  const validateForm = () => {
    let formErrors = {};
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    if (!formData.title) formErrors.title = 'Title is required';
    if (!formData.description) formErrors.description = 'Description is required';
    if (!formData.location) formErrors.location = 'Location is required';
    if (!formData.date) {
      formErrors.date = 'Date is required';
    } else if (formData.date < currentDate) {
      formErrors.date = 'Date cannot be in the past';
    }
    if (!formData.price || isNaN(formData.price)) formErrors.price = 'Valid price is required';
    if (!formData.category) formErrors.category = 'Category is required';
    if (!formData.imageUrl) formErrors.imageUrl = 'Image URL is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Update event via API
        await axiosInstance.put(`/events/${id}`, formData, Config());
        console.log('Event updated successfully:', formData);
        navigate('/events'); // Redirect to the events page after successful update
      } catch (error) {
        console.error('Error updating event:', error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-md rounded-lg bg-gradient-to-r from-pink-200 via-gray-300 to-purple-300">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Event</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none`}
            placeholder="Enter event title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`w-full p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none`}
            placeholder="Enter event description"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`w-full p-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none`}
            placeholder="Enter event location"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={`w-full p-3 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none`}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className={`w-full p-3 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none`}
            placeholder="Enter event price"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full p-3 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none`}
          >
            <option value="" disabled>Select Category</option>
            <option value="concert">Concert</option>
            <option value="sport">Sport</option>
            <option value="workshop">Workshop</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className={`w-full p-3 border ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none`}
            placeholder="Enter event image URL"
          />
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEventForm;
