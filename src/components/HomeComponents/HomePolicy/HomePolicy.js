import React from 'react';
import { Grid, Box, Typography, styled } from '@mui/material';
import authentic from '../../../assets/authentic.png';
import shipping from '../../../assets/shipping.png';
import guarantee from '../../../assets/guarantee.png';
import support from '../../../assets/support.png';
import { useTheme, useMediaQuery } from '@mui/material';

const BoxItem = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   textAlign: 'center',
   rowGap: '1rem',
   [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      textAlign: 'start'
   }
}));

const HomePolicy = () => {
   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));
   const xsWidth = useMediaQuery(theme.breakpoints.down(450));
   const xxsWidth = useMediaQuery(theme.breakpoints.down(350));

   const style = {
      padding: `${smWidth && !xxsWidth ? '2rem' : smWidth && xxsWidth ? '2rem 1rem' : '3rem 2rem'}`,
      boxShadow: '0 5px 20px -5px rgba(0, 0, 0, 0.2)',
      border: '1px solid #eceff1',
      borderRadius: '10px',
   }

   return (
      <Grid
         spacing={mdWidth && !smWidth ? 1.5 : mdWidth && smWidth ? 1 : 3}
         sx={{ marginTop: '2rem' }}
         container
      >
         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <BoxItem sx={mdWidth ? { ...style } : {}}>
               <img src={authentic} alt="Authentic" />
               <Typography variant='h6' sx={{ fontWeight: 600, fontSize: `${smWidth ? '15px' : '18px'}` }}>
                  100% {xsWidth && <br />}Authentic<br />Products
               </Typography>
            </BoxItem>
         </Grid>
         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <BoxItem sx={mdWidth ? { ...style } : {}}>
               <img src={shipping} alt="Shipping" />
               <Typography variant='h6' sx={{ fontWeight: 600, fontSize: `${smWidth ? '15px' : '18px'}` }}>
                  Free {xsWidth && <br />}Shipping<br />Worldwide
               </Typography>
            </BoxItem>
         </Grid>
         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <BoxItem sx={mdWidth ? { ...style } : {}}>
               <img src={guarantee} alt="Guarantee" />
               <Typography variant='h6' sx={{ fontWeight: 600, fontSize: `${smWidth ? '15px' : '18px'}` }}>
                  100% {xsWidth && <br />}Moneyback<br />Guarantee
               </Typography>
            </BoxItem>
         </Grid>
         <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <BoxItem sx={mdWidth ? { ...style } : {}}>
               <img src={support} alt="Support" />
               <Typography variant='h6' sx={{ fontWeight: 600, fontSize: `${smWidth ? '15px' : '18px'}` }}>
                  24/7 {xsWidth && <br />}Customer<br />Support
               </Typography>
            </BoxItem>
         </Grid>

      </Grid >
   )
}

export default HomePolicy