import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { checkoutActions } from '../../../../store/checkout-slice';
import { useTheme, useMediaQuery } from '@mui/material';

const CustomSelect = ({ title, name, value, items, register, errors }) => {
   const dispatch = useDispatch();

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   return (
      <FormControl variant="standard" sx={{ width: '100%', textAlign: 'start' }}>
         <InputLabel sx={{ fontSize: '15px' }}>Shipping {title}</InputLabel>
         <Select
            value={value}
            label={`Shipping ${title}`}
            fullWidth
            name={name}
            {...register(name, {
               required: true,
               onChange: e => {
                  switch (title) {
                     case 'Country':
                        dispatch(checkoutActions.setShippingCountry(e.target.value));
                        break;
                     case 'Subdivision':
                        dispatch(checkoutActions.setShippingSubdivision(e.target.value));
                        break;
                     case 'Option':
                        dispatch(checkoutActions.setShippingOption(e.target.value));
                        break;
                     default:
                        console.log('Hello World');
                  }
               }
            })}
            error={errors[name] ? true : false}
            MenuProps={{ PaperProps: { sx: { maxHeight: mdWidth ? '300px' : '500px' } } }}
         >
            {items.map((country, index) => (
               <MenuItem
                  key={index}
                  value={country.id}
               >
                  {country.label}
               </MenuItem>
            ))}
         </Select>
         <Typography
            sx={{
               textAlign: 'start',
               fontSize: '14px',
               marginTop: '5px',
               color: 'red',
               fontWeight: 500
            }}
         >
            {errors[name]?.message}
         </Typography>
      </FormControl >
   );
};

export default CustomSelect;