import { createSlice } from '@reduxjs/toolkit';
import * as operations from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    location: null,
    fcmToken: null,
  },
  reducers: {
    login: (state, action) => {},
    register: (state, action) => {},
    getMe: (state, action) => {
      state.user = action.data;
    },
    logout: (state) => {
      state.user = null;
    },
    updateMe: (state) => {},
  },
  extraReducers: {
    [operations.login.pending]: (state) => {
      state.loading = true;
    },
    [operations.login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [operations.login.rejected]: (state) => {
      state.loading = false;
    },
    [operations.register.pending]: (state) => {
      state.loading = true;
    },
    [operations.register.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [operations.register.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { actions, reducer } = authSlice;
export default reducer;
