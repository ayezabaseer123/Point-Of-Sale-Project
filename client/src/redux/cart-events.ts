import { AnyAction } from "redux";
import { GET_CART } from "./cart-action";
import { ADD_CART } from "./cart-action";
import { UPDATE_CART } from "./cart-action";
import { EMPTY_CART,DELETE_CART } from "./cart-action";
export interface CartEvent {
  cartList: {
    _id: string;
    productId:string;
    adminId:string;
    productname: string;
    price: number;
    quanity: number;
    image: string;
    category: string;
    itemQuantity: number;
  }[];
}
const initialState: CartEvent = {
  cartList: [],
};

const cartReducer = (state: CartEvent = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_CART: {
      return { ...state, cartList: [...state.cartList, action.payload] };
    }
    case GET_CART: {
      return { ...state, cartList: action.payload };
    }

    case EMPTY_CART: {
      return { ...state, cartList: action.payload };
    }

    case DELETE_CART: 
      return {
        ...state,
        cartList: state.cartList?.filter(
          (item) => item._id != action.payload
        ),
      };


    case UPDATE_CART: {
      return {
        ...state,
        cartList: state.cartList.map(
          (cartItem: {
            _id: string;
            productname: string;
            price: number;
            quanity: number;
            image: string;
            category: string;
            itemQuantity: number;
          }) =>
            cartItem._id === action.payload._id
              ? { ...cartItem, itemQuantity: action.payload.itemQuantity ,quantity: action.payload.quantity}
              : cartItem
        ),
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
