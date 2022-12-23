import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import authErrorImg from '../../assets/authError.png';

const style = theme => ({
   maxWidth: 500,
   margin: '12rem auto',
   padding: '2.5rem 2rem',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   rowGap: '1rem',
   [theme.breakpoints.down('xl')]: {
      margin: '11rem auto'
   },
   [theme.breakpoints.down('lg')]: {
      margin: '10rem auto'
   },
   [theme.breakpoints.down('md')]: {
      margin: '9rem auto'
   },
   [theme.breakpoints.down('sm')]: {
      margin: '8.5rem auto',
      width: '90%'
   }
});

const ErrorCard = ({ errorText }) => {
   return (
      <Card sx={style} elevation={0}>
         <img src={authErrorImg} alt="" />
         <Box>
            <Typography
               color='secondary'
               sx={{
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: '5px',
                  fontSize: '1.5rem'
               }}
            >
               Oh Snap!
            </Typography>
            <Typography
               color='primary'
               sx={{
                  fontSize: '16px',
                  textAlign: 'center',
               }}
            >
               {errorText ? errorText : 'Something went wrong!'}
            </Typography>
         </Box>
      </Card>
   );
};

export default ErrorCard;