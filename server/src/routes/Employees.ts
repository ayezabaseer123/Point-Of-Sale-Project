import express from 'express';
import controller from '../controllers/Employee';
const checkAuth=require("../middleware/auth")

const router = express.Router();

router.post('/create',checkAuth, controller.createEmployee);
router.get('/getAll/:id', checkAuth,controller.getAllEmployees);
router.patch('/update/:id',checkAuth,controller.editEmployees);
router.delete('/delete/:id',checkAuth,controller.deleteEmployee);


export = router;