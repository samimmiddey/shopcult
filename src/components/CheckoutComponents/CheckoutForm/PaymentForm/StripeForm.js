import React, { useState } from 'react';
import ReviewProducts from './ReviewProducts/ReviewProducts';
import { Box, Divider, Typography } from '@mui/material';
import { Button, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import ProgressButton from '../../../UI/ProgressButton';
import { checkoutActions } from '../../../../store/checkout-slice';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../../store/cart-slice';
import { commerce } from '../../../../lib/commerce';
import { addOrder } from '../../../../store/cart-thunks';
import { useHistory } from 'react-router-dom';
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { uiActions } from '../../../../store/ui-slice';

const ActionButton = styled(Button)(({ theme }) => ({
   minHeight: 0,
   minWidth: 0,
   height: '45px',
   width: '100%',
   textTransform: 'none',
   [theme.breakpoints.down('sm')]: {
      height: '42px'
   }
}));

const StripeForm = ({ backStep, shippingData }) => {
   const stripe = useStripe();
   const elements = useElements();

   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const checkoutToken = useSelector(state => state.checkout.checkoutToken);
   const userData = useSelector(state => state.auth.userData);

   const dispatch = useDispatch();

   const history = useHistory();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      if (!stripe || !elements) {
         return;
      }

      try {
         setLoading(true);

         const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
               return_url: "http://localhost:3000/confirmation",
            },
            redirect: 'if_required'
         });

         if (error) {
            setLoading(false);
            setError(error.message);
         } else {
            const orderData = {
               line_items: checkoutToken.live.line_items,
               customer: {
                  name: shippingData.name,
                  email: shippingData.email
               },
               shipping: {
                  name: 'Primary',
                  street: shippingData.address,
                  landmark: shippingData.landmark,
                  town_city: shippingData.city,
                  county_state: shippingData.selectSubdivision,
                  postal_zip_code: shippingData.zip,
                  country: shippingData.selectCountry
               },
               fulfillment: {
                  shipping_method: shippingData.selectOption
               },
               payment: {
                  gateway: 'test_gateway',
                  card: {
                     number: '4242 4242 4242 4242',
                     expiry_month: '01',
                     expiry_year: '2023',
                     cvc: '123',
                     postal_zip_code: '94103',
                  },
               }
            }

            let allOrderedItems = [];
            for (let product in checkoutToken.live.line_items) {
               allOrderedItems.push({
                  id: checkoutToken.live.line_items[product].id,
                  name: checkoutToken.live.line_items[product].name,
                  quantity: checkoutToken.live.line_items[product].quantity,
                  img: checkoutToken.live.line_items[product].image.url,
                  price: checkoutToken.live.line_items[product].price.formatted_with_symbol,
                  totalPrice: checkoutToken.live.line_items[product].line_total.formatted_with_symbol
               });
            }

            const incomingOrder = await commerce.checkout.capture(checkoutToken.id, orderData);
            dispatch(checkoutActions.setIncomingOrder(incomingOrder));
            const newCart = await commerce.cart.refresh();
            dispatch(cartActions.addItemsToCart(newCart));
            dispatch(addOrder(allOrderedItems, userData.id));

            history.replace('/confirmation');
            setLoading(false);
         }
      } catch (error) {
         setLoading(false);
         dispatch(uiActions.setCheckoutError(true));
         dispatch(uiActions.setCheckoutErrorText('Something went wrong while storing the data!'));
      }
   }

   return (
      <>
         <ReviewProducts />
         <Divider sx={{ margin: '1.5rem 0' }} />
         <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Typography
               sx={{
                  textAlign: 'start',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginTop: '8px',
                  color: 'red'
               }}
            >
               {error}
            </Typography>
            <Box
               sx={theme => ({
                  marginTop: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '16px',
                  [theme.breakpoints.down('sm')]: {
                     flexDirection: 'column',
                     rowGap: '16px'
                  }
               })}
            >
               <ActionButton
                  color='secondary'
                  variant='contained'
                  type='button'
                  onClick={() => {
                     history.replace('/cart');
                     backStep();
                  }}
                  disabled={loading}
               >
                  Back
               </ActionButton>
               <ActionButton
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={!stripe || loading}
               >
                  {loading ? <ProgressButton loading={loading} /> : 'Pay'}
               </ActionButton>
            </Box>
         </form>
      </>
   );
};

export default StripeForm;