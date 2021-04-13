import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: null,
  isSkip: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setLanguage: (state, { payload }) => {
      state.language = payload;
    },
    markSkipIntro: (state, { payload }) => {
      state.isSkip = payload;
    },
  },
  extraReducers: {},
});

export const { reducer, actions } = appSlice;
export default reducer;
