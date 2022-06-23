import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, HTTP_STATUS } from '../../constants';

const namespace = 'register';

const initialState = {
  status: null,
  fields: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    githubPage: '',
  },
};

export const sendRegisterForm = createAsyncThunk(
  `${namespace}/sendRegisterForm`,
  async (arg, { getState }) => {
    // Get fields values
    const { register } = getState();
    const { fields } = register;
    const payload = { ...fields };

    // Remove optionnal fields that are empty
    if (payload.email === '') delete payload.email;
    if (payload.githubPage === '') delete payload.githubPage;

    // Post new user to API
    const { data } = await axios.post(`${API_URL}/users`, payload);
    return data;
  },
);

export const registerSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setUsername(state, action) {
      state.fields.username = action.payload;
    },
    setPassword(state, action) {
      state.fields.password = action.payload;
    },
    setConfirmPassword(state, action) {
      state.fields.confirmPassword = action.payload;
    },
    setEmail(state, action) {
      state.fields.email = action.payload;
    },
    setGithubPage(state, action) {
      state.fields.githubPage = action.payload;
    },
  },
  extraReducers: {
    [sendRegisterForm.pending]: (state) => {
      state.status = HTTP_STATUS.PENDING;
    },
    [sendRegisterForm.fulfilled]: (state) => {
      state.status = HTTP_STATUS.FULFILLED;
      state.fields = initialState.fields;
    },
    [sendRegisterForm.rejected]: (state) => {
      state.status = HTTP_STATUS.REJECTED;
    },
  },
});

export const {
  setUsername, setPassword, setConfirmPassword, setEmail, setGithubPage,
} = registerSlice.actions;
export default registerSlice.reducer;
