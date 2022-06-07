import { createSlice } from "@reduxjs/toolkit";
const category = localStorage.getItem('category');
const brandWise = localStorage.getItem('brandWise');
const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
const searchedProducts = JSON.parse(localStorage.getItem('searchedProducts'));

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
   navbarProgress: true,
   buttonProgress: false,
   currentProduct: '',
   activeSearchBar: false,
   searchedProducts: searchedProducts || []
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
      setNavbarProgress(state, action) {
         state.navbarProgress = action.payload;
      },
      setButtonProgress(state, action) {
         state.buttonProgress = action.payload;
      },
      setCurrentProduct(state, action) {
         state.currentProduct = action.payload;
      },
      setActiveSearchBar(state, action) {
         state.activeSearchBar = action.payload;
      },
      setSearchedProducts(state, action) {
         state.searchedProducts = action.payload;
      }
   }
});

export const uiActions = uiSlice.actions;
export default uiSlice;