import {Dimensions, Platform, StatusBar} from 'react-native';

const windowDimensions = Dimensions.get('window');
const {height: screenHeight, width: screenWidth} = windowDimensions;

const designWidth = 373;
const designHeight = 812;

const maxScreenWidth = screenWidth < 576 ? screenWidth : 576;
export const _scaleWidth = maxScreenWidth / designWidth;
const decorateHeights =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

export const currentScreenWidth = screenWidth;
export const currentScreenHeight = screenHeight - decorateHeights;

const _scaleHeight = screenHeight / designHeight;
const _scaleText = Math.min(_scaleWidth, _scaleHeight);

const width = (value: number) => value * _scaleWidth;
const height = (value: number) => value * _scaleHeight;

const heightForReAnimated = (value: number) => {
  'worklet';
  return value * _scaleHeight;
};

const widthForReAnimated = (value: number) => {
  'worklet';
  return value * _scaleWidth;
};

const IsIos = Platform.OS === 'ios';

const fontSize = (value: number) => value * _scaleText;
export {
  width,
  height,
  fontSize,
  heightForReAnimated,
  widthForReAnimated,
  designWidth,
  designHeight,
  IsIos,
};
