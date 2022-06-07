import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorComponent = ({ error }) => {
   return (
      <Box
         sx={theme => ({
            padding: '80px 32px 0 32px',
            [theme.breakpoints.down('sm')]: {
               paddingLeft: '16px',
               paddingRight: '16px'
            }
         })}
      >
         <Card
            elevation={0}
            sx={theme => ({
               backgroundColor: '#f0ecf8',
               margin: '8rem auto 0 auto',
               maxWidth: '900px',
               width: '100%',
               textAlign: 'center',
               padding: '3rem 2rem',
               [theme.breakpoints.down('xl')]: {
                  marginTop: '6rem'
               },
               [theme.breakpoints.down('lg')]: {
                  marginTop: '4rem'
               },
               [theme.breakpoints.down('md')]: {
                  marginTop: '2rem'
               },
               [theme.breakpoints.down('sm')]: {
                  padding: '2rem 1rem'
               }
            })}
         >
            <Box sx={theme => ({
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               rowGap: '10px',
               [theme.breakpoints.down('sm')]: {
                  rowGap: '5px',
               }
            })}>
               <ErrorOutlineIcon
                  sx={theme => ({
                     fontSize: '3rem',
                     color: 'rgb(132, 76, 196)',
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '2.5rem',
                        marginBottom: '10px'
                     }
                  })}
               />
               <Typography
                  color='secondary'
                  variant='h4'
                  sx={theme => ({
                     fontWeight: 700,
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '1.5rem'
                     }
                  })}
               >
                  Error
               </Typography>
               <Typography
                  color='primary'
                  sx={theme => ({
                     fontSize: '15px',
                     fontWeight: 600,
                     marginTop: '5px',
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '14px',
                        marginTop: 0,
                     }
                  })}
               >
                  {error}
               </Typography>
            </Box>
         </Card>
      </Box>
   );
};

export default ErrorComponent;