import { createAsyncThunk } from '@reduxjs/toolkit';
import * as AuthApis from '../../api/auth';

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthApis.login(data);
    return response?.data;
  } catch (err) {
    if (!err.data) {
      throw err;
    }
    console.log('====================================');
    console.log('asgdh', err.data);
    console.log('====================================');
    return rejectWithValue(err.data);
  }
});

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthApis.register(data);
    console.log('====================================');
    console.log('response', response);
    console.log('====================================');
    return response?.data;
  } catch (err) {
    if (!err.data) {
      throw err;
    }

    return rejectWithValue(err.data);
  }
});

// export const getMe = createAsyncThunk('auth/me', async (data, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`${config.API_URL}/users/me`, data);
//     return response?.data;
//   } catch (err) {
//     // notification.error({ message: err.response.data.message });
//     return rejectWithValue(err.response.data);
//   }
// });

// export const updateMe = createAsyncThunk('auth/me', async (data, { rejectWithValue }) => {
//   try {
//     const response = await axios.put(`${config.API_URL}/users/me`, data);
//     NavigationUtils.showNotification({
//       content: i18nTranslator('MESSAGE_UPDATE_PROFILE_SCC'),
//       type: 'success',
//     });
//     return response?.data;
//   } catch (err) {
//     NavigationUtils.showNotification({
//       content: i18nTranslator('MESSAGE_UPDATE_PROFILE_FAIL'),
//       type: 'error',
//     });
//     return rejectWithValue(err.response.data);
//   }
// });

// export const forgotPassword = createAsyncThunk(
//   'auth/forgotPassword',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${config.API_URL}/auth/forgotPassword`, data);
//       return response?.data;
//     } catch (err) {
//       // notification.error({ message: err.response.data.message });
//       NavigationUtils.showNotification({ content: err?.response?.data?.message, type: 'error' });
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${config.API_URL}/auth/resetPassword`, data);
//       return response?.data;
//     } catch (err) {
//       // notification.error({ message: err.response.data.message });
//       NavigationUtils.showNotification({ content: err?.response?.data?.message, type: 'error' });
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

// export const changeUserPassword = createAsyncThunk(
//   'auth/changePassword',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${config.API_URL}/auth/changePassword`, data);
//       return response?.data;
//     } catch (err) {
//       // notification.error({ message: err.response.data.message });
//       return rejectWithValue(err.response.data);
//     }
//   },
// );

// export const updateDeviceToken = createAsyncThunk(
//   'auth/updateDeviceToken',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${config.API_URL_V2}/deviceTokens`, data);
//       return response?.data;
//     } catch (err) {
//       // notification.error({ message: err.response.data.message });
//       return rejectWithValue(err.response.data);
//     }
//   },
// );
