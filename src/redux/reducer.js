import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setData, setLoading, setError } = dataSlice.actions;

export const fetchData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    dispatch(setData(response.data));
  } catch (error) {
    dispatch(setError(error));
  }
  dispatch(setLoading(false));
};

export default dataSlice.reducer;