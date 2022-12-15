import React from 'react';
import { useSelector } from 'react-redux';
import CartComponents from '../components/CartComponents/CartComponents';
import TransparentProgress from '../components/UI/TransparentProgress';

const Cart = () => {
   const progress = useSelector(state => state.ui.cartProgress);
   return (
      <>
         <TransparentProgress open={progress} />
         <CartComponents />
      </>
   );
};

export default Cart;