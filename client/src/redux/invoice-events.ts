import { AnyAction } from "redux";
import { GET_INVOICE } from "./invoice-actions";
import { ADD_INVOICE } from "./invoice-actions";
import store from './store'



export interface InvoiceEvent {
  invoiceList: {
    _id: string;
    customerName: string;
    email: string;
    address: string;
    date: string;
    cartItem: {
      _id: string;
      productname: string;
      price: number;
      quanity: number;
      image: string;
      category: string;
      itemQuantity: number;
    }[];
  }[];
}
const initialState: InvoiceEvent = {
  invoiceList: [],
};

const invoiceReducer = (state: InvoiceEvent = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_INVOICE: {
      return { ...state, invoiceList: [...state.invoiceList, action.payload] };
    }
    case GET_INVOICE: {
      return { ...state, invoiceList: action.payload };
    }

   

    default:
      return state;
  }
};

export default invoiceReducer;
