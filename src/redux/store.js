import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import {dataSlice} from './reducer';

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
  middleware: [thunkMiddleware],
});

export default store;