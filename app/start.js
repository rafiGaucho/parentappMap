import React ,{Component} from 'react';
import {connect} from 'react-redux';
import Auth from './Auth'
import {
  View,
  StyleSheet,AsyncStorage
} from 'react-native';
import Home from './Home';
import PreAuth from './Auth/start.js';
import {getUser,saveUser} from './store/session/actions.js'
import firebase from 'react-native-firebase';




class Start extends Component{
  constructor(props) {
    super(props);
    this.state={}
  }

componentDidMount(){
  firebase.crashlytics();
}
render(){

    if(this.props.logged == true||this.props.user =='true')
      {  return(
        <Home />
      )       }
    else {
      return(<PreAuth /> ) }

    }
   }



mapDispatchToProps={
  getUser:getUser
}
mapStateToProps=(state)=>({
  logged:state.logged,useR :state.user ,userString:state.userString
})

export default connect(mapStateToProps,mapDispatchToProps)(Start)
