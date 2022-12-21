import React, { useEffect } from 'react';
import { Button, styled, useMediaQuery, useTheme } from '@mui/material';
import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import CustomInput from '../CustomFields/CustomInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries, fetchSubdivisions, fetchOptions } from '../../../../store/product-thunks';
import CustomSelect from '../CustomFields/CustomSelect';
import { checkoutActions } from '../../../../store/checkout-slice';
import TransparentProgress from '../../../UI/TransparentProgress';
import { Link, useHistory } from 'react-router-dom';

const ActionButton = styled(Button)(({ theme }) => ({
   minHeight: 0,
   minWidth: 0,
   height: '45px',
   width: '100%',
   textTransform: 'none',
   [theme.breakpoints.down('sm')]: {
      height: '42px'
   }
}));

const fields = [
   {
      name: 'name',
      label: 'Name',
      type: 'text'
   },
   {
      name: 'email',
      label: 'Email',
      type: 'email'
   },
   {
      name: 'address',
      label: 'Address',
      type: 'text'
   },
   {
      name: 'landmark',
      label: 'Landmark',
      type: 'text'
   },
   {
      name: 'city',
      label: 'City',
      type: 'text'
   },
   {
      name: 'zip',
      label: 'ZIP / Postal Code',
      type: 'number'
   }
];

const defaultValues = {
   name: '',
   address: '',
   landmark: '',
   email: '',
   city: '',
   zip: '',
   selectCountry: '',
   selectSubdivision: ''
};

const AddressForm = ({ next }) => {
   const checkoutToken = useSelector(state => state.checkout.checkoutToken);
   const countries = useSelector(state => state.checkout.shippingCountries);
   const country = useSelector(state => state.checkout.shippingCountry);
   const subdivisions = useSelector(state => state.checkout.shippingSubdivisions);
   const subdivision = useSelector(state => state.checkout.shippingSubdivision);
   const options = useSelector(state => state.checkout.shippingOptions)
      .map(option => ({ id: option.id, label: `${option.description} - ${option.price.formatted_with_symbol}` }));
   const option = useSelector(state => state.checkout.shippingOption);
   const isLoading = useSelector(state => state.checkout.checkoutProgress);
   const isCountryLoading = useSelector(state => state.checkout.checkoutCountryProgress);
   const isSubdivisionLoading = useSelector(state => state.checkout.checkoutSubdivisionProgress);
   const isOptionLoading = useSelector(state => state.checkout.checkoutOptionProgress);
   const cart = useSelector(state => state.cart.cart);
   const incomingOrder = useSelector(state => state.checkout.incomingOrder);

   const dispatch = useDispatch();
   const history = useHistory();

   const theme = useTheme();
   const width = useMediaQuery(theme.breakpoints.down(700));

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
      address: Yup.string()
         .required('Address is required')
         .min(2, 'Address must be at least 2 characters')
         .max(500, 'Address must not exceed 500 characters')
         .matches(/^[a-zA-Z0-9\s,.'-]{3,}$/, 'Please enter a valid address'),
      landmark: Yup.string()
         .required('Landmark is required')
         .min(2, 'Landmark must be at least 2 characters')
         .max(500, 'Landmark must not exceed 500 characters')
         .matches(/^[a-zA-Z0-9\s,.'-]{3,}$/, 'Please enter a valid landmark'),
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
         .required('Subdivision is required')
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

   const loading = isLoading || isCountryLoading || isSubdivisionLoading || isOptionLoading;

   return (
      <>
         <TransparentProgress open={loading} />
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
                  {
                     fields.map((item, index) => (
                        <CustomInput
                           key={index}
                           name={item.name}
                           label={item.label}
                           type={item.type}
                           register={register}
                           errors={errors}
                        />
                     ))
                  }
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
                     <Box
                        sx={{
                           width: '100%',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'flex-start',
                           columnGap: '10px',
                           marginTop: '10px'
                        }}
                     >
                        <Typography
                           sx={theme => ({
                              color: 'text.secondary',
                              fontWeight: 600,
                              fontSize: '14px',
                              [theme.breakpoints.down(700)]: {
                                 display: 'none'
                              }
                           })}
                        >
                           Shipping<span style={{ marginLeft: '10px' }}>-</span>
                        </Typography>
                        <Box
                           sx={theme => ({
                              height: '40px',
                              maxWidth: '100%',
                              backgroundColor: 'rgba(0, 0, 0, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '0 1rem',
                              borderRadius: '5px',
                              color: 'text.secondary',
                              fontSize: '14px',
                              fontWeight: 500,
                              [theme.breakpoints.down(700)]: {
                                 width: '100%',
                                 justifyContent: 'flex-start'
                              }
                           })}
                        >
                           {
                              width ? (
                                 !options.length ? 'Loading...' :
                                    'Shipping - ' + options[0].label.substring(options[0].label.indexOf('$'))
                              )
                                 : (
                                    !options.length ? 'Loading...' :
                                       options[0].label
                                 )
                           }
                        </Box>
                     </Box>
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
                        color='secondary'
                        variant='contained'
                        type='button'
                     >
                        Back to Cart
                     </ActionButton>
                  </Link>
                  <ActionButton
                     type='submit'
                     onClick={handleSubmit((data) => {
                        next({ ...data, selectOption: option });
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