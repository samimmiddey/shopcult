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
         <InputLabel>Shipping {title}</InputLabel>
         <Select
            value={value}
            label={`Shipping ${title}`}
            fullWidth
            name={name}
            {...register(name)}
            error={errors[name] ? true : false}
            onChange={e => {
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
            }}
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
         <Typography sx={{ textAlign: 'start', fontSize: '14px', marginTop: '5px', color: 'red' }}>
            {errors[name]?.message}
         </Typography>
      </FormControl >
   );
};

export default CustomSelect;