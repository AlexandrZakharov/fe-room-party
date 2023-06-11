import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { User } from "@/types/user.interface";
import { AuthResponse } from "@/services/api/auth/auth.interface";

interface UserState {
  data: User | null;
}

const initialState: UserState = {
  data: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    clearUserData: (state) => {
      state.data = null;
    }
  }
});

export const { setUserData, clearUserData } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data;

export default userSlice.reducer;