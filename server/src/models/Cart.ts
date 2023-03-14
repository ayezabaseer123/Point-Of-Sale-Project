import mongoose, { Document, Schema } from "mongoose";

export interface ICart {
 adminId:mongoose.Schema.Types.ObjectId,
 productname: string;
      price: number;
      quantity: number;
      image: string;
      category: string;
      itemQuantity: number;
      productId: string;
}

export interface ICartModel extends ICart, Document {}

const CartSchema: Schema = new Schema({
  adminId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
  productname: { type: String, required: true },
  image: { type: String, required: true },
  quantity: {type:Number ,required: true},
  price: {type: Number, required: true},
  category: {type: String, required: true},
  itemQuantity: {type: Number, required: true}
  
});

export default mongoose.model<ICartModel>("Cart", CartSchema);
