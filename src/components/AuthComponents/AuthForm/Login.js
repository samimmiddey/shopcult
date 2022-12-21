import { Box, Button, Checkbox, FormControlLabel, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CustomInput from '../../CheckoutComponents/CheckoutForm/CustomFields/CustomInput';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { login } from '../../../store/auth-thunks';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProgressButton from '../../UI/ProgressButton';

const ActionButton = styled(Button)(({ theme }) => ({
   minHeight: 0,
   minWidth: 0,
   height: '45px',
   width: '100%',
   textTransform: 'none',
   marginTop: '1.25rem',
   [theme.breakpoints.down('md')]: {
      marginTop: '1rem',
   },
   [theme.breakpoints.down('sm')]: {
      marginTop: '0.75rem',
      height: '42px'
   }
}));

const fields = [
   {
      label: 'Email',
      name: 'email',
      type: 'email'
   },
   {
      label: 'Password',
      name: 'password',
      type: 'password'
   }
];

const defaultValues = {
   email: '',
   password: ''
};

const Login = () => {
   const [remembered, setRemembered] = useState(false);

   const userData = useSelector(state => state.auth.userData);
   const authProgress = useSelector(state => state.auth.authProgress);
   const dispatch = useDispatch();
   const history = useHistory();

   const validationSchema = Yup.object().shape({
      email: Yup.string()
         .required('Email is required')
         .email('Email is invalid')
         .matches(/^([a-z0-9_.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/, 'Please enter a valid email address'),
      password: Yup.string()
         .required('Password is required')
         .min(8, 'Password must be at least 8 characters')
         .max(50, 'Password must not exceed 50 characters')
         .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'Must contain one one digit, one uppercase & one lowercase'),
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

   // Handle Login
   const handleLogin = (data) => {
      dispatch(login(data.email, data.password, remembered));
   };

   // Resetting form & redirect after successfully logged in
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
            Login
         </Typography>
         <form onSubmit={handleSubmit((data) => handleLogin(data))}>
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
            <FormControlLabel
               control={
                  <Checkbox
                     size='small'
                     onClick={event => setRemembered(event.target.checked)}
                  />
               }
               label={
                  <Typography
                     sx={{
                        fontSize: '15px',
                        color: 'text.secondary'
                     }}
                  >
                     Remember Me
                  </Typography>
               }
               sx={theme => ({
                  marginTop: '1.25rem',
                  [theme.breakpoints.down('md')]: {
                     marginTop: '1rem',
                  },
                  [theme.breakpoints.down('sm')]: {
                     marginTop: '0.75rem',
                  }
               })}
            />
            <ActionButton
               type='submit'
               variant='contained'
               color='primary'
               disabled={authProgress}
            >
               {authProgress ? <ProgressButton loading={authProgress} /> : 'Login'}
            </ActionButton>
         </form>
         <Typography
            sx={theme => ({
               fontWeight: 600,
               textAlign: 'center',
               marginTop: '2rem',
               [theme.breakpoints.down('md')]: {
                  marginTop: '1.5rem',
               },
               [theme.breakpoints.down('sm')]: {
                  fontSize: '15px'
               }
            })}
         >
            Don't have an account? <Link to='/signup' style={{ color: 'rgb(90, 57, 161)', cursor: 'pointer' }}>Sign Up</Link>
         </Typography>
      </Box>
   );
};

export default Login;