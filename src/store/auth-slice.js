import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userData: null,
   authProgress: false,
   authError: '',
   authErrorModal: false,
   isUserLoggedIn: false,
   userDataProgress: false,
};

const authSlice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {
      setUserData(state, action) {
         state.userData = action.payload;
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
      setUserDataProgress(state, action) {
         state.userDataProgress = action.payload;
      }
   }
});

export const authActions = authSlice.actions;
export default authSlice;