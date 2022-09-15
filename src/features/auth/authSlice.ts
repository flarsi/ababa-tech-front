import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logIn, Me, SignUp } from './authAPI';
import { logInPayload, signUpPayload } from './types';


export interface AuthState {
  user: {
    email: string, name: string
  } | null
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
};

export const logInAsync = createAsyncThunk(
  'auth/logIn',
  async (payload: logInPayload) => {
    return await logIn(payload);
  }
);

export const SignUpAsync = createAsyncThunk(
  'auth/signUp',
  async (payload: signUpPayload) => {
    return await SignUp(payload);
  }
);

export const MeAsync = createAsyncThunk(
  'auth/me',
  async (payload, thunkApi) => {
    return await Me();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state.user = null;
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logInAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(logInAsync.rejected, (state) => {
        state.status = 'failed';
      });

    builder
      .addCase(SignUpAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SignUpAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(SignUpAsync.rejected, (state) => {
        state.status = 'failed';
      });

    builder
      .addCase(MeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(MeAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        state.user = action.payload;
        
      })
      .addCase(MeAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
