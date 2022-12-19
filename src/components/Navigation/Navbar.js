import React, { useState, useEffect, Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Box from '@mui/material/Box';
import SideDrawer from './Drawer';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { styled } from '@mui/system';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AuthButtons from './AuthButtons';
import { Backdrop, ListItemButton, Tooltip } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchIcon from '../../assets/search-icon.png';
import SearchComponents from './SearchBar/SearchComponents';

const menuItems = ['Home', 'About', 'Shop', 'Brands', 'Help'];

const MenuItems = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '1rem',
   justifyContent: 'space-between',
   width: '100%',
   [theme.breakpoints.down('lg')]: {
      columnGap: '10px'
   },
   [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
      columnGap: 0
   }
}));

const Menu = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '2rem',
   justifyContent: 'flex-end',
   width: '100%',
   [theme.breakpoints.down('xl')]: {
      columnGap: '2rem'
   },
   [theme.breakpoints.down('md')]: {
      width: '100%',
   },
   [theme.breakpoints.down('lg')]: {
      columnGap: '1.5rem'
   },
   [theme.breakpoints.down('sm')]: {
      columnGap: 0
   }
}));

const MenuList = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '1.5rem',
   [theme.breakpoints.down('xl')]: {
      columnGap: '1rem'
   },
   [theme.breakpoints.down('sm')]: {
      columnGap: '10px',
   }
}));

const List = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '2.5rem',
   marginLeft: '8px',
   [theme.breakpoints.down('xl')]: {
      columnGap: '1.25rem'
   },
   [theme.breakpoints.down(1300)]: {
      display: 'none'
   }
}));

const NavButtons = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '2rem',
   [theme.breakpoints.down('xl')]: {
      columnGap: '1.5rem'
   },
   [theme.breakpoints.down('lg')]: {
      columnGap: '1.25rem'
   },
   [theme.breakpoints.down('md')]: {
      columnGap: '1rem'
   },
   [theme.breakpoints.down('sm')]: {
      columnGap: '0.5rem'
   }
}));

const CartButtons = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '20px',
   [theme.breakpoints.down('lg')]: {
      columnGap: '16px'
   },
   [theme.breakpoints.down('md')]: {
      columnGap: '10px'
   },
   [theme.breakpoints.down('sm')]: {
      columnGap: '2px'
   }
}));

const Navbar = () => {
   const [scrolled, setScrolled] = useState(false);
   const inputFocus = useSelector(state => state.ui.inputFocus);
   const totalItems = useSelector(state => state.cart.totalAmount);
   const wishlistItemsAmount = useSelector(state => state.wishlist.totalAmount);
   const dispatch = useDispatch();
   const { id } = useParams();

   const { pathname } = useLocation();
   const route = pathname === '/signup' || pathname === '/login';

   const toggleDrawer = (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }

      dispatch(uiActions.toggleMenu());
   };

   useEffect(() => {
      window.onscroll = function () {
         if (window.scrollY > 50) {
            setScrolled(true);
         } else {
            setScrolled(false);
         }
      };
   }, []);

   return (
      <>
         {!route &&
            <>
               <AppBar
                  position="fixed"
                  sx={{
                     backgroundColor: '#fff',
                     color: 'text.primary',
                     boxShadow: `${scrolled ? '0px 2px 10px -2px rgba(0, 0, 0, 0.2)' : ''}`
                  }}
                  elevation={0}
               >
                  <Toolbar
                     sx={{
                        height: '75px',
                        maxWidth: '1700px',
                        margin: '0 auto',
                        width: '100%'
                     }}
                  >
                     <IconButton
                        onClick={toggleDrawer}
                        size="large"
                        edge="start"
                        aria-label="open drawer"
                        sx={theme => ({
                           [theme.breakpoints.up(1300)]: {
                              display: 'none'
                           }
                        })}
                     >
                        <MenuIcon />
                     </IconButton>
                     <MenuItems>
                        <Link to='/'>
                           <Box
                              sx={theme => ({
                                 display: 'flex',
                                 alignItems: 'center',
                                 columnGap: '5px',
                                 [theme.breakpoints.down(350)]: {
                                    display: 'none'
                                 }
                              })}
                           >
                              <ShoppingBagOutlinedIcon
                                 sx={theme => ({
                                    color: 'rgb(132, 76, 196)',
                                    [theme.breakpoints.down('sm')]: {
                                       display: 'none'
                                    }
                                 })}
                              />
                              <Typography variant='h6' sx={{ fontWeight: 700 }}><span style={{ color: 'rgb(132, 76, 196)' }}>shop</span><span style={{ color: 'rgb(90, 57, 161)' }}>cult</span></Typography>
                           </Box>
                        </Link>
                        {/* Search Bar & Menu List */}
                        <Menu>
                           <SearchComponents />
                           <MenuList>
                              <List>
                                 {menuItems.map((item, index) => (
                                    <Fragment key={index}>
                                       <NavLink
                                          activeClassName='active-nav'
                                          exact={item === 'Home' ? true : false}
                                          to={
                                             {
                                                ...item === 'Home' ? { pathname: '/' } : {
                                                   ...item === 'About' ? { pathname: '/about' } : {
                                                      ...item === 'Shop' ? { pathname: `/shop/${id ? id : 'all'}` } : {
                                                         ...item === 'Brands' ? { pathname: '/brands' } : {
                                                            ...item === 'Help' ? { pathname: '/help' } : ''
                                                         }
                                                      }
                                                   }
                                                }
                                             }
                                          }
                                       >
                                          <ListItemButton
                                             sx={{
                                                borderRadius: '5px',
                                                padding: '6px 10px',
                                                '&:hover': {
                                                   backgroundColor: 'transparent'
                                                },
                                                '&:focus': {
                                                   backgroundColor: 'transparent'
                                                }
                                             }}
                                             key={index}>
                                             <Typography className='nav-text' color='text.secondary'
                                                sx={{
                                                   fontSize: '15px',
                                                   fontWeight: 600
                                                }}>
                                                {item}
                                             </Typography>
                                          </ListItemButton>
                                       </NavLink>
                                    </Fragment>
                                 ))}
                              </List>
                              {/* Cart & Buttons */}
                              <NavButtons>
                                 <CartButtons>
                                    <Tooltip
                                       title='Search'
                                       arrow
                                       sx={theme => ({
                                          [theme.breakpoints.up('md')]: {
                                             display: 'none'
                                          }
                                       })}
                                    >
                                       <IconButton
                                          color='inherit'
                                          onClick={() => dispatch(uiActions.setActiveSearch(true))}
                                       >
                                          <img
                                             src={SearchIcon} alt='Search'
                                             style={{
                                                height: '24px',
                                                width: '24px'
                                             }}
                                          />
                                       </IconButton>
                                    </Tooltip>
                                    {
                                       [
                                          {
                                             path: '/wishlist',
                                             tooltipText: 'Wishlist',
                                             badgeContentAmount: wishlistItemsAmount,
                                             icon: <FavoriteBorderOutlinedIcon sx={{ color: 'text.secondary' }} />
                                          },
                                          {
                                             path: '/cart',
                                             tooltipText: 'Cart',
                                             badgeContentAmount: totalItems,
                                             icon: <ShoppingCartOutlinedIcon sx={{ color: 'text.secondary' }} />
                                          }
                                       ].map((item, index) => (
                                          <Link to={item.path} key={index}>
                                             <Tooltip title={item.tooltipText} arrow>
                                                <IconButton color='inherit'>
                                                   <Badge
                                                      color='secondary'
                                                      badgeContent={item.badgeContentAmount}
                                                   // showZero={true}
                                                   >
                                                      {item.icon}
                                                   </Badge>
                                                </IconButton>
                                             </Tooltip>
                                          </Link>
                                       ))
                                    }
                                 </CartButtons>
                                 <AuthButtons />
                              </NavButtons>
                           </MenuList>
                        </Menu>
                     </MenuItems>
                  </Toolbar>
               </AppBar>
               <SideDrawer menuItems={menuItems} />
            </>
         }
         <Backdrop
            open={inputFocus}
            sx={{ zIndex: 1001 }}
         />
      </>
   );
}

export default Navbar;
