import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ViewListIcon from '@mui/icons-material/ViewList';
import { logout } from '../../store/auth-thunk';
import { useSelector } from 'react-redux';
import ProgressButton from '../UI/ProgressButton';

export const userProfileData = [
   {
      icon: <PersonIcon style={{ fontSize: '1.3rem' }} />,
      title: 'Profile',
      path: '/profile',
      desc: 'My Profile'
   },
   {
      icon: <ViewListIcon style={{ fontSize: '1.3rem' }} />,
      title: 'Orders',
      path: '/orderhistory',
      desc: 'Order History'
   }
];

const UserProfile = ({ anchorEl, open, userData, handleClose }) => {
   const authProgress = useSelector(state => state.auth.authProgress);

   const dispatch = useDispatch();

   const theme = useTheme();
   const lgWidth = useMediaQuery(theme.breakpoints.down('lg'));
   const mobileWidth = useMediaQuery(theme.breakpoints.down('xs'));

   return (
      <Menu
         anchorEl={anchorEl}
         open={open}
         onClose={handleClose}
         PaperProps={{
            elevation: 0,
            sx: {
               overflow: 'visible',
               padding: lgWidth && !mobileWidth ? '10px 23px' : lgWidth && mobileWidth ? '10px 20px' : '12px 25px',
               filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.075))',
               mt: 1.5,
               '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
               },
               '&:before': {
                  content: '""',
                  display: mobileWidth ? 'none' : 'block',
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
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between'
            }}
         >
            <Typography
               sx={theme => ({
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  [theme.breakpoints.down('lg')]: {
                     fontSize: '1rem'
                  }
               })}
            >
               User Profile
            </Typography>
            <IconButton
               size='medium'
               onClick={handleClose}
            >
               <CloseOutlinedIcon sx={{ color: 'primary.main' }} />
            </IconButton>
         </Box>
         <Box
            sx={theme => ({
               display: 'flex',
               alignItems: 'center',
               columnGap: '16px',
               padding: '14px 1rem 15px 1rem',
               [theme.breakpoints.down('lg')]: {
                  columnGap: '14px',
                  padding: '10px 1rem 15px 1rem'
               },
               [theme.breakpoints.down('sm')]: {
                  columnGap: '14px',
                  padding: '6px 1rem 15px 1rem'
               },
               [theme.breakpoints.down(375)]: {
                  columnGap: 0,
                  flexDirection: 'column',
                  rowGap: '10px',
                  textAlign: 'center'
               }
            })}
         >
            <img
               alt='profile'
               style={{
                  height: '60px',
                  width: '60px',
                  objectFit: 'cover',
                  borderRadius: '50%'
               }}
               src={userData.img || ''}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
               <Typography
                  className='profile-text-wrap'
                  sx={theme => ({
                     fontSize: '1rem',
                     maxWidth: '200px',
                     fontWeight: 600,
                     color: 'text.primary',
                     [theme.breakpoints.down('lg')]: {
                        fontSize: '15px'
                     },
                     [theme.breakpoints.down(325)]: {
                        fontSize: '14px'
                     }
                  })}
               >
                  {userData.firstName + " " + userData.lastName}
               </Typography>
               <Typography
                  className='profile-text-wrap'
                  sx={theme => ({
                     color: 'text.secondary',
                     maxWidth: '200px',
                     fontSize: '14px',
                     fontWeight: 500,
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '13px'
                     }
                  })}
               >
                  {userData.email}
               </Typography>
            </Box>
         </Box>
         {userProfileData.map((item, index) => (
            <Link to={item.path} key={index}>
               <Box>
                  <>
                     <Box>
                        <MenuItem
                           onClick={handleClose}
                           sx={theme => ({
                              width: '325px',
                              padding: '15px',
                              [theme.breakpoints.down('lg')]: {
                                 padding: '14px'
                              },
                              [theme.breakpoints.down(400)]: {
                                 width: '300px'
                              },
                              [theme.breakpoints.down(375)]: {
                                 width: '275px'
                              },
                              [theme.breakpoints.down(350)]: {
                                 width: '250px'
                              },
                              [theme.breakpoints.down(325)]: {
                                 width: '225px'
                              },
                              [theme.breakpoints.down(300)]: {
                                 width: '200px'
                              }
                           })}
                        >
                           <Box
                              sx={theme => ({
                                 display: 'flex',
                                 alignItems: 'center',
                                 columnGap: '16px',
                                 [theme.breakpoints.down('lg')]: {
                                    columnGap: '14px'
                                 }
                              })}
                           >
                              <Button
                                 variant='contained'
                                 disableElevation
                                 sx={{
                                    minWidth: '42px',
                                    minHeight: '42px',
                                    padding: 0,
                                    borderRadius: '10px',
                                    backgroundColor: '#5a39a120',
                                    color: 'primary.main',
                                    '&:hover': {
                                       backgroundColor: '#5a39a120',
                                       opacity: 0.8
                                    }
                                 }}
                              >
                                 {item.icon}
                              </Button>
                              <Box>
                                 <Typography
                                    sx={theme => ({
                                       color: 'text.primary',
                                       fontWeight: 600,
                                       fontSize: '15px',
                                       [theme.breakpoints.down(350)]: {
                                          fontSize: '14px'
                                       }
                                    })}
                                 >
                                    {item.title}
                                 </Typography>
                                 <Typography
                                    sx={theme => ({
                                       color: 'text.secondary',
                                       fontSize: '14px',
                                       [theme.breakpoints.down(350)]: {
                                          fontSize: '13px'
                                       }
                                    })}
                                 >
                                    {item.desc}
                                 </Typography>
                              </Box>
                           </Box>
                        </MenuItem>
                     </Box>
                     {index !== userProfileData.length - 1 && <Divider sx={{ margin: '0' }} />}
                  </>
               </Box>
            </Link>
         ))}
         <Box
            onClick={() => {
               handleClose();
               dispatch(logout());
            }}
            sx={theme => ({
               margin: '14px 0 8px 0',
               [theme.breakpoints.down('lg')]: {
                  marginTop: '12px'
               }
            })}
         >
            <Button
               color='primary'
               variant='contained'
               disabled={authProgress}
               disableElevation
               sx={{
                  minHeight: 0,
                  minWidth: 0,
                  height: '45px',
                  width: '100%',
                  textTransform: 'none',
                  [theme.breakpoints.down('md')]: {
                     marginTop: '1.25rem'
                  },
                  [theme.breakpoints.down('sm')]: {
                     marginTop: '1rem'
                  }
               }}
            >
               {authProgress ? <ProgressButton loading={authProgress} /> : 'Sign out'}
            </Button>
         </Box>
      </Menu>
   );
};

export default UserProfile;