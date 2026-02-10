import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export const fetchSkills = createAsyncThunk(
  'skills/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/skills');
      return response.data; // API returns array directly
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSkill = createAsyncThunk(
  'skills/create',
  async (skillData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/skills', skillData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const skillSlice = createSlice({
  name: 'skills',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default skillSlice.reducer;
