import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { courtBookingService } from '../../services/courtBooking';

// Async thunks
export const fetchCourts = createAsyncThunk(
  'courtBooking/fetchCourts',
  async () => {
    return await courtBookingService.getCourts();
  }
);

export const fetchCourtAvailability = createAsyncThunk(
  'courtBooking/fetchCourtAvailability',
  async ({ courtId, date }) => {
    return await courtBookingService.getCourtAvailability(courtId, date);
  }
);

export const createBooking = createAsyncThunk(
  'courtBooking/createBooking',
  async (bookingData) => {
    return await courtBookingService.createBooking(bookingData);
  }
);

const initialState = {
  courts: [],
  availability: {},
  selectedCourt: null,
  selectedDate: new Date(),
  selectedTimeSlots: [],
  loading: false,
  error: null,
};

const courtBookingSlice = createSlice({
  name: 'courtBooking',
  initialState,
  reducers: {
    setSelectedCourt: (state, action) => {
      state.selectedCourt = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    addTimeSlot: (state, action) => {
      state.selectedTimeSlots.push(action.payload);
    },
    removeTimeSlot: (state, action) => {
      state.selectedTimeSlots = state.selectedTimeSlots.filter(
        slot => slot !== action.payload
      );
    },
    clearSelection: (state) => {
      state.selectedCourt = null;
      state.selectedTimeSlots = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courts
      .addCase(fetchCourts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourts.fulfilled, (state, action) => {
        state.loading = false;
        state.courts = action.payload;
        state.error = null;
      })
      .addCase(fetchCourts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch availability
      .addCase(fetchCourtAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourtAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availability = {
          ...state.availability,
          [action.meta.arg.courtId]: action.payload,
        };
        state.error = null;
      })
      .addCase(fetchCourtAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.loading = false;
        state.selectedTimeSlots = [];
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedCourt,
  setSelectedDate,
  addTimeSlot,
  removeTimeSlot,
  clearSelection,
} = courtBookingSlice.actions;

export default courtBookingSlice.reducer; 