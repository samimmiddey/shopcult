import React from 'react';
import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { updateCartItems } from '../../../store/cart-thunks';

const CartButtonGroup = ({ quantity, update_id }) => {
   const dispatch = useDispatch();

   return (
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
         <IconButton size='small' variant='text'
            onClick={() => dispatch(updateCartItems(update_id, { quantity: --quantity }))}
         >
            <RemoveIcon sx={{ fontSize: '1rem', color: 'text.primary' }} />
         </IconButton>
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
         <IconButton size='small' variant='text'
            onClick={() => dispatch(updateCartItems(update_id, { quantity: ++quantity }))}
         >
            <AddIcon sx={{ fontSize: '1rem', color: 'text.primary' }} />
         </IconButton>
      </Box>
   );
}

export default CartButtonGroup;