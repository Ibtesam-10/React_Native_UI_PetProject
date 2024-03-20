import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {car1} from '../assets/images';

const {width} = Dimensions.get('window');
const headerHeight = 300;
const headerFinalHeight = 70;
const imageSize = (headerHeight / 3) * 2;
export default function ScrollViewAnimatedHeader() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const offset = headerHeight - headerFinalHeight;
  const translateHeader = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -offset],
    extrapolate: 'clamp',
  });
  const translateImageY = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -(headerFinalHeight - headerHeight) / 2],
    extrapolate: 'clamp',
  });
  const translateImageX = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [
      0,
      -(width / 2) + (imageSize * headerFinalHeight) / headerHeight,
    ],
    extrapolate: 'clamp',
  });
  const scaleImage = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [1, headerFinalHeight / headerHeight],
    extrapolate: 'clamp',
  });
  const translateName = scrollY.interpolate({
    inputRange: [0, offset / 2, offset],
    outputRange: [0, 10, -width / 2 + textWidth / 2 + headerFinalHeight],
    extrapolate: 'clamp',
  });
  const scaleName = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => (
          <View style={styles.item}>
            <Text style={styles.profileText}>User</Text>
          </View>
        ))}
      </ScrollView>
      <Animated.View
        pointerEvents="none"
        style={[styles.header, {transform: [{translateY: translateHeader}]}]}>
        <Animated.View
          style={[
            styles.image,
            {
              transform: [
                {translateY: translateImageY},
                {translateX: translateImageX},
                {scale: scaleImage},
              ],
            },
          ]}>
          <Image source={car1} style={styles.img} resizeMode="cover" />
        </Animated.View>
        <Animated.Text
          onTextLayout={e => setTextWidth(e.nativeEvent.lines[0].width)}
          style={[
            styles.name,
            {transform: [{translateX: translateName}, {scale: scaleName}]},
          ]}>
          Profile
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    height: 100,
    marginBottom: 5,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  header: {
    height: headerHeight,
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingTop: headerHeight + 5,
    backgroundColor: '#fff',
  },
  image: {
    height: imageSize,
    width: imageSize,
    borderRadius: headerHeight,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  img: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 30,
    color: '#000',
    position: 'absolute',
    bottom: 0,
    height: headerFinalHeight,
    textAlignVertical: 'center',
    letterSpacing: 2,
  },
  profileText: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: 'black',
    fontSize: 20,
  },
});
