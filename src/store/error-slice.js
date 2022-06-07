import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   error: '',
   checkoutError: ''
}

const errorSlice = createSlice({
   name: 'error',
   initialState: initialState,
   reducers: {
      setError(state, action) {
         state.error = action.payload;
      },
      setCheckoutError(state, action) {
         state.checkoutError = action.payload;
      }
   }
});

export const errorActions = errorSlice.actions;
export default errorSlice;