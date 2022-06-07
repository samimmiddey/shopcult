import React, { useEffect } from 'react';
import CheckoutSuccess from '../components/CheckoutComponents/CheckoutForm/Confirmation/CheckoutSuccess';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutError from '../components/CheckoutComponents/CheckoutForm/Confirmation/CheckoutError';
import { checkoutActions } from '../store/checkout-slice';

const OrderConfirmationPage = () => {
   const incomingOrder = useSelector(state => state.checkout.incomingOrder);
   const orderError = useSelector(state => state.checkout.orderError);
   const history = useHistory();
   const dispatch = useDispatch();

   useEffect(() => {
      if (Object.keys(incomingOrder).length === 0 && !orderError) {
         history.push('/');
      }

      dispatch(checkoutActions.setCheckoutToken(''));
      dispatch(checkoutActions.setShippingCountries([]));
      dispatch(checkoutActions.setShippingCountry(''));
      dispatch(checkoutActions.setShippingSubdivisions([]));
      dispatch(checkoutActions.setShippingSubdivision(''));
      dispatch(checkoutActions.setShippingOptions([]));
      dispatch(checkoutActions.setShippingOption(''));
   }, [incomingOrder, history, orderError, dispatch]);

   if (Object.keys(incomingOrder).length === 0 && !orderError) {
      return null;
   }

   return (
      <>
         {!orderError && <CheckoutSuccess />}
         {orderError && <CheckoutError />}
      </>
   );
};

export default OrderConfirmationPage;