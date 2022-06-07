import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductCardData from '../../data/ProductCardData';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { wishlistActions } from '../../store/wishlist-slice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { uiActions } from '../../store/ui-slice';
import { addToCart } from '../../store/send-data';
import ProgressButton from './ProgressButton';

const HomeCategoryCard = ({ item, index, path }) => {
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
            <Card className='home-category-card' sx={{ maxWidth: 400, position: 'relative' }} elevation={0} >
               <CardMedia
                  className='home-category-card-img'
                  component="img"
                  alt="Image"
                  height={mdWidth && !smWidth ? '300' : mdWidth && smWidth ? '250' : '400'}
                  image={item.image.url}
               />
               <Box sx={{ position: 'absolute', bottom: 0, color: '#fff', width: '100%', zIndex: 99 }}>
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
                           fontWeight: 700,
                           padding: `${smWidth ? '0' : '6px 0'}`,
                           fontSize: `${lgWidth && !lgWidth && !xsWidth ? '16px' : lgWidth && mdWidth && !xsWidth ? '15px' : lgWidth && mdWidth && xsWidth ? '14px' : '18px'}`
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
                     })}
                  >
                     <div style={{ display: 'flex', alignItems: 'center', columnGap: '8px', paddingBottom: '4px' }}>
                        <Typography
                           sx={{ fontSize: `${lgWidth && !lgWidth ? '16px' : lgWidth && mdWidth ? '15px' : '18px'}`, fontWeight: 700 }}
                        >
                           {item.price.formatted_with_symbol}
                        </Typography>
                        <Typography sx={{ fontSize: '14px', textDecoration: 'line-through' }}>
                           {ProductCardData[index].discount}
                        </Typography>
                     </div>
                  </CardContent>
               </Box>
            </Card>
         </Link>
         <Button size="small" variant='contained' disableElevation
            onClick={() => {
               !buttonLoading && dispatch(addToCart(item.id, 1));
               !buttonLoading && dispatch(uiActions.setCurrentProduct(item.id));
            }}
            sx={theme => ({
               position: 'absolute',
               zIndex: 999,
               bottom: 0,
               right: 0,
               margin: '0 17px 25px 0',
               textTransform: 'none',
               minHeight: 0,
               minWidth: 0,
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
                  item.id === currentProduct ?
                     (buttonLoading && <ProgressButton loading={buttonLoading} />) ||
                     (!buttonLoading && <p style={{ fontSize: '12px' }}>Add To Cart</p>) :
                     <p style={{ fontSize: '12px' }}>Add To Cart</p>
               )
            }
            {
               !xsWidth &&
               (
                  item.id === currentProduct ?
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
      </Box>
   );
};

export default HomeCategoryCard;