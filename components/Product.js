import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {useDispatch, useSelector} from 'react-redux';
import {add, remove} from './redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

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

const Product = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const item = props.item;
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.reducer);
  const [isAdded, setisAdded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      const userSession = await AsyncStorage.getItem('userSession');
      if (!userSession) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error checking user session:', error);
    }
  };

  const handleAdd = item => {
    dispatch(add(item));
  };

  const handleremoveCart = item => {
    dispatch(remove(item.name));
  };

  useEffect(() => {
    // if (cartItems && cartItems.length) {   // when only show add && remove button
    //   cartItems.forEach(element => {
    //     if (element.name === item.name) {
    //       setisAdded(true)

    //     }

    //   });
    // }

    let result = cartItems?.filter(element => {
      return element?.name === item.name;
    });
    if (result.length) {
      setisAdded(true);
    } else {
      setisAdded(false);
    }
  }, [cartItems]);

  const [count, setCount] = useState(0);

  const [data, setData] = useState(100);

  const [show, setShow] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const displayLoader = () => {
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  };

  // //for count component did mount
  //   useEffect(() => {
  //     console.warn(count,"Componenet did mount ");

  //   }, [count])  //for Componenet did mount

  // //for data componentdidUpdate
  //   useEffect(() => {
  //     console.warn(data,"Componenet did udpate");

  //   }, [data ]) //for Componenet did udpate call in aempty array when state change then run

  return (
    <View
      style={{
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        padding: 10,
        marginBottom: 50,
      }}>
      <ActivityIndicator size="medium" color={'blue'} animating={showLoader} />

      <Text style={{fontSize: 30, color: 'black'}}>{item.name}</Text>
      <Text style={{fontSize: 25, color: 'black'}}>{item.color}</Text>
      <Text style={{fontSize: 25, color: 'black'}}>{item.price}</Text>

      <Text style={{fontSize: 25, color: 'black'}}>{count}</Text>
      <Button title="Update Count" onPress={() => setCount(count + 1)()} />

      {/* <Button title='Loader' onPress={() => displayLoader()} /> */}

      <Text style={{fontSize: 25, color: 'black'}}>{data}</Text>

      <Button
        title="Data"
        onPress={() => {
          setData(data + 1);
        }}
      />
      <UserProps info={{data, count}} />

      <Button title="Toggle" onPress={() => setShow(!show)} />

      {show ? <Student /> : null}

      <Image style={{width: 150, height: 150}} source={{uri: item.image}} />
      {isAdded ? (
        <TouchableOpacity
          onPress={() => handleremoveCart(item)}
          style={{
            backgroundColor: 'lightblue',
            width: 100,
            height: 25,
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Remove
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => handleAdd(item)}
          style={{
            backgroundColor: 'lightblue',
            width: 100,
            height: 25,
            marginTop: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Add
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

//make Component
const UserProps = props => {
  // useEffect(() => {
  //   console.warn("run this code when data prop is updated");

  // }, [ props.info.data])

  // useEffect(() => {
  //   console.warn("run this code when cunt prop is updated");

  // }, [ props.info.count])

  return (
    <View
      style={{
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        padding: 10,
        marginBottom: 50,
      }}>
      <Text style={{fontSize: 25, color: 'red'}}>data:{props.info.data}</Text>
      <Text style={{fontSize: 25, color: 'red'}}>count:{props.info.count}</Text>
    </View>
  );
};

//make Component unmount means show or not show
const Student = () => {
  let timer = setInterval(() => {
    console.warn('TIMER');
  }, 2000);

  useEffect(() => {
    return () => clearInterval(timer);
  });

  return (
    <View
      style={{
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        padding: 10,
        marginBottom: 50,
      }}>
      <Text style={{fontSize: 25, color: 'green'}}>Unmount Componenet</Text>
    </View>
  );
};

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
});

export default Product;
