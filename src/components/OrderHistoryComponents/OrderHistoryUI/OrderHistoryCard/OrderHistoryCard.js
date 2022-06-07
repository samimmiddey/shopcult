import { Box, Card, Typography, useTheme, useMediaQuery, Button } from '@mui/material';
import React from 'react';

const OrderHistoryCard = ({ data }) => {
   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));
   const xsWidth = useMediaQuery(theme.breakpoints.down(500));

   return (
      <Card
         elevation={0}
         sx={theme => ({
            padding: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            [theme.breakpoints.down(500)]: {
               flexDirection: 'column'
            }
         })}
      >
         <Box
            sx={{
               display: 'flex',
               columnGap: '1rem'
            }}
         >
            <Box
               sx={theme => ({
                  height: '80px',
                  width: '100px',
                  borderRadius: '10px',
                  [theme.breakpoints.down('md')]: {
                     height: '50px',
                     width: '50px'
                  },
                  [theme.breakpoints.down('sm')]: {
                     height: '35px',
                     width: '35px'
                  },
                  [theme.breakpoints.down(350)]: {
                     display: 'none'
                  }
               })}
            >
               <img
                  style={{
                     height: '100%',
                     width: '100%',
                     objectFit: 'cover',
                     borderRadius: mdWidth && !smWidth ? '5px' : mdWidth && smWidth ? '50%' : '10px'
                  }}
                  src={data.img} alt="" />
            </Box>
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
               }}
            >
               <Typography
                  sx={theme => ({
                     fontWeight: 600,
                     [theme.breakpoints.down('md')]: {
                        fontSize: '14px'
                     }
                  })}
               >
                  {data.name}
               </Typography>
               <Box
                  sx={theme => ({
                     display: 'flex',
                     columnGap: '2rem',
                     [theme.breakpoints.down('md')]: {
                        flexDirection: 'column',
                        marginTop: '5px'
                     }
                  })}
               >
                  <Typography
                     sx={theme => ({
                        fontWeight: 500,
                        fontSize: '14px',
                        color: 'text.secondary',
                        [theme.breakpoints.down('md')]: {
                           fontSize: '13px',
                        }
                     })}
                  >
                     Quantity : {data.quantity}
                  </Typography>
                  {
                     !smWidth && <Typography
                        sx={theme => ({
                           fontWeight: 500,
                           fontSize: '14px',
                           color: 'text.secondary',
                           [theme.breakpoints.down('md')]: {
                              fontSize: '13px',
                           }
                        })}
                     >
                        Price : {data.price}
                     </Typography>
                  }
                  <Typography
                     sx={theme => ({
                        fontWeight: 500,
                        fontSize: '14px',
                        color: 'text.secondary',
                        [theme.breakpoints.down('md')]: {
                           fontSize: '13px',
                        }
                     })}
                  >
                     Total Price : {data.totalPrice}
                  </Typography>
               </Box>
            </Box>
         </Box>
         <Box
            sx={theme => ({
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'flex-end',
               rowGap: '6px',
               [theme.breakpoints.down(1300)]: {
                  rowGap: '0',
               }
            })}
         >
            {
               !smWidth &&
               <>
                  <Typography sx={theme => ({
                     fontWeight: 600,
                     fontSize: '14px',
                     color: 'text.disabled',
                     [theme.breakpoints.down(1300)]: {
                        fontSize: '13px'
                     }
                  })}
                  >
                     Status : Unfulfilled
                  </Typography>
                  <Typography sx={theme => ({
                     fontWeight: 600,
                     fontSize: '14px',
                     color: 'text.disabled',
                     [theme.breakpoints.down(1300)]: {
                        fontSize: '13px'
                     }
                  })}
                  >
                     Payment : Paid
                  </Typography>
               </>
            }
            <Button
               variant={xsWidth ? 'outlined' : 'text'}
               sx={theme => ({
                  fontSize: '12px',
                  minWidth: 0,
                  minHeight: 0,
                  padding: '2px 10px',
                  [theme.breakpoints.down(500)]: {
                     marginLeft: '50px',
                     marginTop: '5px',
                     fontSize: '10px',
                  },
                  [theme.breakpoints.down(350)]: {
                     marginLeft: 0,
                  }
               })}
            >
               Invoice
            </Button>
         </Box>
      </Card>
   );
};

export default OrderHistoryCard;