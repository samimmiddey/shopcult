import React, { Fragment, useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Box, styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import UpdateProfileForm from './UpdateProfileForm/UpdateProfileForm';
import { uploadPicture } from '../../../store/auth-thunks';
import { projectAuth } from '../../../Firebase/config';
import ProgressButton from '../../UI/ProgressButton';

const Input = styled('input')({
   display: 'none',
});

const UserProfile = () => {
   const [editMode, setEditMode] = useState(false);
   const [uploadPic, setUploadPic] = useState(false);
   const [pic, setPic] = useState(null);
   const [selectedError, setSelectedError] = useState(null);
   const [updateField, setUpdateField] = useState(null);
   const [loading, setIsLoading] = useState(false);
   const user = projectAuth.currentUser;
   const userData = useSelector(state => state.auth.userData);

   const dispatch = useDispatch();

   const userDetails = [
      { 'First Name': userData.firstName },
      { 'Last Name': userData.lastName },
      { 'Email': userData.email }
   ];

   const handleSubmitPicture = async (e) => {
      e.preventDefault();

      setIsLoading(true);
      await dispatch(uploadPicture(user, pic));
      setIsLoading(false);
      setUploadPic(false);
   }

   const handleFileChange = (e) => {
      const selected = e.target.files[0];

      if (!selected) {
         setSelectedError('Please Select a file');
         return;
      }

      if (!selected.type.includes('image')) {
         setSelectedError('Selected file must be an image');
         return;
      }

      if (selected.size > 1000000) {
         setSelectedError('Image file must be less than 1mb');
         return;
      }

      setPic(selected);
      setUploadPic(true);
   }

   return (
      <Card
         elevation={0}
         sx={theme => ({
            marginTop: '5rem',
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
            [theme.breakpoints.down('xl')]: {
               marginTop: '4rem'
            },
            [theme.breakpoints.down('lg')]: {
               marginTop: '3rem'
            },
            [theme.breakpoints.down('md')]: {
               marginTop: '2rem'
            }
         })}
      >
         <CardContent>
            <Typography sx={{ fontWeight: 600 }}>
               Customer Details
            </Typography>
         </CardContent>
         <Divider sx={{ margin: '0 0 1rem 0' }} />
         <CardContent
            sx={theme => ({
               display: 'flex',
               alignItems: 'center',
               columnGap: '2rem',
               marginBottom: uploadPic ? '24px' : '',
               [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  rowGap: uploadPic ? '3.5rem' : '1.5rem',
                  marginBottom: 0
               }
            })}
         >
            {/* Show & upload a picture */}
            <form onSubmit={handleSubmitPicture}>
               <Box sx={{ position: 'relative' }}>
                  <Avatar
                     alt='profile'
                     sx={{
                        height: '75px',
                        width: '75px'
                     }}
                     src={userData.img || ''}
                  >
                     {userData.img || `${userData.firstName.slice(0, 1).toUpperCase()}`}
                  </Avatar>
                  <label
                     style={{
                        position: 'absolute',
                        bottom: '-10px',
                        right: '-5px'
                     }}
                     htmlFor="icon-button-file"
                  >
                     <Input
                        onChange={handleFileChange}
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                     />
                     <IconButton
                        sx={{
                           color: 'rgb(90, 57, 161)'
                        }}
                        component="span"
                     >
                        <PhotoCameraIcon />
                     </IconButton>
                  </label>
                  {
                     !uploadPic && selectedError &&
                     <Typography
                        sx={{
                           color: 'red',
                           fontWeight: 600,
                           width: '250px',
                           position: 'absolute',
                           fontSize: '12px',
                           minWidth: 0,
                           minHeight: 0,
                           height: '20px',
                           top: '105%',
                           right: 0,
                           left: 0
                        }}
                        gutterBottom
                     >
                        {selectedError}
                     </Typography>
                  }
                  {
                     uploadPic &&
                     <>
                        <Typography
                           className='dp-text-wrap'
                           sx={{
                              width: '150px',
                              position: 'absolute',
                              fontSize: '12px',
                              minWidth: 0,
                              minHeight: 0,
                              height: '20px',
                              top: '105%',
                              right: 0,
                              left: 0
                           }}
                           gutterBottom
                        >
                           {pic.name}
                        </Typography>
                        <Button
                           variant='contained'
                           type='submit'
                           sx={{
                              position: 'absolute',
                              textTransform: 'none',
                              fontSize: '12px',
                              minWidth: 0,
                              minHeight: 0,
                              height: '20px',
                              top: '130%',
                              right: 0,
                              left: 0
                           }}
                        >
                           {loading ? <ProgressButton type='image' loading={loading} /> : 'Upload'}
                        </Button>
                     </>
                  }
               </Box>
            </form>
            <Box
               sx={theme => ({
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                  [theme.breakpoints.down(350)]: {
                     flexDirection: 'column',
                     alignItems: 'flex-start',
                     justifyContent: 'center',
                     rowGap: '1rem'
                  }
               })}
            >
               {/* Name & Email */}
               <Box>
                  <Typography variant='h5' sx={{ fontSize: '1rem', fontWeight: 600 }}>
                     {userData.firstName + ' ' + userData.lastName}
                  </Typography>
                  <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'text.disabled' }}>
                     {userData.email}
                  </Typography>
               </Box>
               {/* Edit Button */}
               {!editMode &&
                  <Button
                     onClick={() => {
                        setEditMode(prevState => !prevState);
                        setUpdateField('name');
                     }}
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '5px',
                        textTransform: 'none'
                     }}
                     variant='outlined'
                  >
                     Edit <EditIcon sx={{ fontSize: '16px' }} />
                  </Button>
               }
               {editMode &&
                  <Button
                     onClick={() => setEditMode(prevState => !prevState)}
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '5px',
                        textTransform: 'none'
                     }}
                     variant='contained'
                     color='primary'
                  >
                     <ArrowBackOutlinedIcon sx={{ fontSize: '16px' }} /> Back
                  </Button>
               }
            </Box>
         </CardContent>
         {/* User Details List */}
         <CardContent>
            <Card elevation={0}>
               <CardContent
                  sx={theme => ({
                     padding: '32px 24px'
                  })}
               >
                  <Typography sx={{ fontWeight: 600 }}>
                     Basic Details
                  </Typography>
               </CardContent>
               <Divider />
               {
                  userDetails.map((detail, index) => (
                     <Fragment key={index}>
                        <CardContent
                           sx={theme => ({
                              padding: '16px 24px',
                              display: 'flex',
                              alignItems: 'center',
                              [theme.breakpoints.down('sm')]: {
                                 flexDirection: 'column',
                                 alignItems: 'flex-start'
                              }
                           })}
                        >
                           <Typography
                              sx={{
                                 fontWeight: 500,
                                 fontSize: '15px',
                                 color: 'text.secondary',
                                 width: '250px'
                              }}
                           >
                              {Object.keys(detail)}
                           </Typography>
                           <Typography
                              sx={{
                                 fontWeight: 500,
                                 fontSize: '15px',
                                 color: 'text.disabled',
                              }}
                           >
                              {Object.values(detail)}
                           </Typography>
                        </CardContent>
                        <Divider />
                     </Fragment>
                  ))
               }
               {
                  !editMode &&
                  <CardContent
                     sx={theme => ({
                        padding: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '10px',
                        [theme.breakpoints.down('sm')]: {
                           flexDirection: 'column',
                           alignItems: 'flex-start',
                           rowGap: '10px'
                        }
                     })}>
                     <Button
                        onClick={() => {
                           setEditMode(prevState => !prevState);
                           setUpdateField('email');
                        }}
                        sx={theme => ({
                           textTransform: 'none',
                           [theme.breakpoints.down('sm')]: {
                              width: '100%'
                           }
                        })}
                        variant='outlined'
                     >
                        Reset Email
                     </Button>
                     <Button
                        onClick={() => {
                           setEditMode(prevState => !prevState);
                           setUpdateField('password');
                        }}
                        sx={theme => ({
                           textTransform: 'none',
                           [theme.breakpoints.down('sm')]: {
                              width: '100%'
                           }
                        })}
                        variant='outlined'
                     >
                        Reset Password
                     </Button>
                  </CardContent>
               }
               {
                  editMode &&
                  <UpdateProfileForm
                     setEditMode={setEditMode}
                     field={updateField}
                  />
               }
            </Card>
         </CardContent >
      </Card >
   );
};

export default UserProfile;