/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  StripeProvider,
  CardField,
  useStripe,
  useConfirmSetupIntent,
} from '@stripe/stripe-react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {car1, car2, login, signup, tick} from '../src/assets/images';

const CarouselScreen = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setIsPressed(false);
    }, 2000);
  };

  const carouselData = [
    {
      id: '1',
      imageUrl: car2,
    },
    {
      id: '2',
      imageUrl: car1,
    },
    {
      id: '3',
      imageUrl: login,
    },
    {
      id: '4',
      imageUrl: signup,
    },
    {
      id: '5',
      imageUrl: car1,
    },
    {
      id: '6',
      imageUrl: login,
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="transparent"
        />
      }>
      <View style={styles.container}>
        <Text>gshgshgh</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  slide: {
    width: '100%',
    flex: 1,
  },
  image: {
    marginTop: 20,
    width: '95%',
    height: '40%',
    resizeMode: 'cover',
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default CarouselScreen;
