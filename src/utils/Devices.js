import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

export const safeArea = () => {
  if (DeviceInfo.hasNotch()) {
    return {
      marginTop: 35,
      paddingTop: 57,
      marginBottom: 30,
      paddingBottom: 30,
      top: 45,
      bottom: 30,
      height: 130,
      bottomHeight: 20,
      navHeight: 86,
    };
  }
  if (Platform.OS === 'android') {
    return {
      marginTop: 25,
      paddingTop: 45,
      marginBottom: 20,
      paddingBottom: 20,
      top: 35,
      bottom: 15,
      height: 120,
      bottomHeight: 20,
      navHeight: 56,
    };
  }
  return {
    marginTop: 20,
    paddingTop: 45,
    marginBottom: 20,
    paddingBottom: 20,
    top: 30,
    bottom: 20,
    height: 120,
    bottomHeight: 0,
    navHeight: 64,
  };
};
