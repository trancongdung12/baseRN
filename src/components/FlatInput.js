import React, { useState, forwardRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../themes';
import Text, { normalize } from './Text';
import Icon from 'react-native-vector-icons/Ionicons';
import Touchable from './Touchable';
import Divider from './Divider';

const DEFAULT_SIZE = 48;
const ICON_SIZE = 24,
  ICON_COLOR = '#808184';

const getKeyBoardType = (type) => {
  // one of  ['email', 'phone', 'number]
  switch (type) {
    case 'email':
      return 'email-address';
    case 'phone':
      return 'numeric';
    case 'number':
      return 'numeric';
    default:
      return 'default';
  }
};

const FlatInput = (
  {
    enable,
    defaultValue,
    label,
    icon,
    onChangeText,
    onSubmitEditing,
    placeholder,
    placeholderTextColor,
    autoCapitalize,
    style,
    textInputWrap,
    textInputStyle,
    labelStyle,
    secureTextEntry,
    isShowEyeIcon = true,
    underline,
    errorMessage,
    type,
    returnKeyType,
  },
  inputRef,
) => {
  const [_value, setValue] = useState(defaultValue);
  const [isSecure, setSecureVisible] = useState(secureTextEntry);
  // const [isFocus, setFocus] = useState(false);
  const [isBlur, setBlur] = useState(false);

  const _onChangText = (text) => {
    setValue(text);
    onChangeText && onChangeText(text);
  };

  const _onSubmitEditing = () => {
    onSubmitEditing && onSubmitEditing();
  };

  const onChangeSecureState = () => {
    setSecureVisible(!isSecure);
  };

  const _onBlur = () => {
    setBlur(true);
  };

  const _onFocus = () => {
    // setFocus(true);
  };

  return (
    <View style={[label ? styles.ContainerWithLabel : styles.container, style]}>
      {label && (
        <Text type="medium12" style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <View style={[styles.textInputWrap, textInputWrap]}>
        {icon && (
          <View style={styles.iconWrap}>
            <Icon name={icon} color={ICON_COLOR} size={ICON_SIZE} />
          </View>
        )}
        <TextInput
          ref={inputRef}
          editable={enable}
          autoCapitalize={autoCapitalize || 'none'}
          underlineColorAndroid="transparent"
          allowFontScaling={false}
          blurOnSubmit={false}
          secureTextEntry={isSecure}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={getKeyBoardType(type)}
          returnKeyType={returnKeyType || 'done'}
          style={[styles.textInput, textInputStyle]}
          value={_value}
          onFocus={_onFocus}
          onBlur={_onBlur}
          onChangeText={_onChangText}
          onSubmitEditing={_onSubmitEditing}
        />
        {secureTextEntry && isShowEyeIcon && (
          <Touchable onPress={onChangeSecureState} style={styles.iconWrap}>
            <Icon name={isSecure ? 'md-eye' : 'md-eye-off'} color={ICON_COLOR} size={ICON_SIZE} />
          </Touchable>
        )}
      </View>
      {underline && <Divider />}
      {isBlur && errorMessage && (
        <Text style={styles.txtError} type="light10">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

// FlatInput.propTypes = {
//   label: PropTypes.string.isRequired,
//   defaultValue: PropTypes.number,
//   onChangeText: PropTypes.any,
//   enable: PropTypes.bool,
//   type: PropTypes.oneOf(['email', 'number', 'phone']),
// };

// FlatInput.defaultProps = {
//   enable: true,
//   defaultValue: null,
// };

const styles = StyleSheet.create({
  container: { height: 60 },
  ContainerWithLabel: { height: 80 },
  label: {
    marginBottom: 4,
    color: Colors.secondaryText,
  },
  textInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: DEFAULT_SIZE,
    backgroundColor: '#efefef',
  },
  textInput: {
    height: '100%',
    flex: 1,
    fontSize: normalize(Fonts.size.S14),
    color: Colors.primaryText,
    fontFamily: Fonts.type.regular,
    padding: 0,
  },
  txtError: {
    paddingTop: 4,
    color: 'red',
  },
  iconWrap: {
    height: DEFAULT_SIZE,
    width: DEFAULT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default forwardRef(FlatInput);
