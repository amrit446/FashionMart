import mongoose from "mongoose";

const connectDB = async()=>{
    try{
     const conn = await mongoose.connect(process.env.MONGO_URL);
     console.log(`Connected TO mongodb Database ${conn.connection.host}`)
    }
    catch(err){
        console.log(`Erro in mongodb ${err}`)
    }
}


export default connectDB;