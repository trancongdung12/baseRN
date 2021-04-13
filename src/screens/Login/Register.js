import React, { useRef } from 'react';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';
import { Container, FlatInput, Button, Text } from '../../components';
import { useFormik } from 'formik';
import { Colors } from '../../themes';
import { translate } from '../../i18n';
import { NavigationUtils } from '../../navigation';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/AuthRedux/operations';
import * as Yup from 'yup';

const TEXT_INPUT_EMAIL = 'TEXT_INPUT_EMAIL';
const TEXT_INPUT_PASSWORD = 'TEXT_INPUT_PASSWORD';

const Register = () => {
  // map redux
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  let emailRef = useRef(null);
  let passRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: 'test_2@gmail.com',
      password: '123456',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(translate('emailInvalid')).required(translate('emailRequired')),
      password: Yup.string()
        .min(6, translate('passwordMin'))
        .max(20, translate('passwordMax'))
        .required(translate('passwordRequired')),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = async ({ email, password }) => {
    Keyboard.dismiss();
    const data = { email, password, userType: 'child' };
    const result = await dispatch(register(data));
    if (register.fulfilled.match(result)) {
      NavigationUtils.startMainContent();
    } else {
      if (result.payload) {
        Alert.alert('Error', result.payload.message || 'error');
      } else {
        Alert.alert('Error', result.error || 'error');
      }
    }
  };

  const onSubmitEditing = (field) => {
    if (field === TEXT_INPUT_EMAIL) {
      passRef.current?.focus();
    }
    if (field === TEXT_INPUT_PASSWORD) {
      passRef.current?.blur();
      formik.handleSubmit();
    }
  };

  return (
    <Container haveTextInput contentStyle={styles.container} loading={loading}>
      <View style={styles.body}>
        <FlatInput
          type="email"
          ref={emailRef}
          label={translate('email')}
          icon={'md-mail'}
          defaultValue={formik.values.email}
          placeholder={translate('emailPlaceholder')}
          style={styles.textInputContainer}
          onChangeText={formik.handleChange('email')}
          onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_EMAIL)}
          errorMessage={formik.errors.email}
          returnKeyType="next"
        />
        <FlatInput
          ref={passRef}
          label={translate('password')}
          icon={'md-lock'}
          defaultValue={formik.values.password}
          placeholder={translate('passwordPlaceholder')}
          onChangeText={formik.handleChange('password')}
          onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PASSWORD)}
          secureTextEntry={true}
          style={styles.textInputContainer}
          errorMessage={formik.errors.password}
        />
        <Button label={translate('register')} onPress={formik.handleSubmit} style={styles.btn} />
      </View>
      <View style={styles.center}>
        <Text type={'regular14'} color={Colors.blue} onPress={() => NavigationUtils.pop()}>
          {translate('haveAccountAlready')}
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  textInputContainer: {
    marginVertical: 12,
  },
  btn: {
    marginVertical: 16,
  },
  center: {
    alignItems: 'center',
  },
});

export default Register;
