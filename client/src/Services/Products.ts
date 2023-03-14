import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export  const CreateProduct=async(values:Record<string,string|number>,adminToken:string)=>{
    try{
        let productPost=await axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/product/create`,
            data: values,
            headers: { authorization: `Bearer ${adminToken}`}
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

export  const GetAllProducts=async(adminId:string,adminToken:string)=>{
    try{
        let productGet=await axios({
            method: "get",
            url: `${process.env.REACT_APP_URL}/product/getAll/${adminId}`,
            headers: { authorization: `Bearer ${adminToken}`}
            })
        return productGet
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}

export  const EditProduct=async(values:Record<string,string|number>,adminToken:string)=>{

    try{
        let productPost=await axios({
            method: "patch",
            url: `${process.env.REACT_APP_URL}/product/update/${values._id}`,
            data: values,
            headers: { authorization: `Bearer ${adminToken}`}
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


export  const DeleteProduct=async(id:string,adminToken:string)=>{
    
    try{
        let productDelete=await axios({
            method: "delete",
            url: `${process.env.REACT_APP_URL}/product/delete/${id}`,
            headers: { authorization: `Bearer ${adminToken}`}
          })
        return productDelete
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}





