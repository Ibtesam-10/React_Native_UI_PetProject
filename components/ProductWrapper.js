/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {PropsWithChildren} from 'react';
import auth from '@react-native-firebase/auth';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  RefreshControl,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Header from './Header';
import Product from './Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SectionProps = PropsWithChildren<{
  title: string,
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function ProductWrapper({navigation}): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isPressed, setIsPressed] = useState(false);
  const [apiisPressed, setapiIsPressed] = useState(false);
  const [carouselisPressed, setIscarouselPressed] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setIsPressed(false);
      setapiIsPressed(false);
      setIscarouselPressed(false);
    }, 2000);
  };

  const prodcuts = [
    {
      name: 'Pexel 1',
      color: 'white',
      price: '3000',
      image:
        'https://images.pexels.com/photos/19011450/pexels-photo-19011450/free-photo-of-a-view-of-the-mountains-from-the-top-of-a-mountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Pexel 2',
      color: 'red',
      price: '4000',
      image:
        'https://images.pexels.com/photos/15836393/pexels-photo-15836393/free-photo-of-decorated-cup-with-evergreen-leaves.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
    },
    {
      name: 'Pexel 3',
      color: 'green',
      price: '5000',
      image:
        'https://images.pexels.com/photos/19011450/pexels-photo-19011450/free-photo-of-a-view-of-the-mountains-from-the-top-of-a-mountain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

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
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  const handleLogoutPress = () => {
    userLogout();
    setIsPressed(!isPressed);
  };
  const handlecarouselPress = () => {
    setIscarouselPressed(!carouselisPressed);
    navigation.navigate('CarouselScreen');
  };

  const handleApiPress = () => {
    setapiIsPressed(!apiisPressed);
    navigation.navigate('API Data');
  };

  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity style={{alignSelf: 'center'}} onPress={handleApiPress}>
        <Neomorph
          inner={apiisPressed}
          swapShadows={apiisPressed}
          style={{
            shadowRadius: 5,
            borderRadius: 10,
            backgroundColor: '#EAEAEA',
            width: 100,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
            }}>
            API Data
          </Text>
        </Neomorph>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={handlecarouselPress}>
        <Neomorph
          inner={carouselisPressed}
          swapShadows={carouselisPressed}
          style={{
            shadowRadius: 5,
            borderRadius: 10,
            backgroundColor: '#EAEAEA',
            width: 130,
            height: 40,
            marginRight: 200,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Stripe Payment
          </Text>
        </Neomorph>
      </TouchableOpacity> */}

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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="transparent"
          />
        }>
        {prodcuts.map(item => (
          <Product item={item} />
        ))}

        {/* <TouchableOpacity onPress={() => navigation.navigate('User')}
            style={{ backgroundColor: 'lightblue', width: 200, height: 25, marginTop: 10, alignItems: 'center',justifyContent:'center' }} >

            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: 'black' }} >User</Text>
          </TouchableOpacity> */}

        {/* <TouchableOpacity
        onPress={() => navigation.navigate('API Data')}
        style={{
          backgroundColor: 'lightblue',
          width: 200,
          height: 25,
          marginTop: 30,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 'bold',
            color: 'black',
          }}>
          API Data
        </Text>
      </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
});

export default ProductWrapper;
