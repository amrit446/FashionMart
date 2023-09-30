import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connect } from "mongoose";
import connectDB from "./config/db.js";
const app= express()

/

dotenv.config()

connectDB();

app.use(morgan("dev"));

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to ecommerce app</h1>")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server Runnung on ${PORT}`)
})