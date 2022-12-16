import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   products: [],
   categories: [],
   productProgress: false,
   categoryProgress: false
};

const productSlice = createSlice({
   name: 'products',
   initialState: initialState,
   reducers: {
      setProducts(state, action) {
         state.products = action.payload;
      },
      setCategories(state, action) {
         state.categories = action.payload;
      },
      setProductProgress(state, action) {
         state.productProgress = action.payload;
      },
      setCategoryProgress(state, action) {
         state.categoryProgress = action.payload;
      }
   }
});

export const productActions = productSlice.actions;
export default productSlice;