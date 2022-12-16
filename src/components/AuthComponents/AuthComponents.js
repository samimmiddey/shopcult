import { Box, IconButton } from '@mui/material';
import React from 'react';
import Signup from './AuthForm/Signup';
import auth from '../../assets/auth.svg';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Login from './AuthForm/Login';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const AuthComponents = () => {
   const { pathname } = useLocation();
   const history = useHistory();

   return (
      <Box sx={{ postion: 'relative' }}>
         <IconButton
            onClick={history.goBack}
            sx={theme => ({
               position: 'absolute',
               top: '5%',
               left: '5%',
               [theme.breakpoints.down('md')]: {
                  top: '3%',
                  left: '4%'
               }
            })}
         >
            <KeyboardBackspaceIcon
               sx={{
                  fontSize: '2rem',
               }}
               color='primary'
            />
         </IconButton>
         <Box
            className='container'
            sx={theme => ({
               padding: '0 2rem',
               display: 'flex',
               alignItems: 'center',
               height: '100vh',
               columnGap: '5rem',
               [theme.breakpoints.down('xl')]: {
                  columnGap: '4rem',
               },
               [theme.breakpoints.down('lg')]: {
                  columnGap: '3rem',
               },
               [theme.breakpoints.down('md')]: {
                  flexDirection: 'column',
                  columnGap: 0,
                  rowGap: '3rem',
                  margin: '5rem 0'
               }
            })}
         >
            <Box sx={theme => ({
               flex: 1,
               [theme.breakpoints.down('md')]: {
                  flex: 'none',
                  maxWidth: '300px',
                  width: '100%'
               },
               [theme.breakpoints.down('sm')]: {
                  maxWidth: '200px'
               }
            })}>
               <img
                  style={{
                     height: '100%',
                     width: '100%',
                     objectFit: 'cover'
                  }}
                  src={auth}
                  alt="Auth"
               />
            </Box>
            <Box
               sx={theme => ({
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  [theme.breakpoints.down('md')]: {
                     flex: 'none',
                     width: '100%'
                  }
               })}
            >
               {pathname === '/signup' && <Signup />}
               {pathname === '/login' && <Login />}
            </Box>
         </Box>
      </Box >
   );
};

export default AuthComponents;