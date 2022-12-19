import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import AboutPointsData from '../../../data/AboutPointsData';

const AboutPoints = () => {
   return (
      <Box
         className='gradient-background'
         sx={theme => ({
            borderRadius: '30px',
            [theme.breakpoints.down('lg')]: {
               borderRadius: '20px'
            },
            [theme.breakpoints.down('sm')]: {
               borderRadius: '10px'
            }
         })}
      >
         <Box
            className='section-margin'
            sx={theme => ({
               maxWidth: '1450px',
               padding: '7rem 1rem',
               color: 'rgb(196, 174, 243)',
               [theme.breakpoints.down('xl')]: {
                  padding: '5rem 1rem'
               },
               [theme.breakpoints.down('lg')]: {
                  padding: '4rem 1rem'
               },
               [theme.breakpoints.down('md')]: {
                  padding: '3.5rem 1rem'
               },
               [theme.breakpoints.down('sm')]: {
                  padding: '3rem 1rem'
               }
            })}
         >
            <Box
               sx={theme => ({
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '1rem',
                  paddingLeft: '4rem',
                  [theme.breakpoints.down('lg')]: {
                     paddingLeft: '3rem'
                  },
                  [theme.breakpoints.down('md')]: {
                     paddingLeft: '2rem'
                  },
                  [theme.breakpoints.down('sm')]: {
                     paddingLeft: '1rem'
                  }
               })}
            >
               <Divider sx={{ width: '40px', borderBottom: '2px solid rgb(196, 174, 243)' }} />
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
                  VALUES
               </Typography>
            </Box>
            <Box sx={{ marginTop: '2rem' }}>
               <Grid
                  sx={theme => ({
                     rowGap: '4rem',
                     [theme.breakpoints.down('lg')]: {
                        rowGap: '3rem'
                     },
                     [theme.breakpoints.down('md')]: {
                        rowGap: '2rem'
                     },
                     [theme.breakpoints.down('sm')]: {
                        rowGap: '1rem'
                     }
                  })}
                  container>
                  {AboutPointsData.map((data, index) => (
                     <Grid sx={theme => ({
                        padding: '1rem 4rem',
                        [theme.breakpoints.down('lg')]: {
                           padding: '1rem 3rem'
                        },
                        [theme.breakpoints.down('md')]: {
                           padding: '1rem 2rem'
                        },
                        [theme.breakpoints.down('sm')]: {
                           padding: '1rem'
                        }
                     })} key={index} item xs={12} sm={6}>
                        <Box
                           sx={theme => ({
                              display: 'flex',
                              alignItems: 'flex-start',
                              columnGap: '2rem',
                              [theme.breakpoints.down('md')]: {
                                 columnGap: '1.5rem'
                              }
                           })}
                        >
                           <Typography
                              variant='h6'
                              sx={theme => ({
                                 fontSize: '20px',
                                 fontWeight: 600,
                                 lineHeight: '45px',
                                 [theme.breakpoints.down('lg')]: {
                                    fontSize: '18px',
                                    lineHeight: '33px'
                                 },
                                 [theme.breakpoints.down('sm')]: {
                                    fontSize: '16px'
                                 }
                              })}
                           >{data.index}
                           </Typography>
                           <Box
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'flex-start',
                                 rowGap: '1rem'
                              }}
                           >
                              <Typography
                                 variant='h6'
                                 sx={theme => ({
                                    fontSize: '2rem',
                                    [theme.breakpoints.down('lg')]: {
                                       fontSize: '1.5rem'
                                    }
                                 })}
                              >
                                 {data.title}
                              </Typography>
                              <Typography
                                 sx={theme => ({
                                    fontSize: '20px',
                                    [theme.breakpoints.down('lg')]: {
                                       fontSize: '18px'
                                    },
                                    [theme.breakpoints.down('sm')]: {
                                       fontSize: '16px'
                                    }
                                 })}
                              >{data.text}</Typography>
                           </Box>
                        </Box>
                     </Grid>
                  ))
                  }
               </Grid>
            </Box>
            <Box>

            </Box>
         </Box>
      </Box >
   );
};

export default AboutPoints;