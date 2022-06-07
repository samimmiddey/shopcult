import React, { useEffect } from 'react';
import { Button, styled } from '@mui/material';
import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import CustomInput from '../CustomFields/CustomInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, fetchSubdivisions, fetchOptions } from '../../../../store/fetch-products';
import CustomSelect from '../CustomFields/CustomSelect';
import { checkoutActions } from '../../../../store/checkout-slice';
import ProgressBar from '../../../UI/ProgressBar';
import TransparentProgress from '../../../UI/TransparentProgress';
import { Link, useHistory } from 'react-router-dom';

const ActionButton = styled(Button)({
   minHeight: 0,
   minWidth: 0,
   height: '45px',
   width: '100%',
   textTransform: 'none'
});

const defaultValues = {
   firstName: '',
   lastName: '',
   address: '',
   email: '',
   city: '',
   zip: '',
   selectCountry: '',
   selectSubdivision: '',
   selectOption: ''
}

const AddressForm = ({ next }) => {
   const checkoutToken = useSelector(state => state.checkout.checkoutToken);
   const countries = useSelector(state => state.checkout.shippingCountries);
   const country = useSelector(state => state.checkout.shippingCountry);
   const subdivisions = useSelector(state => state.checkout.shippingSubdivisions);
   const subdivision = useSelector(state => state.checkout.shippingSubdivision);
   const options = useSelector(state => state.checkout.shippingOptions)
      .map(option => ({ id: option.id, label: `${option.description} - ${option.price.formatted_with_symbol}` }));
   const option = useSelector(state => state.checkout.shippingOption);
   const dispatch = useDispatch();

   const isLoading = useSelector(state => state.checkout.checkoutProgress);
   const isSubdivisionLoading = useSelector(state => state.checkout.checkoutSubdivisionProgress);
   const isOptionLoading = useSelector(state => state.checkout.checkoutOptionProgress);
   const cart = useSelector(state => state.cart.cart);
   const incomingOrder = useSelector(state => state.checkout.incomingOrder);

   const history = useHistory();

   const validationSchema = Yup.object().shape({
      firstName: Yup.string()
         .required('First Name is required')
         .min(2, 'First Name must be at least 2 characters')
         .max(50, 'First Name must not exceed 50 characters')
         .matches(/^[A-Z][a-z]*/, 'First letter must be capital'),
      lastName: Yup.string()
         .required('Last Name is required')
         .min(2, 'Last Name must be at least 2 characters')
         .max(50, 'Last Name must not exceed 50 characters')
         .matches(/^[A-Z][a-z]*/, 'First letter must be capital'),
      address: Yup.string()
         .required('Address is required')
         .min(2, 'Address must be at least 2 characters')
         .max(500, 'Address must not exceed 500 characters')
         .matches(/^[a-zA-Z0-9\s,.'-]{3,}$/, 'Please enter a valid address'),
      email: Yup.string()
         .required('Email is required')
         .email('Email is invalid')
         .matches(/^([a-z0-9_.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/, 'Please enter a valid email address'),
      city: Yup.string()
         .required('City is required')
         .min(2, 'City must be at least 2 characters')
         .max(50, 'City must not exceed 50 characters')
         .matches(/^[A-Z][a-z]*/, 'Please enter the city name correctly'),
      zip: Yup.string()
         .required('Zip code is required')
         .matches(/^[0-9]{6}$/, 'Incorrect zip code'),
      selectCountry: Yup.string()
         .required('Country is required'),
      selectSubdivision: Yup.string()
         .required('Subdivision is required'),
      selectOption: Yup.string()
         .required('Option is required')
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

   // Fetch Countries
   useEffect(() => {
      if (checkoutToken.id) {
         dispatch(fetchCountries(checkoutToken.id));
      }
   }, [checkoutToken.id, dispatch]);

   // Fetch Subdivisions
   useEffect(() => {
      if (country) {
         dispatch(fetchSubdivisions(country));
      }
   }, [country, dispatch]);

   // Fetch Options
   useEffect(() => {
      if (subdivision) {
         dispatch(fetchOptions(checkoutToken.id, country));
      }
   }, [subdivision, checkoutToken.id, country, dispatch]);

   // Redirecting
   useEffect(() => {
      if (Object.keys(cart).length !== 0) {
         if (cart.line_items.length === 0 && Object.keys(incomingOrder).length === 0) {
            history.push('/');
         }
      }
   }, [cart, history, incomingOrder]);

   return (
      <>
         {isLoading && <ProgressBar />}
         {!isLoading && < TransparentProgress open={isSubdivisionLoading || isOptionLoading} />}
         <Box sx={{ marginTop: '2.5rem' }}>
            <Typography
               variant='h6'
               sx={{
                  marginBottom: '1rem',
                  textAlign: 'start',
                  fontWeight: 600,
                  color: 'text.primary'
               }}
            >
               Shipping Address
            </Typography>
            <Box>
               <Grid container spacing={3}>
                  <CustomInput name='firstName' label='First Name' register={register} errors={errors} />
                  <CustomInput name='lastName' label='Last Name' register={register} errors={errors} />
                  <CustomInput name='address' label='Address' register={register} errors={errors} />
                  <CustomInput name='email' label='Email' register={register} errors={errors} />
                  <CustomInput name='city' label='City' register={register} errors={errors} />
                  <CustomInput name='zip' label='ZIP / Postal Code' register={register} errors={errors} />
                  <Grid item xs={12} sm={6}>
                     <CustomSelect
                        title='Country'
                        name='selectCountry'
                        value={country}
                        items={countries}
                        register={register}
                        errors={errors}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <CustomSelect
                        title='Subdivision'
                        name='selectSubdivision'
                        value={isSubdivisionLoading ? '' : subdivision}
                        items={subdivisions}
                        register={register}
                        errors={errors}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <CustomSelect
                        title='Option'
                        name='selectOption'
                        value={isOptionLoading ? '' : option}
                        items={options}
                        register={register}
                        errors={errors}
                     />
                  </Grid>
               </Grid>
               <Box
                  sx={theme => ({
                     marginTop: '2.5rem',
                     display: 'flex',
                     alignItems: 'center',
                     columnGap: '16px',
                     [theme.breakpoints.down('sm')]: {
                        flexDirection: 'column',
                        rowGap: '16px'
                     }
                  })}
               >
                  <Link style={{ width: '100%' }} to='/cart'>
                     <ActionButton
                        disableElevation
                        color='secondary'
                        variant='contained'
                        type='button'
                     >
                        Back to Cart
                     </ActionButton>
                  </Link>
                  <ActionButton
                     disableElevation
                     type='submit'
                     onClick={handleSubmit((data) => {
                        next({ ...data });
                        reset({ ...defaultValues });
                        dispatch(checkoutActions.setShippingCountry(''));
                     })}
                     variant='contained'
                     color='primary'
                  >
                     Next
                  </ActionButton>
               </Box>
            </Box>
         </Box>
      </>
   );
};

export default AddressForm;