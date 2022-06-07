import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Box, IconButton } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import CloseIcon from '@mui/icons-material/Close';
import { useTheme, useMediaQuery } from '@mui/material';

const SuccessSnackbar = () => {
   const open = useSelector(state => state.ui.showSnackbar);
   const snackbarText = useSelector(state => state.ui.snackbarText);
   const snackbarToggle = useSelector(state => state.ui.snackbarToggle);
   const dispatch = useDispatch();

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   const [snackPack, setSnackPack] = useState([]);
   const [messageInfo, setMessageInfo] = useState(undefined);

   useEffect(() => {
      if (snackbarText) {
         setSnackPack((prev) => [...prev, { message: 'Message A', key: new Date().getTime() }]);
      }
   }, [snackbarText, snackbarToggle]);

   useEffect(() => {
      if (snackPack.length && !messageInfo) {
         // Set a new snack when we don't have an active one
         setMessageInfo({ ...snackPack[0] });
         setSnackPack((prev) => prev.slice(1));
         dispatch(uiActions.setShowSnackbar({ value: true, text: snackbarText }));
      } else if (snackPack.length && messageInfo && open) {
         // Close an active snack when a new one is added
         dispatch(uiActions.setShowSnackbar({ value: false, text: snackbarText }));
      }
   }, [snackPack, messageInfo, open, dispatch, snackbarText]);

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      dispatch(uiActions.setShowSnackbar({ value: false, text: snackbarText }));
   };

   const handleExited = () => {
      setMessageInfo(undefined);
   };

   return (
      <Box>
         <Snackbar
            ContentProps={{
               sx: {
                  background: 'rgb(90, 57, 161)',
                  margin: smWidth ? '0 0.5rem 0.5rem 0.5rem' : '0',
               }
            }}
            key={messageInfo ? messageInfo.key : undefined}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            TransitionProps={{ onExited: handleExited }}
            message={snackbarText ? snackbarText : undefined}
            action={
               <React.Fragment>
                  <IconButton
                     aria-label="close"
                     color="inherit"
                     sx={{ p: 0.5 }}
                     onClick={handleClose}
                  >
                     <CloseIcon />
                  </IconButton>
               </React.Fragment>
            }
         />
      </Box>
   );
}

export default SuccessSnackbar;