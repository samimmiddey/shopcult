import React from 'react';
import { Box } from '@mui/material';
import BrandCards from './BrandCards/BrandCards';
import CustomHeader from '../UI/CustomHeader';

const BrandComponents = () => {
   return (
      <Box className='small-container'>
         <CustomHeader
            text='Popular Brands'
            filter={false}
            selectMenu={false}
         />
         <BrandCards />
      </Box>
   );
};

export default BrandComponents;