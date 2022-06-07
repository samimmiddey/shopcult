import { projectFirestore, timestamp } from "../Firebase/config";
import { commerce } from "../lib/commerce";
import { authActions } from "./auth-slice";
import { cartActions } from "./cart-slice";
import { checkoutActions } from "./checkout-slice";
import { uiActions } from "./ui-slice";

// Add items to the cart
export const addToCart = (productID, quantity) => {
   return async (dispatch) => {
      const handleAddToCart = async () => {
         dispatch(uiActions.setButtonProgress(true));
         const cart = await commerce.cart.add(productID, quantity);
         dispatch(cartActions.addItemsToCart(cart.cart));
         dispatch(uiActions.setButtonProgress(false));
         dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Added!' }));
         dispatch(uiActions.setSnackbarToggle());
      }

      try {
         await handleAddToCart();
      } catch (error) {
         dispatch(uiActions.setButtonProgress(false));
         dispatch(uiActions.setShowSnackbar({ value: true, text: error.data.error.message }));
      }
   }
}

// Remove items from the cart
export const removeItemFromCart = (productID) => {
   return async (dispatch) => {
      const handleRemoveFromCart = async () => {
         const cart = await commerce.cart.remove(productID);
         dispatch(cartActions.addItemsToCart(cart.cart));
         dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Removed!' }));
         dispatch(uiActions.setSnackbarToggle());
      }

      try {
         await handleRemoveFromCart();
      } catch (error) {
         dispatch(uiActions.setShowSnackbar({ value: true, text: error.data.error.message }));
      }
   }
}

// Update cart items
export const updateCartItems = (productID, quantity) => {
   return async (dispatch) => {
      const handleUpdateCartItems = async () => {
         const cart = await commerce.cart.update(productID, quantity);
         dispatch(cartActions.addItemsToCart(cart.cart));
         dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Updated!' }));
         dispatch(uiActions.setSnackbarToggle());
      }

      try {
         await handleUpdateCartItems();
      } catch (error) {
         dispatch(uiActions.setShowSnackbar({ value: true, text: error.data.error.message }));
      }
   }
}

// Empty the cart completely
export const emptyCart = () => {
   return async (dispatch) => {
      const handleEmptyCart = async () => {
         const cart = await commerce.cart.empty();
         dispatch(cartActions.addItemsToCart(cart.cart));
         dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Emptied!' }));
         dispatch(uiActions.setSnackbarToggle());
      }

      try {
         await handleEmptyCart();
      } catch (error) {
         dispatch(uiActions.setShowSnackbar({ value: true, text: error.data.error.message }));
      }
   }
}

// Send Order
export const placeOrder = (checkoutTokenID, newOrder, data, UID) => {
   return async (dispatch) => {
      const fetchOrderData = async () => {
         dispatch(uiActions.setButtonProgress(true));
         const incomingOrder = await commerce.checkout.capture(checkoutTokenID, newOrder);
         dispatch(checkoutActions.setIncomingOrder(incomingOrder));
         await dispatch(addOrder(data, UID));
         const newCart = await commerce.cart.refresh();
         dispatch(cartActions.addItemsToCart(newCart));
         dispatch(uiActions.setButtonProgress(false));
      }

      try {
         await fetchOrderData();
      } catch (error) {
         dispatch(uiActions.setButtonProgress(false));
         dispatch(checkoutActions.setOrderError(error.data.error.message));
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