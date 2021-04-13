import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';
import { Formik } from 'formik';
import { noop } from 'lodash';

const validationSchema = {
  email: () => {},
};

const Input = forwardRef(
  (
    {
      name,
      defaultValue = '',
      placeholder = '',
      onChangeText = noop,
      validate = noop,
      style = {},
      ...rest
    },
    ref,
  ) => {
    return (
      <Formik
        innerRef={ref}
        initialValues={{ value: '' }}
        // validationSchema={validate}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <TextInput
            onChangeText={handleChange('value')}
            onBlur={handleBlur('email')}
            value={values.value}
            placeholder={placeholder}
            style={style}
            {...rest}
          />
        )}
      </Formik>
    );
  },
);

export default Input;
