import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import skillReducer from './slices/skillSlice';
import requestReducer from './slices/requestSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillReducer,
    requests: requestReducer,
  },
});

export default store;
