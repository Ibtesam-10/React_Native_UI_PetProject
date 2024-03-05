/* eslint-disable react/no-unstable-nested-components */
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {
  car1,
  car2,
  eye,
  img1,
  img2,
  img3,
  login,
  signup,
  tick,
} from '../src/assets/images';

import {useNavigation} from '@react-navigation/native';
import {Animated} from 'react-native';
import {useRef} from 'react';
import {Neomorph} from 'react-native-neomorph-shadows';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import Header from './Header';

const screenWidth = Dimensions.get('window').width;

const HomeUI = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const [refreshing, setRefreshing] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const navigation = useNavigation();
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
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
      imageUrl: img1,
    },
    {
      id: '4',
      imageUrl: img2,
    },
    {
      id: '5',
      imageUrl: img3,
    },
    {
      id: '6',
      imageUrl: img1,
    },
  ];

  const iconsData = [
    {imageUrl: img1, label: 'Icon 1'},
    {imageUrl: img2, label: 'Icon 2'},
    {imageUrl: img1, label: 'Icon 3'},
    {imageUrl: car1, label: 'Icon 4'},
    {imageUrl: img3, label: 'Icon 5'},
    {imageUrl: car2, label: 'Icon 6'},
    {imageUrl: car2, label: 'Icon 8'},
    {imageUrl: car1, label: 'Icon 9'},
    {imageUrl: img1, label: 'Icon 10'},
  ];

  const categoriesData = [
    {imageUrl: img1, label: 'item 1'},
    {imageUrl: img2, label: 'item 2'},
    {imageUrl: img3, label: 'item 1'},
    {imageUrl: car2, label: 'item 2'},
    {imageUrl: car1, label: 'item 1'},
    {imageUrl: car2, label: 'item 2'},
    {imageUrl: img1, label: 'item 1'},
    {imageUrl: img3, label: 'item 2'},
  ];

  const gridViewList = [
    {imageUrl: img1, label: 'item 1'},
    {imageUrl: img2, label: 'item 2'},
    {imageUrl: img3, label: 'item 3'},
    {imageUrl: car2, label: 'item 4'},
    {imageUrl: car1, label: 'item 5'},
    {imageUrl: car2, label: 'item 6'},
    {imageUrl: img1, label: 'item 7'},
    {imageUrl: img3, label: 'item 8'},
    {imageUrl: img1, label: 'item 9'},
    {imageUrl: img2, label: 'item 10'},
    {imageUrl: img3, label: 'item 11'},
    {imageUrl: car2, label: 'item 12'},
    {imageUrl: car1, label: 'item 13'},
    {imageUrl: car2, label: 'item 14'},
    {imageUrl: img1, label: 'item 15'},
    {imageUrl: img3, label: 'item 16'},
  ];

  const handleOnPress = item => () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();

    navigation.navigate('Detail', {
      item: {imageUrl: item.imageUrl, label: item.label},
    });
  };

  const ListData = ({imageUrl, label}) => (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={handleOnPress({imageUrl, label})}>
      <View style={styles.icon}>
        <Image source={imageUrl} style={styles.image} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );

  const CategoriesData = ({imageUrl, label}) => (
    <TouchableOpacity
      style={styles.iconContainerCategory}
      onPress={handleOnPress({imageUrl, label})}>
      <View style={styles.iconCategory}>
        <Image source={imageUrl} style={styles.imageCategory} />
        <View style={styles.labelContainer}>
          <Text style={styles.labelCategory}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const GridViewData = ({imageUrl, label}) => (
    <TouchableOpacity
      style={styles.iconContainerGrid}
      onPress={handleOnPress({imageUrl, label})}>
      <View style={styles.iconCategoryGrid}>
        <Image source={imageUrl} style={styles.imagegrid} />
        <View style={styles.labelContainerGrid}>
          <Text style={styles.labelGrid}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCarouselItem = ({item}) => (
    <View style={styles.slideCarousel}>
      <Image style={styles.imageCarousel} source={item.imageUrl} />
    </View>
  );

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
    // <View style={{flex: 1}}>
    //   <ImageBackground
    //     source={img1}
    //     style={styles.backgroundImageStyle}
    //     resizeMode="cover">
    //     <ScrollView
    //       contentContainerStyle={styles.container}
    //       keyboardShouldPersistTaps="handled"
    //       refreshControl={
    //         <RefreshControl
    //           refreshing={refreshing}
    //           onRefresh={onRefresh}
    //           tintColor="transparent"
    //         />
    //       }>
    //       <View style={styles.sectionContainer}>
    //         <TouchableOpacity onPress={handleLogoutPress}>
    //           <Neomorph
    //             inner={isPressed}
    //             swapShadows={isPressed}
    //             style={styles.logoutBtnStyle}>
    //             <Text style={styles.logoutText}>Logout</Text>
    //           </Neomorph>
    //         </TouchableOpacity>
    //         <View style={styles.containerCarousel}>
    //           <Carousel
    //             enableMomentum={true}
    //             enableSnap={true}
    //             lockScrollWhileSnapping={true}
    //             loop={true}
    //             layout={'default'}
    //             data={carouselData}
    //             renderItem={renderCarouselItem}
    //             sliderWidth={Dimensions.get('window').width}
    //             itemWidth={Dimensions.get('window').width}
    //             autoplay={true}
    //             autoplayInterval={3000}
    //             onSnapToItem={index => setActiveSlide(index)}
    //           />
    //           <Pagination
    //             dotsLength={carouselData.length}
    //             activeDotIndex={activeSlide}
    //             containerStyle={{top: -10}}
    //             dotStyle={styles.dotStyle}
    //             inactiveDotOpacity={0.4}
    //             inactiveDotScale={0.6}
    //           />
    //         </View>
    //         <View style={styles.textStyle}>
    //           <Text style={styles.textAlign}>Recommended</Text>
    //           <Text style={[styles.textAlign, styles.seeAll]}>View All</Text>
    //         </View>
    //         <FlatList
    //           data={iconsData}
    //           horizontal
    //           showsHorizontalScrollIndicator={false}
    //           contentContainerStyle={styles.scrollContainer}
    //           keyExtractor={(item, index) => index.toString()}
    //           renderItem={({item}) => <ListData {...item} />}
    //         />
    //         <View style={styles.textStyle}>
    //           <Text style={[styles.textAlign]}>Categories</Text>
    //           <Text style={[styles.textAlign, styles.seeAll]}>View All</Text>
    //         </View>
    //         <FlatList
    //           data={categoriesData}
    //           horizontal
    //           showsHorizontalScrollIndicator={false}
    //           contentContainerStyle={styles.scrollContainer}
    //           keyExtractor={(item, index) => index.toString()}
    //           renderItem={({item}) => <CategoriesData {...item} />}
    //         />
    //       </View>
    //       <View style={styles.textStyle}>
    //         <Text style={[styles.textAlign]}>Grid View Data</Text>
    //         <Text style={[styles.textAlign, styles.seeAll]}>View All</Text>
    //       </View>
    //       <FlatList
    //         data={gridViewList}
    //         showsVerticalScrollIndicator={false}
    //         style={styles.grdiViewListStyle}
    //         columnWrapperStyle={styles.row}
    //         renderItem={({item}) => <GridViewData {...item} />}
    //         keyExtractor={item => item.id}
    //         numColumns={2}
    //       />
    //     </ScrollView>
    //   </ImageBackground>
    // </View>
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
      <View style={styles.sectionContainer}>
        <TouchableOpacity onPress={handleLogoutPress}>
          <Neomorph
            inner={isPressed}
            swapShadows={isPressed}
            style={styles.logoutBtnStyle}>
            <Text style={styles.logoutText}>Logout</Text>
          </Neomorph>
        </TouchableOpacity>
        <View style={styles.containerCarousel}>
          <Carousel
            enableMomentum={true}
            enableSnap={true}
            lockScrollWhileSnapping={true}
            loop={true}
            layout={'default'}
            data={carouselData}
            renderItem={renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            autoplay={true}
            autoplayInterval={3000}
            onSnapToItem={index => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={carouselData.length}
            activeDotIndex={activeSlide}
            containerStyle={{top: -10}}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <View style={styles.textStyle}>
          <Text style={styles.textAlign}>Recommended</Text>
          <Text style={[styles.textAlign, styles.seeAll]}>View All</Text>
        </View>
        <FlatList
          data={iconsData}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ListData {...item} />}
        />
        <View style={styles.textStyle}>
          <Text style={[styles.textAlign]}>Categories</Text>
          <Text style={[styles.textAlign, styles.seeAll]}>View All</Text>
        </View>
        <FlatList
          data={categoriesData}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <CategoriesData {...item} />}
        />
      </View>
      <View style={styles.textStyle}>
        <Text style={[styles.textAlign]}>Grid View Data</Text>
        <Text style={[styles.textAlign, styles.seeAll]}>View All</Text>
      </View>
      <FlatList
        data={gridViewList}
        showsVerticalScrollIndicator={false}
        style={styles.grdiViewListStyle}
        columnWrapperStyle={styles.row}
        renderItem={({item}) => <GridViewData {...item} />}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    width: '100%',
    padding: 3,
    height: '100%',
    backgroundColor: '#ffffff',
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
    textAlign: 'start',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
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
});
export default HomeUI;
