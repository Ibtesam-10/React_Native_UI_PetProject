/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';

import {signup} from '../src/assets/images';

const screenWidth = Dimensions.get('window').width;

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Account Created');
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Account already craeted with this email');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('This email address is an invalid!');
        }
        if (error.code === 'auth/weak-password') {
          Alert.alert('Password should be at least 6 characters');
        }

        console.error(error);
      });
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
        <Image source={signup} style={styles.itemImage} />
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
              source={hidePassword ? signup : signup}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            createUser();
          }}
          style={{
            width: '90%',
            height: 50,
            borderRadius: 20,
            backgroundColor: 'black',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white'}}> Create Account </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
            Already have an account
          </Text>
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
    height: screenWidth * 0.6,
    marginBottom: 20,
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

export default Register;
