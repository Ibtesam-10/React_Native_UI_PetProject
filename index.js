/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './components/redux/store';
import {Provider} from 'react-redux';

import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background Notification', remoteMessage);
});

messaging().getInitialNotification(async remoteMessage => {
  console.log('Kill mode', remoteMessage);
});

const AppRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => AppRedux);
