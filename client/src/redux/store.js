import {configureStore} from "@reduxjs/toolkit";
import userReducer  from "./user/userSlice";

// CONFIGURED REDUX STORE
export const store = configureStore({
    reducer:{
        user: userReducer //
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});