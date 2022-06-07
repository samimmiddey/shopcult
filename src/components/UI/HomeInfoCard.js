import React from 'react';
import { Card, Typography } from '@mui/material';
import { Box } from '@mui/system';

const HomeInfoCard = ({ data }) => {
   const { title, description, icon } = data;
   return (
      <Card
         sx={theme => ({
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: "transform 0.15s ease-in-out",
            "&:hover": {
               transform: "scale3d(1.03, 1.03, 1)",
               boxShadow: '0 2px 15px rgb(90, 57, 161)'
            },
            [theme.breakpoints.down('xl')]: {
               minHeight: '375px'
            },
            [theme.breakpoints.down('lg')]: {
               minHeight: '350px'
            }
         })}
         elevation={0}>
         <Box
            sx={{
               height: '100%',
               padding: '2rem',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'flex-start',
               justifyContent: 'center',
               rowGap: '1rem',
            }}>
            <div className='half-circle'>
               <div className='circle-icon-background'>{icon}</div>
            </div>
            <Typography variant='h6'
               sx={{ color: 'text.primary', fontWeight: 700, paddingRight: '3rem' }}
            >
               {title}
            </Typography>
            <Typography sx={theme => ({
               color: 'text.secondary',
               [theme.breakpoints.down('sm')]: {
                  fontSize: '15px'
               }
            })}>
               {description}
            </Typography>
         </Box>
      </Card>
   );
};

export default HomeInfoCard;