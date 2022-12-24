import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeForm from './StripeForm';
import { Box, CircularProgress } from '@mui/material';

const appearance = {
   theme: 'stripe',

   variables: {
      colorText: '#868395',
      fontFamily: 'Inter',
      spacingUnit: '4px',
      borderRadius: '5px',
      fontSizeBase: '15px'
   }
};

const URL = process.env.REACT_APP_BACKEND_URL;

const PaymentForm = ({ backStep, shippingData }) => {
   const [stripePromise, setStripePromise] = useState(null);
   const [clientSecret, setClientSecret] = useState('');

   useEffect(() => {
      fetch(`${URL}/config`).then(async (r) => {
         const { publishableKey } = await r.json();
         setStripePromise(loadStripe(publishableKey));
      });
   }, []);

   useEffect(() => {
      fetch(`${URL}/create-payment-intent`, {
         method: 'POST',
         body: JSON.stringify({}),
      }).then(async (result) => {
         var { clientSecret } = await result.json();
         setClientSecret(clientSecret);
      });
   }, []);

   return (
      <>
         {
            (!stripePromise || !clientSecret) &&
            <Box
               sx={{
                  height: '200px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
               }}
            >
               <CircularProgress color='primary' size={28} />
            </Box>
         }
         {
            stripePromise && clientSecret &&
            <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
               <StripeForm backStep={backStep} shippingData={shippingData} />
            </Elements>
         }
      </>
   );
};

export default PaymentForm;