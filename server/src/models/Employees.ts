import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee {
 adminId:mongoose.Schema.Types.ObjectId,
 username:string, 
 email:string,
 salary:number,
 contactNo:string,
 address:string, 
 salaryStatus:string,
}

export interface IEmployeeModel extends IEmployee, Document {}

const EmployeeSchema: Schema = new Schema({
  adminId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  username: { type: String, required: true },
  email: { type: String, required: true  },
  salary: {type:Number ,required: true},
  contactNo: {type: String, required: true},
  address: {type: String, required: true},
  salaryStatus:{ type: String, required: true}
},{timestamps:true});

export default mongoose.model<IEmployeeModel>("Employee", EmployeeSchema);
