import React, { Fragment } from 'react';
import { styled, IconButton, Box, Drawer, List, ListItemIcon, ListItemText, ListItemButton, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShopOutlinedIcon from '@mui/icons-material/ShopOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AuthButtons from '../UI/AuthButtons';
import { useMediaQuery, useTheme } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

const icons = [
   <HomeOutlinedIcon />,
   <InfoOutlinedIcon />,
   <ShopOutlinedIcon />,
   <WidgetsOutlinedIcon />,
   <HelpOutlineOutlinedIcon />,
   <AccountCircleOutlinedIcon />,
   <HistoryOutlinedIcon />
];

const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   padding: '10px 1rem 10px 2rem',
   height: '75px',
   ...theme.mixins.toolbar,
   justifyContent: 'space-between',
   [theme.breakpoints.down('sm')]: {
      padding: '10px 1rem',
   }
}));

const SideDrawer = ({ menuItems }) => {
   const showMenu = useSelector(state => state.ui.showMenu);
   const dispatch = useDispatch();

   const { id } = useParams();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   return (
      <div>
         <>
            <Drawer
               open={showMenu}
               onClose={() => dispatch(uiActions.toggleMenu())}
            >
               <DrawerHeader>
                  <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     columnGap: '5px',
                  }}>
                     <ShoppingBagOutlinedIcon sx={{ color: 'rgb(132, 76, 196)' }} />
                     <Typography variant='h6' sx={{ fontWeight: 700 }}><span style={{ color: 'rgb(132, 76, 196)' }}>shop</span><span style={{ color: 'rgb(90, 57, 161)' }}>cult</span></Typography>
                  </div>
                  <IconButton onClick={() => dispatch(uiActions.toggleMenu())}>
                     <ChevronLeftIcon />
                  </IconButton>
               </DrawerHeader>
               <Box
                  sx={{ width: 250, marginTop: '1rem' }}
                  role="presentation"
                  onClick={() => dispatch(uiActions.toggleMenu())}
               >
                  <Typography
                     sx={theme => ({
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'text.disabled',
                        marginLeft: '2rem',
                        [theme.breakpoints.down('sm')]: {
                           marginLeft: '1.5rem'
                        }
                     })}
                  >
                     General
                  </Typography>
                  <List>
                     {[...menuItems, 'Order History', 'Profile'].map((item, index) => {
                        if (!mdWidth && (index === 5 || index === 6)) {
                           return null;
                        }
                        return (
                           <Fragment key={index}>
                              <NavLink
                                 onClick={() => localStorage.setItem('currentPage', 1)}
                                 activeClassName='active-drawer-nav'
                                 exact={item === 'Home' ? true : false}
                                 to={
                                    {
                                       ...item === 'Home' ? { pathname: '/' } : {
                                          ...item === 'About' ? { pathname: '/about' } : {
                                             ...item === 'Shop' ? { pathname: `/shop/${id ? id : 'all'}` } : {
                                                ...item === 'Brands' ? { pathname: '/brands' } : {
                                                   ...item === 'Help' ? { pathname: '/help' } : {
                                                      ...item === 'Order History' ? { pathname: '/orderhistory' } : {
                                                         ...item === 'Profile' ? { pathname: '/profile' } : ''
                                                      }
                                                   }
                                                }
                                             }
                                          }
                                       }
                                    }
                                 }
                              >
                                 <ListItemButton
                                    className='active-drawer-nav-item'
                                    sx={{
                                       // margin: '2px 0 2px 1rem',
                                       // borderRadius: '10px 0 0 10px',
                                       // minHeight: 48,
                                       margin: '5px 10px',
                                       borderRadius: '10px',
                                       minHeight: 48,
                                       px: 2.5,
                                    }}
                                 >
                                    <ListItemIcon
                                       sx={{
                                          minWidth: 0,
                                          mr: 3,
                                          color: 'rgb(132, 76, 196)'
                                       }}
                                    >
                                       {icons[index]}
                                    </ListItemIcon>
                                    <ListItemText
                                       primary={
                                          <Typography style={{ fontSize: '15px', fontWeight: 500 }}>{item}</Typography>
                                       }
                                       sx={{ color: 'text.secondary' }}
                                    />
                                 </ListItemButton>
                              </NavLink>
                           </Fragment>
                        )
                     })}
                     {mdWidth && <Divider />}
                     {mdWidth && <AuthButtons />}
                  </List>
               </Box>
            </Drawer>
         </>
      </div>
   );
}

export default SideDrawer;