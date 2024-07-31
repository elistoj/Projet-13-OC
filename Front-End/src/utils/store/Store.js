import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../components/features/Auth/SliceAuth'
import { userSlice } from '../../components/features/User/Slice'

const state = {}

const store = configureStore({
    preloadedState: state,
    reducer: combineReducers({
        auth: authSlice.reducer,
        user: userSlice.reducer,
    }),
})

export default store
