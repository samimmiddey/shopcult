import React, { Fragment } from 'react';
import { styled, IconButton, Box, Drawer, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
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
import { useMediaQuery, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
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

   const { pathname } = useLocation();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   const links = menuItems.map(item => item.toLowerCase());

   return (
      <div>
         <>
            <Drawer
               open={showMenu}
               onClose={() => dispatch(uiActions.toggleMenu())}
            >
               <DrawerHeader>
                  <Link
                     to='/'
                     onClick={() => dispatch(uiActions.toggleMenu())}
                  >
                     <div
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           columnGap: '5px',
                        }}
                     >
                        <ShoppingBagOutlinedIcon sx={{ color: 'rgb(132, 76, 196)' }} />
                        <Typography
                           variant='h6'
                           sx={{ fontWeight: 700 }}
                        >
                           <span style={{ color: 'rgb(132, 76, 196)' }}>shop</span>
                           <span style={{ color: 'rgb(90, 57, 161)' }}>cult</span>
                        </Typography>
                     </div>
                  </Link>
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
                        color: 'text.secondary',
                        marginLeft: '2rem',
                        [theme.breakpoints.down('sm')]: {
                           marginLeft: '1.5rem'
                        }
                     })}
                  >
                     General
                  </Typography>
                  <List>
                     {links.map((link, index) => {
                        if (!mdWidth && (index === 5 || index === 6)) {
                           return null;
                        }
                        return (
                           <Fragment key={index}>
                              <Link to={link === 'Home' ? '/' : link === 'shop' ? `/${link}/all` : `/${link}`}>
                                 <ListItemButton
                                    sx={{
                                       margin: '5px 10px',
                                       borderRadius: '5px',
                                       minHeight: 48,
                                       px: 2.5,
                                       color: (((link === 'home' && pathname === '/') || (link === 'shop' && pathname === '/shop/all')) ? 'true' : `/${link}` === pathname) ? 'secondary.main' : 'text.primary',
                                       backgroundColor: (((link === 'home' && pathname === '/') || (link === 'shop' && pathname === '/shop/all')) ? 'true' : `/${link}` === pathname) ? '#5a39a125' : '',
                                       '&:hover': {
                                          backgroundColor: (((link === 'home' && pathname === '/') || (link === 'shop' && pathname === '/shop/all')) ? 'true' : `/${link}` === pathname) ? '#5a39a125' : '',
                                       }
                                    }}
                                 >
                                    <ListItemIcon
                                       sx={{
                                          minWidth: 0,
                                          mr: 3,
                                          color: (((link === 'home' && pathname === '/') || (link === 'shop' && pathname === '/shop/all')) ? 'true' : `/${link}` === pathname) ? 'secondary.main' : 'text.primary'
                                       }}
                                    >
                                       {icons[index]}
                                    </ListItemIcon>
                                    <ListItemText
                                       primary={
                                          <Typography
                                             sx={{
                                                fontSize: '15px',
                                                fontWeight: 600,
                                                color: (((link === 'home' && pathname === '/') || (link === 'shop' && pathname === '/shop/all')) ? 'true' : `/${link}` === pathname) ? 'secondary.main' : 'text.primary'
                                             }}
                                          >
                                             {link.charAt(0).toUpperCase() + link.slice(1)}
                                          </Typography>
                                       }
                                       sx={{ color: 'text.secondary' }}
                                    />
                                 </ListItemButton>
                              </Link>
                           </Fragment>
                        )
                     })}
                  </List>
               </Box>
            </Drawer>
         </>
      </div>
   );
}

export default SideDrawer;