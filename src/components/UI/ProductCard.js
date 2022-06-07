import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Rating from '../UI/Rating';
import ProductCardData from '../../data/ProductCardData';
import { Box, useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../../store/wishlist-slice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToCart } from '../../store/send-data';
import { uiActions } from '../../store/ui-slice';
import ProgressButton from './ProgressButton';

const ProductCard = ({ product, index, path }) => {
   const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
   const buttonLoading = useSelector(state => state.ui.buttonProgress);
   const currentProduct = useSelector(state => state.ui.currentProduct);
   const dispatch = useDispatch();

   const theme = useTheme();
   const lgWidth = useMediaQuery(theme.breakpoints.down(1200));
   const mdWidth = useMediaQuery(theme.breakpoints.down(900));
   const smWidth = useMediaQuery(theme.breakpoints.down(600));
   const xsWidth = useMediaQuery(theme.breakpoints.down(450));

   return (
      <Box sx={{ position: 'relative' }}>
         <Link to={path}>
            <Card sx={{ maxWidth: 400 }} elevation={0} >
               <CardMedia
                  component="img"
                  alt="Image"
                  height={mdWidth && !smWidth ? '150' : mdWidth && smWidth ? '125' : '200'}
                  image={product.image.url}
               />
               <CardContent
                  sx={theme => ({
                     paddingBottom: 0,
                     [theme.breakpoints.down(450)]: {
                        paddingLeft: '10px',
                        paddingRight: '10px'
                     }
                  })}
               >
                  <Typography gutterBottom variant="h6"
                     sx={{
                        color: 'text.secondary',
                        fontWeight: 700,
                        padding: `${smWidth ? '0' : '6px 0'}`,
                        fontSize: `${lgWidth && !lgWidth && !xsWidth ? '16px' : lgWidth && mdWidth && !xsWidth ? '15px' : lgWidth && mdWidth && xsWidth ? '14px' : '18px'}`
                     }}>
                     {product.name}
                  </Typography>
                  {!mdWidth &&
                     <Typography className='text-wrap' variant="body2" color="text.secondary" >
                        {product.description.replace(/[<p></p>]/g, '')}
                     </Typography>}
               </CardContent>
               {!mdWidth && <CardContent
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     columnGap: '10px',
                     padding: `${lgWidth ? '0px 16px' : '10px 16px'}`
                  }}>
                  <Rating />
                  <Typography variant='h6' sx={{ fontSize: '14px', color: 'text.disabled' }}>
                     {ProductCardData[index].rating}
                  </Typography>
               </CardContent>}
               <CardContent
                  sx={theme => ({
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     padding: '15px 16px 28px 16px',
                     [theme.breakpoints.down(450)]: {
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        rowGap: '6px',
                        padding: '0 10px',
                        marginBottom: '2.5rem',
                        "&:last-child": {
                           paddingBottom: '12px'
                        }
                     }
                  })}>
                  <div style={{ display: 'flex', alignItems: 'center', columnGap: '8px', paddingBottom: '4px' }}>
                     <Typography sx={{ fontSize: `${lgWidth && !lgWidth ? '16px' : lgWidth && mdWidth ? '15px' : '18px'}`, fontWeight: 700, color: 'text.secondary' }}>
                        {product.price.formatted_with_symbol}
                     </Typography>
                     <Typography sx={{ color: 'text.disabled', fontSize: '14px', textDecoration: 'line-through' }}>
                        {ProductCardData[index].discount}
                     </Typography>
                  </div>
               </CardContent>
            </Card>
         </Link>
         <Button size="small" variant='contained' disableElevation
            onClick={() => {
               !buttonLoading && dispatch(addToCart(product.id, 1));
               !buttonLoading && dispatch(uiActions.setCurrentProduct(product.id));
            }}
            sx={theme => ({
               position: 'absolute',
               bottom: 0,
               right: 0,
               margin: '0 17px 25px 0',
               textTransform: 'none',
               minHeight: 0,
               minWidth: 0,
               textAlign: 'center',
               height: lgWidth ? '31px' : '36px',
               width: lgWidth ? '44px' : '54px',
               // padding: `${lgWidth ? '5px 12px' : '6px 15px'}`,
               backgroundColor: 'rgb(90, 57, 161)',
               '&:hover': {
                  backgroundColor: 'rgb(63, 40, 113)'
               },
               [theme.breakpoints.down(450)]: {
                  width: 'calc(100% - 24px)',
                  margin: '11px auto',
                  left: 0,
                  right: 0
               }
            })}
         >
            {
               xsWidth &&
               (
                  product.id === currentProduct ?
                     (buttonLoading && <ProgressButton loading={buttonLoading} />) ||
                     (!buttonLoading && <p style={{ fontSize: '12px' }}>Add To Cart</p>) :
                     <p style={{ fontSize: '12px' }}>Add To Cart</p>
               )
            }
            {
               !xsWidth &&
               (
                  product.id === currentProduct ?
                     (buttonLoading && <ProgressButton loading={buttonLoading} />) ||
                     (!buttonLoading && <AddShoppingCartIcon sx={{
                        fontSize: `${lgWidth ? '1.3rem' : '1.5rem'}`
                     }} />) :
                     <AddShoppingCartIcon
                        sx={{
                           fontSize: `${lgWidth ? '1.3rem' : '1.5rem'}`
                        }}
                     />
               )
            }
         </Button>
         <Button
            variant='contained'
            disableElevation
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
               top: 0,
               right: 0,
               margin: '15px 17px 0',
               [theme.breakpoints.down('md')]: {
                  padding: '3px'
               },
               '&:hover': {
                  backgroundColor: '#f1f1f1'
               }
            })}
         >
            <FavoriteIcon
               sx={theme => ({
                  [theme.breakpoints.down('md')]: {
                     fontSize: '1.25rem'
                  }
               })}
            />
         </Button>
      </Box >
   );
};

export default ProductCard;