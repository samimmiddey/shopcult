import { Box, Typography } from '@mui/material';
import React from 'react';
import image from '../../../assets/sneaker2.png';
import PrimaryButton from '../../UI/PrimaryButton';

const HomeBox = () => {
   return (
      <Box
         className='gradient-background'
         sx={theme => ({
            marginTop: '12.75rem',
            padding: '2rem 3rem',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('xl')]: {
               marginTop: '10.75rem'
            },
            [theme.breakpoints.down('lg')]: {
               marginTop: '9.75rem'
            },
            [theme.breakpoints.down('md')]: {
               marginTop: '8.75rem'
            },
            [theme.breakpoints.down('sm')]: {
               flexDirection: 'column',
               justifyContent: 'center',
               rowGap: '2rem',
               marginTop: '7.75rem'
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
               variant='h3'
               sx={theme => ({
                  fontWeight: 700,
                  color: 'rgb(196, 174, 243)',
                  lineHeight: '1.4',
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
                  [theme.breakpoints.down(400)]: {
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