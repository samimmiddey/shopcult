import { Box } from '@mui/material';
import React from 'react';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import ErrorComponent from '../UI/ErrorComponent';
import { useSelector } from 'react-redux';

const CheckoutComponents = () => {
   const error = useSelector(state => state.error.checkoutError);

   return (
      <>
         {error && <ErrorComponent error={error} />}
         {!error && <Box
            sx={theme => ({
               padding: '80px 32px 0 32px',
               [theme.breakpoints.down('sm')]: {
                  paddingLeft: '16px',
                  paddingRight: '16px'
               }
            })}
         >

            <CheckoutForm />
         </Box>}
      </>
   );
};

export default CheckoutComponents;