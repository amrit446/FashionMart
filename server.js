import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connect } from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import bodyParser from 'body-parser';
//////

const app= express()
//
dotenv.config()

connectDB();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use(morgan("dev"));

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to ecommerce app</h1>")
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server Runnung on ${PORT}`)
});
