import React from 'react';
import { Card, Typography, Button, CardActions, Box, Divider, useTheme, useMediaQuery } from '@mui/material';
import RatingCard from './RatingCard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DiscountCard from './DiscountCard';
import PrimaryButton from '../../UI/PrimaryButton';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeroCard = ({ image }) => {
   const user = useSelector(state => state.auth.userData);

   const theme = useTheme();
   const xlWidth = useMediaQuery(theme.breakpoints.down('xl'));
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <div style={{ width: '100%' }}>
         {!mdWidth && <DiscountCard />}
         <Card
            elevation={0}
            sx={theme => ({
               height: '600px',
               borderRadius: '30px',
               position: 'relative',
               background: `url(${image}) no-repeat center center/cover`,
               [theme.breakpoints.down('xl')]: {
                  height: '500px',
                  borderRadius: '20px'
               },
               [theme.breakpoints.down('lg')]: {
                  height: '450px',
                  borderRadius: 0
               },
               [theme.breakpoints.down('md')]: {
                  height: '400px'
               },
               [theme.breakpoints.down('sm')]: {
                  height: '300px'
               }
            })}
         >
            <Box
               sx={theme => ({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '100%',
                  color: '#fff',
                  padding: '0 4rem',
                  background: 'rgba(28, 12, 61, 0.75)',
                  [theme.breakpoints.down('sm')]: {
                     padding: '0 3rem'
                  }
               })}
            >
               {/* First Flex Box */}
               <Box
                  sx={theme => ({
                     flex: 1,
                     display: 'flex',
                     flexDirection: 'column',
                     rowGap: '1rem',
                     [theme.breakpoints.down('lg')]: {
                        rowGap: '10px',
                        flex: 1.5
                     },
                     [theme.breakpoints.down('md')]: {
                        flex: 8
                     },
                     [theme.breakpoints.down('sm')]: {
                        // flex: 10
                     }
                  })}
               >
                  <Typography
                     sx={theme => ({
                        fontWeight: 600,
                        fontSize: '3rem',
                        lineHeight: '1.4',
                        color: 'rgb(196, 174, 243)',
                        [theme.breakpoints.down('xl')]: {
                           fontSize: '2.5rem',
                           marginRight: '1rem'
                        },
                        [theme.breakpoints.down('lg')]: {
                           fontSize: '2rem',
                        },
                        [theme.breakpoints.down('md')]: {
                           fontSize: '1.5rem',
                        },
                        [theme.breakpoints.down('sm')]: {
                           marginRight: 0,
                           fontSize: '1.3rem',
                        },
                        [theme.breakpoints.down(350)]: {
                           marginRight: 0,
                           fontSize: '1.15rem',
                        }
                     })}
                  >
                     Every Purchase Will Be Made With Pleasure
                  </Typography>
                  <Typography
                     sx={theme => ({
                        lineHeight: 1.7,
                        color: 'rgb(187, 168, 228)',
                        marginRight: '4rem',
                        fontSize: '18px',
                        [theme.breakpoints.down('xl')]: {
                           lineHeight: 1.6,
                           fontSize: '17px'
                        },
                        [theme.breakpoints.down('lg')]: {
                           fontSize: '16px',
                           lineHeight: 1.5,
                           marginRight: '2rem'
                        },
                        [theme.breakpoints.down('md')]: {
                           marginRight: 0
                        },
                        [theme.breakpoints.down('sm')]: {
                           fontSize: '15px',
                        },
                        [theme.breakpoints.down(350)]: {
                           display: 'none'
                        }
                     })}
                  >
                     Buy with utmost confident and enjoy the best shopping experience
                     on the internet. <span style={{ display: `${smWidth ? 'none' : ''}` }}>Our main priority is to provide the best user
                        experince possible. Our customers are our idenity.</span>
                  </Typography>
                  <CardActions
                     sx={theme => ({
                        paddingLeft: 0,
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '10px',
                        marginTop: '0.5rem',
                        [theme.breakpoints.down('md')]: {
                           columnGap: 0
                        }
                     })}
                  >
                     <Link to='/shop/all'>
                        <PrimaryButton text='Start Shopping' />
                     </Link>
                     <Link to='/signup'>
                        <Button
                           sx={theme => ({
                              textTransform: 'none',
                              minWidth: 0,
                              minHeight: 0,
                              padding: '14px 2rem',
                              borderRadius: '8px',
                              fontSize: '1rem',
                              background: 'none',
                              display: user ? 'none' : 'block',
                              borderColor: 'rgb(155, 102, 216)',
                              color: 'rgb(213, 200, 240)',
                              "&:hover": {
                                 borderColor: 'rgb(155, 102, 216)'
                              },
                              [theme.breakpoints.down('xl')]: {
                                 padding: '10px 1.5rem',
                                 fontSize: '15px',
                              },
                              [theme.breakpoints.down('lg')]: {
                                 padding: '0.5rem 1.25rem',
                                 borderRadius: '5px'
                              },
                              [theme.breakpoints.down('md')]: {
                                 fontSize: '14px',
                              },
                              [theme.breakpoints.down('sm')]: {
                                 display: 'none'
                              }
                           })}
                           variant='outlined'
                        >
                           Create Account
                        </Button>
                     </Link>
                  </CardActions>
                  <Box
                     sx={theme => ({
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        [theme.breakpoints.down('sm')]: {
                           display: 'none'
                        }
                     })}
                  >
                     <Box sx={theme => ({
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '10px',
                        marginTop: '1rem',
                        [theme.breakpoints.down('md')]: {
                           marginTop: '0.5rem',
                        },
                        [theme.breakpoints.down('md')]: {
                           marginTop: '0.5rem',
                        }
                     })}
                     >
                        <EmojiEventsIcon sx={{ color: 'rgb(187, 168, 228)' }} />
                        <Divider orientation='vertical' sx={{ height: '30px', backgroundColor: 'rgb(187, 168, 228)' }} />
                        <Typography
                           sx={theme => ({
                              fontSize: '18px',
                              fontWeight: 300,
                              color: 'rgb(187, 168, 228)',
                              [theme.breakpoints.down('xl')]: {
                                 fontSize: '17px'
                              },
                              [theme.breakpoints.down('md')]: {
                                 fontSize: '16px'
                              },
                              [theme.breakpoints.down('sm')]: {
                                 fontSize: '15px'
                              },
                           })}
                        >
                           Award winning 24/7 customer service
                        </Typography>
                     </Box>
                     {!xlWidth && <RatingCard />}
                  </Box>
               </Box>
               {/* Second Flex Box */}
               <Box sx={theme => ({
                  flex: 1, [theme.breakpoints.down('sm')]: {
                     display: 'none'
                  }
               })}>
               </Box>
            </Box>
         </Card >
      </div >
   );
};
export default HeroCard;