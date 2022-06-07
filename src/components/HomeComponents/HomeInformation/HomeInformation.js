import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import HomeInfoCard from '../../UI/HomeInfoCard';
import { Grid } from '@mui/material';
import HomeInfoCardData from '../../../data/HomeInfoCardData';
import { useTheme, useMediaQuery } from '@mui/material';

const HomeInformation = () => {
   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   return (
      <Box sx={theme => ({
         marginTop: '8rem',
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
      })}>
         <Box sx={theme => ({
            display: 'flex',
            alignItems: 'center',
            columnGap: '15rem',
            [theme.breakpoints.down('xl')]: {
               columnGap: '7rem'
            },
            [theme.breakpoints.down('lg')]: {
               columnGap: '5rem'
            },
            [theme.breakpoints.down('md')]: {
               columnGap: 0,
               flexDirection: 'column',
               justifyContent: 'center',
               textAlign: 'center',
               rowGap: '1rem'
            }
         })}>
            <Typography
               sx={theme => ({
                  flex: 1,
                  fontWeight: 700,
                  lineHeight: '1.4',
                  color: 'text.primary',
                  [theme.breakpoints.down('xl')]: {
                     fontSize: '2.5rem'
                  },
                  [theme.breakpoints.down('lg')]: {
                     fontSize: '2rem'
                  },
                  [theme.breakpoints.down('md')]: {
                     fontSize: '1.5rem'
                  },
               })} variant='h3'>
               Why We Are The Best In The Market
            </Typography>
            <Typography
               sx={theme => ({
                  flex: 1,
                  color: 'text.secondary',
                  fontSize: '17px',
                  lineHeight: '1.7',
                  [theme.breakpoints.down('lg')]: {
                     fontSize: '16px',
                     lineHeight: '1.5',
                  },
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '15px'
                  },
               })}>
               Authentic products &amp; customer experience have always been our priorities. We provide 24/7 customer care service. If you face any problem with your purchase or the products, we are happy to assist you at your convenience.</Typography>
         </Box>
         <Grid sx={theme => ({
            marginTop: '2rem',
            [theme.breakpoints.down('sm')]: {
               marginTop: '1rem'
            }
         })} spacing={mdWidth ? 2 : 2.5} container>
            {HomeInfoCardData.map((data, index) => (
               <Grid key={index} item xs={12} sm={6} md={6} lg={4} xl={3} >
                  <HomeInfoCard
                     data={data}
                  />
               </Grid>
            ))}
         </Grid>
      </Box>
   );
};

export default HomeInformation;