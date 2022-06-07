import React, { useState } from 'react';
import { TextField, Grid, Typography, useTheme, useMediaQuery, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomInput = ({ name, label, register, errors, type }) => {
   const [showPassword, setShowPassword] = useState(false);
   const theme = useTheme();
   const smWidth = useMediaQuery(theme.breakpoints.down('sm'));

   const handlePasswordVisibility = () => {
      setShowPassword(prevState => !prevState);
   }

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   return (
      <Grid item xs={12} sm={6}>
         {
            type !== 'password' &&
            <>
               <TextField
                  id={name}
                  fullWidth
                  label={label}
                  name={name}
                  variant='standard'
                  {...register(name, { required: true })}
                  error={errors[name] ? true : false}
                  InputLabelProps={{ style: { fontSize: smWidth ? '14px' : '16px' } }}
               />
               <Typography sx={{ textAlign: 'start', fontSize: '14px', marginTop: '5px', color: 'red' }}>
                  {errors[name]?.message}
               </Typography>
            </>
         }
         {
            type === 'password' &&
            <>
               <TextField
                  type={showPassword ? 'text' : type}
                  id={name}
                  fullWidth
                  label={label}
                  name={name}
                  variant='standard'
                  {...register(name, { required: true })}
                  error={errors[name] ? true : false}
                  InputLabelProps={{ style: { fontSize: smWidth ? '14px' : '16px' } }}
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position='end'>
                           <IconButton
                              onClick={handlePasswordVisibility}
                              onMouseDown={handleMouseDownPassword}>
                              {showPassword ? <VisibilityOff sx={{ color: 'text.disabled' }} /> : <Visibility sx={{ color: 'text.disabled' }} />}
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               />
               <Typography sx={{ textAlign: 'start', fontSize: '14px', marginTop: '5px', color: 'red' }}>
                  {errors[name]?.message}
               </Typography>
            </>
         }
      </Grid>
   )
}

export default CustomInput