import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export  const Register=async(values:Record<string,string>)=>{
    try{
        let userPost=await axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/admin/create`,
            data: values
          })
        return userPost
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}



export  const LoginAdmin=async(values:Record<string,string>)=>{
    try{
        let userPost=await axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/admin/login`,
            data: values
          })
        return userPost
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}