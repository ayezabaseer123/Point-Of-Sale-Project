import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Products";
import { STATUS_CODES, ERROR_MESSAGES } from "../constants";
const nodemailer = require("nodemailer");

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { _id,adminId, productname, image,quantity,price,category} = req.body;
if  (_id){
    Product.findByIdAndUpdate(_id, req.body, {new: true}).exec((err,product)=>{
        return res
        .status(STATUS_CODES.OK)
        .json(product);
       })
}   
  
  else{
    Product.findOne({productname,adminId}).exec((err, product) => 
    {

      console.log(product,"product to add")
      if (err) {
        console.log(err,"error");
      }
      if (product) {
  
          
        return res
          .status(STATUS_CODES.CONFLICT_ERROR)
          .json({ message: ERROR_MESSAGES.PRODUCT_ALREADY_EXIST });
      }
      if(!product){
     
          const productToCreate = new Product({
            _id: new mongoose.Types.ObjectId(),
            adminId,
            productname,
            image,
            quantity,
            price,
            category
           
          });
          console.log("inside product",productToCreate);
          productToCreate.save((err) => {
            if (err) {
              return res.status(STATUS_CODES.BADREQUEST_ERROR).json({ err });
            }
            console.log(productToCreate,"product")
            return res.status(STATUS_CODES.CREATED).json( productToCreate );
          });
        }
      })
  }
 
  }


  const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
       const adminId=req.params.id
    try {
        const data = await Product.find({ adminId: adminId });
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

    const editProducts = async (req: Request, res: Response, next: NextFunction) => {
       
        try {
            const id = req.params.id;
            const updatedData = req.body;
            console.log(updatedData)
            const options = { new: true };
        
            const result = await Product.findByIdAndUpdate(id, updatedData, options);
            console.log(result);
            res.send(result);
          } catch (err) {
            return res
            .status(STATUS_CODES.BADREQUEST_ERROR)
            .json({err});
          
          }
     }


     const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            console.log(id)
            const data = await Product.findByIdAndDelete(id);
            res.send(`Document has been deleted..`);
          } catch (error) {
            return res
            .status(STATUS_CODES.BADREQUEST_ERROR)
            .json({error});
          }
       
     }

  export default {createProduct,getAllProducts,editProducts,deleteProduct};