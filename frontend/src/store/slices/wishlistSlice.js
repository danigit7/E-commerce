import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { toast } from 'react-toastify';

// Fetch wishlist
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/wishlist');
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch wishlist'
      );
    }
  }
);

// Add to wishlist
export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/wishlist/${productId}`);
      toast.success('Added to wishlist!');
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to add to wishlist';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/wishlist/${productId}`);
      toast.success('Removed from wishlist');
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to remove from wishlist';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      // Remove from wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload || [];
      });
  },
});

export const { clearError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
