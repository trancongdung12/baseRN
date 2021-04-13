import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export default {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
