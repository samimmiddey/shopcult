import { Box, Typography } from '@mui/material';
import React from 'react';

const OrderHistoryHeader = () => {
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
            variant='h6'
            sx={theme => ({
               fontWeight: 700,
               [theme.breakpoints.down('sm')]: {
                  fontSize: '1rem'
               }
            })}
         >
            Recent Orders
         </Typography>
      </Box>
   )
}

export default OrderHistoryHeader