import express from 'express';
import controller from '../controllers/Product';
const checkAuth=require("../middleware/auth")

const router = express.Router();

router.post('/create',checkAuth, controller.createProduct);
router.get('/getAll/:id',checkAuth,controller.getAllProducts);
router.patch('/update/:id',checkAuth,controller.editProducts);
router.delete('/delete/:id',checkAuth,controller.deleteProduct);


export = router;