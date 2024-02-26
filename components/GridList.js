/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {bluetooth, car1, car2, imageNetwork, tick} from '../src/assets/images';
import {Neomorph} from 'react-native-neomorph-shadows';

const screenWidth = Dimensions.get('window').width;

const data = [
  {id: '1', title: 'Item 1', imageUrl: bluetooth},
  {id: '2', title: 'Item 2', imageUrl: car1},
  {id: '3', title: 'Item 3', imageUrl: car2},
  {id: '4', title: 'Item 4', imageUrl: tick},
  {id: '5', title: 'Item 5', imageUrl: tick},
  {id: '6', title: 'Item 6', imageUrl: bluetooth},
  {id: '7', title: 'Item 7', imageUrl: car1},
  {id: '8', title: 'Item 8', imageUrl: tick},
  {id: '9', title: 'Item 9', imageUrl: bluetooth},
  {id: '10', title: 'Item 10', imageUrl: car2},
  {id: '11', title: 'Item 11', imageUrl: car1},
  {id: '12', title: 'Item 12', imageUrl: bluetooth},
  {id: '13', title: 'Item 13', imageUrl: car2},
  {id: '14', title: 'Item 14', imageUrl: car1},
  {id: '15', title: 'Item 15', imageUrl: tick},
  {id: '16', title: 'Item 16', imageUrl: bluetooth},
];

const getImageSource = image => {
  if (typeof image === 'string') {
    return {uri: image};
  } else {
    return image;
  }
};

const GridList = () => {
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = item => () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    navigation.navigate('AnimatedScreen', {item});
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('Item:', item.title, 'Images:', item.imageUrl);
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut(item)}
        style={[
          styles.item,
          {
            opacity: fadeAnimation,
          },
        ]}>
        <Image
          source={getImageSource(item.imageUrl)}
          style={styles.itemImage}
        />
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const clearUserSession = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
    } catch (error) {
      console.error('Error clearing user session:', error);
    }
  };

  const userLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User Logged Out');
        clearUserSession();
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  const handleLogoutPress = () => {
    userLogout();
    setIsPressed(!isPressed);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogoutPress}>
        <Neomorph
          inner={isPressed}
          swapShadows={isPressed}
          style={{
            shadowRadius: 5,
            borderRadius: 10,
            backgroundColor: '#EAEAEA',
            width: 100,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 240,
            marginTop: 10,
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'red',
              textDecorationLine: 'underline',
            }}>
            Logout
          </Text>
        </Neomorph>
      </TouchableOpacity>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  itemImage: {
    borderRadius: 2,
    width: screenWidth * 0.3,
    height: screenWidth * 0.25,
    marginBottom: 8,
    resizeMode: 'cover',
  },
});

export default GridList;
