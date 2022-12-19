import React from 'react';
import { Box } from '@mui/material';
import CheckoutForm from './CheckoutForm/CheckoutForm';

const CheckoutComponents = () => {
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