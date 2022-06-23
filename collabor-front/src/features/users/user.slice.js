import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, HTTP_STATUS } from '../../constants';

const namespace = 'user';

const initialState = {
  status: null,
  data: null,
};

export const fetchUser = createAsyncThunk(
  `${namespace}/fetchUser`,
  async ({ id }) => {
    const { data } = await axios.get(`${API_URL}/users/${id}`);
    return data;
  },
);

export const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.status = HTTP_STATUS.PENDING;
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.status = HTTP_STATUS.FULFILLED;
      state.data = payload;
    },
    [fetchUser.rejected]: (state) => {
      state.status = HTTP_STATUS.REJECTED;
    },
  },
});

export default userSlice.reducer;
