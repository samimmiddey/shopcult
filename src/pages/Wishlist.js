import React from 'react';
import { useSelector } from 'react-redux';
import WishlistComponents from '../components/WishlistComponents/WishlistComponents';
import TransparentProgress from '../components/UI/TransparentProgress';

const Wishlist = () => {
   const progress = useSelector(state => state.ui.buttonProgress);

   return (
      <>
         <TransparentProgress open={progress} />
         <WishlistComponents />
      </>
   );
};

export default Wishlist;