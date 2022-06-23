import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, HTTP_STATUS } from '../../constants';

const namespace = 'login';

const initialState = {
  status: null,
  connected: localStorage.getItem('JWT_TOKEN'),
  id: localStorage.getItem('ID'),
  fields: {
    username: '',
    password: '',
  },
};

export const sendLoginForm = createAsyncThunk(
  `${namespace}/sendLoginForm`,
  async (arg, { getState }) => {
    const { login: { fields } } = getState();
    const { data } = await axios.post(`${API_URL}/login`, fields);
    return data;
  },
);

export const loginSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setUsername(state, action) {
      state.fields.username = action.payload;
    },
    setPassword(state, action) {
      state.fields.password = action.payload;
    },
    logout(state) {
      localStorage.removeItem('JWT_TOKEN');
      localStorage.removeItem('ID');
      state.connected = false;
      state.id = null;
      state.status = null;
      state.fields.password = '';
    },
  },
  extraReducers: {
    [sendLoginForm.pending]: (state) => {
      state.status = HTTP_STATUS.PENDING;
    },
    [sendLoginForm.fulfilled]: (state, { payload }) => {
      state.status = HTTP_STATUS.FULFILLED;
      localStorage.setItem('JWT_TOKEN', `Bearer ${payload.access_token}`);
      state.connected = `Bearer ${payload.access_token}`;
      localStorage.setItem('ID', payload.id);
      state.id = payload.id;
    },
    [sendLoginForm.rejected]: (state) => {
      state.status = HTTP_STATUS.REJECTED;
    },
  },
});

export const { setUsername, setPassword, logout } = loginSlice.actions;
export default loginSlice.reducer;
