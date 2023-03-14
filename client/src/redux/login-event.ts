import { AnyAction } from "redux";
import {LOGIN_ADMIN} from './login-action'
import {LOGOUT_ADMIN} from './login-action'

export interface LoginEvent {
  login: {
  _id:string, 
  adminName:string,
  email:string,
  token:string
  };
}
const initialState:LoginEvent = {
  login:{
    _id:"",
    token:"",
    adminName:"",
    email:""
    

  }
  
};

const loginReducer = (state =initialState, action: AnyAction) => {
  switch (action.type) {
    case LOGIN_ADMIN:{
      return {...state,login:action.payload}
    }
    case LOGOUT_ADMIN:{
      return initialState
    }
    
    default:
        return state;
  
};
}

export default loginReducer;
