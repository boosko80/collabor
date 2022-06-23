import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, HTTP_STATUS } from '../../constants';

const namespace = 'ideaDelete';

const initialState = {
  status: null,
};

export const sendDeleteIdea = createAsyncThunk(
  `${namespace}/deleteIdea`,
  async ({ id }) => {
    const token = localStorage.getItem('JWT_TOKEN');
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.delete(`${API_URL}/ideas/${id}`, config);
    return data;
  },
);

export const ideaDelete = createSlice({
  name: namespace,
  initialState,
  reducers: {
    reset: (state) => Object.assign(state, initialState),
  },
  extraReducers: {
    [sendDeleteIdea.pending]: (state) => {
      state.status = HTTP_STATUS.PENDING;
    },
    [sendDeleteIdea.fulfilled]: (state) => {
      state.status = HTTP_STATUS.FULFILLED;
    },
    [sendDeleteIdea.rejected]: (state) => {
      state.status = HTTP_STATUS.REJECTED;
    },
  },
});

export const { reset } = ideaDelete.actions;
export default ideaDelete.reducer;
