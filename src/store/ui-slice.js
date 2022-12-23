import { createSlice } from "@reduxjs/toolkit";
const category = localStorage.getItem('category');
const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

const initialState = {
   showMenu: false,
   showFilter: true,
   showModalFilter: false,
   sortProducts: '',
   categoryWise: category || 'All',
   categoryClick: false,
   selectedItems: selectedItems || [],
   showSnackbar: false,
   snackbarText: '',
   snackbarToggle: false,
   progressBar: true,
   buttonProgress: false,
   categoryButtonProgress: false,
   productDetailsProgress: false,
   cartProgress: false,
   currentProduct: '',
   inputFocus: false,
   activeSearch: false,
   errorModal: false,
   errorModalText: '',
   error: false,
   errorText: '',
   checkoutError: false,
   checkoutErrorText: '',
   discountError: false,
   discountErrorText: '',
   searchError: false,
   searchErrorText: '',
   brandedProductsError: false,
   brandedProductsErrorText: '',
   productDetailsError: false,
   productDetailsErrorText: ''
};

const uiSlice = createSlice({
   name: 'menu',
   initialState: initialState,
   reducers: {
      toggleMenu(state) {
         state.showMenu = !state.showMenu;
      },
      toggleFilter(state) {
         state.showFilter = !state.showFilter;
      },
      toggleModalFilter(state) {
         state.showModalFilter = !state.showModalFilter;
      },
      setSortProducts(state, action) {
         state.sortProducts = action.payload;
      },
      setCategoryWise(state, action) {
         state.categoryWise = action.payload;
         state.categoryClick = true;
      },
      setSelectedItems(state, action) {
         if (action.payload.type === true) {
            state.selectedItems = state.selectedItems.concat(action.payload.name);
         } else {
            state.selectedItems = state.selectedItems.filter(item => item !== action.payload.name);
         }
      },
      resetSelectedItems(state) {
         state.selectedItems = [];
      },
      setShowSnackbar(state, action) {
         state.showSnackbar = action.payload.value;
         state.snackbarText = action.payload.text;
      },
      setSnackbarToggle(state) {
         state.snackbarToggle = !state.snackbarToggle;
      },
      setProgressBar(state, action) {
         state.progressBar = action.payload;
      },
      setButtonProgress(state, action) {
         state.buttonProgress = action.payload;
      },
      setCategoryButtonProgress(state, action) {
         state.categoryButtonProgress = action.payload;
      },
      setProductDetailsProgress(state, action) {
         state.productDetailsProgress = action.payload;
      },
      setCartProgress(state, action) {
         state.cartProgress = action.payload;
      },
      setCurrentProduct(state, action) {
         state.currentProduct = action.payload;
      },
      setInputFocus(state, action) {
         state.inputFocus = action.payload;
      },
      setActiveSearch(state, action) {
         state.activeSearch = action.payload;
      },
      setErrorModal(state, action) {
         state.errorModal = action.payload;
      },
      setErrorModalText(state, action) {
         state.errorModalText = action.payload;
      },
      setError(state, action) {
         state.error = action.payload;
      },
      setErrorText(state, action) {
         state.errorText = action.payload;
      },
      setCheckoutError(state, action) {
         state.checkoutError = action.payload;
      },
      setCheckoutErrorText(state, action) {
         state.checkoutErrorText = action.payload;
      },
      setDiscountError(state, action) {
         state.discountError = action.payload;
      },
      setDiscountErrorText(state, action) {
         state.discountErrorText = action.payload;
      },
      setSearchError(state, action) {
         state.searchError = action.payload;
      },
      setSearchErrorText(state, action) {
         state.searchErrorText = action.payload;
      },
      setBrandedProductsError(state, action) {
         state.brandedProductsError = action.payload;
      },
      setBrandedProductsErrorText(state, action) {
         state.brandedProductsErrorText = action.payload;
      },
      setProductDetailsError(state, action) {
         state.productDetailsError = action.payload;
      },
      setProductDetailsErrorText(state, action) {
         state.productDetailsErrorText = action.payload;
      }
   }
});

export const uiActions = uiSlice.actions;
export default uiSlice;