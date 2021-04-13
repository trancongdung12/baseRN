import React, { useRef } from 'react';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';
import { Container, FlatInput, Button, Text, Input } from '../../components';
import { useFormik } from 'formik';
import { Colors } from '../../themes';
import { translate } from '../../i18n';
import { NavigationUtils } from '../../navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/AuthRedux/operations';
import * as Yup from 'yup';

const TEXT_INPUT_EMAIL = 'TEXT_INPUT_EMAIL';
const TEXT_INPUT_PASSWORD = 'TEXT_INPUT_PASSWORD';

const Login = () => {
  // map redux
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  let emailRef = useRef(null);
  let passRef = useRef(null);
  let nameRef = useRef(null);

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
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      NavigationUtils.startMainContent();
    } else {
      if (result.payload) {
        Alert.alert('Error', result.payload.message || 'error');
      } else {
        Alert.alert('Error', result.error || 'error');
      }
    }
  };

  const navigateScreen = (screen) => {
    NavigationUtils.push({
      screen,
      isTopBarEnable: screen !== 'Register',
      passProps: {},
    });
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
    <Container haveTextInput style={styles.container} loading={loading}>
      <View style={styles.body}>
        <Input
          ref={nameRef}
          name={'email'}
          placeholder={'hello'}
          style={{ height: 40, backgroundColor: Colors.neturalGrey }}
        />
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
          icon={'md-lock-closed'}
          defaultValue={formik.values.password}
          placeholder={translate('passwordPlaceholder')}
          onChangeText={formik.handleChange('password')}
          onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PASSWORD)}
          secureTextEntry={true}
          style={styles.textInputContainer}
          errorMessage={formik.errors.password}
        />
        <Button
          label={translate('login')}
          onPress={() => {
            console.log('asd', nameRef);
          }}
          style={styles.btn}
        />
        <View style={styles.center}>
          <Text
            type={'regular14'}
            color={Colors.blue}
            onPress={() => navigateScreen('ForgetPassword')}
          >
            {translate('forgetPassword')}
          </Text>
        </View>
      </View>
      <View style={styles.center}>
        <Text type={'regular14'} color={Colors.blue} onPress={() => navigateScreen('Register')}>
          {translate('createNewAccount')}
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

export default Login;
