import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { toast } from 'react-toastify';

// Fetch products
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      // Add artificial delay to show skeleton loading (remove in production)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { data } = await api.get(`/products?${queryString}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products'
      );
    }
  }
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (idOrSlug, { rejectWithValue }) => {
    try {
      // Add artificial delay to show skeleton loading (remove in production)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { data } = await api.get(`/products/${idOrSlug}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch product'
      );
    }
  }
);

// Fetch categories
export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/products/categories/all');
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch categories'
      );
    }
  }
);

// Add review
export const addReview = createAsyncThunk(
  'product/addReview',
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/reviews/${productId}`, reviewData);
      toast.success('Review added successfully!');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add review';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  products: [],
  currentProduct: null,
  categories: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalProducts: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // Add review
      .addCase(addReview.fulfilled, (state) => {
        // Review added successfully
      });
  },
});

export const { clearCurrentProduct, clearError } = productSlice.actions;
export default productSlice.reducer;
