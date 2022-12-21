import React from 'react';
import CustomInput from '../../../CheckoutComponents/CheckoutForm/CustomFields/CustomInput';

const FormFields = ({ fields, register, errors }) => {
   return (
      <>
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
      </>
   );
};

export default FormFields;