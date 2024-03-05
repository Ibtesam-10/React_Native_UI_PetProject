/* eslint-disable react/no-unstable-nested-components */
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import LinearGradient from 'react-native-linear-gradient';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {arrow, backarrow} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const CircularHome = () => {
  const [refreshing, setRefreshing] = useState(false);
  const layout = useWindowDimensions();
  const navigation = useNavigation();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Day'},
    {key: 'second', title: 'Week'},
    {key: 'third', title: 'Month'},
  ]);
  const FirstRoute = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.progressTextStyle}>60</Text>
      <View style={styles.gradientView}>
        <CircularProgress
          value={60}
          radius={100}
          progressValueStyle={styles.progressValueStyle}
          progressValueColor={'black'}
          inActiveStrokeColor={'#FA5339'}
          activeStrokeColor={'#FA5538'}
          activeStrokeSecondaryColor={'#FA3351'}
          inActiveStrokeOpacity={0.7}
          inActiveStrokeWidth={12}
          activeStrokeWidth={25}
          circleBackgroundColor={'#fff'}
          strokeLinecap="butt"
        />
      </View>

      <LinearGradient
        colors={['#FA3550', '#FA5439']}
        style={styles.gradientStyle}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CBase');
          }}>
          <Text style={styles.textAlign}> + Add Prospecting</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={['#FA3351', '#FA5538']}
        style={styles.gradientStyle}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MultiColors');
          }}>
          <Text style={styles.textAlign}> Your Prospects</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.progressTextStyle}>20</Text>
      <View style={styles.gradientView}>
        <CircularProgress
          value={20}
          radius={100}
          progressValueStyle={styles.progressValueStyle}
          progressValueColor={'black'}
          inActiveStrokeColor={'#FA5339'}
          activeStrokeColor={'#FA5538'}
          activeStrokeSecondaryColor={'#FA3351'}
          inActiveStrokeOpacity={0.7}
          inActiveStrokeWidth={12}
          activeStrokeWidth={25}
          circleBackgroundColor={'#fff'}
          strokeLinecap="butt"
        />
      </View>

      <LinearGradient
        colors={['#FA3550', '#FA5439']}
        style={styles.gradientStyle}>
        <TouchableOpacity>
          <Text style={styles.textAlign}> + Add Prospecting</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={['#FA3351', '#FA5538']}
        style={styles.gradientStyle}>
        <TouchableOpacity>
          <Text style={styles.textAlign}> Your Prospects</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: FirstRoute,
  });

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        renderLabel={({focused, route}) => {
          return (
            <View style={styles.tabBarViewStyle}>
              <LinearGradient
                colors={['#FA3550', '#FA5439']}
                style={styles.linearGradientStyle}>
                <Text
                  style={styles.routeTextStyle}
                  color={focused ? 'BLACK' : 'GRAY3'}>
                  {route.title}
                </Text>
              </LinearGradient>
            </View>
          );
        }}
        indicatorStyle={styles.indicatorStyle}
        style={styles.tabBar}
      />
    );
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="transparent"
        />
      }>
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
    </ScrollView>
  );
};

export default CircularHome;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    padding: 3,
    height: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  containerCarousel: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  container: {
    flexGrow: 1,
    // backgroundColor: '#ffffff',
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
  slideCarousel: {
    width: '100%',
    height: 400,
  },
  imageCarousel: {
    marginTop: 20,
    width: '95%',
    height: '50%',
    resizeMode: 'cover',
    borderRadius: 20,
    marginLeft: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  textAlign: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 10,
  },
  scrollContainer: {
    marginTop: 10,
  },
  iconContainer: {
    marginRight: 7,
    alignItems: 'center',
    padding: 3,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
  },
  iconContainerCategory: {
    marginRight: 7,
    alignItems: 'center',
    padding: 3,
  },
  iconCategory: {
    width: 175,
    height: 125,
    borderRadius: 10,
  },
  imageCategory: {
    width: 170,
    height: 125,
    resizeMode: 'cover',
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 2,
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // padding: 8,
  },
  labelCategory: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutBtnStyle: {
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
  },

  logoutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
    textDecorationLine: 'underline',
  },
  seeAll: {
    marginTop: 20,
    marginRight: 10,
    fontSize: 15,
    fontWeight: 'normal',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  textStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  iconContainerGrid: {
    marginRight: 7,
    alignItems: 'center',
    padding: 3,
    marginTop: 5,
  },
  imagegrid: {
    width: 170,
    height: 125,
    resizeMode: 'cover',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'blue',
  },
  labelContainerGrid: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  labelGrid: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  iconGrid: {
    width: 175,
    height: 125,
    borderRadius: 10,
  },
  iconCategoryGrid: {
    width: 175,
    height: 125,
    borderRadius: 10,
  },
  backgroundImageStyle: {
    flex: 1,
    height: 300,
    borderRadius: 10,
  },
  grdiViewListStyle: {
    marginBottom: 20,
    alignSelf: 'center',
  },

  gradientStyle: {
    borderRadius: 100,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  gradientView: {
    alignSelf: 'center',
    shadowColor: '#FA4842',
    shadowOpacity: 0.1,
    elevation: 20,
    borderRadius: 80,
    width: '65%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderColor: '#fffffff',
    elevation: 0,
  },
  indicatorStyle: {
    backgroundColor: '#FA3550',
    marginBottom: -2,
    width: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  progressTextStyle: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontSize: 30,
    color: '#4B4B4C',
    fontWeight: '600',
    marginTop: 20,
  },
  progressValueStyle: {
    elevation: 10,
    fontSize: 25,
  },
  tabBarViewStyle: {
    backgroundColor: '#fc8b7c',
    borderRadius: 30,
    justifyContent: 'space-around',
    alignContent: 'space-between',
  },
  linearGradientStyle: {
    backgroundColor: '#FA3550',
    borderRadius: 30,
    height: 115,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    marginTop: 8,
  },
  routeTextStyle: {
    fontSize: 20,
    alignItems: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  tabViewStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
});
