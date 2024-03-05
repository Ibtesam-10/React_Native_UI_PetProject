/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';

import {login, eye, eyeIcon} from '../src/assets/images';
import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Neomorph} from 'react-native-neomorph-shadows';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const myIcon = <Icon name="chevron-left" size={25} />;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setIsPressed(false);
    }, 1200);
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        navigation.navigate('HomeUI');
      }
    } catch (error) {
      console.error('Error checking user session:', error);
    }
  };

  const saveUserSession = async () => {
    try {
      await AsyncStorage.setItem('userSession', 'true');
    } catch (error) {
      console.error('Error saving user session:', error);
    }
  };
  const userLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(JSON.stringify(res));
        Alert.alert('User Logged In');
        saveUserSession();
        // navigation.navigate('HomeUI');
        navigation.navigate('BottomTab');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert('Provided credentials is invalid');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Account not created');
        }

        console.error(error);
      });
  };
  const registerAccount = () => {
    setTimeout(() => {
      navigation.navigate('Register');
    }, 2000);
    setIsPressed(!isPressed);
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={login} style={styles.itemImage} />

        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={txt => setEmail(txt)}
          style={{
            width: '90%',
            height: 55,
            borderWidth: 0.5,
            borderRadius: 20,
            paddingLeft: 20,
          }}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter Password"
            value={password}
            onChangeText={txt => setPassword(txt)}
            secureTextEntry={hidePassword}
            style={styles.passwordInput}
          />

          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.toggleButton}>
            <Image
              source={hidePassword ? eyeIcon : eye}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            userLogin();
          }}
          style={{
            width: '90%',
            height: 50,
            borderRadius: 20,
            backgroundColor: 'blue',
            marginTop: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white'}}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={registerAccount}>
          <Neomorph
            inner={isPressed}
            swapShadows={isPressed}
            style={{
              shadowRadius: 5,
              borderRadius: 20,
              color: 'rgba(89, 38, 209, 0.8)',
              backgroundColor: 'white',
              width: 300,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: 'rgba(89, 38, 209, 0.8)', fontSize: 15}}>
              Create an Account
            </Text>
          </Neomorph>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
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
    width: screenWidth * 1.2,
    height: screenWidth * 0.7,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  toggleButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginRight: 10,
    resizeMode: 'contain',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    height: 55,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingLeft: 20,
    marginTop: 20,
  },
});
export default Login;
