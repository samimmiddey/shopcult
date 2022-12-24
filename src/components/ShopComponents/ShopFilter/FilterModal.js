import React from 'react';
import { Box, Button, styled } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import ShopFilter from './ShopFilter';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';
import { useHistory } from 'react-router-dom';

const ActionButton = styled(Button)({
   textTransform: 'none',
   minWidth: 0,
   minHeight: 0,
   width: '100%',
   borderRadius: '5px',
   fontSize: '14px',
   height: '42.5px'
});

const FilterModal = () => {
   const showModalFilter = useSelector(state => state.ui.showModalFilter);
   const dispatch = useDispatch();
   const history = useHistory();

   const handleClear = () => {
      dispatch(uiActions.resetSelectedItems());
      dispatch(uiActions.toggleModalFilter());
      history.push('/shop/all');
   };

   const list = () => (
      <Box
         sx={{
            width: 'auto',
            height: '75vh',
            margin: '2rem 1rem 1rem 1rem',
            position: 'relative'
         }}
         role="presentation"
      >
         <Box
            sx={theme => ({
               height: '90%',
               overflow: 'auto',
               padding: '1rem 2rem 2rem 1rem',
               [theme.breakpoints.down('sm')]: {
                  padding: '1rem 8px 8px 8px'
               }
            })}
         >
            <ShopFilter />
         </Box>
         <Box
            sx={theme => ({
               position: 'absolute',
               left: 0,
               bottom: 0,
               height: '75px',
               backgroundColor: '#fff',
               display: 'flex',
               alignItems: 'center',
               columnGap: '10px',
               width: '100%',
               padding: '1rem 1rem 0 1rem',
               [theme.breakpoints.down('sm')]: {
                  padding: '1rem 8px 0 8px',
                  height: '65px'
               }
            })}
         >
            <ActionButton
               onClick={handleClear}
               variant='outlined'
            >
               Clear
            </ActionButton>
            <ActionButton
               onClick={() => dispatch(uiActions.toggleModalFilter())}
               variant='contained'
            >
               Go Back
            </ActionButton>
         </Box>
      </Box>
   );

   return (
      <Box>
         <Drawer
            anchor={'bottom'}
            open={showModalFilter}
            onClose={() => dispatch(uiActions.toggleModalFilter())}
         >
            {list('bottom')}
         </Drawer>
      </Box>
   );
}

export default FilterModal;
