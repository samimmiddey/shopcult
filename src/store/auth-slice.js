import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   authUser: null,
   isLoggedIn: false,
   authProgress: false,
   authError: '',
   authErrorModal: false,
   isUserLoggedIn: false,
   userData: null
}

const authSlice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {
      setAuthUser(state, action) {
         state.authUser = action.payload;
      },
      setIsLoggedIn(state, action) {
         state.isLoggedIn = action.payload;
      },
      setAuthProgress(state, action) {
         state.authProgress = action.payload;
      },
      setAuthError(state, action) {
         state.authError = action.payload;
      },
      setAuthErrorModal(state, action) {
         state.authErrorModal = action.payload;
      },
      setIsUserLoggedIn(state, action) {
         state.isUserLoggedIn = action.payload;
      },
      setUserData(state, action) {
         state.userData = action.payload;
      }
   }
});

export const authActions = authSlice.actions;
export default authSlice;