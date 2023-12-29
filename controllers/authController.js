import  JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async(req, res)=>{
    try{
        const {name, email, password, phone, address} = req.body

        //validate
        if(!name){
            return res.send({error:"Name is Required"})
        }
        if(!email){
            return res.send({error:"Email is Required"})
        }
        if(!password){
            return res.send({error:"Password is Required"})
        }
        if(!phone){
            return res.send({error:"Phone is Required"})
        }
        if(!address){
            return res.send({error:"Address is Required"})
        }

        const existingUser = await userModel.findOne({email})

        if(existingUser){
            return res.status(200).send({
                success:true,
                message:"Already Register Please login"
            })
        }
 
        const hashedPassword = await hashPassword(password);

        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword
        }).save();

        res.status(201).send({
            success:true,
            message:"User Register Successfully",
            user
        })
        console.log("register is working")

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })  
    }
}


export const loginController = async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registerd"
            })
        }
        const match = await comparePassword(password, user.password)

        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:"7d"});

        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,  
            },
            token
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }
};