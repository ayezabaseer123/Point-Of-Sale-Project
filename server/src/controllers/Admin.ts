import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import bcrypt from "bcrypt";

import User from "../models/Admin";
import { STATUS_CODES, ERROR_MESSAGES } from "../constants";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { adminName, email, password } = req.body;
  let hashPassword: string;
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      console.log(err,"error");
    }
    if (user) {
      return res
        .status(STATUS_CODES.CONFLICT_ERROR)
        .json({ message: ERROR_MESSAGES.USER_ALREADY_EXIST });
    }
    if(!user){
      bcrypt.hash(password, 10, function (err, hash) {
        hashPassword = hash;
        console.log("hash password", hash);
        const userToCreate = new User({
          _id: new mongoose.Types.ObjectId(),
          adminName,
          email,
          hashPassword,
        });
    
        userToCreate.save((err) => {
          if (err) {
            return res.status(STATUS_CODES.BADREQUEST_ERROR).json({ err });
          }
          return res.status(STATUS_CODES.CREATED).json({ userToCreate });
        });
      });
    }
  });

 
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: any, email: string, adminName: string) => {
  return jwt.sign({ id, email, adminName }, config.key.jwt_key, {
    expiresIn: maxAge,
  });
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let user: Record<string, any> | null = await User.findOne({ email });
  if (!user) {
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
  }

  const result = await bcrypt.compare(password, user.hashPassword);
  console.log(result,"hashPassword")
  if (!result) {
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .json({ message: ERROR_MESSAGES.INCORRECT_PASSWORD });
  }

  const token = createToken(user._id, user.email, user.adminName);

  return res.status(STATUS_CODES.CREATED).json({
    _id: user._id,
    adminName: user.adminName,
    email: user.email,

    token: token,
  });
};
export default { createUser, loginUser };
