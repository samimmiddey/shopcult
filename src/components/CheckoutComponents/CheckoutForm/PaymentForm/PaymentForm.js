import React, { useState } from 'react';
import ReviewProducts from './ReviewProducts/ReviewProducts';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_API_KEY);

const PaymentForm = ({ backStep, shippingData }) => {
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const checkoutToken = useSelector(state => state.checkout.checkoutToken);
   const userData = (useSelector(state => state.auth.userData));

   const dispatch = useDispatch();

   const history = useHistory();

   const handleSubmit = async (e, elements, stripe) => {
      e.preventDefault();
      setError(null);

      if (!stripe || !elements) {
         return;
      }

      try {
         setLoading(true);

         const cardElement = elements.getElement(CardElement);
         const { error } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

         if (error) {
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

            history.replace('/confirmation');
            setLoading(false);

            dispatch(addOrder(allOrderedItems, userData.id));

         }
      } catch (error) {
         setLoading(false);
         dispatch(checkoutActions.setOrderError(error.data.error.message));
      }
   }

   return (
      <>
         <ReviewProducts />
         <Divider sx={{ margin: '1.5rem 0' }} />
         <Elements stripe={stripePromise}>
            <ElementsConsumer>
               {({ stripe, elements }) => (
                  <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                     <CardElement />
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
                           onClick={backStep}
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
               )}
            </ElementsConsumer>
         </Elements>
      </>
   );
};

export default PaymentForm;