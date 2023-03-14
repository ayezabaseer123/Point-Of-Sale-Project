import dotenv from "dotenv"
dotenv.config();
const MONGO_URL="mongodb://localhost:27017/PointOfSale_DB"
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const JWT_KEY=process.env.JWT_KEY ? String(process.env.JWT_KEY) : "secretkey";
export const config={
mongo:{
   url:MONGO_URL
},
server:{
   port:SERVER_PORT
}
,
key:{
    jwt_key:JWT_KEY
}}