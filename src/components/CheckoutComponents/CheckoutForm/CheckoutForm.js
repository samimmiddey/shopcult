import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import AddressForm from './AddressForm/AddressForm';
import PaymentForm from './PaymentForm/PaymentForm';
import { fetchGenerateToken } from '../../../store/fetch-products';
import { useSelector, useDispatch } from 'react-redux';

const steps = ['Shipping Address', 'Payment Details'];
const formTitle = ['Checkout Form', 'Payment'];

const CheckoutForm = () => {
   const [activeStep, setActiveStep] = useState(0);
   const [shippingData, setShippingData] = useState({});
   const cart = useSelector(state => state.cart.cart);
   const dispatch = useDispatch();

   // Generate Checkout Token
   useEffect(() => {
      if (cart.id && cart.line_items.length >= 1) {
         dispatch(fetchGenerateToken(cart.id, { type: 'cart' }));
      }
   }, [cart, dispatch]);

   const nextStep = () => setActiveStep(prevState => prevState + 1);
   const backStep = () => setActiveStep(prevState => prevState - 1);

   const next = (data) => {
      setShippingData(data);
      nextStep();
   }

   const Form = () => activeStep === 0 ?
      <AddressForm
         next={next}
      /> :
      <PaymentForm
         backStep={backStep}
         shippingData={shippingData}
      />;

   return (
      <Card
         elevation={0}
         sx={theme => ({
            margin: '5rem auto 0 auto',
            maxWidth: '900px',
            width: '100%',
            textAlign: 'center',
            padding: '3rem 2rem',
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
         <Typography
            variant='h4'
            color='primary'
            sx={theme => ({
               fontWeight: 700,
               marginBottom: '2rem',
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
            {activeStep === steps.length ? `${formTitle[steps.length]}` : `${formTitle[activeStep]}`}
         </Typography>
         <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
               {steps.map((label, index) => (
                  <Step key={index}>
                     <StepLabel>{label}</StepLabel>
                  </Step>
               ))}
            </Stepper>
            <Form />
         </Box>
      </Card>
   );
}

export default CheckoutForm;