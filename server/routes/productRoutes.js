import express from 'express';
import {isAdmin, requireSignIn} from '../middleware/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, 
  getProductController, getSingleProductController, 
  productCategoryController, 
  productFilterController, productPhotoController, 
  relatedProductController, 
  searchProductController,
  updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router()

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(),
createProductController
)


//get products
router.get('/get-product', getProductController);


//single product
router.get("/get-product/:slug", getSingleProductController);


//get photo
router.get("/product-photo/:pid", productPhotoController);

//filter product
router.post("/product-filters", productFilterController);

//delete product
router.delete("/delete-product/:pid", deleteProductController)


//routes
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );
  
// search product
router.get("/search/:keyword", searchProductController);


//similar product
router.get("/related-product/:pid/:cid", relatedProductController)

//category wise product
router.get("/product-category/:slug", productCategoryController)


//payment routes
//token
router.get("/braintree/token", braintreeTokenController);


//payments
router.post("/braintree/payment" , requireSignIn, braintreePaymentController)
export default router; 