import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

const StylishHeader = ({ text, subtext }) => {
   return (
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
            padding: '0 7rem',
            [theme.breakpoints.down('xl')]: {
               height: '450px',
               padding: '0 6rem'
            },
            [theme.breakpoints.down('lg')]: {
               height: '400px',
               padding: '0 5rem'
            },
            [theme.breakpoints.down('md')]: {
               height: '350px',
               rowGap: '1rem',
               padding: '0 4rem'
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
               {text}
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
            {subtext}
         </Typography>
      </Box>
   );
};

export default StylishHeader;