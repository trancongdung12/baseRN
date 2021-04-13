import React from 'react';
// import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../../themes';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blur,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
