import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice'; // 예시 import
import signupReducer from './slices/signupSlice';
import signupAddressReducer from './slices/signupAddressSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer, // 예시
    signup: signupReducer,
    signupAddress: signupAddressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
