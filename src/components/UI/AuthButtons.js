import { Button, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/auth-thunk';
import UserMenu from './UserMenu';
import { useTheme, useMediaQuery } from '@mui/material';

const AuthButtons = () => {
   const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
   const dispatch = useDispatch();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   const handleLogout = async () => {
      await dispatch(logout());
   }

   return (
      <Box
         sx={theme => ({
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
            [theme.breakpoints.down('md')]: {
               flexDirection: 'column',
               alignItems: 'flex-start',
               marginTop: '1rem',
               marginLeft: '2rem',
               rowGap: '8px',
            }
         })}
      >
         {!isLoggedIn &&
            <>
               <Link to='/login'>
                  <Button
                     size='small'
                     sx={theme => ({
                        fontSize: '14px',
                        fontWeight: 500,
                        textTransform: 'none',
                        color: 'rgb(132, 76, 196)',
                        [theme.breakpoints.down('sm')]: {
                           minWidth: 0,
                           minHeight: 0,
                           padding: '5px 10px'
                        }
                     })}
                     variant='text'
                  >
                     Login
                  </Button>
               </Link>
               <Link to='/signup'>
                  <Button
                     size='small'
                     sx={theme => ({
                        textTransform: 'none',
                        transition: '0.5s',
                        whiteSpace: 'nowrap',
                        minWidth: 'auto',
                        "&:hover": {
                           backgroundPosition: 'right center'
                        },
                        [theme.breakpoints.down('sm')]: {
                           minWidth: 0,
                           minHeight: 0,
                           padding: '5px 10px'
                        }
                     })}
                     className='primary-button'
                     disableElevation
                     variant='contained'
                  >
                     Sign Up
                  </Button>
               </Link>
            </>
         }
         {isLoggedIn && !mdWidth &&
            <UserMenu />
         }
         {isLoggedIn &&
            <Button
               onClick={handleLogout}
               sx={theme => ({
                  textTransform: 'none',
                  [theme.breakpoints.down('sm')]: {
                     minWidth: 0,
                     minHeight: 0,
                     padding: '5px 10px'
                  }
               })}
               color='primary'
               disableElevation
               variant='outlined'
               size='small'
            >
               Logout
            </Button>
         }
      </Box >
   );
};

export default AuthButtons;