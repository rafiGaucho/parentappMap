import React, {PropTypes} from 'react';
import {
  View,Dimensions,TouchableWithoutFeedback,
  StyleSheet,Text,ScrollView
} from 'react-native';
import {Button,Icon} from 'native-base';
import MapComponent from './map'
import Hr from "react-native-hr-component";

const widthScreen= Dimensions.get('window').width/18;
const heightScreen= Dimensions.get('window').height/26;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state={selectionArray:[]}
  }

componentDidMount(){
  selectionArray=[];
  this.props.busRouteId.map((item,index)=>{
    selectionArray.push(false)
  })
}

selectRoute=(index)=>{
  let val=[];
  this.state.selectionArray.map((item,i)=>{
    val[i]=false
  })
  val[index]=!this.state.selectionArray[index];
  this.setState({selectionArray:val})
}
  render() {
      return (
      <View style={{flex:1}}>

       <View style={{flex:1.8,backgroundColor:'#40407a',flexDirection:'row',alignItems:'center'}}>
           <View style={{marginLeft:'1%'}}>
             <Button transparent  style={{}} onPress={this.props.handleBackButton}><Icon name='chevron-left' type='Feather' style={{color:'white',fontSize:33}}/></Button>
           </View>
           <Text style={{color:'white',fontSize:20,fontWeight:'600'}}>Bus</Text>
       </View>


       <View style={{flex:13,backgroundColor:'white'}}>
         <ScrollView contentContainerStyle={{}}>
           {
             this.props.busRouteId.map((item,index)=>{
               return (
                 <View style={{width:'100%'}} key={index}>
                   <TouchableWithoutFeedback onPress={()=>this.selectRoute(index)}>
                     <View style={{height:heightScreen*3.5,width:'100%',alignItems:'center',
                      flexDirection:'row',justifyContent:'space-between'}}>

                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                      <View style={{height:heightScreen*2.8,width:heightScreen*2.8,borderRadius:heightScreen*1.4,
                          backgroundColor:'#f1c40f',alignItems:'center',marginLeft:'2%',justifyContent:'center'}}>
                          <Text style={{fontSize:14,fontWeight:'600',color:'black'}}>ROUTE</Text>
                        <Text style={{fontSize:18,fontWeight:'600',color:'black'}}>{this.props.busRouteCode[index]}</Text>
                      </View>
                      <View style={{alignItems:'flex-start',marginLeft:'5%',justifyContent:'center'}}>
                        <Text style={{fontSize:15,fontWeight:'400',color:'black'}}>{this.props.busRoute[index]}</Text>
                      </View>
                    </View>

                    <View style={{alignItems:'center',justifyContent:'center',marginRight:'3%'}}>
                      <Icon name={this.state.selectionArray[index]? 'chevron-up':'chevron-down'} type='Feather' style={{color:'grey',fontSize:33}}/>
                    </View>
                 </View>
                   </TouchableWithoutFeedback>
                   {!this.state.selectionArray[index] ?
                   <Hr lineColor="grey" textPadding={0.001} thickness={0.5} hrStyles={{width:'90%',marginHorizontal:'5%'}}/>
                   :null }
                   {this.state.selectionArray[index] ?
                     <View style={{height:heightScreen*9,width:'100%'}}>
                       <MapComponent busId={item} busCode={this.props.busRouteCode[index]}/>
                     </View>
                   : null }
                 </View>
               );
             })
           }
         </ScrollView>

       </View>



   </View>

    );
  }
}
