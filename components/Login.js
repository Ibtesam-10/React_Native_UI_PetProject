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
  Platform,
} from 'react-native';

import {login, eye, eyeIcon} from '../src/assets/images';
import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Neomorph} from 'react-native-neomorph-shadows';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import ErrorIcon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [isApplePressed, setIsApplePressed] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const myIcon = <Icon name="chevron-left" size={25} />;

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await auth().GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setIsPressed(false);
      setIsApplePressed(false);
    }, 1200);
  };
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     scopes: ['profile', 'email'],
  //     webClientId:
  //       '1099321872447-gqvrk0h8i5h5ouekkkba6smesvu8bv1c.apps.googleusercontent.com',
  //   });
  // }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1099321872447-gqvrk0h8i5h5ouekkkba6smesvu8bv1c.apps.googleusercontent.com',
    });
  }, []);

  const loggedIN = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await auth().GoogleSignin?.signIn();
      setUserInfo(idToken);
      console.log('Id Token=>>>>>>>>>>>>', idToken);
    } catch (error) {
      console.log('Error=>>>>>>', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     this.setState({userInfo});
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       // '1099321872447-gqvrk0h8i5h5ouekkkba6smesvu8bv1c.apps.googleusercontent.com', //google

  //       '1099321872447-pk1206646tcpaqg0vt8i31i0fn363e3n.apps.googleusercontent.com', //playconsole

  //     // ' 1099321872447-tootemei1akfvif4gdpd2ahn6p26kmnh.apps.googleusercontent.com',   //oAuth
  //   });
  // }, []);

  useEffect(() => {
    checkUserSession();
  }, []);

  const GoogleLogin = async () => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      webClientId:
        '1099321872447-gqvrk0h8i5h5ouekkkba6smesvu8bv1c.apps.googleusercontent.com',
      offlineAccess: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const {idTokens} = await GoogleSignin.signIn();
      setUserInfo(idTokens);
      console.log('UserToken=>>>>>>', idTokens);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

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
          setEmailError('Provided credentials are invalid');
          Alert.alert('Provided credentials are invalid');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Account not created regarding this email');
          setEmailError('Sorry, we don’t recognize this email.');
        } else {
          setEmailError('Add your credentials');
        }
      });
  };
  const registerAccount = () => {
    setTimeout(() => {
      navigation.navigate('Register');
    }, 2000);
    setIsPressed(!isPressed);
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken, user} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // setUserInfo(userInfo);
      console.log('IdToken=>>', idToken);
      Alert.alert('User Logged In');
      saveUserSession();
      navigation.navigate('BottomTab');
      // navigation.navigate('HomeUI', {user});

      console.log('User=>>>>>>>', user);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  async function onAppleLogin() {
    // performs login request

    const {authRes, identityToken} = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,

      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    const appleauthCredentials =
      auth.AppleAuthProvider.credential(identityToken);
    console.log('identityToken=>>>>', identityToken);
    console.log('authRes=>>>>', authRes);

    await auth().signInWithCredential(appleauthCredentials);
  }

  const appleLogin = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,

      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );
    console.log('Identity Token=>>>>>>>', identityToken);
    console.log('nonce=>>>>>>>', nonce);

    navigation.navigate('BottomTab');

    setIsApplePressed(!isApplePressed);
    return auth().signInWithCredential(appleCredential);
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };
  const renderAppleButton = () => {
    if (Platform.OS === 'ios') {
      return (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160,
            height: 45,
          }}
          onPress={() => {
            // onAppleLogin();
            // onAppleButtonPress();
          }}
        />
      );
    }
    return null;
  };

  async function facebookLogin() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    console.log('result=>>>', result);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    console.log('facebookCredential=>>>>>', facebookCredential);

    navigation.navigate('BottomTab');
    return auth().signInWithCredential(facebookCredential);
  }

  // async function onFacebookButtonPress() {
  //   const nonce = '123456';
  //   const nonceSha256 = await sha256(nonce);
  //   const result = await LoginManager.logInWithPermissions(
  //     ['public_profile', 'email'],
  //     'limited',
  //     nonceSha256,
  //   );

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }
  //   const data = await AuthenticationToken.getAuthenticationTokenIOS();

  //   if (!data) {
  //     throw 'Something went wrong obtaining authentication token';
  //   }
  //   const facebookCredential = auth.FacebookAuthProvider.credential(
  //     data.authenticationToken,
  //     nonce,
  //   );
  //   return auth().signInWithCredential(facebookCredential);
  // }
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

        <View
          style={[
            styles.emailContainer,
            {borderColor: emailError ? 'red' : 'black'},
          ]}>
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor={'black'}
            value={email}
            style={{color: 'black'}}
            onChangeText={txt => setEmail(txt)}
          />
          {emailError && (
            <ErrorIcon
              name="error-outline"
              size={20}
              color="red"
              style={styles.outlineIcon}
            />
          )}
        </View>
        {emailError ? (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              alignSelf: 'flex-start',
            }}>
            <Text
              style={{
                color: 'red',
                alignContent: 'center',
                justifyContent: 'center',
                marginLeft: 17,
              }}>
              {emailError}
            </Text>
          </View>
        ) : null}

        {/* <View style={styles.emailContainer}>
          <TextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={txt => setEmail(txt)}
            style={{
              width: '90%',
              height: 55,
              borderWidth: 0.5,
              borderRadius: 20,
              borderColor: emailError ? 'red' : 'gray',
            }}
          />
          {emailError && (
            <ErrorIcon
              name="error-outline"
              size={20}
              color="red"
              style={{marginLeft: 5}}
            />
          )}
        </View>
        {emailError ? (
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text style={{color: 'red', marginRight: 5}}>{emailError}</Text>
          </View>
        ) : null} */}
        {/* <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={txt => setEmail(txt)}
          style={{
            width: '90%',
            height: 55,
            borderWidth: 0.5,
            borderRadius: 20,
            paddingLeft: 20,
            borderColor: emailError ? 'red' : 'black',
          }}
        />
        {emailError ? (
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text style={{color: 'red', marginRight: 5}}>{emailError}</Text>
            <ErrorIcon name="error-outline" size={20} color="red" />
          </View>
        ) : null} */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor={'black'}
            value={password}
            onChangeText={txt => setPassword(txt)}
            secureTextEntry={hidePassword}
            style={{color: 'black'}}
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
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            // onGoogleButtonPress();
            // loggedIN();
            signIn();
            // GoogleLogin();
            console.log('Google Signin');
          }}
        />
        <TouchableOpacity
          onPress={() => {
            facebookLogin();
          }}
          style={{
            width: '90%',
            height: 50,
            borderRadius: 20,
            backgroundColor: 'blue',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white'}}> Facebook </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={appleLogin}>
          <Neomorph
            inner={isApplePressed}
            swapShadows={isApplePressed}
            style={{
              shadowRadius: 5,
              borderRadius: 20,
              color: 'red',
              backgroundColor: 'black',
              width: 300,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: '#fff', fontSize: 15}}>
              Sign in with Apple
            </Text>
          </Neomorph>
        </TouchableOpacity>
        {/* <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160,
            height: 45,
          }}
          onPress={() => {
            appleLogin();
          }}
        /> */}

        {/* {userInfo != null && (
          <Text style={{marginTop: 30}}>{userInfo?.user?.email}</Text>
        )}
        {userInfo != null && <Text>{userInfo?.user?.name}</Text>}

        {userInfo != null && (
          <Image
            source={{uri: userInfo?.user?.photo}}
            style={{width: 100, height: 100, resizeMode: 'cover'}}
          />
        )}

        {userInfo == null ? (
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {
              // onGoogleButtonPress();
              // loggedIN();
              signIn();
              // GoogleLogin();
              console.log('Google Signin');
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              signOut();
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
            <Text style={{color: 'white'}}> SignOut </Text>
          </TouchableOpacity>
        )} */}
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
  outlineIcon: {
    width: 20,
    height: 20,
    marginTop: 15,
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
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    height: 55,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingLeft: 20,
  },
});
export default Login;
