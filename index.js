import express from "express"
import cors from "cors"   // to handle cross-origin requests. matlab port 3000 or 5173 se backend ko access karne ke liye middleware hai yeah
import dotenv from "dotenv"



dotenv.config();
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