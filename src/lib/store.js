import { configureStore, current } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatReducer from './chatSlice';
const store = configureStore({
    reducer: {
        authReducers: authReducer,
        chatReducers: chatReducer,
    },

});

export default store;
