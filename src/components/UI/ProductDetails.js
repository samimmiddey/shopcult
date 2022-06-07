import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Redirect } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import Rating from '../UI/Rating';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { styled } from '@mui/system';
// import ProductDetailsSelectBox from '../UI/ProductDetailsSelectBox';
import { Divider } from '@mui/material';
import Quantity from '../UI/Quantity';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ProductCardData from '../../data/ProductCardData';
import ProductCardTabs from './ProductCardTabs';
import { wishlistActions } from '../../store/wishlist-slice';
import { uiActions } from '../../store/ui-slice';
import { addToCart } from '../../store/send-data';
import ProgressButton from './ProgressButton';
import ProgressBar from './ProgressBar';
import BoltIcon from '@mui/icons-material/Bolt';
import RelatedProducts from './RelatedProducts';

const ActionButton = styled(Button)({
   minHeight: 0,
   minWidth: 0,
   height: '45px',
   width: '100%',
   textTransform: 'none'
});

const CardElement = styled(CardContent)({
   padding: '10px 16px',
   height: '100%'
});

const ResponsiveCard = styled(CardContent)(({ theme }) => ({
   padding: '10px 16px',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      rowGap: '5px',
      alignItems: 'flex-start'
   }
}));

const ResponsiveDiv = styled(CardContent)(({ theme }) => ({
   padding: '10px 16px',
   columnGap: '5rem',
   display: 'flex',
   alignItems: 'center',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      rowGap: '10px',
      alignItems: 'flex-start'
   }
}));

const ResponsiveActions = styled(CardActions)(({ theme }) => ({
   padding: '1.5rem 1rem',
   display: 'flex',
   columnGap: '5px',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      rowGap: '10px',
      alignItems: 'flex-end'
   }
}));

const ProductDetails = () => {
   const [imgIndex, setImgIndex] = useState(0);
   const [itemAmount, setItemAmount] = useState(1);
   const products = useSelector(state => state.products.products);
   const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
   const buttonLoading = useSelector(state => state.ui.buttonProgress);
   const [cartButton, setCartButton] = useState(false);
   const [buyButton, setBuyButton] = useState(false);
   const dispatch = useDispatch();
   const { productID } = useParams();
   const history = useHistory();

   let product;
   let productIndex;

   useEffect(() => {
      if (!buttonLoading) {
         setCartButton(false);
         setBuyButton(false);
      }
   }, [buttonLoading]);

   if (products.length <= 0) {
      return <ProgressBar />;
   } else {
      product = products.find(item => item.id === productID);
      if (!product) {
         return (
            <Redirect to='/' />
         )
      }
   }

   productIndex = products.findIndex(item => item.id === productID);

   return (
      <Box className='container' sx={{ marginTop: '110px' }}>
         <Card elevation={0} sx={{ padding: '1rem' }}>
            <Grid container>
               <Grid item xs={12} sm={12} md={5}>
                  <CardElement>
                     <img
                        style={{ maxHeight: '500px', width: '100%', objectFit: 'cover', borderRadius: '10px' }}
                        src={product.assets[imgIndex].url} alt="Product"
                     />
                     <Box
                        sx={theme => ({
                           marginTop: '16px',
                           display: 'flex',
                           columnGap: '1rem',
                           flexWrap: 'nowrap',
                           [theme.breakpoints.down('sm')]: {
                              columnGap: '12px'
                           }
                        })}
                     >
                        {product.assets.map((image, index) => (
                           <Box
                              key={index}
                              sx={{
                                 maxHeight: '80px',
                                 maxWidth: '100px',
                                 width: '100%',
                                 borderRadius: '10px',
                              }}
                           >
                              <img
                                 style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                    transition: '300ms ease'
                                 }}
                                 className='hover-img'
                                 src={image.url}
                                 alt=''
                                 onMouseEnter={() => setImgIndex(index)}
                              />
                           </Box>
                        ))}
                     </Box>
                  </CardElement>
               </Grid>
               <Grid item xs={12} sm={12} md={7}>
                  <div>
                     <CardElement>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                           <Button
                              sx={{
                                 fontSize: '10px',
                                 backgroundColor: '#e8f5e9',
                                 color: '#66bb6a',
                                 marginBottom: '10px'
                              }}
                           >
                              In Stock
                           </Button>
                           <Button
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
                                 backgroundColor: '#eceff1',
                                 color: wishlistItems.includes(product.id) === true ? 'rgb(132, 76, 196)' : '#aaa',
                                 marginBottom: '10px',
                                 minHeight: 0,
                                 minWidth: 0,
                                 padding: '8px 10px',
                                 [theme.breakpoints.down('sm')]: {
                                    padding: '5px 7px'
                                 }
                              })}
                           >
                              <FavoriteIcon />
                           </Button>
                        </div>
                        <Typography
                           gutterBottom
                           variant="h6"
                           sx={theme => ({
                              fontWeight: 700,
                              fontSize: '2rem',
                              [theme.breakpoints.down('xl')]: {
                                 fontSize: '1.75rem',
                              },
                              [theme.breakpoints.down('lg')]: {
                                 fontSize: '1.5rem',
                              },
                              [theme.breakpoints.down('md')]: {
                                 fontSize: '1rem',
                              }
                           })}
                        >
                           {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: product.description }} />
                     </CardElement>
                     <CardElement sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                        <Rating />
                        <Typography sx={{ color: 'text.disabled', fontSize: '14px' }}>
                           {ProductCardData[productIndex].rating}
                        </Typography>
                     </CardElement>
                     <ResponsiveCard sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                        <Typography variant='h5' color='primary' sx={{ fontWeight: '700' }}>
                           {product.price.formatted_with_symbol}
                        </Typography>
                        <Typography variant='h6' sx={{ color: 'text.disabled', fontSize: '16px', textDecoration: 'line-through' }}>
                           {ProductCardData[productIndex].discount}
                        </Typography>
                        <Typography variant='h6' sx={{ color: 'text.disabled', fontSize: '12px' }}>
                           (Inclusive all of all taxes)
                        </Typography>
                     </ResponsiveCard>
                     <Divider
                        sx={theme => ({
                           margin: '1.5rem 1rem',
                           [theme.breakpoints.down('sm')]: {
                              margin: '1rem',
                           }
                        })}
                     />
                     <Box
                        sx={theme => ({
                           marginTop: '1.85rem',
                           [theme.breakpoints.down('md')]: {
                              marginTop: '1.2rem'
                           }
                        })}
                     >
                        <ResponsiveDiv>
                           <Typography
                              variant='h6'
                              sx={theme => ({
                                 fontSize: '18px',
                                 color: 'text.primary',
                                 fontWeight: 700,
                                 [theme.breakpoints.down('md')]: {
                                    fontSize: '16px',
                                 }
                              })}
                           >
                              Quantity
                           </Typography>
                           <Quantity
                              setItemAmount={setItemAmount}
                           />
                        </ResponsiveDiv>
                     </Box>
                     <Divider sx={{ margin: '1rem' }} />
                     <ResponsiveActions>
                        <ActionButton
                           onClick={() => {
                              setCartButton(true);
                              !buttonLoading && dispatch(addToCart(product.id, itemAmount));
                           }}
                           disableElevation
                           color='secondary'
                           variant='contained'
                        >
                           {cartButton && <ProgressButton loading={cartButton} />}
                           {!cartButton && <ShoppingCartOutlinedIcon sx={{ marginRight: '8px' }} />}
                           {!cartButton && <>Add To Cart</>}
                        </ActionButton>
                        <ActionButton
                           onClick={async () => {
                              setBuyButton(true);
                              !buttonLoading && await dispatch(addToCart(product.id, itemAmount));
                              history.push('/cart');
                           }}
                           disableElevation
                           variant='contained'
                        >
                           {buyButton && <ProgressButton loading={buyButton} />}
                           {!buyButton && <BoltIcon sx={{ marginRight: '8px' }} />}
                           {!buyButton && <>Buy Now</>}
                        </ActionButton>
                     </ResponsiveActions>
                  </div>
               </Grid>
            </Grid>
            <ProductCardTabs
               product={product}
            />
         </Card>
         <RelatedProducts
            product={product}
         />
      </Box >
   );
};

export default ProductDetails;