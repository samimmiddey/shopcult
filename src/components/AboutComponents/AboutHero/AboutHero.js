import React from 'react';
import { Typography, Box } from '@mui/material';
import img from '../../../assets/abouthero2.jpg';
import PrimaryButton from '../../UI/PrimaryButton';
import StylishHeader from '../../UI/StylishHeader';
import { Link } from 'react-router-dom';

const subtext = <>We Eat, Sleep & Breath<br />eCommerce.</>;

const AboutHero = () => {
   return (
      <Box>
         {/* First Section */}
         <StylishHeader
            text='AWARD WINNING ECOMMERCE'
            subtext={subtext}
         />
         {/* Second Section */}
         <Box
            sx={theme => ({
               height: '750px',
               borderRadius: '30px',
               position: 'relative',
               background: `url(${img}) no-repeat center center/cover`,
               [theme.breakpoints.down('xl')]: {
                  height: '650px'
               },
               [theme.breakpoints.down('lg')]: {
                  height: '550px',
                  borderRadius: '20px'
               },
               [theme.breakpoints.down('md')]: {
                  height: '450px'
               },
               [theme.breakpoints.down('sm')]: {
                  height: '350px',
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
                     fontSize: '3rem',
                     padding: '0 1rem',
                     lineHeight: '1.4',
                     color: 'rgb(196, 174, 243)',
                     [theme.breakpoints.down('xl')]: {
                        fontSize: '2.75rem',
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
               <Link to='/shop/all'>
                  <PrimaryButton text='Explore Now' />
               </Link>
            </Box>
         </Box>
         {/* Third Section */}
         <Box
            className='section-margin'
            sx={{
               maxWidth: '1450px',
               padding: '0 1rem',
               textAlign: 'center',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               rowGap: '2rem'
            }}
         >
            <Typography
               sx={theme => ({
                  lineHeight: 1.7,
                  fontSize: '20px',
                  color: 'text.secondary',
                  [theme.breakpoints.down('lg')]: {
                     lineHeight: 1.6,
                     fontSize: '18px'
                  },
                  [theme.breakpoints.down('md')]: {
                     fontSize: '16px'
                  },
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '16px'
                  }
               })}
            >
               Shopcult is an award-winning online shopping store. We prioritize customer experience and customer satisfaction above everything else. Our team members work 24 hours a day to give you the best shopping experience you can possibly find online. We provide a wide range of authentic products which are 100% refundable. We accept all kind of credit and debit cards, online banking and pay on delivery as well. We provide a seven-day timeline for exchanging or returning a product. Our customer service is available 24/7 so you can contact us at your convenience, should you face any difficulty. Our aim is to provide you the ultimate satisfaction and make your life hassle-free.
            </Typography>
            <Box>
               <Link to='/help'>
                  <PrimaryButton text='Contact Us' />
               </Link>
            </Box>
         </Box>
      </Box>
   );
};

export default AboutHero;