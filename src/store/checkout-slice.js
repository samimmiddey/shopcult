import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   shippingCountries: [],
   shippingCountry: '',
   shippingSubdivisions: [],
   shippingSubdivision: '',
   shippingOptions: [],
   shippingOption: '',
   checkoutToken: '',
   checkoutProgress: true,
   checkoutCountryProgress: true,
   checkoutSubdivisionProgress: true,
   checkoutOptionProgress: true,
   incomingOrder: {},
   orderError: '',
   discountProgress: false
}

const checkoutSlice = createSlice({
   name: 'checkout',
   initialState: initialState,
   reducers: {
      setShippingCountries(state, action) {
         state.shippingCountries = action.payload;
      },
      setShippingCountry(state, action) {
         state.shippingCountry = action.payload;
      },
      setShippingSubdivisions(state, action) {
         state.shippingSubdivisions = action.payload;
      },
      setShippingSubdivision(state, action) {
         state.shippingSubdivision = action.payload;
      },
      setShippingOptions(state, action) {
         state.shippingOptions = action.payload;
      },
      setShippingOption(state, action) {
         state.shippingOption = action.payload;
      },
      setCheckoutToken(state, action) {
         state.checkoutToken = action.payload;
      },
      setCheckoutProgress(state, action) {
         state.checkoutProgress = action.payload;
      },
      setCheckoutCountryProgress(state, action) {
         state.checkoutCountryProgress = action.payload;
      },
      setCheckoutSubdivisionProgress(state, action) {
         state.checkoutSubdivisionProgress = action.payload;
      },
      setCheckoutOptionProgress(state, action) {
         state.checkoutOptionProgress = action.payload;
      },
      setIncomingOrder(state, action) {
         state.incomingOrder = action.payload;
      },
      setOrderError(state, action) {
         state.orderError = action.payload;
      },
      setDiscountProgress(state, action) {
         state.discountProgress = action.payload;
      }
   }
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice;