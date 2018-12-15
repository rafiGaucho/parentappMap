import React, { Component } from 'react';
import {
  View,
  StyleSheet,Text
} from 'react-native';
import {connect} from 'react-redux';
import Auth from './index.js'
import PasswordForgot from './Password'
import Signup from './Signup'

class PreAuth extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.authSelector === 1){return <Auth />;}
    if(this.props.authSelector === 2){return <PasswordForgot />;}
    if(this.props.authSelector === 3){return <Signup />;}
  }
}
mapStateToProps=(state)=>({
  authSelector:state.authSelector
})
export default connect(mapStateToProps)(PreAuth)
