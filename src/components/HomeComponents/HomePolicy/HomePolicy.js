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

   const data = [
      {
         img: authentic,
         text: <>100% {xsWidth && <br />}Authentic<br />Products</>
      },
      {
         img: shipping,
         text: <>Free {xsWidth && <br />}Shipping<br />Worldwide</>
      },
      {
         img: guarantee,
         text: <>100% {xsWidth && <br />}Moneyback<br />Guarantee</>
      },
      {
         img: support,
         text: <>24/7 {xsWidth && <br />}Customer<br />Support</>
      }
   ];

   return (
      <Grid
         spacing={2}
         sx={theme => ({
            marginTop: '3rem',
            [theme.breakpoints.down('md')]: {
               marginTop: '2.5rem'
            }
         })}
         container
      >
         {data.map((item, index) => (
            <Grid key={index} item xs={6} sm={6} md={3} lg={3} xl={3}>
               <BoxItem sx={mdWidth ? { ...style } : {}}>
                  <img src={item.img} alt='' />
                  <Typography
                     variant='h6'
                     sx={{
                        fontWeight: 600,
                        fontSize: `${smWidth ? '15px' : '18px'}`,
                        color: 'text.primary'
                     }}
                  >
                     {item.text}
                  </Typography>
               </BoxItem>
            </Grid>
         ))}
      </Grid >
   )
}

export default HomePolicy