import { object } from "joi";
import mongoose, { Document, Schema } from "mongoose";

export interface IInvoice {
  adminId: mongoose.Schema.Types.ObjectId;
  customerName: string;
  email: string;
  address: string;
  cartList: Record<string, number | string>[];
}

export interface IInvoiceModel extends IInvoice, Document {}

const InvoiceSchema: Schema = new Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  cartList: [
    {
      adminId: { type:String},
      productname: { type: String },
      price: { type: Number },
      quantity: { type: Number },
      image: { type: String },
      category: { type: String },
      itemQuantity: { type: Number },
      productId: { type: String },
    },
  ],
  date: { type: String, required: true },
});

export default mongoose.model<IInvoiceModel>("Invoice", InvoiceSchema);
