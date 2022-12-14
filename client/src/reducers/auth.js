import {AUTH, LOGOUT} from "../constants/actionTypes";


const  authReducer =(state={authData:null},action) =>{
    switch(action.type){
       case AUTH:  //if auth
       console.log(action?.data)
       localStorage.setItem('Profile', JSON.stringify({...action?.data}));
       return { ...state, authData: action?.data};
       case LOGOUT:
        localStorage.clear();
        return { ...state, authData:null};
       default:
       return state;
    }
 }

export default authReducer;
 