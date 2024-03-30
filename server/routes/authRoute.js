import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import {registerController, loginController, testController, forgotPasswordController} from "../controllers/authController.js"
 
// router object
const router = express.Router();


router.post("/register", registerController);

router.post("/login", loginController)

//Forgot Password || POST
router.post('/forgot-password', forgotPasswordController)

// test routes
router.get('/test', requireSignIn, isAdmin, testController)

//protected route auth
router.get('/user-auth', requireSignIn, (req, res)=>{
    res.status(200).send({ok:true})
})

export default router;