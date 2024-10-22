import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  user: UserType | null;
}
export type UserType = {
  id: string;
  credits: number;
  // name: string;
  // image: string;
  email: string ;
  firstName: string ;
  lastName: string;
};
const initialState: UserState = {
  isLoggedIn: false,
  user:null
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<UserType>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logOut: (state) => {
     state.isLoggedIn = false;
     state.user = null;
    },
    updateCredit : (state, action: PayloadAction<number>)=>{
      if(state.user && action.payload >= 0){
        state.user.credits = action.payload;
      }
    }
  }
})

export const { logIn, logOut, updateCredit } = userSlice.actions;
export default userSlice.reducer;



