import {Alert, Text, TouchableOpacity} from 'react-native';
import Home from './components/Home';
import React, {useEffect, useState} from 'react';
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
import BottomTab from './src/Screens/BottomTab';
import TopTabBar from './components/TopTabBar';
import Graph from './src/Screens/Graph';
import Charts from './src/Screens/Charts';
import CircularHome from './src/Screens/ComplexUI/CircularHome';
import CircularBase from './src/Screens/ComplexUI/CircularBase';
import MultiColors from './src/Screens/ComplexUI/MultiColors';
import WalkThrough from './src/Screens/Onboard/WalkThrough';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    getDeviceToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('Notification in foreground!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem('appLaunched');
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem('appLaunched', 'false');
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
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
    firstLaunch != null && (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WalkThrough">
          {firstLaunch && (
            <Stack.Screen
              options={{headerShown: false}}
              name="WalkThrough"
              component={WalkThrough}
            />
          )}
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
              headerShown: false,
            }}
          />
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
            name="GiftedCharts"
            component={Charts}
            options={{
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
              headerShown: false,
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
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TopTabBar"
            component={TopTabBar}
            options={{
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
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
            name="Graph"
            component={Graph}
            options={{
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="CHome"
            component={CircularHome}
            options={{
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="CBase"
            component={CircularBase}
            options={{
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="MultiColors"
            component={MultiColors}
            options={{
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default App;
