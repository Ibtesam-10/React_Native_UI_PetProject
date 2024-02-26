/* eslint-disable react-native/no-inline-styles */

import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  RefreshControl,
  Dimensions,
  Image,
} from 'react-native';

import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {Neomorph} from 'react-native-neomorph-shadows';
import {getPosts, deletePosts} from './redux/actions/posts';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {car1, car2, login, signup} from '../src/assets/images';

const Home = () => {
  const [data, setData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setIsPressed(false);
    }, 2000);
  };

  useEffect(() => {
    getPosts().then(res => {
      // console.log("all data", res);
      setData(res);
    });
  }, []);

  const showDeleteConfirmationModal = postId => {
    setPostIdToDelete(postId);
    setIsSuccess(false);
    setModalVisible(true);
  };

  const hideModal = () => {
    setPostIdToDelete(null);
    setIsSuccess(false);
    setModalVisible(false);
  };

  const hideSuccesssModal = () => {
    setIsSuccess(false);
  };

  // Function to hide the confirmation modal
  const hideDeleteConfirmationModal = () => {
    setPostIdToDelete(null);
    setModalVisible(false);
  };

  const deletePost = async id => {
    try {
      deletePosts(id).then(res => {
        console.log('Delete Posts', res);
        let array = [...data];
        let modifyArray = array.filter((val, i) => {
          if (val.id !== id) {
            return val;
          }
        });
        setData(modifyArray);
      });
      hideDeleteConfirmationModal();
      setIsSuccessModalVisible(true);
      setTimeout(() => {
        setIsSuccess(true);
      }, 2000);

      setTimeout(() => {
        setIsSuccessModalVisible(false);
      }, 2000);
    } catch (error) {
      console.log('Delete Error', error);
    }
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
      imageUrl: login,
    },
    {
      id: '4',
      imageUrl: signup,
    },
    {
      id: '5',
      imageUrl: car1,
    },
    {
      id: '6',
      imageUrl: login,
    },
  ];

  const renderCarouselItem = ({item}) => (
    <View style={styles.slideCarousel}>
      <Image style={styles.imageCarousel} source={item.imageUrl} />
    </View>
  );

  const renderItem = ({item, index}) => {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="transparent"
          />
        }>
        <View style={styles.boxView}>
          <Text style={styles.heading}>
            {item.id}. {item.title}
          </Text>

          <Text style={{color: 'black', fontSize: 15}}>{item.body}</Text>

          {/* <TouchableOpacity
          onPress={() => showDeleteConfirmationModal(item.id)}
          style={styles.deleteView}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => showDeleteConfirmationModal(item.id)}>
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
                marginLeft: 200,
                marginTop: 10,
              }}>
              <Text style={styles.deleteText}>Delete</Text>
            </Neomorph>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.sectionContainer}>
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
          autoplayInterval={5000}
          onSnapToItem={index => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={carouselData.length}
          activeDotIndex={activeSlide}
          containerStyle={{top: -10}}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: 'black',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>

      <Modal isVisible={isModalVisible} style={styles.modalStyle}>
        <View style={styles.alertContainer}>
          <Text style={styles.sureStyle}>
            Do you want to delete your post ?
          </Text>

          <TouchableOpacity
            onPress={() => deletePost(postIdToDelete)}
            style={styles.deleteButton}>
            <Text>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hideModal} style={styles.cancelButton}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={isSuccessModalVisible} style={styles.modalStyle}>
        <View style={styles.successfullModel}>
          <Text style={styles.successfullyDeletedText}>
            Post deleted successfully! 👍
          </Text>

          <TouchableOpacity
            onPress={hideSuccesssModal}
            style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <SafeAreaView>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{marginBottom: 10}} />}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCarousel: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  boxView: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    textTransform: 'capitalize',
  },
  deleteView: {
    backgroundColor: 'lightblue',
    width: 120,
    height: 30,
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: 4,
  },
  deleteText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  modalStyle: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 90,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 90,
  },
  sureStyle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  successfullModel: {
    width: 250,
    height: 130,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  successfullyDeletedText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 90,
  },
  slide: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
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
});

export default Home;
