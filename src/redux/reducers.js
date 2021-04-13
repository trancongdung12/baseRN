import { combineReducers } from '@reduxjs/toolkit';
import { reducer as appReducer } from './AppRedux';
import authReducer from './AuthRedux';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export default rootReducer;
