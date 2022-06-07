import React, { useState } from 'react';
import ReviewProducts from './ReviewProducts/ReviewProducts';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Box, Divider, Typography } from '@mui/material';
import { Button, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import ProgressButton from '../../../UI/ProgressButton';

const ActionButton = styled(Button)({
   minHeight: 0,
   minWidth: 0,
   height: '45px',
   width: '100%',
   textTransform: 'none'
});

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_API_KEY);

const PaymentForm = ({ backStep, shippingData, handleSubmitOrder }) => {
   const [error, setError] = useState(null);
   const checkoutToken = useSelector(state => state.checkout.checkoutToken);
   const buttonProgress = useSelector(state => state.ui.buttonProgress);
   const user = JSON.parse(useSelector(state => state.auth.authUser));

   const handleSubmit = async (e, elements, stripe) => {
      e.preventDefault();
      setError(null);

      if (!stripe || !elements) {
         return;
      }

      const cardElement = elements.getElement(CardElement);
      const { error } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

      if (error) {
         setError(error.message);
      } else {
         const orderData = {
            line_items: checkoutToken.live.line_items,
            customer: {
               firstname: shippingData.firstName,
               lastname: shippingData.lastName,
               email: shippingData.email
            },
            shipping: {
               name: 'Primary',
               street: shippingData.address,
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

         handleSubmitOrder(checkoutToken.id, orderData, allOrderedItems, user.uid);

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
                           disableElevation
                           color='secondary'
                           variant='contained'
                           type='button'
                           onClick={backStep}
                        >
                           Back
                        </ActionButton>
                        <ActionButton
                           disableElevation
                           type='submit'
                           variant='contained'
                           color='primary'
                           disabled={!stripe}
                        >
                           {buttonProgress ? <ProgressButton loading={buttonProgress} /> : 'Pay'}
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