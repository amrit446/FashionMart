import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Protected Routes token base

export const requireSignIn = async(req, res, next)=>{
  try {
    const decode = JWT.verify(req.headers.authorization,
        process.env.JWT_SECRET
        )
    req.user = decode;
    console.log("decode:",decode)    

    console.log("req.user:",req.user)    
    next()    
  } catch (error) {
    console.log(error)
  }
}


// admin access
export const isAdmin = async(req, res, next)=>{
   try{
       const user = await userModel.findById(req.user._id)
       if(user.role !== 1){
          return res.status(401).send({
            success:false,
            message:'UnAuthorized Acess'
          })
       }
       else{
        next()
        console.log("this is admin")
       }
    }
   catch(err){
    console.log(err);
    res.status(401).send({
        success:false,
        err,
        message:' Error in admin middleware'
    })
   }
}