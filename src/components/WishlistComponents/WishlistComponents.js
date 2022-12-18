import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import WishlistProducts from './WishlistProducts/WishlistProducts';
import { useSelector } from 'react-redux';
import CustomHeader from '../UI/CustomHeader';

const WishlistComponents = () => {
   const [currentPage, setCurrentPage] = useState(1);

   const totalItems = useSelector(state => state.wishlist.totalAmount);
   const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
   const products = useSelector(state => state.products.products);
   const wishlistProducts = products.filter(product => wishlistItems.includes(product.id));

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));
   const xlUpWidth = useMediaQuery(theme.breakpoints.up('xl'));

   // Pagination Logic
   const productsPerPage = xlUpWidth ? 8 : 6;
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = wishlistProducts.slice(indexOfFirstProduct, indexOfLastProduct);

   let pageNumbers = 0;
   for (let i = 1; i <= Math.ceil(wishlistProducts.length / productsPerPage); i++) {
      pageNumbers++;
   };

   const paginate = (page) => setCurrentPage(page);

   return (
      <Box className='small-container'>
         <CustomHeader
            text={`My Wishlist (${totalItems})`}
            filter={false}
            selectMenu={false}
            fontSize={smWidth ? '1rem' : '1.25rem'}
            variant='h6'
         />
         <WishlistProducts
            currentProducts={currentProducts}
            pageNumbers={pageNumbers}
            paginate={paginate}
            currentPage={currentPage}
         />
      </Box>
   );
};

export default WishlistComponents;