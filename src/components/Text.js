/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text as RNText, PixelRatio, Dimensions } from 'react-native';
import { Fonts, Colors } from '../themes';

const pixelRatio = PixelRatio.get();

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Text = (props) => {
  const {
    type,
    color,
    center,
    underLine,
    style,
    children,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
  } = props;
  return (
    <RNText
      {...props}
      allowFontScaling={false}
      style={[
        styles[type],
        color && { color },
        center && styles.center,
        underLine && styles.txtUnderline,
        marginTop && { marginTop: marginTop },
        marginBottom && { marginBottom: marginBottom },
        marginLeft && { marginLeft: marginLeft },
        marginRight && { marginRight: marginRight },
        marginHorizontal && { marginHorizontal: marginHorizontal },
        marginVertical && { marginVertical: marginVertical },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};
export const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  txtUnderline: {
    textDecorationLine: 'underline',
  },
  normal: {
    color: Colors.default,
    fontFamily: Fonts.type.regular,
  },
  bold20: {
    fontSize: normalize(Fonts.size.S20),
    fontFamily: Fonts.type.bold,
  },
  bold18: {
    fontSize: normalize(Fonts.size.S18),
    fontFamily: Fonts.type.bold,
  },
  bold16: {
    fontSize: normalize(Fonts.size.S16),
    fontFamily: Fonts.type.bold,
  },
  bold14: {
    fontSize: normalize(Fonts.size.S14),
    fontFamily: Fonts.type.bold,
  },
  bold12: {
    fontSize: normalize(Fonts.size.S12),
    fontFamily: Fonts.type.bold,
  },
  medium20: {
    fontSize: normalize(Fonts.size.S20),
    fontFamily: Fonts.type.medium,
  },
  medium18: {
    fontSize: normalize(Fonts.size.S18),
    fontFamily: Fonts.type.medium,
  },
  medium16: {
    fontSize: normalize(Fonts.size.S16),
    fontFamily: Fonts.type.medium,
  },
  medium14: {
    fontSize: normalize(Fonts.size.S14),
    fontFamily: Fonts.type.medium,
  },
  medium12: {
    fontSize: normalize(Fonts.size.S12),
    fontFamily: Fonts.type.medium,
  },
  regular20: {
    fontSize: normalize(Fonts.size.S20),
    fontFamily: Fonts.type.regular,
  },
  regular18: {
    fontSize: normalize(Fonts.size.S18),
    fontFamily: Fonts.type.regular,
  },
  regular16: {
    fontSize: normalize(Fonts.size.S16),
    fontFamily: Fonts.type.regular,
  },
  regular14: {
    fontSize: normalize(Fonts.size.S14),
    fontFamily: Fonts.type.regular,
  },
  regular12: {
    fontSize: normalize(Fonts.size.S12),
    fontFamily: Fonts.type.regular,
  },
  regular10: {
    fontSize: normalize(Fonts.size.S10),
    fontFamily: Fonts.type.regular,
  },
  light20: {
    fontSize: normalize(Fonts.size.S20),
    fontFamily: Fonts.type.light,
  },
  light18: {
    fontSize: normalize(Fonts.size.S18),
    fontFamily: Fonts.type.light,
  },
  light16: {
    fontSize: normalize(Fonts.size.S16),
    fontFamily: Fonts.type.light,
  },
  light14: {
    fontSize: normalize(Fonts.size.S14),
    fontFamily: Fonts.type.light,
  },
  light12: {
    fontSize: normalize(Fonts.size.S12),
    fontFamily: Fonts.type.light,
  },
  light10: {
    fontSize: normalize(Fonts.size.S10),
    fontFamily: Fonts.type.light,
  },
});

Text.propTypes = {
  type: PropTypes.oneOf(Object.keys(styles)),
  color: PropTypes.string,
  center: PropTypes.bool,
  underLine: PropTypes.bool,
  style: PropTypes.any,
};

export default Text;

export function normalize(size) {
  size = size + 0.5;
  if (pixelRatio === 2) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      return size * 1.1;
    }
    // iphone 5
    if (deviceHeight < 667) {
      return size * 1.1;
      // iphone 6-6s
    } else if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }
  if (pixelRatio === 3) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size * 1.1;
    }
    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }
  if (pixelRatio === 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size * 1.1;
      // Catch other smaller android height sizings
    }
    if (deviceHeight < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }
  // if older device ie pixelRatio !== 2 || 3 || 3.5
  return size;
}
