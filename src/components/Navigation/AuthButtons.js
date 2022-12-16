import { Button, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';

const AuthButtons = () => {
   const userData = useSelector(state => state.auth.userData);

   return (
      <Box>
         {!userData &&
            <>
               <Link to='/login'>
                  <Button
                     size='small'
                     sx={theme => ({
                        textTransform: 'none',
                        transition: '0.5s',
                        whiteSpace: 'nowrap',
                        minWidth: 'auto',
                        padding: '5px 12px',
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
                     Login
                  </Button>
               </Link>
            </>
         }
         {
            userData &&
            <UserMenu />
         }
      </Box >
   );
};

export default AuthButtons;