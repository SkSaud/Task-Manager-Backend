import express from "express"
import cors from "cors"   // to handle cross-origin requests. matlab port 3000 or 5173 se backend ko access karne ke liye middleware hai yeah
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.route.js"



dotenv.config();



mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
    
})



const app=express();

//middleware to handle cors
app.use(cors({
    origin:process.env.FRONT_END_URL || "http://localhost:5173", // frontend ka address jahan se requests aayengi
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
}))


//middleware to parse JSON bodies
app.use(express.json());


 



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})  


app.use("/api/auth",authRoutes);


//error handling middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
        
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({success:false,statusCode,message});
})