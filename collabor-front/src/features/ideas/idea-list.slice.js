import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, HTTP_STATUS } from '../../constants';

const namespace = 'ideaList';

const initialState = {
  status: null,
  data: null,
};

export const fetchIdeasData = createAsyncThunk(
  `${namespace}/fetchIdeasData`,
  async () => {
    const { data } = await axios.get(`${API_URL}/ideas`);
    return data;
  },
);

export const festchLastIdeasData = createAsyncThunk(
  `${namespace}/fetchLastIdeasData`,
  async () => {
    const { data } = await axios.get(`${API_URL}/`);
    return data;
  },
);

export const ideaListSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchIdeasData.pending]: (state) => {
      state.status = HTTP_STATUS.PENDING;
    },
    [fetchIdeasData.fulfilled]: (state, { payload }) => {
      state.status = HTTP_STATUS.FULFILLED;
      state.data = payload;
    },
    [fetchIdeasData.rejected]: (state) => {
      state.status = HTTP_STATUS.REJECTED;
    },
    [festchLastIdeasData.pending]: (state) => {
      state.status = HTTP_STATUS.PENDING;
    },
    [festchLastIdeasData.fulfilled]: (state, { payload }) => {
      state.status = HTTP_STATUS.FULFILLED;
      state.data = payload;
    },
    [festchLastIdeasData.rejected]: (state) => {
      state.status = HTTP_STATUS.REJECTED;
    },
  },
});

export default ideaListSlice.reducer;
