import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  adminName: string;
  email:string;
  hashPassword:string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  adminName: { type: String, required: true },
  email: { type: String, required: true ,unique: true },
  hashPassword: {type: String },
});

export default mongoose.model<IUserModel>("User", UserSchema);
