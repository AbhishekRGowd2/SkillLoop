import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export const fetchRequests = createAsyncThunk(
  'requests/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/requests');
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createRequest = createAsyncThunk(
    'requests/create',
    async (requestData, { rejectWithValue }) => {
      try {
        const response = await axios.post('/requests', requestData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const updateRequestStatus = createAsyncThunk(
    'requests/updateStatus',
    async ({ id, status }, { rejectWithValue }) => {
      try {
        const response = await axios.patch(`/requests/${id}/status`, { status });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: null
  },
  reducers: {
      clearRequestSuccess: (state) => {
          state.success = null;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
          state.success = "Request sent successfully!";
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
         const updatedRequest = action.payload.request;
         const index = state.items.findIndex(r => r._id === updatedRequest._id);
         if(index !== -1){
             state.items[index] = updatedRequest;
         }
      });
  },
});

export const { clearRequestSuccess } = requestSlice.actions;

export default requestSlice.reducer;
