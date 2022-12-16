import React, { useState } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, useMediaQuery } from '@mui/material';
import { applyDiscount } from '../../../../../store/product-thunks';
import ProgressButton from '../../../../UI/ProgressButton';

const ReviewProducts = () => {
   const [inputValue, setInputValue] = useState('');
   const [feedback, setFeedback] = useState({ type: '', value: false });
   const checkoutToken = useSelector(state => state.checkout.checkoutToken);
   const discountProgress = useSelector(state => state.checkout.discountProgress);

   const dispatch = useDispatch();

   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   const handleApplyDiscount = async () => {
      if (inputValue.trim() === '') {
         setFeedback({ type: 'empty', value: true });
         return;
      }

      if (inputValue.trim() !== 'SHOPCULT') {
         setFeedback({ type: 'invalid', value: true });
         return;
      }

      await dispatch(applyDiscount(checkoutToken.id, { code: inputValue }));
      setFeedback({ type: 'valid', value: true });
      setInputValue('');
   }

   return (
      <Box
         sx={{
            textAlign: 'start',
            marginTop: '3rem',
         }}
      >
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               rowGap: '1.5rem',
               height: '200px',
               overflowY: 'auto'
            }}
         >
            {checkoutToken.line_items.map((item, index) => (
               <Box
                  key={index}
                  sx={{
                     display: 'flex',
                     alignItems: 'flex-start',
                     justifyContent: 'space-between',
                     marginRight: '1rem'
                  }}
               >
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '1rem'
                     }}
                  >
                     {
                        !smWidth &&
                        <Box
                           sx={{
                              height: '40px',
                              width: '40px',
                              borderRadius: '50%'
                           }}
                        >
                           <img
                              style={{
                                 height: '100%',
                                 width: '100%',
                                 borderRadius: '50%',
                                 objectFit: 'cover'
                              }}
                              src={item.image.url}
                              alt=""
                           />
                        </Box>}
                     <Box>
                        <Typography
                           sx={theme => ({
                              fontWeight: 600,
                              [theme.breakpoints.down(1300)]: {
                                 fontSize: '14px'
                              }
                           })}
                        >
                           {item.product_name}
                        </Typography>
                        <Typography
                           sx={theme => ({
                              fontSize: '14px'
                           })}
                        >
                           Quantity : {item.quantity}
                        </Typography>
                     </Box>
                  </Box>
                  <Typography
                     sx={theme => ({
                        fontWeight: 600,
                        [theme.breakpoints.down(1300)]: {
                           fontSize: '14px'
                        }
                     })}
                  >
                     {item.line_total.formatted_with_symbol}
                  </Typography>
               </Box>
            ))}
         </Box>
         <Divider sx={{ margin: '1.5rem 0' }} />
         {/* Coupon Box */}
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'flex-start',
               rowGap: '1rem',
               width: '100%'
            }}
         >
            <Box sx={{ width: '100%' }}>
               <Typography
                  sx={{
                     fontWeight: 600,
                     color: 'text.primary',
                     fontSize: '12px',
                     textTransform: 'uppercase',
                     marginBottom: '1rem'
                  }}
               >
                  Promo Code
               </Typography>
               <TextField
                  sx={{ width: '100%' }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  id="outlined-basic"
                  label="Enter Your Code"
                  variant="outlined"
                  size='small'
                  inputProps={{ style: { fontSize: '16px', fontWeight: 500 } }}
                  InputLabelProps={{ style: { fontSize: '13px', fontWeight: 500 } }}
               />
               <Typography
                  sx={{
                     fontSize: '12px',
                     fontWeight: 600,
                     marginTop: '5px',
                     color: (feedback.value && feedback.type === 'empty') ||
                        (feedback.value && feedback.type === 'invalid') ? 'red' :
                        feedback.value && feedback.type === 'valid' ? 'green' :
                           'text.disabled'
                  }}
               >
                  {
                     feedback.value && feedback.type === 'empty' ? 'Field can not be empty' :
                        feedback.value && feedback.type === 'invalid' ? 'Invalid coupon code. Type SHOPCULT' :
                           feedback.value && feedback.type === 'valid' ? 'Discount successfully applied' :
                              'Type SHOPCULT to get a discount'
                  }
               </Typography>
            </Box>
            <Button
               onClick={handleApplyDiscount}
               variant='outlined'
               size='medium'
               sx={{
                  minHeight: 0,
                  minWidth: 0,
                  height: '40px',
                  textTransform: 'none',
                  width: '100%',
                  marginBottom: '5px'
               }}
            >
               {discountProgress ? <ProgressButton loading={discountProgress} /> : 'Apply'}
            </Button>
         </Box>
         <Divider sx={{ margin: '1.5rem 0' }} />
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
               sx={theme => ({
                  fontWeight: 600,
                  [theme.breakpoints.down(1300)]: {
                     fontSize: '14px'
                  }
               })}
            >
               Grand Total
            </Typography>
            <Typography
               sx={theme => ({
                  fontWeight: 600,
                  [theme.breakpoints.down(1300)]: {
                     fontSize: '14px'
                  }
               })}
            >
               {checkoutToken.live.total.formatted_with_symbol}
            </Typography>
         </Box>
      </Box>
   );
};

export default ReviewProducts;