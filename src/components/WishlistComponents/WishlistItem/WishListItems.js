import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Button, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { wishlistActions } from '../../../store/wishlist-slice';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from 'react-router-dom';
import { uiActions } from '../../../store/ui-slice';
import { addToCart } from '../../../store/cart-thunks';

const WishlistItems = ({ product, path }) => {
   const dispatch = useDispatch();

   const theme = useTheme();
   const xsWidth = useMediaQuery(theme.breakpoints.down(500));

   const num = Math.floor(product.price.raw * 6);
   const rating = String(num).charAt(0) + '.' + String(num).charAt(1);

   return (
      <MenuItem
         sx={{
            border: '1px solid transparent',
            boxShadow: 'rgb(90 114 123 / 11%) 0px 7px 30px 0px',
            padding: '16px 20px',
            borderRadius: '10px',
            width: '100%',
            position: 'relative',
            '&:hover': {
               border: '1px solid #eceff1',
               boxShadow: 'none'
            }
         }}
      >
         <Link to={path} style={{ width: '100%' }}>
            <Box
               sx={theme => ({
                  display: 'flex',
                  alignItems: 'flex-start',
                  columnGap: '1rem',
                  width: '100%',
                  [theme.breakpoints.down(500)]: {
                     flexDirection: 'column',
                     rowGap: '10px'
                  }
               })}
            >
               <Avatar
                  src={product.image.url}
                  alt='product'
                  variant={xsWidth ? 'rounded' : 'square'}
                  sx={theme => ({
                     width: 125,
                     height: 105,
                     borderRadius: '10px',
                     [theme.breakpoints.down(500)]: {
                        height: 65,
                        width: 65,
                        borderRadius: '50%'
                     }
                  })}
               />
               <Box
                  sx={theme => ({
                     width: '70%',
                     [theme.breakpoints.down('md')]: {
                        width: '60%'
                     },
                     [theme.breakpoints.down(500)]: {
                        width: '90%'
                     }
                  })}
               >
                  <Typography
                     className='wishlist-text-wrap'
                     sx={theme => ({
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'text.primary',
                        [theme.breakpoints.down('sm')]: {
                           fontSize: '14px'
                        }
                     })}
                  >
                     {product.name}
                  </Typography>
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '5px',
                        margin: '3px 0 5px 0'
                     }}
                  >
                     <Typography
                        sx={{
                           fontSize: '12px',
                           color: '#fff',
                           padding: '0 6px',
                           borderRadius: '3px',
                           backgroundColor: '#00b3b3'
                        }}
                     >
                        {rating >= 5 ? '5.0' : rating}
                     </Typography>
                     <Typography
                        variant='h6'
                        sx={{
                           fontSize: '12px',
                           color: 'text.disabled'
                        }}
                     >
                        ({Math.floor(product.price.raw * 6)})
                     </Typography>
                  </Box>
                  <Typography
                     className='wishlist-text-wrap'
                     sx={{
                        fontSize: '13px',
                        maxWidth: '100%',
                        color: 'text.secondary'
                     }}
                  >
                     {product.description.replace(/[<p></p>]/g, '')}
                  </Typography>
                  <Typography
                     sx={theme => ({
                        fontSize: '18px',
                        color: 'text.secondary',
                        fontWeight: 600,
                        marginTop: '10px',
                        [theme.breakpoints.down('sm')]: {
                           fontSize: '16px'
                        }
                     })}
                  >
                     {product.price.formatted_with_symbol}
                  </Typography>
               </Box>
            </Box>
         </Link>
         <IconButton
            sx={theme => ({
               position: 'absolute',
               right: '20px',
               top: '14px',
               [theme.breakpoints.down(500)]: {
                  top: '12px'
               }
            })}
            onClick={() => {
               dispatch(wishlistActions.removeItemFromWishList(product.id));
               dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Removed!' }));
               dispatch(uiActions.setSnackbarToggle());
            }}
         >
            <DeleteOutlineOutlinedIcon sx={{ color: 'text.secondary' }} />
         </IconButton>
         <Button
            onClick={() => {
               dispatch(addToCart(product.id, 1, 'product-card'));
               dispatch(uiActions.setCurrentProduct(product.id));
            }}
            color='primary'
            sx={theme => ({
               fontSize: '12px',
               position: 'absolute',
               right: '20px',
               bottom: '14px',
               [theme.breakpoints.down(500)]: {
                  bottom: '10px'
               }
            })}
         >
            Add To Cart
         </Button>
      </MenuItem >
   );
};

export default WishlistItems;