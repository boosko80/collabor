import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, HTTP_STATUS } from '../../constants';

const namespace = 'ideaNew';

const initialState = {
  status: null,
  fields: {
    name: '',
    description: '',
  },
  errors: [],
  idea: 0,
};

export const sendIdeaNewForm = createAsyncThunk(
  `${namespace}/postIdeaNew`,
  async (arg, { getState, rejectWithValue }) => {
    const { ideaNew: { fields } } = getState();
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(`${API_URL}/ideas`, fields, config);
      return data;
    }
    catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const ideaNew = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setName: (state, action) => {
      state.fields.name = action.payload;
    },
    setDescription: (state, action) => {
      state.fields.description = action.payload;
    },
    resetForm: (state) => Object.assign(state, initialState),
  },
  extraReducers: {
    [sendIdeaNewForm.pending]: (state) => {
      state.status = HTTP_STATUS.PENDING;
    },
    [sendIdeaNewForm.fulfilled]: (state, { payload }) => {
      state.status = HTTP_STATUS.FULFILLED;
      state.idea = payload.id;
    },
    [sendIdeaNewForm.rejected]: (state, error) => {
      state.status = HTTP_STATUS.REJECTED;
      state.errors = [...error.payload.message];
    },
  },
});

export const { setName, setDescription, resetForm } = ideaNew.actions;
export default ideaNew.reducer;
