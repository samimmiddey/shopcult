import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import quote from '../../assets/quote.png';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const TestimonialCard = ({ data }) => {
   return (
      <Card
         className='testimonial-curve'
         elevation={0}
         sx={theme => ({
            padding: '2rem',
            minHeight: '400px',
            height: '100%',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            [theme.breakpoints.down('xl')]: {
               minHeight: '375px'
            },
            [theme.breakpoints.down('lg')]: {
               minHeight: '350px'
            },
            [theme.breakpoints.down('md')]: {
               minHeight: '325px'
            },
            [theme.breakpoints.down('sm')]: {
               padding: '1.5rem 1rem',
               minHeight: '300px'
            }
         })}
      >
         <Box>
            <img src={quote} alt="" />
            <Box
               sx={{
                  marginTop: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  rowGap: '10px'
               }}
            >
               <Typography
                  color='text.secondary'
                  sx={theme => ({
                     textAlign: 'center',
                     color: 'text.secondary',
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '15px'
                     }
                  })}
               >
                  {data.feedback}
               </Typography>
            </Box>
         </Box>
         <Box
            sx={{
               marginTop: '10px',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               rowGap: '10px'
            }}
         >
            <Avatar
               alt="Remy Sharp"
               src={data.img}
               sx={{ width: 70, height: 70, marginTop: '10px', zIndex: 99 }}
            />
            <Typography
               sx={theme => ({
                  textAlign: 'center',
                  fontWeight: 700,
                  marginTop: '10px',
                  zIndex: 99,
                  color: '#fff',
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '15px',
                  }
               })}
            >
               {data.name}
            </Typography>
            <Box sx={{
               zIndex: 99,
               color: '#fff',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               columnGap: '8px'
            }}>
               <FacebookOutlinedIcon sx={{ fontSize: '1.25rem' }} />
               <TwitterIcon sx={{ fontSize: '1.25rem' }} />
               <LinkedInIcon sx={{ fontSize: '1.25rem' }} />
            </Box>
         </Box>
      </Card>
   );
};

export default TestimonialCard;