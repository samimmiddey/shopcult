import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BrandsHeader from './BrandsHeader/BrandsHeader';
import BrandCards from './BrandCards/BrandCards';
import { useSelector } from 'react-redux';
import ProgressBar from '../UI/ProgressBar';

const BrandComponents = () => {
   const [isLoading, setIsLoading] = useState(true);
   const products = useSelector(state => state.products.products);

   useEffect(() => {
      if (products.length) {
         setIsLoading(false);
      }
   }, [products]);

   return (
      <>
         {isLoading && <ProgressBar />}
         {!isLoading && <Box
            className='container'
            sx={theme => ({
               padding: '80px 32px 0 32px',
               [theme.breakpoints.down('sm')]: {
                  paddingLeft: '16px',
                  paddingRight: '16px'
               }
            })}
         >
            <BrandsHeader />
            <BrandCards />
         </Box>}
      </>
   );
};

export default BrandComponents;