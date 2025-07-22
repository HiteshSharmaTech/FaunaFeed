import { configureStore } from "@reduxjs/toolkit";
import animalReducer from "./animal/animalSlice";
import userReducer from "./user/userSlice"

export const store = configureStore({
    reducer: {
        animals:animalReducer,
        user:userReducer
    }
})
