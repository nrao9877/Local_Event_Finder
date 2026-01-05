import React, { createContext, useState, useEffect } from 'react';
import { axiosInstance } from '../services/BaseUrl';


export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [rsvpNotifications, setRsvpNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotifications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const response = await axiosInstance.get(`/bookings/rsvp-notifications/${user._id}`);
        const pendingRsvps = response.data.pendingRsvps || [];
        setRsvpNotifications(pendingRsvps);
      }
    } catch (error) {
      setError(error.response.data.message);
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ rsvpNotifications, loading, error, fetchNotifications,setRsvpNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
