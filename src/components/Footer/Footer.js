import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { styled } from '@mui/system';
import CustomizedAccordion from '../UI/Accordion';
import { useTheme, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';

const footerItems = [
   {
      title: 'Business',
      list: ['Support', 'Features', 'Newsletter', 'Marketing', 'Strategies']
   },
   {
      title: 'Get Help',
      list: ['About Us', 'Contact Us', 'Return Policy', 'Privacy Policy', 'Payment Policy']
   },
   {
      title: 'About Us',
      list: ['News', 'Service', 'Our Policy', 'Customer Care', 'FAQs']
   }
];

const Text = styled(Typography)(({ theme }) => ({
   lineHeight: 1.7,
   fontSize: '17px',
   fontWeight: 400,
   [theme.breakpoints.down('lg')]: {
      lineHeight: 1.5,
   },
   [theme.breakpoints.down('md')]: {
      fontSize: '16px'
   },
   [theme.breakpoints.down('sm')]: {
      fontSize: '15px'
   }
}));

const List = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'flex-start',
   rowGap: '1.5rem',
   [theme.breakpoints.down(500)]: {
      rowGap: '1rem'
   }
}));

const UL = styled('ul')({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'flex-start',
   rowGap: '8px'
});

const Footer = ({ marginFalse }) => {
   const theme = useTheme();
   const xsWidth = useMediaQuery(theme.breakpoints.down(500));

   const { pathname } = useLocation();
   const route = pathname === '/signup' || pathname === '/login';

   return (
      <>
         {!route &&
            <Box
               className='gradient-background section-margin'
               sx={theme => ({
                  paddingTop: '4rem',
                  marginTop: !marginFalse && '8rem',
                  [theme.breakpoints.down('xl')]: {
                     marginTop: !marginFalse && '7rem'
                  },
                  [theme.breakpoints.down('lg')]: {
                     marginTop: !marginFalse && '6rem'
                  },
                  [theme.breakpoints.down('md')]: {
                     marginTop: !marginFalse && '5rem',
                     paddingTop: '3.5rem'
                  },
                  [theme.breakpoints.down('sm')]: {
                     marginTop: !marginFalse && '4.5rem'
                  }
               })}
            >
               <Box sx={{
                  maxWidth: '1700px',
                  margin: '0 auto',
                  padding: '0 1.5rem'
               }}>
                  {/* Newsletter */}
                  <Box
                     sx={theme => ({
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        columnGap: '5rem',
                        borderBottom: '1px dotted #9666cc',
                        paddingBottom: '3rem',
                        [theme.breakpoints.down('xl')]: {
                           columnGap: '4rem',
                        },
                        [theme.breakpoints.down('lg')]: {
                           columnGap: '3rem',
                        },
                        [theme.breakpoints.down('md')]: {
                           columnGap: 0,
                           flexDirection: 'column',
                           justifyContent: 'center',
                           alignItemss: 'center',
                           rowGap: '1.5rem'
                        }
                     })}
                  >
                     <Box
                        sx={{
                           flex: 1
                        }}
                     >
                        <Typography
                           color='#fff'
                           sx={theme => ({
                              fontWeight: 600,
                              lineHeight: 1.4,
                              color: 'rgb(196, 174, 243)',
                              fontSize: '2.5rem',
                              [theme.breakpoints.down('xl')]: {
                                 fontSize: '2.25rem'
                              },
                              [theme.breakpoints.down('lg')]: {
                                 fontSize: '1.75rem'
                              },
                              [theme.breakpoints.down('md')]: {
                                 fontSize: '1.5rem'
                              }
                           })}
                        >
                           Sign Up For Updates &amp; Newsletter
                        </Typography>
                     </Box>
                     <Box
                        sx={theme => ({
                           flex: 1,
                           display: 'flex',
                           alignItems: 'center',
                           width: '100%',
                           position: 'relative',
                           justifyContent: 'flex-end',
                           height: '45px',
                           [theme.breakpoints.down('lg')]: {
                              flex: 1.5
                           },
                           [theme.breakpoints.down('md')]: {
                              width: '80%',
                              minHeight: '43px',
                           },
                           [theme.breakpoints.down('sm')]: {
                              width: '100%',
                              minHeight: '40px',
                           }
                        })}
                     >
                        <input
                           placeholder='Type your email...'
                           style={{
                              position: 'absolute',
                              width: '100%',
                              outline: 'none',
                              borderRadius: '5px',
                              height: '100%',
                              padding: '0 0 0 24px',
                              border: '1px solid #eee',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#F2F3F4',
                              '&:focus': {
                                 backgroundColor: '#F8F9F9',
                                 border: '1px solid #d2c6eb',
                              }
                           }}
                        />
                        <Button sx={{
                           position: 'absolute',
                           height: '100%',
                           zIndex: 99,
                           textTransform: 'none',
                           borderTopLeftRadius: '0',
                           borderBottomLeftRadius: '0',
                           transition: '0.5s',
                           "&:hover": {
                              backgroundPosition: 'right center'
                           }
                        }}
                           className='primary-button'
                           variant='contained'
                        >
                           Subscribe Now
                        </Button>
                     </Box>
                  </Box>
                  {/* Footer Items */}
                  <Box
                     sx={theme => ({
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        columnGap: '5rem',
                        marginTop: '3rem',
                        color: 'rgb(196, 174, 243)',
                        paddingBottom: '3rem',
                        borderBottom: '1px dotted #9666cc',
                        [theme.breakpoints.down('md')]: {
                           flexDirection: 'column',
                           rowGap: '3rem',
                           columnGap: 0,
                           justifyConten: 'center'
                        },
                        [theme.breakpoints.down('sm')]: {
                           rowGap: '2rem',
                           marginTop: '2rem'
                        }
                     })}
                  >
                     <Box
                        sx={theme => ({
                           flex: 1,
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'flex-start',
                           rowGap: '1.5rem',
                           [theme.breakpoints.down('md')]: {
                              width: '70%'
                           }
                        })}>
                        <Box sx={{
                           display: 'flex',
                           alignItems: 'center',
                           columnGap: '5px'
                        }}>
                           <ShoppingBagOutlinedIcon sx={{ color: 'rgb(155, 102, 216)' }} />
                           <Typography
                              variant='h6'
                              sx={{
                                 fontWeight: 700
                              }}
                           >
                              <span style={{ color: 'rgb(155, 102, 216)' }}>shop</span><span style={{ color: 'rgb(90, 57, 161)' }}>cult</span>
                           </Typography>
                        </Box>
                        <Text sx={{ fontWeight: 300 }}>
                           SHOPCULT - worldwide online store since 1996. We sell over 1000+ branded products on our website. With the right customer support we aspire to provide the best shopping experience.
                        </Text>
                        <Box
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              columnGap: '10px'
                           }}
                        >
                           <FacebookIcon sx={{ fontSize: '2rem' }} />
                           <InstagramIcon sx={{ fontSize: '2rem' }} />
                           <LinkedInIcon sx={{ fontSize: '2rem' }} />
                        </Box>
                     </Box>
                     {/* List Items */}
                     {!xsWidth &&
                        <Box
                           sx={theme => ({
                              flex: 2,
                              display: 'flex',
                              justifyContent: 'space-around',
                              width: '100%',
                              alignItems: 'flex-start',
                              [theme.breakpoints.down(500)]: {
                                 flexDirection: 'column',
                                 justifyContent: 'flex-start',
                                 rowGap: '2rem'
                              }
                           })}
                        >
                           {footerItems.map((item, index) => (
                              <List
                                 key={index}
                                 sx={theme => ({
                                    [theme.breakpoints.down('md')]: {
                                       flex: 1
                                    }
                                 })}
                              >
                                 <Typography
                                    sx={{
                                       fontWeight: 600
                                    }}
                                    variant='h6'
                                 >
                                    {item.title}
                                 </Typography>
                                 <UL>
                                    {item.list.map((item, index) => (
                                       <Text key={index}>{item}</Text>
                                    ))}
                                 </UL>
                              </List>
                           ))}
                        </Box>
                     }
                     {/* Accordion */}
                     {xsWidth &&
                        <Box sx={{
                           width: '100%',
                           display: 'flex',
                           flexDirection: 'column',
                           rowGap: '1rem'
                        }}>
                           {footerItems.map((item, index) => (
                              <CustomizedAccordion
                                 key={index}
                                 title={item.title}
                                 list={item.list}
                              />
                           ))}
                        </Box>
                     }
                  </Box>
                  <Box
                     sx={{
                        color: 'rgb(196, 174, 243)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.65rem 0',
                        textAlign: 'center'
                     }}
                  >
                     <Text>&copy; 2021 SHOPCULT. All Rights Reserved</Text>
                  </Box>
               </Box>
            </Box >
         }
      </>
   );
};

export default Footer;