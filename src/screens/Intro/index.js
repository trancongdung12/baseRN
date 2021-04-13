import React, { useState } from 'react';
import { ScrollView, View, SafeAreaView, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { actions as AppActions } from '../../redux/AppRedux';
import { useDispatch } from 'react-redux';
import { NavigationUtils } from '../../navigation';

import { Constants, Colors, Images } from '../../themes';
import { Text, Touchable } from '../../components';

const INTRO_SLICES = [
  { index: 0, photo: Images.intro_1, title: 'Intro 1', subTitle: 'hello world' },
  { index: 0, photo: Images.intro_2, title: 'Intro 2', subTitle: 'hello world' },
  { index: 0, photo: Images.intro_3, title: 'Intro 3', subTitle: 'hello world' },
];

const IntroScreen = () => {
  const [sliceNum, setSliceNum] = useState(0);

  const dispatch = useDispatch();
  const markSkipIntro = (_isSkip) => dispatch(AppActions.markSkipIntro(_isSkip));

  const onSkip = () => {
    markSkipIntro(true);
    NavigationUtils.startLoginContent();
  };

  const onScrollEnd = (e) => {
    const { x } = e.nativeEvent.contentOffset;
    const { width } = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(x / width);
    setSliceNum(pageNum);
  };

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {INTRO_SLICES.map((elm, index) => (
          <View
            key={index}
            // eslint-disable-next-line react-native/no-inline-styles
            style={[
              styles.dot,
              {
                backgroundColor: sliceNum === index ? Colors.blue : Colors.neturalGrey,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderSkipBtn = () => (
    <Touchable style={styles.skipBtn} onPress={onSkip}>
      <Text type="regular16" style={styles.skipLabel}>
        Skip
      </Text>
    </Touchable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
      >
        {INTRO_SLICES.map((slice, key) => (
          <View key={key} style={styles.slice}>
            <View style={styles.body}>
              <FastImage
                source={slice.photo}
                style={styles.photo}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text type="bold16" style={styles.title}>
                {slice.title}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {renderPagination()}
      {renderSkipBtn()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slice: {
    height: Constants.SCREEN_HEIGHT,
    width: Constants.SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    backgroundColor: Colors.default,
    alignItems: 'center',
    width: '90%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  photo: {
    width: '100%',
    height: Constants.SCREEN_HEIGHT * 0.35,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    marginVertical: 24,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  dot: {
    marginHorizontal: 8,
    width: 24,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.buttonColorBlue,
  },
  skipBtn: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 32,
  },
  skipLabel: {
    color: Colors.blue,
    textDecorationLine: 'underline',
  },
});

export default IntroScreen;
