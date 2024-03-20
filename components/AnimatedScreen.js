/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import PagerView from 'react-native-pager-view';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import GridList from './GridList';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Tabs from '../src/Screens/BottomTab';
import BottomTab from '../src/Screens/BottomTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeUI from './HomeUI';
import {eye, menu} from '../src/assets/images';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import HeaderScroll from '../src/Screens/HeaderScroll';
import TrashCardScreen from '../src/Screens/TrashCardScreen';

const Drawer = createDrawerNavigator();

const AnimatedScreen = ({route}) => {
  const {item} = route.params;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
    {key: 'third', title: 'Third'},
  ]);
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  const FirstRoute = () => (
    <View style={styles.container}>
      <Image source={item.imageUrl} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.label}</Text>
    </View>
  );

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TabView
        swipeEnabled={true}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
  const ThirdRoute = () => (
    <PagerView style={styles.pagerView} initialPage={0} scrollEnabled={true}>
      <View key="1">
        <View style={styles.container}>
          <Image source={item.imageUrl} style={styles.itemImage} />
          <Text style={styles.itemText}>{item.label}</Text>
        </View>
      </View>
      <View key="2">
        <View style={styles.container}>
          <Image source={item.imageUrl} style={styles.itemImage} />
          <Text style={styles.itemText}>{item.label}</Text>
        </View>
      </View>
    </PagerView>
  );

  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const layout = useWindowDimensions();
  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        renderLabel={({focused, route}) => {
          return (
            <Text
              size={20}
              category="Medium"
              color={focused ? 'BLACK' : 'GRAY3'}>
              {route.title}
            </Text>
          );
        }}
        indicatorStyle={styles.indicatorStyle}
        style={styles.tabBar}
      />
    );
  };

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeUI}
        options={{
          drawerLabel: 'Home',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image source={menu} style={styles.menuIconStyle} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="Updates"
        component={FirstRoute}
        options={{drawerLabel: 'Updates'}}
      />
      <Drawer.Screen
        name="PagerView"
        component={ThirdRoute}
        options={{drawerLabel: 'PagerView'}}
      />
      <Drawer.Screen
        name="HeaderScroll"
        component={HeaderScroll}
        options={{drawerLabel: 'HeaderScroll'}}
      />
      <Drawer.Screen
        name="TrashCardScreen"
        component={TrashCardScreen}
        options={{drawerLabel: 'TrashCardScreen'}}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  itemImage: {
    width: '90%',
    height: 200,
    marginBottom: 16,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  pagerView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  indicatorStyle: {
    backgroundColor: 'red',
    marginBottom: -2,
  },
  menuIconStyle: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
});

export default AnimatedScreen;

// <View style={{flex: 1, backgroundColor: '#fff'}}>
//   <TabView
//     swipeEnabled={true}
//     navigationState={{index, routes}}
//     renderScene={renderScene}
//     onIndexChange={setIndex}
//     initialLayout={{width: layout.width}}
//     renderTabBar={renderTabBar}
//   />
// </View>

//ToDo: PagerView
// <PagerView style={styles.pagerView} initialPage={0} scrollEnabled={true}>
//   <View key="1">
//     <View style={styles.container}>
//       <Image source={item.imageUrl} style={styles.itemImage} />
//       <Text style={styles.itemText}>{item.label}</Text>
//     </View>
//   </View>
//   <View key="2">
//     <View style={styles.container}>
//       <Image source={item.imageUrl} style={styles.itemImage} />
//       <Text style={styles.itemText}>{item.label}</Text>
//     </View>
//   </View>
// </PagerView>
