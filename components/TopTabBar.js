/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

const TopTabBar = ({route}) => {
  const {item} = route.params;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
    {key: 'third', title: 'Third'},
  ]);
  const FirstRoute = () => (
    <View style={styles.container}>
      <Image source={item.imageUrl} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.label}</Text>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: FirstRoute,
    third: FirstRoute,
  });

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
    <View style={styles.tabViewStyle}>
      <TabView
        swipeEnabled={true}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </View>
    // </View>
  );
};

export default TopTabBar;

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
  tabViewStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
