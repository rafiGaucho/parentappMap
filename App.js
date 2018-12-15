import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView} from 'react-native';
import firebase from 'react-native-firebase';
import MapView ,{ Polyline,PROVIDER_GOOGLE ,Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import {mapDataFetch} from './../store/session/actions.js';


class Map extends Component<Props> {
constructor(props) {
  super(props);
//   this.state={data:'',destination:[{latitude:10.5217683,longitude:76.2048967}],
//   initialRegion:{latitude:10.5217683,longitude:76.2048967,latitudeDelta :0.0922,longitudeDelta:0.0421}
// }
}

  componentDidMount (){
    this.props.mapDataFetch(this.props.busId);
    console.warn(this.props.initialRegion);
    console.warn(this.props.finalRegion);
    console.warn(this.props.destination);
  }
  render() {
    // const initialRegion= {latitude:10.5217683,longitude:76.2048967,latitudeDelta :0.0922,longitudeDelta:0.0421}

    return (
      // <ScrollView contentContainerStyle={{height:'100%',width:'100%',backgroundColor:'grey'}}>

      <View style={{height:'98%',width:'98%',marginHorizontal:'1%',marginVertical:'1%'}}>
        <MapView initialRegion={this.props.initialRegion} style={styles.map}
              mapType='standard'  minZoomLevel={15}  maxZoomLevel={18}  provider={PROVIDER_GOOGLE}>
             <Polyline coordinates={this.props.destination}
               strokeColor="red" strokeWidth={5} />
             <Marker coordinate={this.props.initialRegion} pinColor='red' />
             <Marker coordinate={this.props.finalRegion} pinColor='green' />
        </MapView>
      </View>

    // </ScrollView>
  );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
mapDispatchToProps={
  mapDataFetch:mapDataFetch
}
mapStateToProps=(state)=>({
  initialRegion:state.initialRegion,destination:state.destination,finalRegion:state.finalRegion
})

export default connect(mapStateToProps,mapDispatchToProps)(Map)
