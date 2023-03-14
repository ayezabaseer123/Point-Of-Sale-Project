import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const nodemailer = require("nodemailer");
import { STATUS_CODES, ERROR_MESSAGES } from "../constants";
import Cart from "../models/Cart";
import Product from "../models/Products";


const sendMail=async(productname:string,quantity:number,adminEmail:string)=>{
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //mail server you want to use
    port: 587, //service should be active
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ayezabaseerawan@gmail.com", 
      pass: "gcqmkdmtfjalqznn", 
    },
  });

  // send mail with defined transport object
await transporter.sendMail({
   
    to: `${adminEmail}`, // list of receivers
    subject: "Stock Alert ❗ ", // Subject line
    text: `${productname} quantity is ${quantity}.Please add more stock`, // plain text body
    html: `<b>${productname} quantity is ${quantity}.Please add more stock</b>`, // html body
  });
}

const createCart = async (req: Request, res: Response, next: NextFunction) => {
  const {
    adminId,
    productId,
    productname,
    image,
    quantity,
    price,
    itemQuantity,
    category,
    adminEmail
  } = req.body;

  Cart.findOne({ productname }).exec((err, cart) => {
    if (err) {
      console.log(err, "error");
    }
    if (cart) {
      return res
        .status(STATUS_CODES.CONFLICT_ERROR)
        .json({ message: ERROR_MESSAGES.PRODUCT_ALREADY_EXIST });
    }
    if (!cart) {

      if(quantity==10){
        sendMail(productname,quantity,adminEmail)
       

      }
      const cartToCreate = new Cart({
        _id: new mongoose.Types.ObjectId(),
        productId,
        adminId,
        productname,
        image,
        quantity,
        price,
        itemQuantity,
        category,
      });

      cartToCreate.save((err) => {
        if (err) {
          return res.status(STATUS_CODES.BADREQUEST_ERROR).json({ err });
        }
        return res.status(STATUS_CODES.CREATED).json(cartToCreate);
      });
    }
  });
};

const getAllCart = async (req: Request, res: Response, next: NextFunction) => {
  const adminId = req.params.id;
  try {
    const data = await Cart.find({ adminId: adminId });
    if (data.length === 0) {
      return res
        .status(STATUS_CODES.NO_CONTENT)
        .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    } else {
      return res.status(STATUS_CODES.OK).json(data);
    }
  } catch (err) {
    console.log(err);
  }
};

const editCart = async (req: Request, res: Response, next: NextFunction) => {
  const { productname, quantity ,adminEmail} = req.body;
  try {
    const id = req.params.id;
    const updatedData = req.body;
    console.log(updatedData);
    const options = { new: true };

    const result = await Cart.findByIdAndUpdate(id, updatedData, options);
    if (quantity == 10) {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "ayezabaseerawan@gmail.com", 
          pass: "gcqmkdmtfjalqznn", 
        },
      });

      // send mail with defined transport object
      await transporter.sendMail({
       
        to: `${adminEmail}`, // list of receivers
        subject: "Stock Alert ❗", // Subject line
        text: `${productname} quantity is ${quantity}.Please add more stock`, // plain text body
        html: `<b>${productname} quantity is ${quantity}.Please add more stock</b>`, // html body
      });
    }
    console.log(result);
    res.send(result);
  } catch (err) {
    return res.status(STATUS_CODES.BADREQUEST_ERROR).json({ err });
  }
};

const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.productId;
    
    const id = req.params.id;
    const product = await Product.find({ _id: productId });
    const cartData = await Cart.find({ _id: id });
    console.log(cartData);
    const productUpdate = await Product.update(
      { _id: productId },
      { $set: { quantity: product[0].quantity + cartData[0].itemQuantity } }
    );
   
    const data = await Cart.findByIdAndDelete(id);
    res.send(`Document has been deleted..`);
  } catch (error) {
    return res.status(STATUS_CODES.BADREQUEST_ERROR).json({ error });
  }
};

const emptyCart = async (req: Request, res: Response, next: NextFunction) => {
  Cart.deleteMany({ adminId: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
  });
};

const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "ayezabaseerawan@gmail.com", // generated ethereal user
        pass: "gcqmkdmtfjalqznn", // generated ethereal password
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: "ayeza.baseer@gmail.com", // sender address
      to: "ayezabaseerawan@gmail.com", // list of receivers
      subject: "Stock Alert ❗", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};

export default {
  createCart,
  getAllCart,
  editCart,
  deleteCart,
  emptyCart,
  sendEmail,
};
