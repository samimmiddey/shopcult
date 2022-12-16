import { createSlice } from "@reduxjs/toolkit";
const category = localStorage.getItem('category');
const brandWise = localStorage.getItem('brandWise');
const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

const initialState = {
   showMenu: false,
   showFilter: true,
   showModalFilter: false,
   sortProducts: '',
   categoryWise: category || 'All',
   brandWise: brandWise,
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
   searchLoading: false,
   searchedProducts: []
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
      setBrandWise(state, action) {
         state.brandWise = action.payload;
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
      setSearchLoading(state, action) {
         state.searchLoading = action.payload;
      },
      setSearchedProducts(state, action) {
         state.searchedProducts = action.payload;
      }
   }
});

export const uiActions = uiSlice.actions;
export default uiSlice;