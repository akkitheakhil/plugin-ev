import { configureStore } from "@reduxjs/toolkit";
import plugInSlice from "./slices/PlugInSlice";

export const store = configureStore({

    reducer: {
        nav: plugInSlice
    }
})