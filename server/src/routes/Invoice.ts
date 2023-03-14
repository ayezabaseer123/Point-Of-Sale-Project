import express from 'express';
import controller from '../controllers/Invoice';
const checkAuth=require("../middleware/auth")

const router = express.Router();

router.post('/create',checkAuth,  controller.createInvoice);
router.get('/getAll/:id',checkAuth,controller.getAllInvoice);

// router.delete('/delete/:id',controller.deleteInvoice);


export = router;