import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const loginUser = createAsyncThunk(
  "user/loginuser",
  async (credentials, thunkAPI) => {
    try {
      // const res = await fetch(`${import.meta.env.VITE_APP_URI}/users/login`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(credentials),
      // });
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URI}/users/login`,
        { credentials },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res) {
        const error = await res.json();
        return thunkAPI.rejectWithValue(error.message || "Login failed");
      }
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Network error");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/signupuser",
  async (credentials, thunkAPI) => {
    try {
      // const res = await fetch(`${import.meta.env.VITE_APP_URI}/auth/signup`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(credentials),
      // });
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URI}/auth/signup`,
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );
      if (!res) {
        const error = await res.json();
        return thunkAPI.rejectWithValue(error.message || "Login failed");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Network error");
    }
  }
);

export const fetchUser = createAsyncThunk(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URI}/users/current-user`
      );
      if (!res) {
        return thunkAPI.rejectWithValue(
          error.message || "Error while getting user"
        );
      }
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Fetching error");
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  registrationStatus: "idle", // "idle" | "loading" | "succeeded" | "failed"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authToken");
    },
    clearRegistrationStatus: (state) => {
      state.registrationStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationStatus = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationStatus = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registrationStatus = "failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logoutUser, clearRegistrationStatus } = userSlice.actions;
export default userSlice.reducer;
