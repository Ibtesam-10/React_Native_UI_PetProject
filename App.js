import {Alert, Text, TouchableOpacity} from 'react-native';
import Home from './components/Home';
import React, {useEffect} from 'react';
import Login from './components/Login';
import GridList from './components/GridList';
import Register from './components/Register';
import AnimatedScreen from './components/AnimatedScreen';
import messaging from '@react-native-firebase/messaging';
import ProductWrapper from './components/ProductWrapper';
import CarouselScreen from './components/CarouselScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeUI from './components/HomeUI';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    getDeviceToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('Notification in foreground!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const getDeviceToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token);
    } catch (error) {
      console.error('Error getting device token:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="API Data" component={Home} />
        <Stack.Screen name="Products" component={ProductWrapper} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="GridList"
          component={GridList}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
            // headerRight: () => (
            //   <TouchableOpacity>
            //     <Text>Logout</Text>
            //   </TouchableOpacity>
            // ),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={AnimatedScreen}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
            // headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeUI"
          component={HomeUI}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
