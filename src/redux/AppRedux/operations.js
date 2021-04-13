import { createAsyncThunk } from '@reduxjs/toolkit';
import { NavigationUtils } from '../../navigation';
import configI18n from '../../i18n';
import http from '../../api/http';
import { iconsLoaded } from '../../utils/AppIcons';

export const startUp = createAsyncThunk(
  'app/startUp',
  async (payload, { rejectWithValue, getState }) => {
    try {
      configI18n();
      await iconsLoaded;

      const isSkip = getState().app.isSkip;
      if (!isSkip) {
        NavigationUtils.startIntoContent();
        return;
      }

      const user = getState().auth.user;
      const accessToken = getState().auth.accessToken;
      http.setAuthorizationHeader(accessToken);
      if (user) {
        NavigationUtils.startMainContent();
      } else {
        NavigationUtils.startLoginContent();
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
