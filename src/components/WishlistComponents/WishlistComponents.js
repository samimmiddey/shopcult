import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import WishlistHeader from './WishlistHeader/WishlistHeader';
import WishlistProducts from './WishlistProducts/WishlistProducts';
import { useSelector } from 'react-redux';

const WishlistComponents = () => {
   const [currentPage, setCurrentPage] = useState(1);

   const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
   const products = useSelector(state => state.products.products);
   const wishlistProducts = products.filter(product => wishlistItems.includes(product.id));

   const theme = useTheme();
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
         <WishlistHeader />
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