import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const HelpDetails = ({ img, title, subtitle, subtext }) => {
   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   return (
      <Box
         sx={theme => ({
            display: 'flex',
            alignItems: 'flex-start',
            columnGap: '2rem',
            color: 'rgb(196, 174, 243)',
            [theme.breakpoints.down(500)]: {
               columnGap: '1.5rem'
            }
         })}
      >
         <img
            src={img}
            alt="Call Us"
            style={{
               height: mdWidth ? '36px' : '48px',
               width: mdWidth ? '36px' : '48px'
            }}
         />
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               rowGap: '0.5rem'
            }}
         >
            <Typography
               variant='h4'
               sx={theme => ({
                  fontWeight: 600,
                  fontSize: '1.75rem',
                  [theme.breakpoints.down('lg')]: {
                     fontSize: '1.5rem'
                  },
                  [theme.breakpoints.down('md')]: {
                     fontSize: '1.5rem'
                  },
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '1.3rem'
                  },
                  [theme.breakpoints.down(400)]: {
                     fontSize: '1.2rem'
                  }
               })}
            >
               {title}
            </Typography>
            <Typography
               sx={theme => ({
                  fontSize: '1.25rem',
                  [theme.breakpoints.down('lg')]: {
                     fontSize: '1rem'
                  }
               })}
            >
               {subtitle}
            </Typography>
            <Typography
               variant='h6'
               sx={theme => ({
                  fontWeight: 600,
                  fontSize: '1.25rem',
                  [theme.breakpoints.down('lg')]: {
                     fontSize: '1rem'
                  }
               })}
            >
               {subtext}
            </Typography>
         </Box>
      </Box>
   );
};

export default HelpDetails;