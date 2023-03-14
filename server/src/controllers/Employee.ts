import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import Employee from "../models/Employees";
import { STATUS_CODES, ERROR_MESSAGES } from "../constants";

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  const { adminId, username, email,salary,contactNo,address,salaryStatus} = req.body;

  Employee.findOne({ email ,adminId}).exec((err, employee) => 
  {
    if (err) {
      console.log(err,"error");
    }
    if (employee) {
      return res
        .status(STATUS_CODES.CONFLICT_ERROR)
        .json({ message: ERROR_MESSAGES.USER_ALREADY_EXIST });
    }
    if(!employee){
   
        const employeeToCreate = new Employee({
          _id: new mongoose.Types.ObjectId(),
          adminId,
          username,
          email,
          salary,
          contactNo,
          address,
          salaryStatus
        });
    
        employeeToCreate.save((err) => {
          if (err) {
            return res.status(STATUS_CODES.BADREQUEST_ERROR).json({ err });
          }
          return res.status(STATUS_CODES.CREATED).json( employeeToCreate );
        });
      }
    })
  }


  const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
       const adminId=req.params.id
    try {
        const data = await Employee.find({ adminId: adminId });
        if (data.length === 0) {
            return res
            .status(STATUS_CODES.NO_CONTENT)
            .json({  message: ERROR_MESSAGES.USER_NOT_FOUND});
         
        } else {
            return res.status(STATUS_CODES.OK).json(data);
         
        }
      } catch (err) {
        console.log(err);
      }
    }

    const editEmployees = async (req: Request, res: Response, next: NextFunction) => {
       
        try {
            const id = req.params.id;
            const updatedData = req.body;
           
            const options = { new: true };
        
            const result = await Employee.findByIdAndUpdate(id, updatedData, options);
            console.log(result);
            res.send(result);
          } catch (err) {
            return res
            .status(STATUS_CODES.BADREQUEST_ERROR)
            .json({err});
          
          }
     }


     const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            console.log(id)
            const data = await Employee.findByIdAndDelete(id);
            res.send(`Document has been deleted..`);
          } catch (error) {
            return res
            .status(STATUS_CODES.BADREQUEST_ERROR)
            .json({error});
          }
       
     }

  export default {createEmployee,getAllEmployees,editEmployees,deleteEmployee};