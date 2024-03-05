/* eslint-disable react/no-unstable-nested-components */
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {w1, w2, w3, w4} from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const WalkThrough = () => {
  const navigation = useNavigation();

  const Done = ({...props}) => (
    <TouchableOpacity onPress={navigation.navigate('Login')} {...props}>
      <Text style={styles.doneTextStyle}>Done</Text>
    </TouchableOpacity>
  );

  // const Dots = ({selected}) => {
  //   let backgroundColor;
  //   backgroundColor = selected ? 'blue' : 'black';
  //   return (
  //     <View
  //       style={{
  //         width: 24,
  //         height: 6,
  //         marginHorizontal: 3,
  //         backgroundColor,
  //       }}
  //     />
  //   );
  // };
  return (
    <LinearGradient
      colors={['#FA3550', '#FA5439']}
      style={styles.gradientStyle}>
      <Onboarding
        onSkip={() => {
          navigation.navigate('Login');
        }}
        // DoneButtonComponent={Done}
        DoneButtonComponent={Done}
        // DotComponent={Dots}
        pages={[
          {
            title: '',
            subtitle: '',
            image: (
              <SafeAreaView>
                <Text style={styles.titleStyle}>Welcome to Hippo!</Text>
                <Text style={styles.subtitleStyle}>
                  The best activity tracker for real estate{'\n'} agents to
                  exceed your goals!
                </Text>

                <View style={styles.imageContainer}>
                  <Image source={w1} resizeMode="cover" />
                </View>
              </SafeAreaView>
            ),
          },
          {
            title: '',
            subtitle: '',
            image: (
              <SafeAreaView>
                <Text style={styles.titleStyle}>Welcome to Hippo!</Text>
                <Text style={styles.subtitleStyle}>
                  Always know the Pulse of your business in{'\n'} the palm of
                  your hand.
                </Text>

                <View style={styles.imageContainer}>
                  <Image source={w2} resizeMode="cover" />
                </View>
              </SafeAreaView>
            ),
          },
          {
            title: '',
            subtitle: '',
            image: (
              <SafeAreaView>
                <Text style={styles.titleStyle}>Welcome to Hippo!</Text>

                <View style={styles.imageContainer}>
                  <Image source={w3} resizeMode="cover" />
                </View>
                <Text style={styles.subtitleStyle}>
                  The best activity tracker for real estate agents to exceed
                  your goals!
                </Text>
              </SafeAreaView>
            ),
          },
          {
            title: '',
            subtitle: '',
            image: (
              <SafeAreaView>
                <Text style={styles.titleStyle}>Congratulations!</Text>
                <Text style={styles.subtitleStyles}>
                  Your goals are now setup. {'\n'}Spend 5 minutes every day
                  tracking your {'\n'} prospecting,appointments, contracts and
                  {'\n'}
                  income in realtime
                </Text>

                <View style={styles.imageContainer}>
                  <Image source={w4} style={styles.imageStyle} />
                </View>
              </SafeAreaView>
            ),
          },
        ]}
      />
    </LinearGradient>
  );
};

export default WalkThrough;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  gradientStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  doneTextStyle: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  titleStyle: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '800',
    fontSize: 30,
    marginBottom: 20,
  },

  subtitleStyle: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    marginBottom: 70,
  },
  subtitleStyles: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
    marginTop: 30,
    alignContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
    marginTop: 190,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
