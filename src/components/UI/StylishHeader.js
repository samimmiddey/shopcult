import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

const StylishHeader = ({ text, subtext }) => {
   return (
      <Box
         sx={theme => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            margin: '0 auto',
            maxWidth: '1450px',
            rowGap: '2rem',
            padding: '7rem',
            [theme.breakpoints.down('xl')]: {
               padding: '6rem'
            },
            [theme.breakpoints.down('lg')]: {
               padding: '5rem'
            },
            [theme.breakpoints.down('md')]: {
               rowGap: '1rem',
               padding: '4rem'
            },
            [theme.breakpoints.down('sm')]: {
               padding: '3rem 0.5rem'
            }
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
                  color: 'text.primary',
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
            sx={theme => ({
               fontWeight: 400,
               fontSize: '3.5rem',
               lineHeight: '1.4',
               color: 'text.primary',
               [theme.breakpoints.down('xl')]: {
                  fontSize: '3.25rem',
               },
               [theme.breakpoints.down('lg')]: {
                  fontSize: '3rem',
               },
               [theme.breakpoints.down('md')]: {
                  fontSize: '2.5rem',
               },
               [theme.breakpoints.down('sm')]: {
                  fontSize: '1.75rem'
               },
               [theme.breakpoints.down('xm')]: {
                  fontSize: '1.5rem'
               }
            })}
         >
            {subtext}
         </Typography>
      </Box>
   );
};

export default StylishHeader;