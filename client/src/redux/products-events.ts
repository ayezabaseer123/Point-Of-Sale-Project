import { AnyAction } from "redux";
import {GET_PRODUCTS} from './products-action'
import {ADD_PRODUCTS} from './products-action'

export interface ProductEvent {
  productsList: {
  id:number, 
  productname:string,
  price:number,
  quanity:number,
  image:string,
  category:string
  
 
  }[];
}
const initialState:ProductEvent  = {
  productsList: [ ]
  
};

const productsReducer = (state: ProductEvent =initialState, action: AnyAction) => {
  switch (action.type) {
    
    case GET_PRODUCTS:{
      return {...state,productsList:action.payload}
    }
    default:
      return state;
  }
};

export default productsReducer;
