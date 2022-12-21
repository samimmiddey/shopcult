import { Box, Button, styled, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import CustomInput from '../../CheckoutComponents/CheckoutForm/CustomFields/CustomInput';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { signup } from '../../../store/auth-thunks';
import { useSelector, useDispatch } from 'react-redux';
import ProgressButton from '../../UI/ProgressButton';
import { useHistory } from 'react-router-dom';

const ActionButton = styled(Button)(({ theme }) => ({
   minHeight: 0,
   minWidth: 0,
   height: '45px',
   width: '100%',
   textTransform: 'none',
   marginTop: '2rem',
   [theme.breakpoints.down('lg')]: {
      marginTop: '1.75rem',
   },
   [theme.breakpoints.down('md')]: {
      marginTop: '1.5rem',
   },
   [theme.breakpoints.down('sm')]: {
      marginTop: '1.25rem',
      height: '42px'
   }
}));

const fields = [
   {
      label: 'Name',
      name: 'name',
      type: 'text'
   },
   {
      label: 'Email',
      name: 'email',
      type: 'email'
   },
   {
      label: 'Password',
      name: 'password',
      type: 'password'
   },
   {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password'
   }
];

const defaultValues = {
   name: '',
   email: '',
   username: '',
   password: ''
};

const Signup = () => {
   const userData = useSelector(state => state.auth.userData);
   const authProgress = useSelector(state => state.auth.authProgress);
   const dispatch = useDispatch();
   const history = useHistory();

   const validationSchema = Yup.object().shape({
      name: Yup.string()
         .required('Name is required')
         .min(2, 'Name must be at least 2 characters')
         .max(100, 'Name must not exceed 100 characters')
         .matches(/^\s*([A-Za-z]{1,}([.,] |[-']| ))+[A-Za-z]+.?\s*$/, 'Please enter a valid full name'),
      email: Yup.string()
         .required('Email is required')
         .email('Email is invalid')
         .matches(/^([a-z0-9_.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/, 'Please enter a valid email address'),
      password: Yup.string()
         .required('Password is required')
         .min(8, 'Password must be at least 8 characters')
         .max(50, 'Password must not exceed 50 characters')
         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'Must contain one one digit, one uppercase & one lowercase'),
      confirmPassword: Yup.string()
         .required('Confirm password is required')
         .min(8, 'Password must be at least 8 characters')
         .max(50, 'Password must not exceed 50 characters')
         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'Must contain one one digit, one uppercase & one lowercase')
         .oneOf([Yup.ref('password')], 'Password does not match')
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
      defaultValues: defaultValues
   });

   // Handle Signup
   const handleSignup = (data) => {
      dispatch(signup(data));
   };

   // Redirecting after successfully signing up
   useEffect(() => {
      if (userData) {
         reset({ ...defaultValues });
         history.replace('/');
      }
   }, [userData, history, reset]);

   return (
      <Box sx={{ maxWidth: '600px', width: '100%' }}>
         <Typography
            variant='h4'
            sx={theme => ({
               fontWeight: 700,
               marginBottom: '1rem',
               color: 'text.primary',
               [theme.breakpoints.down('lg')]: {
                  fontSize: '2rem'
               },
               [theme.breakpoints.down('md')]: {
                  fontSize: '1.5rem'
               },
               [theme.breakpoints.down('sm')]: {
                  fontSize: '1.3rem'
               },
               [theme.breakpoints.down(400)]: {
                  fontSize: '1.2rem'
               }
            })}
         >
            Sign Up
         </Typography>
         <form onSubmit={handleSubmit((data) => handleSignup(data))}>
            <Box
               sx={theme => ({
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '1rem',
                  [theme.breakpoints.down('md')]: {
                     rowGap: '12px',
                  },
                  [theme.breakpoints.down('sm')]: {
                     rowGap: '8px',
                  }
               })}
            >
               {
                  fields.map((item, index) => (
                     <CustomInput
                        key={index}
                        name={item.name}
                        label={item.label}
                        register={register}
                        errors={errors}
                        type={item.type}
                     />
                  ))
               }
            </Box>
            <ActionButton
               type='submit'
               variant='contained'
               color='primary'
               disabled={authProgress}
            >
               {authProgress ? <ProgressButton loading={authProgress} /> : 'Sign Up'}
            </ActionButton>
         </form>
         <Typography
            sx={theme => ({
               fontWeight: 600,
               textAlign: 'center',
               marginTop: '2rem',
               color: 'text.primary',
               [theme.breakpoints.down('md')]: {
                  marginTop: '1.5rem',
               },
               [theme.breakpoints.down('sm')]: {
                  fontSize: '15px'
               }
            })}
         >
            Already have an account? <Link to='/login' style={{ color: 'rgb(90, 57, 161)', cursor: 'pointer' }}>Login</Link>
         </Typography>
      </Box>
   );
};

export default Signup;