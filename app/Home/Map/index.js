import React, {PropTypes} from 'react';
import {
  View,Dimensions,
  StyleSheet,Text
} from 'react-native';
import {Button,Icon} from 'native-base';

const widthScreen= Dimensions.get('window').width/18;
const heightScreen= Dimensions.get('window').height/26;

export default class Map extends React.Component {

  handleBackButton=()=>{alert('kooi')}
  render() {
      return (
      <View style={{flex:1}}>

       <View style={{flex:1.8,backgroundColor:'#40407a',flexDirection:'row',alignItems:'center'}}>
           <View style={{marginLeft:'1%'}}>
             <Button transparent  style={{}} onPress={this.props.handleBackButton}><Icon name='chevron-left' type='Feather' style={{color:'white',fontSize:33}}/></Button>
           </View>
           <Text style={{color:'white',fontSize:20,fontWeight:'600'}}>Bus</Text>
       </View>


       <View style={{flex:13,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
         
       </View>



   </View>

    );
  }
}
