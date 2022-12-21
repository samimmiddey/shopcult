import React, { useState } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import PictureComponent from './PictureComponent/PictureComponent';
import UpdateProfileForm from './UpdateProfileForm/UpdateProfileForm';

const UserProfile = () => {
   const [updateButton, setUpdateButton] = useState(null);
   const [imageFile, setImageFile] = useState(null);

   const user = useSelector(state => state.auth.userData);

   return (
      <Card
         elevation={0}
         sx={theme => ({
            padding: '2.5rem 2rem',
            [theme.breakpoints.down('md')]: {
               padding: '2rem 1rem'
            },
            [theme.breakpoints.down('sm')]: {
               padding: '1.5rem 1rem'
            }
         })}
      >
         <Typography
            sx={{
               fontSize: '1.5rem',
               color: 'text.primary',
               fontWeight: 600,
               paddingBottom: '1rem',
               marginBottom: '1.5rem',
               borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
            }}
         >
            User Details
         </Typography>
         <Box
            sx={theme => ({
               display: 'flex',
               alignItems: 'center',
               columnGap: '2rem',
               [theme.breakpoints.down('lg')]: {
                  columnGap: '1.5rem'
               },
               [theme.breakpoints.down('sm')]: {
                  columnGap: '1rem'
               }
            })}
         >
            {/* Picture Component */}
            <PictureComponent
               user={user}
               imageFile={imageFile}
               setImageFile={setImageFile}
            />
            <Box sx={{ width: '100%' }}>
               <Typography
                  className='user-text-wrap'
                  sx={theme => ({
                     color: 'text.primary',
                     fontSize: '1.25rem',
                     fontWeight: 600,
                     maxWidth: '90%',
                     [theme.breakpoints.down('sm')]: {
                        fontSize: '1rem'
                     },
                     [theme.breakpoints.down(350)]: {
                        maxWidth: '80%'
                     }
                  })}
               >
                  {user?.name}
               </Typography>
               <Typography
                  className='user-text-wrap'
                  sx={theme => ({
                     color: 'text.secondary',
                     fontSize: '14px',
                     fontWeight: 500,
                     maxWidth: '90%',
                     [theme.breakpoints.down(350)]: {
                        maxWidth: '80%'
                     }
                  })}
               >
                  {user?.email}
               </Typography>
            </Box>
         </Box>
         {/* Details */}
         <Box
            sx={theme => ({
               marginTop: imageFile ? '3rem' : '1.5rem',
               padding: '1.5rem 1rem',
               [theme.breakpoints.down('md')]: {
                  marginTop: imageFile ? '2.5rem' : '0.5rem'
               }
            })}
         >
            <Typography
               sx={{
                  color: 'text.primary',
                  fontSize: '1rem',
                  fontWeight: 600
               }}
            >
               Basic Details
            </Typography>
         </Box>
         <Box sx={{ width: '100%' }}>
            {
               [
                  {
                     title: 'Name',
                     value: user?.name
                  },
                  {
                     title: 'Email',
                     value: user?.email
                  }
               ].map((item, index, arr) => (
                  <Box
                     key={index}
                     sx={theme => ({
                        padding: '1rem',
                        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                        borderBottom: index === arr.length - 1 && '1px solid rgba(0, 0, 0, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '3rem',
                        width: '100%',
                        [theme.breakpoints.down('sm')]: {
                           flexDirection: 'column',
                           alignItems: 'flex-start',
                           columnGap: 0,
                           rowGap: '3px'
                        }
                     })}
                  >
                     <Typography
                        sx={theme => ({
                           color: 'text.primary',
                           fontSize: '15px',
                           fontWeight: 500,
                           width: '200px',
                           [theme.breakpoints.down('sm')]: {
                              width: '100%'
                           }
                        })}
                     >
                        {item.title}
                     </Typography>
                     <Typography
                        className='user-text-wrap'
                        sx={theme => ({
                           color: 'text.secondary',
                           fontSize: '15px',
                           fontWeight: 500,
                           maxWidth: '90%',
                           [theme.breakpoints.down(350)]: {
                              maxWidth: '80%'
                           }
                        })}
                     >
                        {item.value}
                     </Typography>
                  </Box>
               ))
            }
         </Box>
         {/* Action Buttons */}
         {
            !updateButton &&
            <Box
               sx={theme => ({
                  marginTop: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '12px',
                  [theme.breakpoints.down('sm')]: {
                     flexDirection: 'column',
                     alignItems: 'flex-start',
                     columnGap: 0,
                     rowGap: '12px',
                     width: '100%'
                  }
               })}
            >
               {
                  ['Update Name', 'Update Email', 'Update Password'].map((item, index) => (
                     <Button
                        onClick={() => setUpdateButton(index + 1)}
                        key={index}
                        variant='outlined'
                        sx={theme => ({
                           textTransform: 'none',
                           [theme.breakpoints.down('sm')]: {
                              width: '100%'
                           }
                        })}
                     >
                        {item}
                     </Button>
                  ))
               }
            </Box>
         }
         {/* Form */}
         {
            updateButton &&
            <UpdateProfileForm
               updateButton={updateButton}
               setUpdateButton={setUpdateButton}
               user={user}
            />
         }
      </Card>
   );
};

export default UserProfile;