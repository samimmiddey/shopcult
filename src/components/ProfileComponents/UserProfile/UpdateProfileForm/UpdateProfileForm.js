import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Box, Button, styled } from '@mui/material';
import FormFields from './FormFields';
import { useDispatch } from 'react-redux';
import { updateUserEmail, updateUserName, updateUserPassword } from '../../../../store/auth-thunks';
import ProgressButton from '../../../UI/ProgressButton';
import { useSelector } from 'react-redux';

const nameFields = [
   {
      name: 'name',
      label: 'Name',
      type: 'text'
   }
];

const emailFields = [
   {
      name: 'email',
      label: 'Email',
      type: 'email'
   },
   {
      name: 'password',
      label: 'Password',
      type: 'password'
   },
   {
      name: 'newEmail',
      label: 'New Email',
      type: 'email'
   }
];

const passwordFields = [
   {
      name: 'email',
      label: 'Email',
      type: 'email'
   },
   {
      name: 'password',
      label: 'Password',
      type: 'password'
   },
   {
      name: 'newPassword',
      label: 'New Password',
      type: 'password'
   }
];

const ActionButton = styled(Button)(({ theme }) => ({
   minHeight: 0,
   minWidth: 0,
   height: '45px',
   width: '100%',
   textTransform: 'none',
   marginTop: '1.5rem',
   [theme.breakpoints.down('md')]: {
      marginTop: '1.25rem',
   },
   [theme.breakpoints.down('sm')]: {
      marginTop: '1rem',
      height: '42px'
   }
}));

const UpdateProfileForm = ({ updateButton, setUpdateButton, user }) => {
   const loading = useSelector(state => state.auth.updateProgress);

   const dispatch = useDispatch();

   let defaultValues;
   switch (updateButton) {
      case 1:
         defaultValues = {
            name: ''
         }
         break;
      case 2:
         defaultValues = {
            email: '',
            password: '',
            newEmail: ''
         }
         break;
      default:
         defaultValues = {
            email: '',
            password: '',
            newPassword: ''
         }
   };

   let validationSchema;
   switch (updateButton) {
      case 1:
         validationSchema = Yup.object().shape({
            name: Yup.string()
               .required('Name is required')
               .min(2, 'Name must be at least 2 characters')
               .max(100, 'Name must not exceed 100 characters')
               .matches(/^\s*([A-Za-z]{1,}([.,] |[-']| ))+[A-Za-z]+.?\s*$/, 'Please enter a valid full name'),
         });
         break;
      case 2:
         validationSchema = Yup.object().shape({
            email: Yup.string()
               .required('Email is required')
               .email('Email is invalid')
               .matches(/^([a-z0-9_.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/, 'Please enter a valid email address'),
            password: Yup.string()
               .required('Password is required')
               .min(8, 'Password must be at least 8 characters')
               .max(50, 'Password must not exceed 50 characters')
               .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'Must contain one one digit, one uppercase & one lowercase'),
            newEmail: Yup.string()
               .required('Email is required')
               .email('Email is invalid')
               .matches(/^([a-z0-9_.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/, 'Please enter a valid email address'),
         });
         break;
      default:
         validationSchema = Yup.object().shape({
            email: Yup.string()
               .required('Email is required')
               .email('Email is invalid')
               .matches(/^([a-z0-9_.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/, 'Please enter a valid email address'),
            password: Yup.string()
               .required('Password is required')
               .min(8, 'Password must be at least 8 characters')
               .max(50, 'Password must not exceed 50 characters')
               .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'Must contain one one digit, one uppercase & one lowercase'),
            newPassword: Yup.string()
               .required('Password is required')
               .min(8, 'Password must be at least 8 characters')
               .max(50, 'Password must not exceed 50 characters')
               .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'Must contain one one digit, one uppercase & one lowercase')
         });
   };

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
      if (updateButton === 1) {
         await dispatch(updateUserName(data, user.id));
      } else if (updateButton === 2) {
         await dispatch(updateUserEmail(data, user.id));
      } else {
         await dispatch(updateUserPassword(data));
      }

      reset({ ...defaultValues });
      setUpdateButton(null);
   };

   return (
      <Box
         sx={theme => ({
            margin: '2rem 0 1rem 0',
            [theme.breakpoints.down('sm')]: {
               margin: '1.5rem 0 1rem 0'
            }
         })}
      >
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
               {
                  updateButton === 1 ?
                     <>
                        <FormFields fields={nameFields} register={register} errors={errors} />
                     </>
                     : updateButton === 2 ?
                        <>
                           <FormFields fields={emailFields} register={register} errors={errors} />
                        </> :
                        <>
                           <FormFields fields={passwordFields} register={register} errors={errors} />
                        </>
               }
               <Box
                  sx={theme => ({
                     display: 'flex',
                     alignItems: 'center',
                     columnGap: '1rem',
                     [theme.breakpoints.down('sm')]: {
                        flexDirection: 'column'
                     }
                  })}
               >
                  <ActionButton
                     type='button'
                     variant='contained'
                     color='secondary'
                     disabled={loading}
                     onClick={() => setUpdateButton(null)}
                  >
                     Cancel
                  </ActionButton>
                  <ActionButton
                     type='submit'
                     variant='contained'
                     color='primary'
                     disabled={loading}
                  >
                     {loading ? <ProgressButton loading={loading} /> : 'Update'}
                  </ActionButton>
               </Box>
            </Box>
         </form>
      </Box>
   );
};

export default UpdateProfileForm;