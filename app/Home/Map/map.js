import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView} from 'react-native';
import firebase from 'react-native-firebase';
import MapView ,{ Polyline,PROVIDER_GOOGLE ,Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import {mapDataFetch,clearMapData} from './../../store/session/actions.js';

 class Map extends Component<Props> {
// constructor(props) {
//   super(props);
// }
  state={isDataAvailable:true}
  componentDidMount (){
    this.setState({isDataAvailable:true})
    firebase.database().ref('SchoolBus/'+this.props.busCode+this.props.busId).orderByKey().on('value',(snapshot)=>{
      if(snapshot.exists()){
      const destination = []
      snapshot.forEach(item => {
       var val = item.val()
       var data={
         latitude:parseFloat(val.lat),
         longitude:parseFloat(val.lon)
       }
       destination.push(data)
      });
     var initialRegion={latitude:destination[0].latitude,longitude:destination[0].longitude,latitudeDelta :0.0922,longitudeDelta:0.0421}
     var finalRegion={latitude:destination[destination.length-1].latitude,longitude:destination[destination.length-1].longitude,latitudeDelta :0.0922,longitudeDelta:0.0421}
     this.props.mapDataFetch(initialRegion,destination,finalRegion)
   }
   else{
     // this.props.clearMapData()
     this.setState({isDataAvailable:false})
   }
    })
  }
  render() {
if(!this.state.isDataAvailable){
  return (
    <View style={{height:'100%',width:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'grey'}}>
      <Text style={{color:'black',fontSize:20,fontWeight:'400'}}>Bus Not Started </Text>
    </View>
  );
}
else {
  return (
      <View style={{height:'100%',width:'100%',marginHorizontal:'1%',marginVertical:'1%'}}>
        <MapView region={this.props.finalRegion} style={styles.map}
        mapType='standard'  minZoomLevel={15}  maxZoomLevel={18}  provider={PROVIDER_GOOGLE}>
           <Polyline coordinates={this.props.destination}
             strokeColor="red" strokeWidth={5} />
           <Marker coordinate={this.props.initialRegion} pinColor='red' />
           <Marker coordinate={this.props.finalRegion} pinColor='green' />
      </MapView>
    </View>
  );
}

  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
mapDispatchToProps={
  mapDataFetch:mapDataFetch,clearMapData:clearMapData
}
mapStateToProps=(state)=>({
  initialRegion:state.initialRegion,destination:state.destination,finalRegion:state.finalRegion
})

export default connect(mapStateToProps,mapDispatchToProps)(Map)
