import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { useSelector } from 'react-redux';
import authErrorImg from '../../assets/authError.png'
import { Button } from '@mui/material';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   maxWidth: 400,
   width: '100%',
   bgcolor: 'background.paper',
   boxShadow: 24,
   padding: '2rem',
   borderRadius: '10px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   rowGap: '1.5rem'
};

const AuthErrorModal = () => {
   const authError = useSelector(state => state.auth.authErrorModal);
   const errorMessage = useSelector(state => state.auth.authError);
   const dispatch = useDispatch();

   return (
      <Box>
         <Modal
            sx={{
               margin: '0 1rem'
            }}
            open={authError}
            onClose={() => dispatch(authActions.setAuthErrorModal(false))}
         >
            <Box sx={{
               ...style,
               "&:focus": {
                  outline: 'none'
               }
            }}>
               <img src={authErrorImg} alt="" />
               <Box>
                  <Typography variant='h6' sx={{ fontWeight: '500', textAlign: 'center', marginBottom: '5px' }}>
                     Oh Snap!
                  </Typography>
                  <Typography sx={{ fontSize: '16px', fontWeight: '300', textAlign: 'center' }}>
                     {errorMessage}
                  </Typography>
               </Box>
               <Button
                  onClick={() => dispatch(authActions.setAuthErrorModal(false))}
                  color='primary'
                  variant='contained'
                  disableElevation
                  sx={{
                     textTransform: 'none'
                  }}
               >
                  Dismiss
               </Button>
            </Box>
         </Modal>
      </Box>
   );
}

export default AuthErrorModal;