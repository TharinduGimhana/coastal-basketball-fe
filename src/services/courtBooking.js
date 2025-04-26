import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export const courtBookingService = {
  // Get available courts
  getCourts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/courts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching courts:', error);
      throw error;
    }
  },

  // Get court availability for a specific date
  getCourtAvailability: async (courtId, date) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/courts/${courtId}/availability`, {
        params: {
          date: date.toISOString().split('T')[0],
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching court availability:', error);
      throw error;
    }
  },

  // Create a booking
  createBooking: async (bookingData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Get user's bookings
  getUserBookings: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/bookings`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  },

  // Cancel a booking
  cancelBooking: async (bookingId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error canceling booking:', error);
      throw error;
    }
  },
}; 