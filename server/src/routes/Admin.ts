import express from 'express';
import controller from '../controllers/Admin';


const router = express.Router();

router.post('/create',  controller.createUser);
router.post('/login', controller.loginUser);

export = router;