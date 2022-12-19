import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import PrimaryButton from './PrimaryButton';

const CustomForm = ({ list, title, subtitle }) => {
   const theme = useTheme();
   const lgWidth = useMediaQuery(theme.breakpoints.down('lg'));

   return (
      <Box
         className='section-margin'
         sx={theme => ({
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 2rem',
            textAlign: 'center',
            [theme.breakpoints.down('xl')]: {
               padding: '0 1rem'
            }
         })}
      >
         <Box>
            <Typography
               variant='h4'
               sx={theme => ({
                  fontWeight: 600,
                  [theme.breakpoints.down('md')]: {
                     fontSize: '1.5rem'
                  },
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '1.25rem'
                  }
               })}
            >
               {title}
            </Typography>
            {
               subtitle &&
               <Typography
                  sx={theme => ({
                     marginTop: '1rem',
                     textAlign: 'center',
                     color: 'text.secondary',
                     fontSize: '20px',
                     [theme.breakpoints.down('lg')]: {
                        fontSize: '18px',
                        marginTop: '0.8rem'
                     },
                     [theme.breakpoints.down('md')]: {
                        fontSize: '16px'
                     },
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '16px'
                     }
                  })}
               >
                  {subtitle}
               </Typography>
            }
            <form>
               <Box
                  sx={theme => ({
                     margin: '2.5rem 0 3rem 0',
                     display: 'flex',
                     flexDirection: 'column',
                     rowGap: '2rem',
                     [theme.breakpoints.down('xl')]: {
                        margin: '2rem 0 2.75rem 0'
                     },
                     [theme.breakpoints.down('lg')]: {
                        rowGap: '1.75rem'
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
                  {list.map((label, index, arr) => (
                     <TextField
                        key={index}
                        required
                        label={label}
                        variant='standard'
                        multiline={index === arr.length - 1 ? true : false}
                        rows={index === arr.length - 1 && lgWidth ? 4 : 5}
                     />
                  ))}
               </Box>
               <PrimaryButton text='Submit Request' />
            </form>
         </Box>
      </Box>
   );
};

export default CustomForm;