import React from 'react';
import { Box, Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import ShopFilter from '../ShopComponents/ShopFilter/ShopFilter';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { useHistory } from 'react-router-dom';

const FilterBottomModal = () => {
   const showModalFilter = useSelector(state => state.ui.showModalFilter);
   const selectedItems = useSelector(state => state.ui.selectedItems);
   const categoryClick = useSelector(state => state.ui.categoryClick);
   const dispatch = useDispatch();
   const history = useHistory();

   const handleClear = () => {
      dispatch(uiActions.resetSelectedItems());
      history.push('/shop/all');
   };

   const list = () => (
      <Box
         sx={{ width: 'auto', height: '100vh', padding: '2rem 0 0 2rem' }}
         role="presentation"
      >
         <Box sx={{ height: '90%', overflow: 'auto', padding: '2rem 2rem 2rem 0' }}>
            <ShopFilter />
         </Box>
         <Box
            sx={{
               padding: '2rem 2rem 0 0',
               display: 'flex',
               justifyContent: 'flex-end',
               columnGap: '10px'
            }}
         >
            <Button
               onClick={handleClear}
               sx={theme => ({
                  textTransform: 'none',
                  minWidth: 0,
                  minHeight: 0,
                  width: '100%',
                  padding: '14px 2rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'none',
                  borderColor: 'rgb(155, 102, 216)',
                  color: 'rgb(90, 57, 161)',
                  "&:hover": {
                     borderColor: 'rgb(155, 102, 216)'
                  },
                  [theme.breakpoints.down('lg')]: {
                     padding: '0.5rem 1.25rem',
                     borderRadius: '5px'
                  },
                  [theme.breakpoints.down('md')]: {
                     fontSize: '14px',
                  }
               })}
               variant='outlined'
            >
               Clear
            </Button>
            <Button
               onClick={() => dispatch(uiActions.toggleModalFilter())}
               sx={theme => ({
                  textTransform: 'none',
                  minWidth: 0,
                  minHeight: 0,
                  width: '100%',
                  padding: '14px 2rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: 'rgb(213, 200, 240)',
                  transition: '0.5s',
                  "&:hover": {
                     backgroundPosition: 'right center'
                  },
                  [theme.breakpoints.down('lg')]: {
                     padding: '0.5rem 1.25rem',
                     borderRadius: '5px',
                  },
                  [theme.breakpoints.down('md')]: {
                     fontSize: '14px',
                  }
               })}
               className={selectedItems.length >= 1 || categoryClick ? 'primary-button' : ''}
               variant='contained'
               disabled={selectedItems.length >= 1 || categoryClick ? false : true}
            >
               Apply
            </Button>
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

export default FilterBottomModal;
