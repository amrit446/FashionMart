import express from 'express';
import { requireSignIn, isAdmin } from '../middleware/authMiddleware.js';
import {  createCategoryController, deleteCategoryCOntroller, getAllcategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';
const router = express.Router()

//routes

//create-category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)



//getALl category
router.get("/get-category", getAllcategoryController);



//update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);


//single category
router.get("/single-category/:slug", singleCategoryController);


//delete category
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryCOntroller
  );
  
export default router;




