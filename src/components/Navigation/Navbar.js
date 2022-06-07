import React, { useState, useEffect, Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchBar from '../UI/SearchBar';
import Box from '@mui/material/Box';
import SideDrawer from './Drawer';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { styled } from '@mui/system';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AuthButtons from '../UI/AuthButtons';
import { ListItemButton, Tooltip, useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import WishList from '../UI/WishList';
import { useLocation } from 'react-router-dom';

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
      columnGap: '1rem'
   },
   [theme.breakpoints.down('sm')]: {
      columnGap: 0
   }
}));

const MenuList = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '2.5rem',
   [theme.breakpoints.down('xl')]: {
      columnGap: '1.5rem'
   },
   [theme.breakpoints.down('sm')]: {
      columnGap: '10px',
   }
}));

const List = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '2rem',
   [theme.breakpoints.down('xl')]: {
      columnGap: '1rem'
   },
   [theme.breakpoints.down(1300)]: {
      display: 'none'
   }
}));

const NavButtons = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '2.5rem',
   [theme.breakpoints.down('xl')]: {
      columnGap: '1.5rem'
   },
   [theme.breakpoints.down(1300)]: {
      columnGap: '1.5rem'
   },
   [theme.breakpoints.down('sm')]: {
      columnGap: '10px',
      marginLeft: '10px',
   }
}));

const CartButtons = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   columnGap: '16px',
}));

const Navbar = () => {
   const [scrolled, setScrolled] = useState(false);
   const totalItems = useSelector(state => state.cart.totalAmount);
   const dispatch = useDispatch();
   const { id } = useParams();

   const { pathname } = useLocation();
   const route = pathname === '/signup' || pathname === '/login';

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

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
                     }}>
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
                           <Box sx={theme => ({
                              display: 'flex',
                              alignItems: 'center',
                              columnGap: '5px',
                              [theme.breakpoints.down('sm')]: {
                                 display: 'none'
                              }
                           })}>
                              <ShoppingBagOutlinedIcon sx={{ color: 'rgb(132, 76, 196)' }} />
                              <Typography variant='h6' sx={{ fontWeight: 700 }}><span style={{ color: 'rgb(132, 76, 196)' }}>shop</span><span style={{ color: 'rgb(90, 57, 161)' }}>cult</span></Typography>
                           </Box>
                        </Link>
                        {/* Search Bar & Menu List */}
                        <Menu>
                           <SearchBar />
                           <MenuList>
                              <List>
                                 {menuItems.map((item, index) => (
                                    <Fragment key={index}>
                                       <NavLink
                                          onClick={() => localStorage.setItem('currentPage', 1)}
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
                                             // disableGutters
                                             disableRipple
                                             sx={{
                                                borderRadius: '5px',
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
                                    <WishList />
                                    <Link to='/cart'>
                                       <Tooltip title="Cart" arrow>
                                          <IconButton color='inherit'>
                                             <Badge color='secondary' badgeContent={totalItems} showZero={true}>
                                                <ShoppingCartOutlinedIcon sx={{ color: 'text.secondary' }} />
                                             </Badge>
                                          </IconButton>
                                       </Tooltip>
                                    </Link>
                                 </CartButtons>
                                 {!mdWidth && <AuthButtons />}
                              </NavButtons>
                           </MenuList>
                        </Menu>
                     </MenuItems>
                  </Toolbar>
               </AppBar>
               <SideDrawer menuItems={menuItems} />
            </>
         }
      </>
   );
}

export default Navbar;
