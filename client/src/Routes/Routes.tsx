import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../Pages/Home";
import Sales from "../Pages/Sales";
import Employees from "../Pages/Employees";
import Products from "../Pages/Products";
import Invoices from "../Pages/Invoices";
import AddEmployees from "../Pages/AddEmployees";
import AddProducts from "../Pages/AddProducts";
import CustomerInvoice from "../Pages/CustomerInvoice";
import Cart from "../Pages/Cart";

function RoutesToPages() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Navigate to="/" />} />
        {/* <Route path='/signup' element={<SignUp/>}/> */}
        <Route path="/sales" element={<Sales />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/products" element={<Products />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/addEmployees" element={<AddEmployees />} />
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/customer/invoice" element={<CustomerInvoice />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default RoutesToPages;
