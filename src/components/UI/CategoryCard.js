import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { wishlistActions } from '../../store/wishlist-slice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { uiActions } from '../../store/ui-slice';
import { addToCart } from '../../store/cart-thunks';
import ProgressButton from './ProgressButton';

const HomeCategoryCard = ({ item, index, path }) => {
   const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
   const buttonLoading = useSelector(state => state.ui.categoryButtonProgress);
   const currentProduct = useSelector(state => state.ui.currentProduct);
   const dispatch = useDispatch();

   const theme = useTheme();
   const lgWidth = useMediaQuery(theme.breakpoints.down(1200));
   const mdWidth = useMediaQuery(theme.breakpoints.down(900));
   const smWidth = useMediaQuery(theme.breakpoints.down(600));

   return (
      <Card
         className='home-category-card'
         sx={{
            maxWidth: 415,
            position: 'relative'
         }}
         elevation={0}
      >
         <Link to={path}>
            <CardMedia
               className='home-category-card-img'
               component="img"
               alt="Image"
               height={mdWidth && !smWidth ? '350' : mdWidth && smWidth ? '300' : '400'}
               image={item.image.url}
            />
            <Box
               sx={{
                  position: 'absolute',
                  bottom: 0,
                  color: '#fff',
                  width: '100%',
                  zIndex: 99
               }}
            >
               <CardContent
                  sx={theme => ({
                     paddingBottom: 0,
                     [theme.breakpoints.down(450)]: {
                        paddingLeft: '10px',
                        paddingRight: '10px'
                     }
                  })}
               >
                  <Typography
                     gutterBottom
                     variant="h6"
                     sx={{
                        color: '#fff',
                        fontWeight: 700,
                        padding: smWidth ? '3px 0' : '6px 0',
                        fontSize: smWidth ? '16px' : '18px'
                     }}
                  >
                     {item.name}
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
                           sx={{
                              fontSize: smWidth ? '15px' : '18px',
                              fontWeight: 600,
                              color: 'text.#fff'
                           }}
                        >
                           {item.price.formatted_with_symbol}
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
            </Box>
         </Link>
         <Button
            size="small"
            variant='contained'
            onClick={() => {
               if (!buttonLoading) {
                  dispatch(addToCart(item.id, 1, 'category-product-card'));
                  dispatch(uiActions.setCurrentProduct(item.id));
               }
            }}
            sx={{
               position: 'absolute',
               right: '16px',
               bottom: '24px',
               textTransform: 'none',
               minHeight: 0,
               minWidth: 0,
               zIndex: 100,
               textAlign: 'center',
               height: smWidth ? '32px' : '35px',
               width: smWidth ? '43px' : '50px',
               color: '#fff',
               backgroundColor: currentProduct === item.id && buttonLoading ? '#bdbdbd' : 'rgb(90, 57, 161)',
               '&:hover': {
                  backgroundColor: currentProduct === item.id && buttonLoading ? '#bdbdbd' : 'rgb(63, 40, 113)'
               }
            }}
         >
            {
               item.id === currentProduct && buttonLoading ?
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
               if (wishlistItems.includes(item.id)) {
                  dispatch(wishlistActions.removeItemFromWishList(item.id));
                  dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Removed!' }));
                  dispatch(uiActions.setSnackbarToggle());
               } else {
                  dispatch(wishlistActions.addItemToWishList(item.id));
                  dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Added!' }));
                  dispatch(uiActions.setSnackbarToggle());
               }
            }}
            sx={theme => ({
               backgroundColor: '#fff',
               color: wishlistItems.includes(item.id) === true ? 'rgb(132, 76, 196)' : '#aaa',
               minHeight: 0,
               minWidth: 0,
               zIndex: 100,
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
                  backgroundColor: '#f1f1f1'
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

export default HomeCategoryCard;