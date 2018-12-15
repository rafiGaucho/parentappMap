import React, { Component } from 'react';
import {
  View,
  StyleSheet,Text
} from 'react-native';
import {connect} from 'react-redux';

class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Signup</Text>
      </View>
    );
  }
}
mapStateToProps=(state)=>({
  authSelector:state.authSelector
})
export default connect(mapStateToProps)(Signup)
