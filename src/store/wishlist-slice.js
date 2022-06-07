import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   totalAmount: localStorage.getItem('totalAmountWishlist'),
   wishlistItems: JSON.parse(localStorage.getItem('wishlistData')) || []
};

const wishlistSlice = createSlice({
   name: 'wishlist',
   initialState: initialState,
   reducers: {
      addItemToWishList(state, action) {
         if (!state.wishlistItems.includes(action.payload)) {
            state.totalAmount++;
            localStorage.setItem('totalAmountWishlist', state.totalAmount);
            state.wishlistItems.push(action.payload);
            localStorage.setItem('wishlistData', JSON.stringify(
               state.wishlistItems
            ));
         }
      },
      removeItemFromWishList(state, action) {
         state.totalAmount--;
         localStorage.setItem('totalAmountWishlist', state.totalAmount);
         state.wishlistItems = state.wishlistItems.filter(item => item !== action.payload);
         localStorage.setItem('wishlistData', JSON.stringify(
            state.wishlistItems
         ));
      }
   }
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;