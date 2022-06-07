import { productActions } from "./products-slice";
import { cartActions } from "./cart-slice";
import { commerce } from '../lib/commerce';
import { uiActions } from "./ui-slice";
import { checkoutActions } from "./checkout-slice";
import { errorActions } from "./error-slice";

// Fetching all products
export const fetchProducts = () => {
   return async (dispatch) => {
      const fetchData = async () => {
         dispatch(uiActions.setProgressBar(true));
         const { data } = await commerce.products.list({ limit: 50 });
         dispatch(productActions.setProducts(data));
         dispatch(uiActions.setProgressBar(false));
         dispatch(uiActions.setNavbarProgress(false));
      }

      try {
         await fetchData();
      } catch (error) {
         dispatch(uiActions.setProgressBar(false));
         dispatch(uiActions.setNavbarProgress(false));
         dispatch(errorActions.setError((error.data.error.message)));
      }
   }
}

// Fetching all categories
export const fetchCategories = () => {
   return async (dispatch) => {
      const fetchCategories = async () => {
         dispatch(uiActions.setProgressBar(true));
         const { data } = await commerce.categories.list();
         dispatch(productActions.setCategories(data));
         dispatch(uiActions.setProgressBar(false));
         dispatch(uiActions.setNavbarProgress(false));
      }

      try {
         await fetchCategories();
      } catch (error) {
         dispatch(uiActions.setProgressBar(false));
         dispatch(uiActions.setNavbarProgress(false));
         dispatch(errorActions.setError((error.data.error.message)));
      }
   }
}

// Fetching the cart data
export const fetchCart = () => {
   return async (dispatch) => {
      const fetchCartData = async () => {
         dispatch(cartActions.setProgressBar(true));
         const cart = await commerce.cart.retrieve();
         dispatch(cartActions.addItemsToCart(cart));
         dispatch(cartActions.setProgressBar(false));
         dispatch(uiActions.setNavbarProgress(false));
      }

      try {
         await fetchCartData();
      } catch (error) {
         dispatch(uiActions.setProgressBar(false));
         dispatch(uiActions.setNavbarProgress(false));
         dispatch(errorActions.setError((error.data.error.message)));
      }
   }
}

// Generate Checkout Token
export const fetchGenerateToken = (cartID, type) => {
   return async (dispatch) => {
      const fetchToken = async () => {
         dispatch(checkoutActions.setCheckoutProgress(true));
         const token = await commerce.checkout.generateToken(cartID, type);
         dispatch(checkoutActions.setCheckoutToken(token));
      }

      try {
         await fetchToken();
      } catch (error) {
         dispatch(checkoutActions.setCheckoutProgress(false));
         dispatch(errorActions.setCheckoutError(error.data.error.message));
      }
   }
}

// Fetch Countries
export const fetchCountries = (checkoutTokenID) => {
   return async (dispatch) => {
      const fetchShippingCountries = async () => {
         const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenID);
         const shippingCountries = Object.entries(countries).map(([code, name]) => ({ id: code, label: name }));
         dispatch(checkoutActions.setShippingCountries(shippingCountries));
         dispatch(checkoutActions.setShippingCountry(shippingCountries[0].id));
      }

      try {
         await fetchShippingCountries();
      } catch (error) {
         dispatch(checkoutActions.setCheckoutProgress(false));
         dispatch(errorActions.setCheckoutError(error.data.error.message));
      }
   }
}

// Fetch Subdivisions
export const fetchSubdivisions = (countryCode) => {
   return async (dispatch) => {
      const fetchShippingSubdivisions = async () => {
         dispatch(checkoutActions.setCheckoutSubdivisionProgress(true));
         const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
         const shippingSubdivisions = Object.entries(subdivisions).map(([code, name]) => ({ id: code, label: name }));
         dispatch(checkoutActions.setShippingSubdivisions(shippingSubdivisions));
         dispatch(checkoutActions.setShippingSubdivision(shippingSubdivisions[0].id));
         dispatch(checkoutActions.setCheckoutSubdivisionProgress(false));
      }

      try {
         fetchShippingSubdivisions();
      } catch (error) {
         dispatch(checkoutActions.setCheckoutProgress(false));
         dispatch(checkoutActions.setCheckoutSubdivisionProgress(false));
         dispatch(errorActions.setCheckoutError(error.data.error.message));
      }
   }
}

// Fetch Shipping Options
export const fetchOptions = (checkoutTokenID, country, region = null) => {
   return async (dispatch) => {
      const fetchShippingOptions = async () => {
         dispatch(checkoutActions.setCheckoutOptionProgress(true));
         const options = await commerce.checkout.getShippingOptions(checkoutTokenID, { country, region });
         dispatch(checkoutActions.setShippingOptions(options));
         dispatch(checkoutActions.setShippingOption(options[0].id));
         dispatch(checkoutActions.setCheckoutOptionProgress(false));
         dispatch(checkoutActions.setCheckoutProgress(false));
      }

      try {
         await fetchShippingOptions();
      } catch (error) {
         dispatch(checkoutActions.setCheckoutProgress(false));
         dispatch(checkoutActions.setCheckoutOptionProgress(false));
         dispatch(errorActions.setCheckoutError(error.data.error.message));
      }
   }
}

// Discount Check
export const applyDiscount = (totkenID, code) => {
   return async (dispatch) => {
      const fetchApplyDiscount = async () => {
         dispatch(checkoutActions.setDiscountProgress(true));
         const discount = await commerce.checkout.checkDiscount(totkenID, code);
         dispatch(checkoutActions.setCheckoutToken(discount));
         dispatch(checkoutActions.setDiscountProgress(false));
         dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Applied!' }));
      }

      try {
         await fetchApplyDiscount();
      } catch (error) {
         dispatch(checkoutActions.setDiscountProgress(false));
         dispatch(errorActions.setCheckoutError(error.data.error.message));
      }
   }
}