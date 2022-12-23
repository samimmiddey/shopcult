import React from 'react';
import { Box } from '@mui/material';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import { useSelector } from 'react-redux';
import ErrorCard from '../UI/ErrorCard';

const CheckoutComponents = () => {
   const checkoutError = useSelector(state => state.ui.checkoutError);
   const checkoutErrorText = useSelector(state => state.ui.checkoutErrorText);

   if (checkoutError) {
      return <ErrorCard errorText={checkoutErrorText} />
   };

   return (
      <Box
         sx={theme => ({
            padding: '80px 32px 0 32px',
            [theme.breakpoints.down('sm')]: {
               paddingLeft: '16px',
               paddingRight: '16px'
            }
         })}
      >

         <CheckoutForm />
      </Box>
   );
};

export default CheckoutComponents;