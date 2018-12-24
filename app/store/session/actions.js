import {View,StyleSheet,Alert,TouchableOpacity,TextInput,Text,AsyncStorage} from 'react-native';
import firebase from 'react-native-firebase';
import {schoolCode} from './../../schoolCode.js'

export const userLogin=(data1,data2)=>{
return (dispatch)=>{
      dispatch({type:'loggingEnable'});
      firebase.database().ref('users').child(schoolCode).child(data1.parent.id).set({token:data2})
    }
  }


export const getUser = (userId) => {
  return (dispatch) => {
        dispatch({type:'getUser',userString:userId})
}}

export const saveUser = (data,busRouteId) => {
  return (dispatch) => {
        saveUserId(data,busRouteId)
        dispatch({type:'saveUser',userString:data})
        // alert(data.message)
}}
export const logoutUser = () => {
  return (dispatch) => {
        dispatch({type:'logoutUser',})
        removeItemValue('success');
        removeItemValue('userID');
}}





getUserId = async () => {
 let userId = '';
 try {
   userId = await AsyncStorage.getItem('success') || 'none';
   return userId;
 } catch (error) {
   // Error retrieving data
   console.warn(error.message);
 }

}

const saveUserId = (data,busRouteId) => {
      AsyncStorage.setItem('busRouteId', JSON.stringify(busRouteId));
     AsyncStorage.setItem('success', JSON.stringify(data.success));
     AsyncStorage.setItem('userID',JSON.stringify(data.parent.id));
};
const removeItemValue= async key => {
   try {
     await AsyncStorage.removeItem(key);
     return true;
   }
   catch(exception) {
     return false;
   }
 }


export const mapFlagFetch=()=>{
  return (dispatch) => {
    firebase.database().ref('mapMode/'+schoolCode+'/'+this.state.userID).on('value',(snapshot)=>{
    // var value = snapshot.val();
   // this.setState({mode:value})
   console.warn(snapshot.val());
   dispatch({type:'mapFlagFetch',payload:snapshot.val()})
     })
  }
}
export const userIdStore=(userId)=>{
return (dispatch)=>{
  dispatch({type:"userIdStore",payload:userId})
}
}
///////////////////////////////////////////

export const toForgotPassword=()=>{
return (dispatch)=>{
      dispatch({type:'toForgotPassword'});
    }
  }
export const toSignup=()=>{
  return (dispatch)=>{
        dispatch({type:'toSignup'});
      }
    }
    export const toAuth=()=>{
      return (dispatch)=>{
            dispatch({type:'toAuth'});
          }
        }


/////////////////////////////////////////
export const mapDataFetch=(initialRegion,destination,finalRegion)=>{
  return (dispatch)=>{
     dispatch({type:'mapDataFetch',initialRegion:initialRegion,destination:destination,finalRegion:finalRegion})
    }
}
export const clearMapData=()=>{
  return (dispatch)=>{
    dispatch({type:'clearMapData'})
  };
}
