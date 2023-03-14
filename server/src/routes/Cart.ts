import express from 'express';
import controller from '../controllers/Cart';
const checkAuth=require("../middleware/auth")

const router = express.Router();

router.post('/create', checkAuth, controller.createCart);
router.get('/getAll/:id',checkAuth,controller.getAllCart);
router.patch('/update/:id',checkAuth,controller.editCart);
router.delete('/delete/:id/product/:productId',checkAuth,controller.deleteCart);
router.delete('/empty/:id',checkAuth,controller.emptyCart);
router.get("/email",controller.sendEmail)
export = router;