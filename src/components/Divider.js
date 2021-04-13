import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../themes';

const Divider = memo((props) => {
  const { style, isHorizontal = false } = props;
  if (isHorizontal) {
    return <View style={[styles.containerHorizontal, style]} />;
  }
  return <View style={[styles.containerVertical, style]} />;
});

Divider.propTypes = {
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number]),
  isHorizontal: PropTypes.bool,
};
Divider.defaultProps = {
  isHorizontal: true,
};
const styles = StyleSheet.create({
  containerHorizontal: {
    // width,
    height: StyleSheet.hairlineWidth,

    backgroundColor: Colors.divider,
  },
  containerVertical: {
    width: StyleSheet.hairlineWidth,
    // height,
    backgroundColor: Colors.divider,
  },
});

export default Divider;
