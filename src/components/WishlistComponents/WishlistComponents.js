import { Box } from '@mui/material';
import React from 'react';
import WishlistHeader from './WishlistHeader/WishlistHeader';
import WishlistProducts from './WishlistProducts/WishlistProducts';

const WishlistComponents = () => {
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
         <WishlistProducts />
      </Box>
   );
};

export default WishlistComponents;