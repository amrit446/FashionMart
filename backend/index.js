const express = require("express");
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const useRoute = require("./routes/user");

dotenv.config();


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected with database"))
.catch(err=>console.log(err))

app.use(express.json())

app.use("/user", useRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running");
})