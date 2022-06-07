import React, { useState } from 'react';
import CustomInput from '../../../CheckoutComponents/CheckoutForm/CustomFields/CustomInput';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Box, Button, styled } from '@mui/material';
import { updateEmail, updateName, updatePassword } from '../../../../store/auth-thunk';
import { useDispatch, useSelector } from 'react-redux';
import ProgressButton from '../../../UI/ProgressButton';
import { projectAuth } from '../../../../Firebase/config';

const ActionButton = styled(Button)(({ theme }) => ({
   minHeight: 0,
   minWidth: 0,
   height: '40px',
   width: '100%',
   textTransform: 'none',
   marginTop: '1rem',
   [theme.breakpoints.down('md')]: {
      marginTop: '0.75rem',
   },
   [theme.breakpoints.down('sm')]: {
      marginTop: '0.75rem',
   }
}));

const UpdateProfileForm = ({ setEditMode, field }) => {
   const [loading, setIsLoading] = useState(false);
   const user = JSON.parse(useSelector(state => state.auth.authUser));
   const currentUser = projectAuth.currentUser;

   const dispatch = useDispatch();

   let defaultValues;
   switch (field) {
      case 'email':
         defaultValues = {
            email: ''
         }
         break;
      case 'password':
         defaultValues = {
            password: ''
         }
         break;
      default:
         defaultValues = {
            firstName: '',
            lastName: ''
         }
   }

   let validationSchema;
   switch (field) {
      case 'email':
         validationSchema = Yup.object().shape({
            email: Yup.string()
               .required('Email is required')
               .email('Email is invalid')
               .matches(/^([a-z0-9_.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/, 'Please enter a valid email address'),
         });
         break;
      case 'password':
         validationSchema = Yup.object().shape({
            password: Yup.string()
               .required('Password is required')
               .min(8, 'Password must be at least 8 characters')
               .max(50, 'Password must not exceed 50 characters')
               .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'Must contain one one digit, one uppercase & one lowercase')
         });
         break;
      default:
         validationSchema = Yup.object().shape({
            firstName: Yup.string()
               .required('First Name is required')
               .min(2, 'First Name must be at least 2 characters')
               .max(20, 'First Name must not exceed 20 characters')
               .matches(/^[A-Z][a-z]*/, 'First letter must be capital'),
            lastName: Yup.string()
               .required('Last Name is required')
               .min(2, 'Last Name must be at least 2 characters')
               .max(20, 'Last Name must not exceed 20 characters')
               .matches(/^[A-Z][a-z]*/, 'First letter must be capital'),
         });
   }

   const {
      register,
      handleSubmit,
      reset,
      formState: {
         errors
      }
   } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: defaultValues
   });

   const handleChange = async (data) => {
      setIsLoading(true);

      if (field === 'email') {
         await dispatch(updateEmail(currentUser, data, user.uid));
      } else if (field === 'password') {
         await dispatch(updatePassword(currentUser, data, user.uid));
      } else {
         await dispatch(updateName(data, user.uid));
      }

      reset({ ...defaultValues });
      setIsLoading(false);
      setEditMode(false);
   }

   return (
      <Box sx={{ margin: '1.5rem' }}>
         <form onSubmit={handleSubmit((data) => handleChange(data))}>
            <Box
               sx={theme => ({
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '0.8rem',
                  [theme.breakpoints.down('md')]: {
                     rowGap: '12px',
                  },
                  [theme.breakpoints.down('sm')]: {
                     rowGap: '8px',
                  }
               })}
            >
               {field === 'name' ?
                  <>
                     <CustomInput name='firstName' label='First Name' register={register} errors={errors} />
                     <CustomInput name='lastName' label='Last Name' register={register} errors={errors} />
                  </> : field === 'email' ?
                     <>
                        <CustomInput name='email' label='Email' register={register} errors={errors} />
                     </> :
                     <>
                        <CustomInput type='password' name='password' label='Password' register={register} errors={errors} />
                     </>
               }
               <ActionButton
                  disableElevation
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={loading}
               >
                  {loading ? <ProgressButton loading={loading} /> : 'Save'}
               </ActionButton>
            </Box>
         </form>
      </Box>
   );
};

export default UpdateProfileForm;