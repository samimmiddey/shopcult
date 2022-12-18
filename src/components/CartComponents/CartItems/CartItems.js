import React from 'react';
import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cart from '../../../assets/emptycart.svg';
import CartButtonGroup from '../CartButtonGroup/CartButtonGroup';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { removeItemFromCart, emptyCart } from '../../../store/cart-thunks';
import { useTheme, useMediaQuery } from '@mui/material';
import EmptyTemplate from '../../UI/EmptyTemplate';

const CartItems = ({ totalItems, totalPrice, cartProducts }) => {
   const dispatch = useDispatch();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));
   const mobWidth = useMediaQuery(theme.breakpoints.down(500));
   const xsWidth = useMediaQuery(theme.breakpoints.down(350));

   return (
      <Box>
         {
            totalItems >= 1 &&
            <Card
               elevation={0}
               sx={theme => ({
                  display: 'flex',
                  [theme.breakpoints.down(1300)]: {
                     flexDirection: 'column'
                  }
               })}
            >
               <Box
                  className='shop-filter'
                  sx={theme => ({
                     width: '70%',
                     padding: '3rem 2rem',
                     height: '600px',
                     overflowY: 'auto',
                     [theme.breakpoints.down(1300)]: {
                        width: '100%'
                     },
                     [theme.breakpoints.down('sm')]: {
                        padding: '2rem 1rem',
                        maxHeight: '600px',
                        height: '100%'
                     }
                  })}
               >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                     <Typography variant='h6' sx={{ fontWeight: 600, fontSize: '1rem' }}>Shopping Cart</Typography>
                     <Typography variant='h6' sx={{ fontWeight: 600, fontSize: '1rem' }}>{totalItems} Items</Typography>
                  </Box>
                  <Divider sx={{ margin: '2rem 0' }} />
                  {/* Mobile Layout */}
                  {smWidth &&
                     <Box
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'flex-start',
                           rowGap: '1.25rem'
                        }}
                     >
                        {
                           cartProducts.map((product, index) => (
                              <Card
                                 elevation={0}
                                 key={index}
                                 sx={theme => ({
                                    padding: '1rem',
                                    width: '100%',
                                    height: '112px',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    [theme.breakpoints.down(500)]: {
                                       flexDirection: 'column',
                                       minHeight: '135px',
                                       height: '100%'
                                    }
                                 })}
                              >
                                 <Box
                                    sx={{
                                       width: '100%',
                                       height: '100%',
                                       display: 'flex',
                                       alignItems: 'flex-start',
                                       columnGap: '1rem'
                                    }}
                                 >
                                    <Box>
                                       <img style={{
                                          height: mobWidth && !xsWidth ? '60px' : mobWidth && xsWidth ? '35px' : '80px',
                                          width: mobWidth && !xsWidth ? '70px' : mobWidth && xsWidth ? '35px' : '100px',
                                          objectFit: 'cover',
                                          borderRadius: mobWidth && !xsWidth ? '5px' : mobWidth && xsWidth ? '50%' : '10px'
                                       }}
                                          src={product.image.url}
                                          alt=""
                                       />
                                    </Box>
                                    <Box sx={{
                                       display: 'flex',
                                       flexDirection: 'column',
                                       height: '100%',
                                       justifyContent: 'space-between',
                                       marginTop: mobWidth ? '-5px' : 0
                                    }}
                                    >
                                       <Typography
                                          className='cart-text-wrap'
                                          gutterBottom
                                          sx={theme => ({
                                             fontWeight: 700,
                                             fontSize: '14px',
                                             maxWidth: '150px',
                                             width: '100%',
                                             [theme.breakpoints.down(350)]: {
                                                fontSize: '12px',
                                                maxWidth: '117px',
                                                width: '100%',
                                             }
                                          })}
                                       >
                                          {product.name}
                                       </Typography>
                                       <Box>
                                          <Typography
                                             sx={theme => ({
                                                fontWeight: 500,
                                                fontSize: '13px',
                                                [theme.breakpoints.down(350)]: {
                                                   fontSize: '12px'
                                                }
                                             })}
                                          >
                                             Price : {product.price.formatted_with_symbol}
                                          </Typography>
                                          <Typography
                                             sx={theme => ({
                                                fontWeight: 500,
                                                fontSize: '13px',
                                                [theme.breakpoints.down(350)]: {
                                                   fontSize: '12px'
                                                }
                                             })}
                                          >
                                             Quantity : {product.quantity}
                                          </Typography>
                                       </Box>
                                    </Box>
                                 </Box>
                                 <Box
                                    sx={theme => ({
                                       display: 'flex',
                                       flexDirection: 'column',
                                       height: '100%',
                                       justifyContent: 'space-between',
                                       alignItems: 'flex-end',
                                       [theme.breakpoints.down(500)]: {
                                          flexDirection: 'row',
                                          width: '100%',
                                          marginTop: '13px'
                                       }
                                    })}
                                 >
                                    <CartButtonGroup
                                       quantity={product.quantity}
                                       update_id={product.id}
                                    />
                                    <Button
                                       onClick={() => dispatch(removeItemFromCart(product.id))}
                                       variant='text'
                                       size='small'
                                       sx={{
                                          color: 'red',
                                          textTransform: 'none',
                                          fontSize: '12px'
                                       }}
                                    >
                                       Remove
                                    </Button>
                                 </Box>
                              </Card>
                           ))
                        }
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', rowGap: '2px' }}>
                           <Link to='/shop/all'>
                              <Button sx={{ textTransform: 'none' }}>
                                 Continue Shopping <ArrowRightAltIcon sx={{ marginLeft: '5px' }} />
                              </Button>
                           </Link>
                           <Button
                              onClick={() => dispatch(emptyCart())}
                              sx={{ textTransform: 'none' }}
                           >
                              Empty Cart
                           </Button>
                        </Box>
                     </Box>
                  }
                  {/* Cart Items Heading */}
                  {
                     !smWidth &&
                     <>
                        <Box
                           sx={{
                              display: 'flex',
                              justifyContent: 'space-between'
                           }}
                        >
                           <Typography
                              sx={theme => ({
                                 fontWeight: 600,
                                 flex: 1,
                                 color: 'text.secondary',
                                 fontSize: '12px',
                                 textTransform: 'uppercase',
                                 [theme.breakpoints.down(1300)]: {
                                    flex: 2
                                 }
                              })}
                           >
                              Product Details
                           </Typography>
                           <Box
                              sx={theme => ({
                                 flex: 2,
                                 display: 'flex',
                                 justifyContent: 'space-around',
                                 [theme.breakpoints.down(1300)]: {
                                    justifyContent: 'space-between',
                                 }
                              })}
                           >
                              <Typography sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '12px', textTransform: 'uppercase' }}>Quantity</Typography>
                              <Typography sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '12px', textTransform: 'uppercase' }}>Price</Typography>
                              <Typography sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '12px', textTransform: 'uppercase' }}>Total</Typography>
                           </Box>
                        </Box>
                        {/* Cart Products */}
                        <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', rowGap: '2rem', marginTop: '2rem' }}>
                           {cartProducts.map((product, index) => (
                              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                 <Box sx={theme => ({
                                    display: 'flex',
                                    columnGap: '1rem',
                                    flex: 1,
                                    [theme.breakpoints.down(1300)]: {
                                       flex: 2
                                    }
                                 })}
                                 >
                                    <img
                                       style={{
                                          height: mdWidth ? '40px' : '80px',
                                          width: mdWidth ? '40px' : '100px',
                                          objectFit: 'cover',
                                          borderRadius: mdWidth ? '50%' : '10px'
                                       }}
                                       src={product.image.url}
                                       alt="Product"
                                    />
                                    <Box
                                       sx={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'flex-start',
                                          justifyContent: 'space-between'
                                       }}
                                    >
                                       <Typography
                                          sx={theme => ({
                                             fontWeight: 600,
                                             [theme.breakpoints.down(1300)]: {
                                                fontSize: '14px'
                                             }
                                          })}
                                       >
                                          {product.name}
                                       </Typography>
                                       <Button
                                          onClick={() => dispatch(removeItemFromCart(product.id))}
                                          variant='text'
                                          size='small'
                                          sx={theme => ({
                                             color: 'red',
                                             textTransform: 'none',
                                             marginTop: '8px',
                                             [theme.breakpoints.down(1300)]: {
                                                marginTop: '5px',
                                             }
                                          })}
                                       >
                                          Remove
                                       </Button>
                                    </Box>
                                 </Box>
                                 <Box sx={theme => ({
                                    flex: 2,
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'flex-start',
                                    [theme.breakpoints.down(1300)]: {
                                       justifyContent: 'space-between',
                                    }
                                 })}
                                 >
                                    <Box>
                                       <CartButtonGroup
                                          quantity={product.quantity}
                                          update_id={product.id}
                                       />
                                    </Box>
                                    <Typography
                                       sx={theme => ({
                                          fontWeight: 600,
                                          fontSize: '15px',
                                          [theme.breakpoints.down('md')]: {
                                             fontSize: '13px',
                                          }
                                       })}
                                    >
                                       {product.price.formatted_with_symbol}
                                    </Typography>
                                    <Typography
                                       sx={theme => ({
                                          fontWeight: 600,
                                          fontSize: '15px',
                                          [theme.breakpoints.down('md')]: {
                                             fontSize: '13px',
                                          }
                                       })}
                                    >
                                       ${`${(product.quantity * product.price.raw).toFixed(2)}`}
                                    </Typography>
                                 </Box>
                              </Box>
                           ))}
                           <Box sx={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                              <Link to='/shop/all'>
                                 <Button sx={{ textTransform: 'none' }}>
                                    Continue Shopping <ArrowRightAltIcon sx={{ marginLeft: '5px' }} />
                                 </Button>
                              </Link>
                              <Button
                                 onClick={() => dispatch(emptyCart())}
                                 sx={{ textTransform: 'none' }}
                              >
                                 Empty Cart
                              </Button>
                           </Box>
                        </Box>
                     </>
                  }
               </Box>
               {/* Checkout Box */}
               <Box
                  sx={theme => ({
                     width: '30%',
                     background: '#F2F3F4',
                     [theme.breakpoints.down(1300)]: {
                        width: '100%'
                     }
                  })}
               >
                  <Box sx={theme => ({
                     padding: '3rem 2rem',
                     height: '100%',
                     width: '100%',
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'space-between',
                     [theme.breakpoints.down('sm')]: {
                        padding: '2rem 1rem'
                     }
                  })}
                  >
                     <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                           <Typography variant='h6' sx={{ fontWeight: 600, fontSize: '1rem' }}>
                              Order Summary
                           </Typography>
                        </Box>
                        <Divider sx={{ margin: '2rem 0' }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                           <Typography sx={{ fontWeight: 600, color: 'text.primary', fontSize: '12px', textTransform: 'uppercase' }}>
                              Total Items
                           </Typography>
                           <Typography sx={{ fontWeight: 600, color: 'text.primary', fontSize: '12px', textTransform: 'uppercase' }}>
                              {totalItems} items
                           </Typography>
                        </Box>
                        <Divider sx={{ margin: '2rem 0' }} />
                        {/* Product details summary */}
                        <Box
                           sx={{
                              maxHeight: '165px',
                              height: '100%',
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              rowGap: '12px',
                              overflowY: 'auto'
                           }}
                        >
                           {cartProducts.map((product, index) => (
                              <Box
                                 key={index}
                                 sx={{
                                    width: '100%'
                                 }}
                              >
                                 <Box sx={theme => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginRight: '1rem',
                                    [theme.breakpoints.down(350)]: {
                                       flexDirection: 'column',
                                       alignItems: 'flex-start',
                                       justifyContent: 'center'
                                    }
                                 })}>
                                    <Typography
                                       sx={{
                                          fontSize: '12px',
                                          textTransform: 'uppercase',
                                          fontWeight: 600
                                       }}
                                    >
                                       {product.name} ({product.quantity})
                                    </Typography>
                                    <Typography
                                       sx={{
                                          fontSize: '12px',
                                          textTransform: 'uppercase',
                                          fontWeight: 600
                                       }}
                                    >
                                       ${`${(product.quantity * product.price.raw).toFixed(2)}`}
                                    </Typography>
                                 </Box>
                              </Box>
                           ))}
                        </Box>
                        <Divider sx={{ margin: '2rem 0' }} />
                     </Box>
                     <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                           <Typography
                              sx={theme => ({
                                 fontWeight: 700,
                                 color: 'text.primary',
                                 fontSize: '16px',
                                 textTransform: 'uppercase',
                                 [theme.breakpoints.down('sm')]: {
                                    fontSize: '14px'
                                 }
                              })}>
                              Total Price
                           </Typography>
                           <Typography
                              sx={theme => ({
                                 fontWeight: 700,
                                 color: 'text.primary',
                                 fontSize: '16px',
                                 textTransform: 'uppercase',
                                 [theme.breakpoints.down('sm')]: {
                                    fontSize: '14px'
                                 }
                              })}
                           >
                              {totalPrice}
                           </Typography>
                        </Box>
                        <Link to='/cart/checkout'>
                           <Button
                              sx={{
                                 textTransform: 'none',
                                 width: '100%',
                                 marginTop: '2rem'
                              }}
                              variant='contained'
                              size='large'
                              disableElevation
                              className='primary-button'
                           >
                              Checkout
                           </Button>
                        </Link>
                     </Box>
                  </Box>
               </Box>
            </Card>
         }
         {
            totalItems < 1 &&
            <EmptyTemplate
               img={cart}
               text='Your cart is empty!'
               button={true}
               subtext={<Typography sx={{ fontSize: '14px' }} mb={2}>Add items to the cart</Typography>}
            />
         }
      </Box >
   );
};

export default CartItems;