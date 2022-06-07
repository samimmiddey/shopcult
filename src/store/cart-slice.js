import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cart: {},
   totalAmount: 0,
   totalPrice: 0,
   cartItems: [],
   progressBar: true
};

const cartSlice = createSlice({
   name: 'cart',
   initialState: initialState,
   reducers: {
      addItemsToCart(state, action) {
         state.cart = action.payload;
         state.totalAmount = action.payload.total_items;
         state.totalPrice = action.payload.subtotal.formatted_with_symbol;
         state.cartItems = action.payload.line_items;
      },
      setProgressBar(state, action) {
         state.progressBar = action.payload;
      }
   }
});

export const cartActions = cartSlice.actions;
export default cartSlice;