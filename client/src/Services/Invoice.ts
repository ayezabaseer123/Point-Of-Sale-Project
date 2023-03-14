import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export  const CreateInvoice=async(values:Record<string,any>,adminToken:string)=>{
    try{
        let invoicePost=await axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/invoice/create`,
            data: values,
            headers: { authorization: `Bearer ${adminToken}` }
          })
        return invoicePost
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}

export  const GetAllInvoice=async(adminId:string,adminToken:string)=>{
    try{
        let invoiceGet=await axios({
            method: "get",
            url: `${process.env.REACT_APP_URL}/invoice/getAll/${adminId}`,
            headers: { authorization: `Bearer ${adminToken}` }
            })
        return invoiceGet
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}