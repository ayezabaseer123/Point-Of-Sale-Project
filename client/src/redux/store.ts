import { combineReducers,createStore } from "redux";
import employeeReducer from "./employee-events";
import productsReducer from './products-events'
import  cartReducer from './cart-events'
import invoiceReducer from "./invoice-events";
import loginReducer from "./login-event"

import {composeWithDevTools} from 'redux-devtools-extension';

export const rootReducer = combineReducers({ loginEvent:loginReducer,employeeEvents: employeeReducer,productEvents:productsReducer ,cartEvents: cartReducer,invoiceEvents: invoiceReducer});


const store=createStore(rootReducer,composeWithDevTools());

export default store

