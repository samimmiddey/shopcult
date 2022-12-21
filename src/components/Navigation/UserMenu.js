import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
import ProfileCard from './ProfileCard';
import avatar from '../../assets/avatar.png';

const UserMenu = () => {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const userData = useSelector(state => state.auth.userData);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <>
         <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="My Account">
               <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
               >
                  <Avatar
                     sx={{
                        width: 36,
                        height: 36
                     }}
                     src={userData.img || avatar}
                  />
               </IconButton>
            </Tooltip>
         </Box>
         <ProfileCard
            anchorEl={anchorEl}
            open={open}
            userData={userData}
            handleClose={handleClose}
         />
      </>
   );
}

export default UserMenu;