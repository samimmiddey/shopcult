import React from 'react';
import { Box } from '@mui/material';
import UserProfile from './UserProfile/UserProfile';

const ProfileComponents = () => {
   return (
      <Box
         sx={theme => ({
            maxWidth: '1072px',
            padding: '80px 24px 0 24px',
            margin: '0 auto',
            marginTop: '5.5rem',
            [theme.breakpoints.down('lg')]: {
               marginTop: '3.5rem'
            },
            [theme.breakpoints.down('md')]: {
               marginTop: '2.5rem'
            },
            [theme.breakpoints.down('sm')]: {
               padding: '80px 16px 0 16px',
               marginTop: '2rem'
            }
         })}
      >
         <UserProfile />
      </Box>
   );
};

export default ProfileComponents;