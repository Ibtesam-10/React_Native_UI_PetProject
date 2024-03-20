/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeUI from '../../components/HomeUI';
import AnimatedScreen from '../../components/AnimatedScreen';
import {NavigationContainer} from '@react-navigation/native';
import GridList from '../../components/GridList';
import {dollar, eye, eyeIcon, graph, home, settings} from '../assets/images';
import Graph from './Graph';
import Charts from './Charts';
import CircularHome from './ComplexUI/CircularHome';
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="HomeUI"
      screenOptions={{
        tabBarActiveTintColor: '#FA3550',
      }}>
      <Tab.Screen
        name="HomeUI"
        component={HomeUI}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  source={home}
                  resizeMode="contain"
                  style={{
                    width: 25,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="GridList"
        component={GridList}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  source={settings}
                  resizeMode="contain"
                  style={{
                    width: 25,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Graph"
        component={Graph}
        options={{
          tabBarLabel: 'Graph Chart',
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  source={graph}
                  resizeMode="contain"
                  style={{
                    width: 25,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="GiftedCharts"
        component={Charts}
        options={{
          tabBarLabel: 'Graph Chart',
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  source={dollar}
                  resizeMode="contain"
                  style={{
                    width: 25,
                  }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="CHome"
        component={CircularHome}
        options={{
          tabBarLabel: 'CHome',
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  source={graph}
                  resizeMode="contain"
                  style={{
                    width: 25,
                  }}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   itemText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   itemImage: {
//     width: '90%',
//     height: 200,
//     marginBottom: 16,
//     resizeMode: 'cover',
//     borderRadius: 10,
//   },
//   pagerView: {
//     flex: 1,
//   },
// });
