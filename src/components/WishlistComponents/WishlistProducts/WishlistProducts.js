import React from 'react';
import { Box } from '@mui/material';
import CustomPagination from '../../UI/CustomPagination';
import wishlist from '../../../assets/emptywishlist.svg';
import WishlistItems from '../WishlistItem/WishListItems';
import EmptyTemplate from '../../UI/EmptyTemplate';

const WishlistProducts = ({ currentProducts, pageNumbers, paginate, currentPage }) => {
   return (
      <Box sx={{ marginTop: '2rem' }}>
         <Box sx={{ maxWidth: '1024px', margin: '0 auto' }}>
            {
               currentProducts.length >= 1 &&
               <Box
                  sx={{
                     width: '100%',
                     display: 'flex',
                     flexDirection: 'column',
                     rowGap: '1rem'
                  }}
               >
                  {
                     currentProducts.map((product, index) => (
                        <WishlistItems
                           key={index}
                           product={product}
                           path={`/home/${product.id}`}
                        />
                     ))
                  }
               </Box>
            }
            {
               pageNumbers !== 0 &&
               <CustomPagination
                  pageNumbers={pageNumbers}
                  paginate={paginate}
                  currentPage={currentPage}
               />
            }
         </Box>
         {
            currentProducts.length < 1 &&
            <EmptyTemplate
               img={wishlist}
               text='Your wishlist is empty!'
               button={true}
            />
         }
      </Box>
   );
};

export default WishlistProducts;