import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { toast } from 'react-toastify';

// Create order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/orders', orderData);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Fetch user orders
export const fetchMyOrders = createAsyncThunk(
  'order/fetchMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/orders/my-orders');
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

// Fetch order by ID
export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/orders/${orderId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order'
      );
    }
  }
);

// Create Stripe checkout session
export const createCheckoutSession = createAsyncThunk(
  'order/createCheckoutSession',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/stripe/create-checkout-session', {
        orderId,
      });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to create checkout session';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  checkoutLoading: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create checkout session
      .addCase(createCheckoutSession.pending, (state) => {
        state.checkoutLoading = true;
      })
      .addCase(createCheckoutSession.fulfilled, (state) => {
        state.checkoutLoading = false;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.checkoutLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder, clearError } = orderSlice.actions;
export default orderSlice.reducer;
