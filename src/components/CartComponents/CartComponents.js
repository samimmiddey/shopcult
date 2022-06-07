import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import CartHeader from './CartHeader/CartHeader';
import CartItems from './CartItems/CartItems';
import { useSelector } from 'react-redux';
import ProgressBar from '../UI/ProgressBar';

const CartComponents = () => {
   const [isLoading, setIsLoading] = useState(true);
   const loading = useSelector(state => state.cart.progressBar);
   const totalItems = useSelector(state => state.cart.totalAmount);
   const totalPrice = useSelector(state => state.cart.totalPrice);
   const cartProducts = useSelector(state => state.cart.cartItems);

   useEffect(() => {
      if (cartProducts.length) {
         setIsLoading(false);
      } else if (!cartProducts.length && !loading) {
         setIsLoading(false);
      }
   }, [cartProducts, loading]);

   return (
      <>
         {isLoading && <ProgressBar />}
         {
            !isLoading &&
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
         }
      </>
   );
};

export default CartComponents;