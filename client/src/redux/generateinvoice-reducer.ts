import { AnyAction } from "redux";
import { GENERATE_INVOICE } from "./invoice-actions";
import { ADD_INVOICE } from "./invoice-actions";

export interface InvoiceEvent {
  invoiceList: {
    _id: string;
    customerName: string;
    email: string;
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

const generateinvoiceReducer = (state: InvoiceEvent = initialState, action: AnyAction) => {
  switch (action.type) {
    case GENERATE_INVOICE : {
      return { ...state, invoiceList: [...state.invoiceList, action.payload] };
    }
   default:
      return state;
  }
};

export default generateinvoiceReducer;
