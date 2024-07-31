// authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    credentials: '',
    token: '',
    connected: false,
    status: 'idle',
    error: null,
};

const BASE_URL = 'http://localhost:3001/api/v1/user/login';

export const getUserToken = createAsyncThunk(
    'auth/getUserToken',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(BASE_URL, credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeUserCredentials(state, action) {
            state.credentials = action.payload;
        },
        logout(state) {
            state.credentials = '';
            state.token = '';
            state.connected = false;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserToken.pending, (state) => {
                state.status = 'loading';
                state.connected = false;
            })
            .addCase(getUserToken.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.body.token;
                state.connected = true;
            })
            .addCase(getUserToken.rejected, (state, action) => {
                state.status = 'failed';
                state.connected = false;
                state.error = action.payload || 'An error occurred';
            });
    },
});

// Selectors
export const getAuthStatus = (state) => state.auth.status;
export const getAuthConnected = (state) => state.auth.connected;
export const getAuthError = (state) => state.auth.error;
export const getAuthToken = (state) => state.auth.token;

// Actions
export const { changeUserCredentials, logout } = authSlice.actions;

// Reducer
export default authSlice.reducer;
