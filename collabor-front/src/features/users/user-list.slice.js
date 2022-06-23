import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, HTTP_STATUS } from '../../constants';

const namespace = 'userList';

const initialState = {
  status: null,
  data: null,
};

export const fetchUsersData = createAsyncThunk(
  `${namespace}/fetchUsersData`,
  async () => {
    const { data } = await axios.get(`${API_URL}/users`);
    return data;
  },
);

export const userListSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsersData.pending]: (state) => {
      state.status = HTTP_STATUS.PENDING;
    },
    [fetchUsersData.fulfilled]: (state, { payload }) => {
      state.status = HTTP_STATUS.FULFILLED;
      state.data = payload;
    },
    [fetchUsersData.rejected]: (state) => {
      state.status = HTTP_STATUS.REJECTED;
    },
  },
});

export default userListSlice.reducer;
