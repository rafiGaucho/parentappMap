import React, { Component } from 'react';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import Start from './start.js'
import PreStart from './preStart.js'
import session from './store/session/reducer.js'
import {View,Text,AsyncStorage,PermissionsAndroid,BackHandler} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import firebase from 'react-native-firebase';
import {schoolCode} from './schoolCode.js'
import type { Notification, NotificationOpen } from 'react-native-firebase';

const middleware = [thunk]
export const store=createStore(session,applyMiddleware(...middleware))


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={user:'none',token:null}
  }

  async componentDidMount() {
    SplashScreen.hide();
    this.requestLocalPermission();
    this.checkPermission();
    this.createNotificationListeners();
  }
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
  async  requestLocalPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],

    )
    const x=Object.keys(granted)

    if (granted[x[0]] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      BackHandler.exitApp();
    } else if((granted[x[0]] === PermissionsAndroid.RESULTS.DENIED)) {
      this.requestLocalPermission();
    }
  } catch (err) {
    console.warn(err)
  }


  }

  async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
  }

  async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  this.setState({token:fcmToken})
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
  }

  async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      this.getToken();
  } catch (error) {
      console.warn('permission rejected');
  }
  }


  async createNotificationListeners() {
  this.notificationListener = firebase.notifications().onNotification((notification:notification) => {
    notification.setSound('default')
        .android.setChannelId('test-channel')
        .android.setSmallIcon('ic_launcher');
    firebase.notifications()
        .displayNotification(notification);
        firebase.notifications().removeDeliveredNotification(notification.notificationId);
  });


  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen:NotificationOpen) => {
    const notification: Notification = notificationOpen.notification;
   firebase.notifications().removeDeliveredNotification(notification.notificationId);
   });

  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
    }

  this.messageListener = firebase.messaging().onMessage((message) => {
    console.warn(JSON.stringify(message));
  });
  }

componentWillMount(){
  this.getUserId()
}
 getUserId = async () => {
  let userId = '';
  let user='';
  try {
    user = await AsyncStorage.getItem('success') || 'none';
    // userId = await AsyncStorage.getItem('userID') ;
    this.setState({user:user});
  } catch (error) {
    // Error retrieving data
    console.warn(error.message);
  }

}

  render() {
    return (
     <Provider store={store}>
       <PreStart user={this.state.user}/>
     </Provider>

    );
  }
}
