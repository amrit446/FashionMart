import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import {registerController, loginController, testController} from "../controllers/authController.js"
 
// router object
const router = express.Router();


router.post("/register", registerController);

router.post("/login", loginController)


// test routes
router.get('/test', requireSignIn, isAdmin, testController)

export default router;