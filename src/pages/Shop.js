import React from 'react';
import ShopComponents from '../components/ShopComponents/ShopComponents';
import { useSelector } from 'react-redux';
import ErrorCard from '../components/UI/ErrorCard';

const Shop = () => {
   const error = useSelector(state => state.ui.error);
   const errorText = useSelector(state => state.ui.errorText);

   if (error) {
      return <ErrorCard errorText={errorText} />;
   }

   return (
      <>
         <ShopComponents />
      </>
   );
};

export default Shop;