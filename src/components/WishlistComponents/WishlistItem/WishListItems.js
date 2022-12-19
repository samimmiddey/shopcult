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

   return (
      <MenuItem
         sx={{
            border: '1px solid #eceff1',
            padding: '16px 20px',
            borderRadius: '10px',
            width: '100%',
            position: 'relative'
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
                     width: 100,
                     height: 80,
                     borderRadius: '10px',
                     [theme.breakpoints.down(500)]: {
                        height: 60,
                        width: 60,
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
                        fontWeight: 500,
                        [theme.breakpoints.down('sm')]: {
                           fontSize: '14px'
                        }
                     })}
                  >
                     {product.name}
                  </Typography>
                  <Typography
                     className='wishlist-text-wrap'
                     sx={{
                        fontSize: '13px',
                        maxWidth: '100%',
                        color: 'text.secondary',
                        marginTop: '3px'
                     }}
                  >
                     {
                        product.description.replace(/[<p></p>]/g, '')
                     }
                  </Typography>
                  <Typography
                     sx={theme => ({
                        fontSize: '18px',
                        color: 'text.primary',
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