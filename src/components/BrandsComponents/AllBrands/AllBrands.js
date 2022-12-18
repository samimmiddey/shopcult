import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import BrandCards from './BrandCards/BrandCards';
import CustomHeader from '../../UI/CustomHeader';

const AllBrands = () => {
   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <Box className='small-container'>
         <CustomHeader
            text='Popular Brands'
            filter={false}
            selectMenu={false}
         />
         <BrandCards
            mdWidth={mdWidth}
            smWidth={smWidth}
         />
      </Box>
   );
};

export default AllBrands;