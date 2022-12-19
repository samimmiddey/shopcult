import { Box, Typography } from '@mui/material';
import React from 'react';
import image from '../../../assets/sneaker2.png';
import PrimaryButton from '../../UI/PrimaryButton';

const HomeBox = () => {
   return (
      <Box
         className='gradient-background'
         sx={theme => ({
            padding: '2rem 3rem',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
               flexDirection: 'column',
               justifyContent: 'center',
               rowGap: '2rem'
            }
         })}
      >
         <Box
            sx={theme => ({
               flex: 1,
               paddingRight: '15rem',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'flex-start',
               justifyContent: 'center',
               rowGap: '1.5rem',
               [theme.breakpoints.down('xl')]: {
                  paddingRight: '10rem'
               },
               [theme.breakpoints.down('lg')]: {
                  paddingRight: '5rem'
               },
               [theme.breakpoints.down('md')]: {
                  paddingRight: '2rem'
               },
               [theme.breakpoints.down('sm')]: {
                  alignItems: 'center',
                  paddingRight: 0
               }
            })}
         >
            <Typography
               sx={theme => ({
                  fontWeight: 600,
                  color: 'rgb(196, 174, 243)',
                  lineHeight: '1.4',
                  fontSize: '3rem',
                  [theme.breakpoints.down('xl')]: {
                     fontSize: '2.5rem'
                  },
                  [theme.breakpoints.down('lg')]: {
                     fontSize: '2rem'
                  },
                  [theme.breakpoints.down('md')]: {
                     fontSize: '1.5rem'
                  },
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '1.3rem',
                     textAlign: 'center'
                  },
                  [theme.breakpoints.down('xm')]: {
                     fontSize: '1.2rem'
                  }
               })}
            >
               Get Voucher Discount up to 50%
            </Typography>
            <PrimaryButton text='Get Now' />
         </Box>
         <Box sx={{ flex: 1 }}>
            <img className='image' src={image} alt="" />
         </Box>
      </Box>
   );
};

export default HomeBox;