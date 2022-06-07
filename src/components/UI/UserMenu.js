import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth-thunk';

const UserMenu = () => {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const userData = useSelector(state => state.auth.userData);
   const open = Boolean(anchorEl);
   const dispatch = useDispatch();

   const handleLogout = async () => {
      await dispatch(logout());
   }

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <React.Fragment>
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
                        width: 30,
                        height: 30
                     }}
                     src={userData.img || ''}
                  >
                     {userData.img || `${userData.firstName.slice(0, 1).toUpperCase()}`}
                  </Avatar>
               </IconButton>
            </Tooltip>
         </Box>
         <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
               elevation: 0,
               sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                     width: 32,
                     height: 32,
                     ml: -0.5,
                     mr: 1,
                  },
                  '&:before': {
                     content: '""',
                     display: 'block',
                     position: 'absolute',
                     top: 0,
                     right: 14,
                     width: 10,
                     height: 10,
                     bgcolor: 'background.paper',
                     transform: 'translateY(-50%) rotate(45deg)',
                     zIndex: 0,
                  },
               },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            <Link to='/orderhistory'>
               <MenuItem sx={{ paddingTop: '6px', paddingBottom: '6px' }}>
                  <ListItemIcon>
                     <HistoryOutlinedIcon color='primary' fontSize="small" />
                  </ListItemIcon>
                  <Typography sx={{ fontSize: '15px', fontWeight: 600, color: 'text.secondary' }}>Order History</Typography>
               </MenuItem>
            </Link>
            <Link to='/profile'>
               <MenuItem sx={{ paddingTop: '6px', paddingBottom: '6px' }}>
                  <ListItemIcon>
                     <AccountCircleOutlinedIcon color='primary' fontSize="small" />
                  </ListItemIcon>
                  <Typography sx={{ fontSize: '15px', fontWeight: 600, color: 'text.secondary' }}>Profile</Typography>
               </MenuItem>
            </Link>
            <Divider sx={{ margin: '6px 0' }} />
            <MenuItem onClick={handleLogout} sx={{ paddingTop: '6px', paddingBottom: '6px' }}>
               <ListItemIcon>
                  <Logout color='primary' fontSize="small" />
               </ListItemIcon>
               <Typography sx={{ fontSize: '15px', fontWeight: 600, color: 'text.secondary' }}>Logout</Typography>
            </MenuItem>
         </Menu>
      </React.Fragment>
   );
}

export default UserMenu;