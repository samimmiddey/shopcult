import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Rating from '../UI/Rating';
import { Box, useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../../store/wishlist-slice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToCart } from '../../store/cart-thunks';
import { uiActions } from '../../store/ui-slice';
import ProgressButton from './ProgressButton';

const ProductCard = ({ product, path }) => {
   const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
   const buttonLoading = useSelector(state => state.ui.buttonProgress);
   const currentProduct = useSelector(state => state.ui.currentProduct);
   const dispatch = useDispatch();

   const theme = useTheme();
   const lgWidth = useMediaQuery(theme.breakpoints.down(1200));
   const smWidth = useMediaQuery(theme.breakpoints.down(600));

   const num = String(Math.floor(product.price.raw * 6)).charAt(0);
   const rating = Number(num);

   return (
      <Card
         elevation={0}
         sx={{
            maxWidth: 415,
            position: 'relative',
            borderRadius: '10px'
         }}
      >
         <Link to={path}>
            <CardMedia
               component="img"
               alt="Image"
               height={smWidth ? '175' : '200'}
               image={product.image.url}
            />
            <CardContent sx={{ paddingBottom: 0 }}>
               <Typography
                  gutterBottom
                  variant="h6"
                  sx={theme => ({
                     color: 'text.primary',
                     fontWeight: 700,
                     padding: smWidth ? '3px 0' : '6px 0',
                     fontSize: '20px',
                     [theme.breakpoints.down('lg')]: {
                        fontSize: '18px'
                     }
                  })}
               >
                  {product.name}
               </Typography>
               <Typography
                  className='text-wrap'
                  variant="body2"
                  color="text.secondary"
               >
                  {product.description.replace(/[<p></p>]/g, '')}
               </Typography>
            </CardContent>
            <CardContent
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '10px',
                  padding: '10px 16px'
               }}
            >
               <Rating value={rating >= 5 ? 5 : rating} />
               <Typography
                  variant='h6'
                  sx={{
                     fontSize: '12px',
                     color: 'text.disabled'
                  }}
               >
                  ({Math.floor(product.price.raw * 6)})
               </Typography>
            </CardContent>
            <CardContent
               sx={theme => ({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '4px 16px 24px 16px',
                  [theme.breakpoints.down('sm')]: {
                     padding: '4px 16px 20px 16px'
                  }
               })}
            >
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                     height: '35px',
                     width: '100%'
                  }}
               >
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '8px'
                     }}
                  >
                     <Typography
                        sx={theme => ({
                           fontSize: '20px',
                           fontWeight: 600,
                           color: 'text.secondary',
                           [theme.breakpoints.down('lg')]: {
                              fontSize: '18px'
                           }
                        })}
                     >
                        {product.price.formatted_with_symbol}
                     </Typography>
                     <Typography
                        sx={theme => ({
                           fontSize: '13px',
                           fontWeight: 600,
                           color: '#00b3b3',
                           [theme.breakpoints.down('sm')]: {
                              fontSize: '12px'
                           }
                        })}
                     >
                        {Math.floor((Math.random() * 50) + 1) + '%'} off
                     </Typography>
                  </Box>
               </Box>
            </CardContent>
         </Link>
         <Button
            size="small"
            variant='contained'
            disabled={buttonLoading && product.id === currentProduct}
            onClick={() => {
               if (!buttonLoading) {
                  dispatch(addToCart(product.id, 1, 'product-card'));
                  dispatch(uiActions.setCurrentProduct(product.id));
               }
            }}
            sx={{
               position: 'absolute',
               right: '16px',
               bottom: '24px',
               textTransform: 'none',
               minHeight: 0,
               minWidth: 0,
               textAlign: 'center',
               height: smWidth ? '32px' : '35px',
               width: smWidth ? '43px' : '50px',
               color: '#fff',
               backgroundColor: 'rgb(90, 57, 161)',
               '&:hover': {
                  backgroundColor: 'rgb(63, 40, 113)'
               }
            }}
         >
            {
               product.id === currentProduct && buttonLoading ?
                  <ProgressButton loading={buttonLoading} /> :
                  <AddShoppingCartIcon
                     sx={{
                        fontSize: `${lgWidth ? '1.3rem' : '1.5rem'}`
                     }}
                  />
            }
         </Button>
         <Button
            variant='contained'
            onClick={() => {
               if (wishlistItems.includes(product.id)) {
                  dispatch(wishlistActions.removeItemFromWishList(product.id));
                  dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Removed!' }));
                  dispatch(uiActions.setSnackbarToggle());
               } else {
                  dispatch(wishlistActions.addItemToWishList(product.id));
                  dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Added!' }));
                  dispatch(uiActions.setSnackbarToggle());
               }
            }}
            sx={theme => ({
               backgroundColor: '#fff',
               color: wishlistItems.includes(product.id) === true ? 'rgb(132, 76, 196)' : '#aaa',
               minHeight: 0,
               minWidth: 0,
               padding: '4px',
               position: 'absolute',
               top: '15px',
               right: '17px',
               [theme.breakpoints.down('sm')]: {
                  top: '13px',
                  right: '13px',
                  padding: '3px'
               },
               '&:hover': {
                  backgroundColor: '#eceff1'
               }
            })}
         >
            <FavoriteIcon
               sx={theme => ({
                  fontSize: '1.5rem',
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '1.4rem'
                  }
               })}
            />
         </Button>
      </Card>
   );
};

export default ProductCard;