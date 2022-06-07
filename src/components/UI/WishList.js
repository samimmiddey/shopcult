import React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Avatar, Badge, Button, Divider, Typography } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { wishlistActions } from '../../store/wishlist-slice';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from 'react-router-dom';
import { uiActions } from '../../store/ui-slice';

export default function AccountMenu() {
   const wishlistItemsAmount = useSelector(state => state.wishlist.totalAmount);
   const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
   const products = useSelector(state => state.products.products);
   const dispatch = useDispatch();

   const wishlistProducts = products.filter(product => wishlistItems.includes(product.id));

   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   return (
      <>
         <Box>
            <Tooltip title="Wishlist" arrow>
               <IconButton
                  onClick={handleClick}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
               >
                  <Badge color='secondary' badgeContent={wishlistItemsAmount} showZero={true}>
                     <FavoriteBorderOutlinedIcon sx={{ color: 'text.secondary' }} />
                  </Badge>
               </IconButton>
            </Tooltip>
         </Box>
         <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            // onClick={handleClose}
            disableScrollLock={true}
            MenuListProps={{
               disablePadding: true,
            }}
            PaperProps={{
               elevation: 0,
               sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                     width: 32,
                     height: 32,
                     ml: -0.5,
                     mr: 1,
                  },
                  '&:before': {
                     content: '""',
                     display: 'block',
                     position: 'absolute',
                     top: 0,
                     right: 14,
                     width: 10,
                     height: 10,
                     bgcolor: 'background.paper',
                     transform: 'translateY(-50%) rotate(45deg)',
                     zIndex: 0,
                  },
               },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            {
               wishlistItemsAmount < 1 &&
               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     rowGap: '0.8rem',
                     padding: '1.5rem 1.5rem 1rem 1.5rem',
                     alignItems: 'center'
                  }}
               >
                  Your wishlist is empty!
                  <Box>
                     <Link
                        to='/shop/all'
                        onClick={handleClose}
                     >
                        <Button sx={{ textTransform: 'none' }} variant='text' size='small'>Shop Now</Button>
                     </Link>
                     <Link
                        to='/wishlist'
                        onClick={handleClose}
                     >
                        <Button sx={{ textTransform: 'none' }} variant='text' size='small'>Wishlist</Button>
                     </Link>
                  </Box>
               </Box>
            }
            {
               wishlistItemsAmount >= 1 &&
               <Box sx={{ maxHeight: '290px', overflow: 'hidden', paddingTop: '8px' }}>
                  {wishlistProducts.map((product, index) => (
                     <MenuItem
                        key={index}
                        sx={theme => ({
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'space-between',
                           width: '300px',
                           [theme.breakpoints.down('sm')]: {
                              width: '250px',
                           }
                        })}
                     >
                        <Link to={`/home/${product.id}`} onClick={handleClose}>
                           <Box
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 columnGap: '5px'
                              }}
                           >
                              <Avatar sx={{ width: 32, height: 32 }} alt='product' src={product.image.url} />
                              <Box>
                                 <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>{product.name}</Typography>
                                 <Typography
                                    className='wishlist-text-wrap'
                                    sx={theme => ({
                                       fontSize: '12px',
                                       fontWeight: 300,
                                       [theme.breakpoints.down('sm')]: {
                                          width: '145px'
                                       }
                                    })}
                                    variant="body2"
                                    color="text.secondary"
                                 >
                                    {
                                       product.description.replace(/[<p></p>]/g, '')
                                    }
                                 </Typography>
                              </Box>
                           </Box>
                        </Link>
                        <DeleteOutlineOutlinedIcon
                           sx={{ color: 'text.secondary' }}
                           onClick={() => {
                              dispatch(wishlistActions.removeItemFromWishList(product.id));
                              dispatch(uiActions.setShowSnackbar({ value: true, text: 'Successfully Removed!' }));
                              dispatch(uiActions.setSnackbarToggle());
                           }}
                        />
                     </MenuItem>
                  ))}
               </Box>
            }
            <Divider sx={{ margin: '8px 0 0 0' }} />
            {wishlistItemsAmount >= 1 &&
               <Link to='/wishlist' onClick={handleClose}>
                  <Button sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     width: '100%',
                     textTransform: 'none',
                     padding: '8px 0',
                     borderRadius: 0
                  }}
                     variant='text'
                  >
                     View All
                  </Button>
               </Link>
            }
         </Menu>
      </>
   );
}
