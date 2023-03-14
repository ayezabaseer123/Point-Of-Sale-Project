import { AnyAction } from "redux";
import { GET_EMPLOYEES } from "./actions";
import { DELETE_EMPLOYEES } from "./actions";
import { UPDATE_EMPLOYEES } from "./actions";
export interface EmployeeEvent {
  employeesList: {
    _id: string;
    username: string;
    salary: number;
    email: string;
    address: string;
    contactNo: string;
    salaryStatus: string;
  }[];
}
const initialState: EmployeeEvent = {
  employeesList: [],
};

const employeeReducer = (
  state: EmployeeEvent = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case "Add_Employee": {
      return {
        ...state,
        employeesList: [...state.employeesList, action.payload],
      };
    }
    case GET_EMPLOYEES: {
      return { ...state, employeesList: action.payload };
    }

    case DELETE_EMPLOYEES:
      return {
        ...state,
        employeesList: state.employeesList.filter(
          (item) => item._id != action.payload
        ),
      };

    case UPDATE_EMPLOYEES: {
      return {
        ...state,
        employeesList: state.employeesList.map(
          (employee: {
            _id: string;
            username: string;
            salary: number;
            email: string;
            address: string;
            contactNo: string;
            salaryStatus: string;
          }) =>
            employee._id === action.payload._id ? action.payload.values : employee
        ),
      };
    }
    default:
      return state;
  }
};

export default employeeReducer;
