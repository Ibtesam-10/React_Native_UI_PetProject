/* eslint-disable react/self-closing-comp */
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
  SafeAreaView,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CircularProgress, {
  CircularProgressBase,
} from 'react-native-circular-progress-indicator';
import LinearGradient from 'react-native-linear-gradient';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {arrow, backarrow} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import PieChart from 'react-native-pie-chart';
import {AccordionItem} from 'react-native-accordion-list-view';
import Icon from 'react-native-vector-icons/EvilIcons';

const screenWidth = Dimensions.get('window').width;

const MultiColors = () => {
  const [refreshing, setRefreshing] = useState(false);
  const widthAndHeight = 190;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ['#8601AF', '#FB9902', '#66B032', '#FA4850', '#0392CE'];

  const layout = useWindowDimensions();
  const navigation = useNavigation();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const data = [
    {
      id: 0,
      title: 'New / Active',
      body: ' Irma2\n Seller                                                            30/3/21',
    },
    {
      id: 1,
      title: 'Pending',
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      title: 'Closed',
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      title: 'Expired/cancelled',
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(
          LayoutAnimation.create(500, 'linear', 'scaleY'),
        );
      }
    }
  }, []);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Day'},
    {key: 'second', title: 'Week'},
    {key: 'third', title: 'Month'},
    {key: 'forth', title: 'Year'},
  ]);

  const FirstRoute = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.progressTextStyle}>
        Listing/Bra/Lease Goal: {''}
        <Text style={styles.textColor}>{''}0 of 232049</Text>
      </Text>
      <View style={styles.gradientView}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.85}
          coverFill={'#FFF'}
        />
        <View style={styles.gauge}>
          <Text style={styles.gaugeText}>3948</Text>
        </View>
      </View>

      <View style={styles.rowView}>
        <View style={styles.sellerView}></View>
        <Text style={styles.sellerText}>
          Seller{''}
          {''} {''}
          {''} {''}
          {''} {''}
          {''} {''} 0
        </Text>
        <View style={styles.buyerView}></View>
        <Text style={styles.buyerText}>
          Buyer{''}
          {''} {''}
          {''} {''}
          {''} {''}
          {''} {''} 0
        </Text>
      </View>
      <View style={styles.rowView}>
        <View style={styles.referrelView}></View>
        <Text style={styles.sellerText}>
          Refferel{''}
          {''} {''}
          {''} {''}
          {''} {''}
          {''} {''} 0
        </Text>
        <View style={styles.leaseView}></View>
        <Text style={styles.buyerText}>
          Lease{''}
          {''} {''}
          {''} {''}
          {''} {''}
          {''} {''} 0
        </Text>
      </View>
      <LinearGradient
        colors={['#FA3550', '#FA5439']}
        style={styles.gradientStyle}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CBase');
          }}>
          <Text style={styles.textAlign}> + Add Contacts</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.accordContainer}>
        {data.map(item => (
          <View style={styles.accordiancontainer}>
            <AccordionItem
              key={item.id}
              customTitle={() => (
                <View>
                  <Text style={styles.customTitle}>{item.title}</Text>
                </View>
              )}
              customBody={() => (
                <View style={styles.cutomBody}>
                  <Text>{item.body}</Text>
                </View>
              )}
              // defaultOpenIndices={[0, 2]}
              customIcon={expanded => (
                <Icon
                  name={expanded ? 'chevron-up' : 'chevron-right'}
                  size={35}
                  color="#fff"
                />
              )}
              animationDuration={400}
              isOpen={false}
              onPress={isOpen => console.log(isOpen)}
              pressableProps={{
                style: ({pressed}) => [
                  {
                    padding: '2%',
                    backgroundColor:
                      pressed && Platform.OS == 'ios' ? '#fff' : '#FB6550',
                    borderRadius: 20,
                    paddingVertical: 15,
                  },
                ],
                android_ripple: {
                  color: 'rgb(210, 230, 255)',
                },
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: FirstRoute,
    third: FirstRoute,
    forth: FirstRoute,
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
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.container}
          contentInsetAdjustmentBehavior="automatic"
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
      </View>
    </SafeAreaView>
  );
};

export default MultiColors;

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
    height: 1200,
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
    marginTop: 20,
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderColor: '#fffffff',
    elevation: 0,
  },
  indicatorStyle: {
    backgroundColor: '#FA3550',
    marginBottom: -2,
    width: 70,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
  },
  progressTextStyle: {
    alignSelf: 'center',
    marginLeft: 20,
    fontSize: 18,
    color: '#4B4B4C',
    fontWeight: '600',
    marginTop: 25,
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
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    marginTop: 8,
  },
  routeTextStyle: {
    fontSize: 18,
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
  gauge: {
    position: 'absolute',
    width: 120,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF9C9C',
    elevation: 40,
    // backgroundColor: '#FF9C9C',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: '90%',
  },
  sellerView: {
    backgroundColor: '#FB9902',
    width: 30,
    height: 30,
    borderRadius: 20,
    shadowColor: '#FB9902',
    elevation: 20,
    shadowRadius: 45,
    marginTop: 30,
  },
  sellerText: {
    fontSize: 15,
    color: '#646464',
    fontWeight: '600',
    marginTop: 30,
    marginRight: 80,
  },
  textColor: {
    color: '#FA364F',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 4,
  },
  buyerView: {
    backgroundColor: '#8601AF',
    width: 30,
    height: 30,
    borderRadius: 20,
    shadowColor: '#8601AF',
    elevation: 20,
    shadowRadius: 45,
    marginTop: 30,
  },
  buyerText: {
    fontSize: 15,
    color: '#646464',
    fontWeight: '600',
    marginTop: 30,
  },
  referrelView: {
    backgroundColor: '#0392CE',
    width: 30,
    height: 30,
    borderRadius: 20,
    shadowColor: '#0392CE',
    elevation: 20,
    shadowRadius: 45,
    marginTop: 30,
  },
  leaseView: {
    backgroundColor: '#66B032',
    width: 30,
    height: 30,
    borderRadius: 20,
    shadowColor: '#66B032',
    elevation: 20,
    shadowRadius: 45,
    marginTop: 30,
  },
  gaugeTextWithBorder: {
    fontSize: 20,
    backgroundColor: '#FF9C9C',
    borderColor: '#FF9C9C',
    elevation: 0.2,
    shadowColor: '#66B032',
    shadowRadius: 45,
    shadowOpacity: 0.1,
  },
  accordiancontainer: {
    width: '100%',
    backgroundColor: '#fff',
  },
  accordContainer: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  accordHeader: {
    padding: 12,
    backgroundColor: '#666',
    color: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordTitle: {
    fontSize: 20,
  },
  accordBody: {
    padding: 12,
  },
  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
  customTitle: {
    color: '#fff',
    fontWeight: '700',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  cutomBody: {
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FE9E97',
    marginTop: 8,
  },
});
