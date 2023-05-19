import {configureStore} from '@reduxjs/toolkit'
import imageReducer from "./imageSlice.ts";
import authReducer from "./authSlice.ts";
import profileReducer from "./profileSlice.ts";

export const store = configureStore({
    reducer: {
        image: imageReducer,
        auth: authReducer,
        profile: profileReducer
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch