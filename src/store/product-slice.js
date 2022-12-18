import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   products: [],
   categories: [],
   productProgress: false,
   categoryProgress: false,
   brandedProducts: [],
   progress: true,
   singleProduct: null,
   searchLoading: true,
   searchedProducts: [],
   brandedProductsURL: null,
   productURL: null,
   searchKey: null
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
      },
      setBrandedProducts(state, action) {
         state.brandedProducts = action.payload;
      },
      setProgress(state, action) {
         state.progress = action.payload;
      },
      setSingleProduct(state, action) {
         state.singleProduct = action.payload;
      },
      setSearchLoading(state, action) {
         state.searchLoading = action.payload;
      },
      setSearchedProducts(state, action) {
         state.searchedProducts = action.payload;
      },
      setBrandedProductsURL(state, action) {
         state.brandedProductsURL = action.payload;
      },
      setProductURL(state, action) {
         state.productURL = action.payload;
      },
      setSearchKey(state, action) {
         state.searchKey = action.payload;
      }
   }
});

export const productActions = productSlice.actions;
export default productSlice;