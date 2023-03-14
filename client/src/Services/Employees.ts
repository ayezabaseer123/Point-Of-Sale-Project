import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export  const CreateEmployee=async(values:Record<string,string|number>,adminToken:string)=>{
   console.log(adminToken)
    try{
        console.log(adminToken,'toke')
        let employeePost=await axios({
            method: "post",
            url: `${process.env.REACT_APP_URL}/employee/create`,
            data: values,
            headers: { authorization: `Bearer ${adminToken}` }
          })
        
        return employeePost
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}

export  const GetAllEmployees=async(adminId:string,adminToken:string)=>{
    try{
        let employeeGet=await axios({
            method: "get",
            url: `${process.env.REACT_APP_URL}/employee/getAll/${adminId}`,
            headers: { authorization: `Bearer ${adminToken}` }
            })
        return employeeGet
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}

export  const EditEmployee=async(values:Record<string,string|number>,adminToken:string)=>{

    try{
        let employeePost=await axios({
            method: "patch",
            url: `${process.env.REACT_APP_URL}/employee/update/${values._id}`,
           
            data: values,
            headers: { authorization: `Bearer ${adminToken}` }
          })
        return employeePost
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }


}


export  const DeleteEmployee=async(id:string,adminToken:string)=>{
    
    try{
        let employeeDelete=await axios({
            method: "delete",
            url: `${process.env.REACT_APP_URL}/employee/delete/${id}`,
            headers: { authorization: `Bearer ${adminToken}` }
          })
        return employeeDelete
    }
    catch(err:any){
        console.log(err.response.data.message,"error")
        toast.error(`${err?.response?.data?.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
    }

}





