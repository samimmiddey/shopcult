import React from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CheckoutError = () => {
   const orderError = useSelector(state => state.checkout.orderError);
   const history = useHistory();

   return (
      <Box
         sx={theme => ({
            padding: '80px 32px 0 32px',
            [theme.breakpoints.down('sm')]: {
               paddingLeft: '16px',
               paddingRight: '16px'
            }
         })}
      >
         <Card
            elevation={0}
            sx={theme => ({
               backgroundColor: '#f0ecf8',
               margin: '5rem auto 0 auto',
               maxWidth: '900px',
               width: '100%',
               textAlign: 'center',
               padding: '3rem 2rem',
               [theme.breakpoints.down('xl')]: {
                  marginTop: '4rem'
               },
               [theme.breakpoints.down('lg')]: {
                  marginTop: '3rem'
               },
               [theme.breakpoints.down('md')]: {
                  marginTop: '2rem'
               },
               [theme.breakpoints.down('sm')]: {
                  padding: '2rem 1rem'
               }
            })}
         >
            <Box sx={theme => ({
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               rowGap: '0.5rem',
               [theme.breakpoints.down('sm')]: {
                  rowGap: '5px',
               }
            })}>
               <ErrorOutlineIcon
                  sx={theme => ({
                     fontSize: '3rem',
                     color: 'rgb(132, 76, 196)',
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '2.5rem',
                        marginBottom: '10px'
                     }
                  })}
               />
               <Typography
                  color='secondary'
                  variant='h4'
                  sx={theme => ({
                     fontWeight: 700,
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '1.5rem'
                     }
                  })}
               >
                  Error
               </Typography>
               <Typography
                  color='primary'
                  sx={theme => ({
                     fontSize: '15px',
                     fontWeight: 600,
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '14px'
                     }
                  })}
               >
                  {orderError}
               </Typography>
               <Button
                  onClick={() => history.replace('/cart')}
                  className='primary-button'
                  variant='contained'
                  sx={theme => ({
                     marginTop: '2rem',
                     textTransform: 'none',
                     minWidth: 0,
                     minHeight: 0,
                     padding: '10px',
                     borderRadius: '8px',
                     color: 'rgb(213, 200, 240)',
                     transition: '0.5s',
                     width: '300px',
                     "&:hover": {
                        backgroundPosition: 'right center'
                     },
                     [theme.breakpoints.down('md')]: {
                        padding: '8px',
                        borderRadius: '5px',
                        width: '175px',
                     },
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '13px',
                        marginTop: '1.5rem',
                     }
                  })}
               >
                  Back To Cart
               </Button>
            </Box>
         </Card>
      </Box>
   );
};

export default CheckoutError;