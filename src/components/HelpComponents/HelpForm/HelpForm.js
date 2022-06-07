import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import PrimaryButton from '../../UI/PrimaryButton';
import { useTheme, useMediaQuery } from '@mui/material';

const HelpForm = () => {
   const theme = useTheme();
   const lgWidth = useMediaQuery(theme.breakpoints.down('lg'));

   return (
      <Box
         sx={theme => ({
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 2rem',
            marginTop: '8rem',
            textAlign: 'center',
            [theme.breakpoints.down('xl')]: {
               marginTop: '6rem',
               padding: '0 1rem'
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
         <Box
            sx={theme => ({
               marginTop: '5rem',
               [theme.breakpoints.down('xl')]: {
                  marginTop: '4rem'
               },
               [theme.breakpoints.down('lg')]: {
                  marginTop: '3rem'
               },
               [theme.breakpoints.down('md')]: {
                  marginTop: '2rem'
               }
            })}
         >
            <Typography
               variant='h4'
               sx={theme => ({
                  fontWeight: 700,
                  textAlign: 'center',
                  [theme.breakpoints.down('lg')]: {
                     fontSize: '2rem'
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
               Contact Us
            </Typography>
            <Typography
               variant='h6'
               sx={theme => ({
                  fontWeight: 300,
                  fontSize: '1.25rem',
                  marginTop: '1rem',
                  textAlign: 'center',
                  [theme.breakpoints.down('lg')]: {
                     fontSize: '1rem',
                     marginTop: '0.8rem',
                  }
               })}
            >
               Our helpline is available 24 hours a day. Contact us at your own convenience.
            </Typography>
         </Box>
         <form>
            <Box
               sx={theme => ({
                  margin: '3rem 0 4rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '2.5rem',
                  [theme.breakpoints.down('xl')]: {
                     margin: '2rem 0 3rem 0'
                  },
                  [theme.breakpoints.down('lg')]: {
                     rowGap: '2rem'
                  },
                  [theme.breakpoints.down('md')]: {
                     rowGap: '1.5rem',
                     margin: '1.5rem 0 2.5rem 0'
                  },
                  [theme.breakpoints.down('sm')]: {
                     rowGap: '1rem',
                     margin: '1rem 0 2rem 0'
                  }
               })}
            >
               <TextField required label="Name" variant="standard" />
               <TextField required label="Email" variant="standard" />
               <TextField required label="Phone" variant="standard" />
               <TextField required multiline rows={lgWidth ? 4 : 5} label="Query" variant="standard" />
            </Box>
            <PrimaryButton text='Submit Request' />
         </form>
      </Box>
   );
};

export default HelpForm;