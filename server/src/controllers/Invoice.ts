import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { STATUS_CODES, ERROR_MESSAGES } from "../constants";
import Invoice from "../models/Invoices";

const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
     Invoice.create(req.body)
     .then((result)=>{
      console.log(result)
      return res.status(STATUS_CODES.CREATED).json(result);
     })
     .catch((error)=>{
      return res.status(STATUS_CODES.BADREQUEST_ERROR).json({ error });
     })  
};

const getAllInvoice = async (req: Request, res: Response, next: NextFunction) => {
    const adminId=req.params.id
 try {
     const data = await Invoice.find({ adminId: adminId });
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





export default { createInvoice,getAllInvoice};
