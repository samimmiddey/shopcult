import { Typography, Box, Divider } from '@mui/material';
import React from 'react';
import img from '../../../assets/abouthero2.jpg';
import PrimaryButton from '../../UI/PrimaryButton';

const AboutHero = () => {
   return (
      <Box>
         {/* First Section */}
         <Box
            sx={theme => ({
               height: '500px',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'flex-start',
               justifyContent: 'center',
               margin: '0 auto',
               maxWidth: '1450px',
               rowGap: '2rem',
               padding: '0 5rem',
               [theme.breakpoints.down('xl')]: {
                  height: '450px'
               },
               [theme.breakpoints.down('lg')]: {
                  height: '400px',
                  padding: '0 4rem',
               },
               [theme.breakpoints.down('md')]: {
                  height: '350px',
                  rowGap: '1rem'
               },
               [theme.breakpoints.down('sm')]: {
                  padding: '0 0.5rem',
                  height: '250px'
               },
            })}
         >
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '1rem'
               }}
            >
               <Divider sx={{ width: '40px', borderBottom: '2px solid black' }} />
               <Typography
                  sx={theme => ({
                     fontSize: '16px',
                     fontWeight: 600,
                     [theme.breakpoints.down('md')]: {
                        fontSize: '15px'
                     },
                     [theme.breakpoints.down('md')]: {
                        fontSize: '14px'
                     }
                  })}>
                  AWARD WINNING ECOMMERCE
               </Typography>
            </Box>
            <Typography
               variant='h3'
               sx={theme => ({
                  fontWeight: 400,
                  fontSize: '4rem',
                  lineHeight: '1.4',
                  [theme.breakpoints.down('xl')]: {
                     fontSize: '3.5rem',
                  },
                  [theme.breakpoints.down('lg')]: {
                     fontSize: '3rem',
                  },
                  [theme.breakpoints.down('md')]: {
                     fontSize: '2.5rem',
                  },
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '1.75rem'
                  }
               })}
            >
               We Eat, Sleep &amp; Breath<br />eCommerce.
            </Typography>
         </Box>
         {/* Second Section */}
         <Box
            sx={theme => ({
               height: '800px',
               borderRadius: '30px',
               position: 'relative',
               background: `url(${img}) no-repeat center center/cover`,
               [theme.breakpoints.down('xl')]: {
                  height: '700px'
               },
               [theme.breakpoints.down('lg')]: {
                  height: '600px',
                  borderRadius: '20px'
               },
               [theme.breakpoints.down('md')]: {
                  height: '500px'
               },
               [theme.breakpoints.down('sm')]: {
                  height: '400px',
                  borderRadius: '10px'
               }
            })}
         >
            <Box
               sx={theme => ({
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '30px',
                  height: '100%',
                  color: '#fff',
                  background: 'rgba(28, 12, 61, 0.75)',
                  textAlign: 'center',
                  rowGap: '2rem',
                  [theme.breakpoints.down('lg')]: {
                     borderRadius: '20px'
                  },
                  [theme.breakpoints.down('sm')]: {
                     borderRadius: '10px'
                  }
               })}
            >
               <Typography
                  variant='h2'
                  sx={theme => ({
                     fontWeight: 600,
                     fontSize: '3.5rem',
                     padding: '0 1rem',
                     lineHeight: '1.4',
                     color: 'rgb(196, 174, 243)',
                     [theme.breakpoints.down('xl')]: {
                        fontSize: '3rem',
                     },
                     [theme.breakpoints.down('lg')]: {
                        fontSize: '2.5rem',
                     },
                     [theme.breakpoints.down('md')]: {
                        fontSize: '2rem',
                     },
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '1.35rem'
                     }
                  })}>
                  The Best Shopping Experience<br />is Just One Click Away
               </Typography>
               <PrimaryButton text='Explore Now' />
            </Box>
         </Box>
         {/* Third Section */}
         <Box
            sx={theme => ({
               maxWidth: '1450px',
               padding: '0 1rem',
               textAlign: 'center',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               rowGap: '2rem',
               margin: '8rem auto 0 auto',
               [theme.breakpoints.down('xl')]: {
                  marginTop: '6rem'
               },
               [theme.breakpoints.down('lg')]: {
                  marginTop: '5rem'
               },
               [theme.breakpoints.down('md')]: {
                  marginTop: '4rem'
               },
               [theme.breakpoints.down('sm')]: {
                  marginTop: '3.5rem'
               }
            })}
         >
            <Typography
               sx={theme => ({
                  lineHeight: 1.7,
                  fontSize: '20px',
                  color: 'text.secondary',
                  [theme.breakpoints.down('lg')]: {
                     lineHeight: 1.6,
                     fontSize: '18px',
                  },
                  [theme.breakpoints.down('md')]: {
                     fontSize: '16px',
                  }
               })}
            >
               Shopcult is an award-winning online shopping store. We prioritize customer experience and customer satisfaction above everything else. Our team members work 24 hours a day to give you the best shopping experience you can possibly find online. We provide a wide range of authentic products which are 100% refundable. We accept all kind of credit and debit cards, online banking and pay on delivery as well. We provide a seven-day timeline for exchanging or returning a product. Our customer service is available 24/7 so you can contact us at your convenience, should you face any difficulty. Our aim is to provide you the ultimate satisfaction and make your life hassle-free.
            </Typography>
            <Box>
               <PrimaryButton text='Contact Us' />
            </Box>
         </Box>
      </Box>
   );
};

export default AboutHero;