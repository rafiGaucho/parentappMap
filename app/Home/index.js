import React, {PropTypes} from 'react';
import {
  View,ActivityIndicator,ImageBackground,
  StyleSheet,WebView,AsyncStorage,BackHandler,TouchableOpacity,Text
} from 'react-native';
import PopupDialog,{slideAnimation} from 'react-native-popup-dialog';
import Hr from "react-native-hr-component";
import {userLogin,logoutUser,clearMapData} from './../store/session/actions.js'
import {connect} from 'react-redux';
import OfflineCacheWebView from 'react-native-offline-cache-webview';
import {schoolCode} from './../schoolCode.js'
import firebase from 'react-native-firebase';
import Map from './Map';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={isLoading:false,mode:false,firstTimeLogin:false}
  }
componentDidMount (){
  BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  this.getUserId().then(()=>{
    firebase.database().ref('mapMode/'+schoolCode+'/'+this.state.userID).on('value',(snapshot)=>{
      var value = snapshot.val();
      if(snapshot.exists()){
        this.setState({mode:value.mode})
      }
      })
    })
  }

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
getUserId = async () => {
  let userId = '';
  let busRouteId=[]; let busRouteCode=[]; let busRoute=[];
  try {
    userId = await AsyncStorage.getItem('userID') ;
    busRouteId = await AsyncStorage.getItem('busRouteId') ;
    busRouteCode = await AsyncStorage.getItem('busRouteCode') ;
    busRoute = await AsyncStorage.getItem('busRoute') ;
    this.setState({userID:userId,
      busRouteId:JSON.parse(busRouteId),
      busRouteCode:JSON.parse(busRouteCode),
      busRoute:JSON.parse(busRoute)});
    } catch (error) {
    console.warn(error.message);
    }
  }
handleBackPress = () => {
    this.popupDialog.show();
    return true;
  }
handleBackButton = () => {
    firebase.database().ref('mapMode/'+schoolCode+'/'+this.state.userID).child("mode").set(false);
    this.props.clearMapData()
  }
logout=()=>{
this.props.logoutUser();
BackHandler.exitApp();
}

exit=()=>{BackHandler.exitApp();}

cancel=()=>{  this.popupDialog.dismiss();}
handleError=()=>{
  return (
    <View style={{alignItems:'center',justifyContent:'center',height:'100%',width:'100%'}}>
      <Text style={{fontSize:18}}>unable to load .. check your network</Text>
    </View>
  );
}

loadStart=()=>{this.setState({isLoading:true})}
loadEnd=()=>{this.setState({isLoading:false})}

  render() {
    if(this.state.mode === true){
    return (
      <View style={{height:'100%',width:'100%'}}>
        <Map busRouteId={this.state.busRouteId}
           handleBackButton={this.handleBackButton}
          busRouteCode={this.state.busRouteCode}
          busRoute={this.state.busRoute}/>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
         dialogAnimation={slideAnimation} dismissOnTouchOutside={true}
         height={1} width={1} containerStyle={{}} dialogStyle={{}} >
         <ImageBackground source={require('./image.jpg')} style={{width: '100%', height: '100%',}} resizeMode='center' >

         <View style={{flex:1,borderTopLeftRadius:7,borderTopRightRadius:7,alignItems:'center',justifyContent:'center'}}>
           <MessagePopUp logout={this.logout} exit={this.exit} cancel={this.cancel}/>
         </View>
       </ImageBackground>
        </PopupDialog>

      </View>

      );
    }
    else if(this.state.mode === false) {
      return (
        <View style={{height:'100%',width:'100%'}}>

          {this.state.isLoading && <View style={{alignItems:'center',justifyContent:'flex-end',height:'100%',width:'100%',position:'absolute'}}>
              {/* <ActivityIndicator size="small"  /> */}
              <Text style={{fontSize:20,fontWeight:'bold',marginBottom:'10%'}}>fetching ...</Text>
          </View>}

             <WebView startInLoadingState={true}
                ref={webview_ref => this.webview = webview_ref}
                 onLoadStart={this.loadStart} onLoadEnd={this.loadEnd} onError={this.handleError}
                 source={{uri: 'https://parentapp-a4061.firebaseapp.com/'+this.state.userID+'/'+schoolCode}}
                 style={{flex:1}}
               />

               <PopupDialog
                 ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                dialogAnimation={slideAnimation} dismissOnTouchOutside={true}
                height={1} width={1} containerStyle={{}} dialogStyle={{}} >
                <ImageBackground source={require('./image.jpg')} style={{width: '100%', height: '100%',}} resizeMode='center' >

                <View style={{flex:1,borderTopLeftRadius:7,borderTopRightRadius:7,alignItems:'center',justifyContent:'center'}}>
                  <MessagePopUp logout={this.logout} exit={this.exit} cancel={this.cancel}/>
                </View>
              </ImageBackground>
               </PopupDialog>

        </View>
      );
    }
  }
}



const MessagePopUp=(props)=>{
  return (
    <View style={{height:'10%',width:'80%',backgroundColor:'#3742fa',borderRadius:5,flexDirection:'row'}}>
      {/* <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <TouchableOpacity onPress={props.logout}>
        <Text style={{color:'#e84118',fontWeight:'bold',fontSize:22}}>Logout</Text>
      </TouchableOpacity>
      </View>
      <Hr lineColor="#353b48" textPadding={0.001} hrStyles={{width:'88%',marginHorizontal:'6%'}}/> */}
      <View style={{flex:1,alignItems:'center',justifyContent:'center',borderRightWidth:1}}>
        <TouchableOpacity onPress={props.exit}>
          <Text style={{color:'white',fontWeight:'400',fontSize:22}}>Exit</Text>
        </TouchableOpacity>
      </View>
      {/* <Hr lineColor="#353b48" textPadding={0.001} hrStyles={{width:'88%',marginHorizontal:'6%'}}/> */}
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity onPress={props.cancel}>
          <Text style={{color:'white',fontWeight:'400',fontSize:22}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
mapDispatchToProps={
logoutUser:logoutUser,clearMapData:clearMapData
}

export default connect(null,mapDispatchToProps)(Home)
