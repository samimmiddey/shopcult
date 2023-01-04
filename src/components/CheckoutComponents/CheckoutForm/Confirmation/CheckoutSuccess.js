import { Box, Button, Card, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import CanvasConfetti from '../../../UI/CanvasConfetti';
import ShopIcon from '@mui/icons-material/Shop';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CheckoutSuccess = () => {
   const incomingOrder = useSelector(state => state.checkout.incomingOrder);
   const history = useHistory();

   useEffect(() => {
      CanvasConfetti();
   }, []);

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
               <ShopIcon
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
                  {`Thank you for shopping, ${incomingOrder.customer.firstname}!`}
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
                  Check your email inbox for the receipt
               </Typography>
               <Typography
                  color='primary'
                  sx={theme => ({
                     fontSize: '15px',
                     fontWeight: 600,
                     marginTop: '1rem',
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '14px'
                     }
                  })}
               >
                  If you have any question, please email order@example.com
               </Typography>
               <Button
                  onClick={() => history.replace('/shop/all')}
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
                  Continue Shopping
               </Button>
            </Box>
         </Card>
      </Box>
   );
};

export default CheckoutSuccess;