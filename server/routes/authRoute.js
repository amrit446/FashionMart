import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { registerController, 
loginController, 
forgotPasswordController,
updateProfileController, 
getOrdersController } from "../controllers/authController.js"

// router object
const router = express.Router();


router.post("/register", registerController);


router.post("/login", loginController)

//Forgot Password || POST
router.post('/forgot-password', forgotPasswordController)


//protected route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

//protected admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

//update profile
router.put("/profile", requireSignIn, updateProfileController)

//orders
router.get("/orders", requireSignIn, getOrdersController);

export default router;