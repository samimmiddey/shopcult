import { projectFirestore, timestamp } from "../Firebase/config";
import { commerce } from "../lib/commerce";
import { authActions } from "./auth-slice";
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

// Add items to the cart
export const addToCart = (productID, quantity, card) => {
   return async (dispatch) => {
      const handleAddToCart = async () => {
         if (card === 'product-card') {
            dispatch(uiActions.setButtonProgress(true));
         } else if (card === 'category-product-card') {
            dispatch(uiActions.setCategoryButtonProgress(true));
         } else {
            dispatch(uiActions.setProductDetailsProgress(true));
         }

         const cart = await commerce.cart.add(productID, quantity);
         dispatch(cartActions.addItemsToCart(cart.cart));

         if (card === 'product-card') {
            dispatch(uiActions.setButtonProgress(false));
         } else if (card === 'category-product-card') {
            dispatch(uiActions.setCategoryButtonProgress(false));
         } else {
            dispatch(uiActions.setProductDetailsProgress(false));
         }

         dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Added!' }));
         dispatch(uiActions.setSnackbarToggle());
      }

      try {
         await handleAddToCart();
      } catch (error) {
         dispatch(uiActions.setButtonProgress(false));
         dispatch(uiActions.setCategoryButtonProgress(false));
         dispatch(uiActions.setProductDetailsProgress(false));
         dispatch(uiActions.setShowSnackbar({ value: true, text: error.data.error.message }));
      }
   }
}

// Remove items from the cart
export const removeItemFromCart = (productID) => {
   return async (dispatch) => {
      const handleRemoveFromCart = async () => {
         dispatch(uiActions.setCartProgress(true));
         const cart = await commerce.cart.remove(productID);
         dispatch(cartActions.addItemsToCart(cart.cart));
         dispatch(uiActions.setCartProgress(false));
         dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Removed!' }));
         dispatch(uiActions.setSnackbarToggle());
      }

      try {
         await handleRemoveFromCart();
      } catch (error) {
         dispatch(uiActions.setCartProgress(false));
         dispatch(uiActions.setShowSnackbar({ value: true, text: error.data.error.message }));
      }
   }
}

// Update cart items
export const updateCartItems = (productID, quantity) => {
   return async (dispatch) => {
      const handleUpdateCartItems = async () => {
         dispatch(uiActions.setCartProgress(true));
         const cart = await commerce.cart.update(productID, quantity);
         dispatch(cartActions.addItemsToCart(cart.cart));
         dispatch(uiActions.setCartProgress(false));
         dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Updated!' }));
         dispatch(uiActions.setSnackbarToggle());
      }

      try {
         await handleUpdateCartItems();
      } catch (error) {
         dispatch(uiActions.setCartProgress(false));
         dispatch(uiActions.setShowSnackbar({ value: true, text: error.data.error.message }));
      }
   }
}

// Empty the cart completely
export const emptyCart = () => {
   return async (dispatch) => {
      const handleEmptyCart = async () => {
         dispatch(uiActions.setCartProgress(true));
         const cart = await commerce.cart.empty();
         dispatch(cartActions.addItemsToCart(cart.cart));
         dispatch(uiActions.setCartProgress(false));
         dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Emptied!' }));
         dispatch(uiActions.setSnackbarToggle());
      }

      try {
         await handleEmptyCart();
      } catch (error) {
         dispatch(uiActions.setCartProgress(false));
         dispatch(uiActions.setShowSnackbar({ value: true, text: error.data.error.message }));
      }
   }
}

// Add orders to firestore
export const addOrder = (data, uid) => {
   return async (dispatch) => {
      const fetchAddOrder = async () => {
         const createdAt = timestamp.fromDate(new Date());
         const created = (createdAt.seconds * 1000);
         const ref = await projectFirestore.collection('users').doc(uid).get();

         if (!ref.data().order) {
            await projectFirestore.collection('users').doc(uid).update({
               order: [
                  {
                     createdAt: created,
                     data
                  }
               ]
            });
         } else {
            const existingOrders = ref.data().order;
            existingOrders.push({ createdAt: created, data });
            await projectFirestore.collection('users').doc(uid).update({
               order: [
                  ...existingOrders
               ]
            });
         }
      }

      try {
         await fetchAddOrder();
      } catch (error) {
         dispatch(authActions.setAuthError(JSON.stringify(error)));
         dispatch(authActions.setAuthErrorModal(true));
      }
   }
}