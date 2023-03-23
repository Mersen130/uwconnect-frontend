import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import profileReducer from './profile/profileSlice';
import authReducer from './auth/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  //whitelist: ['auth'] // persist only the auth slice of the state
};

const rootReducer = combineReducers({
  user: profileReducer,
  auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
