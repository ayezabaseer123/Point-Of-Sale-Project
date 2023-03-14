import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export  const CreateCart=async(values:Record<string,string|number>,adminToken:string)=>{
    try{
        let cartPost=await axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/cart/create`,
            data: values,
            headers: { authorization: `Bearer ${adminToken}` }

          })
        return cartPost
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}


export  const GetAllCart=async(adminId:string,adminToken:string)=>{
    try{
        let cartGet=await axios({
            method: "get",
            url: `${process.env.REACT_APP_URL}/cart/getAll/${adminId}`,
            headers: { authorization: `Bearer ${adminToken}`}
            })
        return cartGet
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}

export  const EditCart=async(values:Record<string,string|number>,adminToken:string)=>{

    try{
        let productPost=await axios({
            method: "patch",
            url: `${process.env.REACT_APP_URL}/cart/update/${values._id}`,
            data: values,
            headers: { authorization: `Bearer ${adminToken}` }
          })
        return productPost
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }


}



export  const DeleteCart=async(id:string,productId:string,adminToken:string)=>{
    
    try{
        let cartDelete=await axios({
            method: "delete",
            url: `${process.env.REACT_APP_URL}/cart/delete/${id}/product/${productId}`,
            headers: { authorization: `Bearer ${adminToken}` }
          })
        return cartDelete
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}

export  const EmptyCart=async(id:string,adminToken:string)=>{
    
    try{
        let cartDelete=await axios({
            method: "delete",
            url: `${process.env.REACT_APP_URL}/cart/empty/${id}`,
            headers: { authorization: `Bearer ${adminToken}` }
          })
        return cartDelete
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}