import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { updateCartItems } from '../../../store/cart-thunks';

const style = {
   height: '30px',
   width: '30px',
   minHeight: 0,
   minWidth: 0,
   padding: 0,
   borderRadius: '50%'
};

const CartButtonGroup = ({ quantity, update_id }) => {
   const dispatch = useDispatch();

   return (
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
         <Button
            sx={style}
            variant='text'
            onClick={() => dispatch(updateCartItems(update_id, { quantity: --quantity }))}
         >
            <RemoveIcon sx={{ fontSize: '1rem', color: 'text.primary' }} />
         </Button>
         <Typography
            sx={theme => ({
               fontWeight: 600,
               height: '30px',
               width: '35px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               border: '1px solid #ccc',
               borderRadius: '5px',
               color: 'text.secondary',
               fontSize: '15px',
               [theme.breakpoints.down('md')]: {
                  fontSize: '12px',
                  height: '25px',
                  width: '30px'
               }
            })}
         >
            {quantity}
         </Typography>
         <Button
            sx={style}
            variant='text'
            onClick={() => dispatch(updateCartItems(update_id, { quantity: ++quantity }))}
         >
            <AddIcon sx={{ fontSize: '1rem', color: 'text.primary' }} />
         </Button>
      </Box>
   );
}

export default CartButtonGroup;