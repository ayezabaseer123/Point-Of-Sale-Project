import { NextFunction, Request, Response } from "express";


const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const { STATUS_CODES, ERROR_MESSAGES } = require("../constants");



module.exports = (req:any, res:Response, next:NextFunction) => {
    console.log(req.headers.authorization,"auth")
  try {
    if (!req.headers.authorization) {
      return res.status(STATUS_CODES.INTERNALSERVER_ERROR).json({
        message: ERROR_MESSAGES.AUTHENTICATION,
      });
    }
    else{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token,"single")

    const decoded = jwt.verify(token,"secretkey");
    console.log("de",decoded)
    req.userData = decoded;
     
        next();
        console.log("next")
    }
    
      
    }
  catch (error) {
    console.log("err")
    return res.status(STATUS_CODES.AUTHENTICATION_ERROR).json({
      message: ERROR_MESSAGES.AUTHENTICATION,
    });
  }

}
