export * from './actions'

const initialState={
  loading:false,
  logged:false,
  messages:{},userString:'none',
  user:null,initialWindow:'123',
  authSelector:1,
  initialRegion:{latitude:10.5217683,longitude:76.2048967,latitudeDelta :0.0922,longitudeDelta:0.0421},
   finalRegion:{latitude:10.5217683,longitude:76.2048967,latitudeDelta :0.0922,longitudeDelta:0.0421},
 destination:[]

}


 const session=(state=initialState,action)=>{
switch (action.type) {
 case 'loadingEnable':return {...state, loading:true}
 break;
 case 'loadingDisable':return {...state, loading:false}
 break;
 case 'loggingEnable':return { ...state,logged:true,}
 break;
 case 'loggingDisable':return {...state, logged:false}
 break;
 case 'getUser':return {...state, userString:action.userString}
 break;
 case 'saveUser':return {...state, user:true}
 break;
 case 'userIdStore':return {...state, userID:action.payload}
 break;
 case 'toForgotPassword':return {...state, authSelector:2}
 break;
 case 'toSignup':return {...state, authSelector:3}
 break;
 case 'toAuth':return {...state, authSelector:1}
 break;
 case 'logoutUser':return initialState
 break;
 case 'mapDataFetch':return {...state , initialRegion:action.initialRegion,destination:action.destination,finalRegion:action.finalRegion}
 break;
//  case 'clearMapData':return {...state ,
//    initialRegion:{latitude:10.5217683,longitude:76.2048967,latitudeDelta :0.0922,longitudeDelta:0.0421},
//     finalRegion:{latitude:10.5217683,longitude:76.2048967,latitudeDelta :0.0922,longitudeDelta:0.0421},
//     destination:[{latitude:10.5217683,longitude:76.2048967}]
// }
//  break;
 default: return state;

}
}

export default session
