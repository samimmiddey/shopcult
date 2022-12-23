import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import authErrorImg from '../../assets/authError.png';
import { Button } from '@mui/material';
import { uiActions } from '../../store/ui-slice';

const style = theme => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   maxWidth: 400,
   width: '100%',
   bgcolor: 'background.paper',
   boxShadow: 24,
   padding: '2rem 1.5rem',
   borderRadius: '10px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   rowGap: '1rem',
   "&:focus": {
      outline: 'none'
   },
   [theme.breakpoints.down('sm')]: {
      padding: '2rem 1rem'
   }
});

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
            <Box sx={style}>
               <img src={authErrorImg} alt="" />
               <Box>
                  <Typography
                     color='secondary'
                     sx={{
                        fontWeight: 700,
                        textAlign: 'center',
                        marginBottom: '5px',
                        fontSize: '1.5rem'
                     }}
                  >
                     Oh Snap!
                  </Typography>
                  <Typography
                     color='primary'
                     sx={{
                        fontSize: '16px',
                        textAlign: 'center',
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