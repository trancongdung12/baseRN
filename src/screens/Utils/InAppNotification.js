import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  InteractionManager,
  Vibration,
} from 'react-native';
import Text from '../../components/Text';
import Touchable from '../../components/Touchable';
import { Colors } from '../../themes';
import { safeArea } from '../../utils/Devices';
import { NavigationUtils } from '../../navigation';

export default class InAppNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animation = new Animated.Value(-500);
    this.currentTimeout = null;
  }

  componentDidMount() {
    this.toggleNotiAnim();
  }

  componentWillUnmount() {
    clearTimeout(this.currentTimeout);
  }

  toggleNotiAnim = (isShow = true) => {
    if (!isShow) {
      clearTimeout(this.currentTimeout);
      // this.currentTimeout = null;
    }

    const { duration, isAutoDismiss } = this.props;

    const handle = InteractionManager.createInteractionHandle();
    Animated.spring(this.animation, {
      toValue: isShow ? -20 : -this.containerHeight,
      useNativeDriver: true,
    }).start(() => {
      InteractionManager.clearInteractionHandle(handle);
      if (!isShow) {
        NavigationUtils.dismissInAppNotification();
      } else {
        Vibration.vibrate();
        if (isAutoDismiss) {
          this.currentTimeout = setTimeout(() => {
            this.toggleNotiAnim(false);
          }, duration);
        }
      }
    });
  };

  render() {
    const { title, content, type } = this.props;
    return (
      <Animated.View
        style={[
          styles.wrapperView,
          {
            backgroundColor: BACKGROUND_TYPES[type],
            transform: [{ translateY: this.animation }],
          },
        ]}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => {
          this.containerHeight = height;
        }}
      >
        <Touchable
          style={styles.wrapperView}
          onPress={() => {
            this.toggleNotiAnim(false);
          }}
        >
          <View accessibilityTraits="plays" style={styles.container}>
            {title && (
              <Text color="white" style={styles.title}>
                {title}
              </Text>
            )}
            {content && (
              <Text color="white" style={styles.content}>
                {content}
              </Text>
            )}
          </View>
        </Touchable>
      </Animated.View>
    );
  }
}

InAppNotification.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.string,
  duration: PropTypes.number,
  isAutoDismiss: PropTypes.bool,
};

InAppNotification.defaultProps = {
  duration: 3000,
  isAutoDismiss: true,
  type: 'success',
};

const BACKGROUND_TYPES = {
  error: Colors.notiError,
  success: Colors.notiError,
  warning: Colors.notiWarning,
};

const styles = StyleSheet.create({
  wrapperView: {
    width: Dimensions.get('window').width,
  },
  container: {
    alignItems: 'center',
    padding: 16,
    paddingTop: safeArea().marginTop + 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
  },
});
