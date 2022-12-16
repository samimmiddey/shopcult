import React from 'react';
import { Box } from '@mui/material';
import UserProfile from './UserProfile/UserProfile';

const ProfileComponents = () => {
   return (
      <Box
         className='container'
         sx={theme => ({
            padding: '80px 32px 0 32px',
            [theme.breakpoints.down('sm')]: {
               paddingLeft: '16px',
               paddingRight: '16px'
            }
         })}
      >
         <UserProfile />
      </Box>
   );
};

export default ProfileComponents;