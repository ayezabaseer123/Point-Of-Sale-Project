import mongoose, { Document, Schema } from "mongoose";

export interface IProduct {
 adminId:mongoose.Schema.Types.ObjectId,

 productname:string, 
 image:string,
 quantity:number,
 price:number,
 category:string, 
 
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema({
  adminId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
 
  productname: { type: String, required: true },
  image: { type: String, required: true },
  quantity: {type:Number ,required: true},
  price: {type: Number, required: true},
  category: {type: String, required: true},
  
});

export default mongoose.model<IProductModel>("Product", ProductSchema);
