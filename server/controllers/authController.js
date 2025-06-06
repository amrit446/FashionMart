import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        // Validate
        if (!name || !email || !password || !phone || !address || !answer) {
            return res.status(400).send({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success:false,
                 message: "Email is already registered Plese login" });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            answer
        });

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user: newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate
        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "Email is not registered" });
        }

        // Compare passwords
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = await JWT.sign({_id:user._id},
            process.env.JWT_SECRET,{expiresIn:'7d'}
                )
            res.status(200).send({
             success:true,
             message:'login successfully',
             user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
             },
             token
            })    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        });
    }
};

//forgotPasswordController
export const forgotPasswordController=async(req, res)=>{
    try{
        const {email, answer, newPassword} = req.body;
    
        if(!email){
            res.status(400).send({
             message:'Email is required'
            })
        }
        if(!answer){
            res.status(400).send({
             message:'Answer is required'
            })
        }
        if(!newPassword){
            res.status(400).send({
             message:'New Password is required'
            })
        }
        const user = await userModel.findOne({
            email,
            answer
        })
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong Email Or Answer'
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(
            user._id, {password:hashed}
        );
        res.status(200).send({
            success:true,
            message:'Password Reset Successfully'
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Something went wrong',
            error
        })
    }
}



//update profile
export const updateProfileController=async(req, res)=>{
   try{
    const {name, email, password, address, phone} = req.body;
    const user = await userModel.findById(req.user._id);
    if(!password && password.length<6){
        return res.json({error:"Password is required and & character long"})
    }
    const hashedPassword= password ? await hashPassword(password) : undefined
    const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
    name:name || user.name,
    password:hashedPassword || user.password,
    phone: phone || user.phone,
    address:address || user.address
   },{new:true})
    res.status(200).send({
        success:true,
        message:"Profile Update Successfully",
        updatedUser
    })
}
   catch(error){
    console.log(error);
    res.status(400).send({
        success:false,
        message:"Error While Update profile",
        error
    })
   }
}


//orders 
export const getOrdersController = async(req, res)=>{
    try{
       const orders = await orderModel
       .find({buyer: req.user._id})
       .populate("products","-photo")
       .populate("buyer","name")
        res.json(orders)
    }
    catch(error){
     console.log(error)
     res.status(500).send({
        success:false,
        message:"Error While Gettting Order",
        error
     });
    }
};

//get All Orders
export const getAllOrdersController=async(req, res)=>{
    try{
        const orders = await orderModel
        .find({})
        .populate("products","-photo")
        .populate("buyer","name")
        .sort({createdAt:"-1"})
         res.json(orders)
     }
     catch(error){
      console.log(error)
      res.status(500).send({
         success:false,
         message:"Error While Gettting Order",
         error
      });
     }
}


//order status
export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };