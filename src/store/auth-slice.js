import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userData: null,
   authProgress: false,
   isUserLoggedIn: false,
   userDataProgress: false,
   uploadPicProgress: false,
   updateProgress: false
};

const authSlice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {
      setUserData(state, action) {
         state.userData = action.payload;
      },
      setAuthProgress(state, action) {
         state.authProgress = action.payload;
      },
      setIsUserLoggedIn(state, action) {
         state.isUserLoggedIn = action.payload;
      },
      setUserDataProgress(state, action) {
         state.userDataProgress = action.payload;
      },
      setUploadPicProgress(state, action) {
         state.uploadPicProgress = action.payload;
      },
      setUpdateProgress(state, action) {
         state.updateProgress = action.payload;
      }
   }
});

export const authActions = authSlice.actions;
export default authSlice;