import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from '../UI/ProgressBar';
import UserProfile from './UserProfile/UserProfile';

const ProfileComponents = () => {
   const [loading, setLoading] = useState(true);
   const user = JSON.parse(useSelector(state => state.auth.authUser));
   const navbarProgress = useSelector(state => state.ui.navbarProgress);

   useEffect(() => {
      if (user) {
         setLoading(false);
      }
   }, [user]);

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
         {(loading || navbarProgress) && <ProgressBar />}
         {!loading && !navbarProgress && <UserProfile />}
      </Box>
   );
};

export default ProfileComponents;