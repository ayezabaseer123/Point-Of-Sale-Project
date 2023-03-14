import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import adminRoutes from './routes/Admin'
import employeeRoutes from './routes/Employees'
import productRoutes from './routes/Products'
import Employee from "./models/Employees";
import cartRoutes from "./routes/Cart"
import invoiceRoutes from './routes/Invoice'


const cron = require('node-cron');

const router = express();
router.use(express.urlencoded({ extended: true }));

mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log("connected");
    StartServer();
  })
  .catch((err) => {
    console.log(err);
  });

const StartServer = () => {
  router.use((req, res, next) => {
    console.log(`Incoming : URL-> ${req.url} `)
   
     res.on('finish',()=>{
        console.log(`Incoming : URL-> ${req.url}  Status-> ${res.statusCode}`)

     })

     next();

});

  router.use(express.urlencoded({extended:true}))
  router.use(express.json())

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});
router.use('/admin', adminRoutes);
router.use('/employee', employeeRoutes);
router.use('/product', productRoutes);
router.use('/cart', cartRoutes);
router.use('/invoice', invoiceRoutes);


 /** Error handling */
 router.use((req, res, next) => {
    const error = new Error('Not found');

    console.log(error);

    res.status(404).json({
        message: error.message
    });
});

async function updateSalary(){
 let employee=await Employee.updateMany({}, {$set : {
  salaryStatus:"unpaid"}},{ multi: true})
  console.log(employee)

}
cron.schedule('* * 1 * *', () => {
  updateSalary();
  console.log('running a task every 1 of new month ');

});

http.createServer(router).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`));


};
