import { Box, Typography } from '@mui/material';
import React from 'react';
import Brands from '../../HomeComponents/Brands/Brands';

const AboutFeatured = () => {
   return (
      <Box>
         <Box className='section-margin'>
            <Box
               sx={theme => ({
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  rowGap: '2.5rem',
                  [theme.breakpoints.down('md')]: {
                     rowGap: '2rem'
                  },
                  [theme.breakpoints.down('sm')]: {
                     rowGap: '1.5rem'
                  }
               })}
            >
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
                  FEATURED PARTNERS
               </Typography>
               <Typography
                  sx={theme => ({
                     flex: 1,
                     fontWeight: 600,
                     textAlign: 'center',
                     color: 'text.primary',
                     [theme.breakpoints.down('md')]: {
                        fontSize: '1.5rem'
                     },
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '1.25rem'
                     }
                  })} variant='h4'>
                  Platform &amp; Technology Partners
               </Typography>
            </Box>
         </Box>
         <Box className='section-margin'>
            <Brands />
         </Box>
      </Box>
   );
};

export default AboutFeatured;