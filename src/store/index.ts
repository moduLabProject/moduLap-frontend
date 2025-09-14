import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice'; // 예시 import

export const store = configureStore({
  reducer: {
    counter: counterReducer, // 예시
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
