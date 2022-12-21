import React, { useEffect } from 'react';
import { Avatar, Box, Button, IconButton, Input, Typography } from '@mui/material';
import avatar from '../../../../assets/avatar.png';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import ProgressButton from '../../../UI/ProgressButton';
import { uploadPicture } from '../../../../store/auth-thunks';

const defaultValue = {
   image: null
};

const PictureComponent = ({ user, imageFile, setImageFile }) => {
   const loading = useSelector(state => state.auth.uploadPicProgress);

   const dispatch = useDispatch();

   const validationSchema = Yup.object().shape({
      image: Yup.mixed()
         .test('fileSize', 'The file is too large', (value) => {
            return value && value[0] && value[0].size <= 20000000;
         })
         .test('type', 'We only support JPG, PNG & SVG', (value) => {
            return value && value[0] && (
               value[0].type === 'image/jpeg' ||
               value[0].type === 'image/png' ||
               value[0].type === 'image/svg'
            );
         })
   });

   const {
      register,
      handleSubmit,
      reset,
      formState: {
         errors
      }
   } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: defaultValue
   });

   // Handle upload picture
   const handleUploadPicture = (data) => {
      dispatch(uploadPicture(user.id, data));
   };

   // Reset field
   useEffect(() => {
      if (!loading) {
         setImageFile(null);
         reset({ ...defaultValue });
      }
   }, [loading, reset, setImageFile]);

   return (
      <form onSubmit={handleSubmit((data) => handleUploadPicture(data))}>
         <Box sx={{ position: 'relative' }}>
            <Box
               sx={theme => ({
                  height: '90px',
                  width: '90px',
                  borderRadius: '50%',
                  position: 'relative',
                  [theme.breakpoints.down('lg')]: {
                     height: '80px',
                     width: '80px'
                  },
                  [theme.breakpoints.down('sm')]: {
                     height: '70px',
                     width: '70px'
                  }
               })}
            >
               <Avatar
                  src={user.img || avatar}
                  alt=''
                  sx={{
                     height: '100%',
                     width: '100%'
                  }}
               />
               <IconButton
                  sx={{
                     position: 'absolute',
                     bottom: 0,
                     right: 0,
                     backgroundColor: 'secondary.main',
                     height: '30px',
                     width: '30px',
                     '&:hover': {
                        backgroundColor: 'secondary.main'
                     }
                  }}
                  aria-label='upload picture'
                  component='label'
               >
                  <CameraAltIcon sx={{ color: '#fff', fontSize: '1rem' }} />
                  <Input
                     name='image'
                     hidden
                     accept="image/*"
                     type="file"
                     {...register('image', {
                        onChange: e => setImageFile(e.target.files[0])
                     })}
                  />
               </IconButton>
            </Box>
            {
               imageFile && !errors['image'] &&
               <Box
                  sx={{
                     position: 'absolute',
                     left: 0,
                     bottom: '-3rem',
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'flex-start'
                  }}
               >
                  <Typography
                     className='user-text-wrap'
                     sx={{
                        color: 'text.primary',
                        fontSize: '12px',
                        maxWidth: '150px'
                     }}
                  >
                     {imageFile.name}
                  </Typography>
                  <Button
                     variant='contained'
                     type='submit'
                     disabled={loading}
                     sx={{
                        height: '22px',
                        fontSize: '11px',
                        textTransform: 'none',
                        marginTop: '3px',
                        marginLeft: '1rem'
                     }}
                  >
                     {loading ? <ProgressButton loading={loading} type='image' /> : 'Upload'}
                  </Button>
               </Box>
            }
            {
               errors['image'] &&
               <Typography
                  className='user-text-wrap'
                  sx={{
                     position: 'absolute',
                     left: 0,
                     bottom: '-1.5rem',
                     color: 'red',
                     fontSize: '12px',
                     maxWidth: '200px'
                  }}
               >
                  {errors['image']?.message}
               </Typography>
            }
         </Box>
      </form>
   );
};

export default PictureComponent;