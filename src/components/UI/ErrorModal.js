import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import authErrorImg from '../../assets/authError.png'
import { Button } from '@mui/material';
import { uiActions } from '../../store/ui-slice';

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
   rowGap: '1rem'
};

const ErrorModal = ({ errorModal, errorModalText }) => {
   const dispatch = useDispatch();

   return (
      <Box>
         <Modal
            sx={{
               margin: '0 1rem'
            }}
            open={errorModal}
            onClose={() => dispatch(uiActions.setErrorModal(false))}
         >
            <Box sx={{
               ...style,
               "&:focus": {
                  outline: 'none'
               }
            }}>
               <img src={authErrorImg} alt="" />
               <Box>
                  <Typography
                     variant='h6'
                     sx={{
                        fontWeight: '600',
                        textAlign: 'center',
                        marginBottom: '5px',
                        color: 'text.primary'
                     }}
                  >
                     Oh Snap!
                  </Typography>
                  <Typography
                     sx={{
                        fontSize: '16px',
                        fontWeight: '300',
                        textAlign: 'center',
                        color: 'text.secondary'
                     }}
                  >
                     {errorModalText}
                  </Typography>
               </Box>
               <Button
                  onClick={() => dispatch(uiActions.setErrorModal(false))}
                  color='primary'
                  variant='contained'
                  sx={{
                     textTransform: 'none',
                     marginTop: '5px'
                  }}
               >
                  Dismiss
               </Button>
            </Box>
         </Modal>
      </Box>
   );
}

export default ErrorModal;