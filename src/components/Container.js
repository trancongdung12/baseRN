import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Text from './Text';

const Container = ({
  haveTextInput,
  style,
  contentStyle,
  center,
  loading,
  message,
  subViewStyle,
  children,
  disableScrollForContainer,
  scrollEnabled,
}) => {
  if (haveTextInput) {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView style={[styles.container, style]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={style}
          >
            <ScrollView contentContainerStyle={style}>
              {/* <KeyboardAwareScrollView
            keyboardShouldPersistTaps="always"
            style={[center && styles.center, subViewStyle && subViewStyle]}
            contentContainerStyle={contentStyle && contentStyle}
            contentInsetAdjustmentBehavior="never"
            scrollEnabled={!disableScrollForContainer}
            enableAutomaticScroll={false}
          > */}
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.fill}>{children}</View>
              </TouchableWithoutFeedback>
              {/* </KeyboardAwareScrollView> */}
              {loading && (
                <View style={styles.fadeView}>
                  <ActivityIndicator animating size="large" />
                  {message && <Text style={styles.message}>{message}</Text>}
                </View>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={[styles.container, style]}>
        {/* <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={[styles.subView, center && styles.center, subViewStyle && subViewStyle]}
          contentContainerStyle={contentStyle && contentStyle}
          scrollEnabled={!disableScrollForContainer}
          contentInsetAdjustmentBehavior="never"
          enableAutomaticScroll={false}
        > */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.absoluteView} />
        </TouchableWithoutFeedback>
        {children}
        {/* </KeyboardAwareScrollView> */}
        {loading && (
          <View style={styles.fadeView}>
            <ActivityIndicator animating size="large" />
            {message && <Text style={styles.message}>{message}</Text>}
          </View>
        )}
      </SafeAreaView>
    );
  }
  if (scrollEnabled) {
    return (
      <SafeAreaView style={[styles.container, style]}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          scrollEnabled
          keyboardDismissMode="on-drag"
          styles={[styles.container, center && styles.center, subViewStyle && subViewStyle]}
          contentInsetAdjustmentBehavior="never"
        >
          {children}
        </ScrollView>
        {loading && (
          <View style={styles.fadeView}>
            <ActivityIndicator animating size="large" />
            {message && <Text style={styles.message}>{message}</Text>}
          </View>
        )}
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.container, style]}>
      {children}
      {loading && (
        <View style={styles.fadeView}>
          <ActivityIndicator animating size="large" />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // subView: {
  //   flex: 1,
  // },
  fill: {
    flex: 1,
  },
  fadeView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default Container;
