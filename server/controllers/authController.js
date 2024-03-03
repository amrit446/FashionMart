import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validate
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).send({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ error: "Email is already registered" });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address
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
            return res.status(400).send({ error: "Email and password are required" });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: "Email is not registered" });
        }

        // Compare passwords
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({ error: "Invalid password" });
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
                address:user.address
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



// test controller
export const testController=(req, res)=>{
    console.log('protected')
}