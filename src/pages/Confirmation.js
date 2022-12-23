import React, { useEffect } from 'react';
import CheckoutSuccess from '../components/CheckoutComponents/CheckoutForm/Confirmation/CheckoutSuccess';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkoutActions } from '../store/checkout-slice';

const Confirmation = () => {
   const incomingOrder = useSelector(state => state.checkout.incomingOrder);

   const history = useHistory();
   const dispatch = useDispatch();

   useEffect(() => {
      if (Object.keys(incomingOrder).length === 0) {
         history.push('/');
      }

      dispatch(checkoutActions.setCheckoutToken(''));
      dispatch(checkoutActions.setShippingCountries([]));
      dispatch(checkoutActions.setShippingCountry(''));
      dispatch(checkoutActions.setShippingSubdivisions([]));
      dispatch(checkoutActions.setShippingSubdivision(''));
      dispatch(checkoutActions.setShippingOptions([]));
      dispatch(checkoutActions.setShippingOption(''));
   }, [incomingOrder, history, dispatch]);

   if (Object.keys(incomingOrder).length === 0) {
      return null;
   }

   return (
      <>
         <CheckoutSuccess />
      </>
   );
};

export default Confirmation;