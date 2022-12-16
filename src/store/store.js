import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import productSlice from "./product-slice";
import wishlistSlice from "./wishlist-slice";
import cartSlice from "./cart-slice";
import checkoutSlice from "./checkout-slice";
import errorSlice from "./error-slice";
import authSlice from "./auth-slice";

const store = configureStore({
   reducer: {
      ui: uiSlice.reducer,
      products: productSlice.reducer,
      wishlist: wishlistSlice.reducer,
      cart: cartSlice.reducer,
      checkout: checkoutSlice.reducer,
      error: errorSlice.reducer,
      auth: authSlice.reducer
   }
});

export default store;