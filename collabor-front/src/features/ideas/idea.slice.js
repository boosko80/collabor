import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, HTTP_STATUS } from '../../constants';

const namespace = 'idea';

const initialState = {
  status: null,
  data: null,
};

export const fetchIdea = createAsyncThunk(
  `${namespace}/fetchIdea`,
  async ({ id }) => {
    const { data } = await axios.get(`${API_URL}/ideas/${id}`);
    return data;
  },
);

export const ideaSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchIdea.pending]: (state) => {
      state.status = HTTP_STATUS.PENDING;
    },
    [fetchIdea.fulfilled]: (state, { payload }) => {
      state.status = HTTP_STATUS.FULFILLED;
      state.data = payload;
    },
    [fetchIdea.rejected]: (state) => {
      state.status = HTTP_STATUS.REJECTED;
    },
  },
});

export default ideaSlice.reducer;
