import React from 'react';
import Hero from './Hero/Hero';
import Brands from './Brands/Brands';
import HomeInformation from './HomeInformation/HomeInformation';
import PopularProducts from './PopularProducts/PopularProducts';
import HomeCategories from './HomeCategories/HomeCategories';
import HomeBox from './HomeBox/HomeBox';
import HomeTestimonial from './HomeTestimonial/HomeTestimonial';
import HomePolicy from './HomePolicy/HomePolicy';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const HomeComponents = () => {
   const theme = useTheme();
   const lgWidth = useMediaQuery(theme.breakpoints.down('lg'));

   return (
      <Box
         className={lgWidth ? '' : 'container'}
         sx={{ paddingTop: '80px' }}
      >
         <Hero />
         {!lgWidth && <HomePolicy />}
         <Box
            sx={theme => ({
               maxWidth: '1498px',
               margin: '0 auto',
               padding: '0 24px',
               [theme.breakpoints.down('sm')]: {
                  padding: '0 16px'
               }
            })}
         >
            {lgWidth && <HomePolicy />}
            <PopularProducts />
            <HomeCategories />
            <HomeBox />
            <HomeInformation />
            <HomeTestimonial />
         </Box>
         <Brands />
      </Box>
   );
};

export default HomeComponents;