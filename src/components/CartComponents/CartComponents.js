import React from 'react';
import { Box } from '@mui/system';
import CartHeader from './CartHeader/CartHeader';
import CartItems from './CartItems/CartItems';
import { useSelector } from 'react-redux';

const CartComponents = () => {
   const totalItems = useSelector(state => state.cart.totalAmount);
   const totalPrice = useSelector(state => state.cart.totalPrice);
   const cartProducts = useSelector(state => state.cart.cartItems);

   return (
      <Box
         className='container'
         sx={theme => ({
            padding: '80px 32px 0 32px',
            [theme.breakpoints.down('sm')]: {
               paddingLeft: '16px',
               paddingRight: '16px'
            }
         })}
      >
         <CartHeader />
         <CartItems
            totalItems={totalItems}
            totalPrice={totalPrice}
            cartProducts={cartProducts}
         />
      </Box>
   );
};

export default CartComponents;