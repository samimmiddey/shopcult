import { Box, Typography } from '@mui/material';
import React from 'react';

const BrandsHeader = () => {
   return (
      <Box
         sx={theme => ({
            marginTop: '5rem',
            [theme.breakpoints.down('xl')]: {
               marginTop: '4rem'
            },
            [theme.breakpoints.down('lg')]: {
               marginTop: '3rem'
            },
            [theme.breakpoints.down('md')]: {
               marginTop: '2rem'
            }
         })}
      >
         <Typography
            variant='h4'
            sx={theme => ({
               fontWeight: 700,
               [theme.breakpoints.down('lg')]: {
                  fontSize: '2rem'
               },
               [theme.breakpoints.down('md')]: {
                  fontSize: '1.5rem'
               },
               [theme.breakpoints.down('sm')]: {
                  fontSize: '1.3rem'
               },
               [theme.breakpoints.down(400)]: {
                  fontSize: '1.2rem'
               }
            })}
         >
            Popular Brands
         </Typography>
      </Box>
   );
};

export default BrandsHeader;