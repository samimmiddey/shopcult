import React from 'react';
import { Box } from '@mui/system';
import CartItems from './CartItems/CartItems';
import { useSelector } from 'react-redux';
import CustomHeader from '../UI/CustomHeader';
import { useMediaQuery, useTheme } from '@mui/material';

const CartComponents = () => {
   const totalItems = useSelector(state => state.cart.totalAmount);
   const totalPrice = useSelector(state => state.cart.totalPrice);
   const cartProducts = useSelector(state => state.cart.cartItems);

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <Box className='small-container'>
         <CustomHeader
            text={`My Cart (${totalItems})`}
            filter={false}
            selectMenu={false}
            fontSize={smWidth ? '1rem' : '1.25rem'}
            variant='h6'
         />
         <CartItems
            totalItems={totalItems}
            totalPrice={totalPrice}
            cartProducts={cartProducts}
         />
      </Box>
   );
};

export default CartComponents;