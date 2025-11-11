import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//signup
export const signup=async(req,res,next)=>{
    const {name,email,password,profileImageUrl,adminJoinCode}=req.body
    if(!name || !email || !password ||name===""||email===""||password===""){
       
        return next(errorHandler(400,"All fields are required"));  
    }
    //check is user already exists
    const isAlreadyExists=await User.findOne({email})
    if(isAlreadyExists){
      
        return next(errorHandler(400,"User already exists with this email"));
    }
    //check user login role
    let role="user";
    if(adminJoinCode && adminJoinCode===process.env.ADMIN_JOIN_CODE){
        role="admin"
    }

   const hashedPassword=await bcryptjs.hashSync(password,10); 

   const newUser=new User({
     name,
     email,
    password:hashedPassword,
    profileImageUrl,
    role,

   })
   try{ 
    await newUser.save();
    res.json("Signup successfully")

   }catch(error){
    next(error.message)
    
   }
 




}







// signin
export const signin=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password || email==="" || password===""){
            return next(errorHandler(400,"All fields are required"));
        }
        const validUser=await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"User not found"));
        }

        //compare password
        const validPassword= bcryptjs.compareSync(password,validUser.password); 
        if(!validPassword){
            return next(errorHandler(400,"User Not Found"));
        }


        const token=jwt.sign({id:validUser._id} ,process.env.JWT_SECRET)
        const {password:pass, ...rest}=validUser._doc; //destructuring to exclude password from response
        res.status(200).cookie("access_token",token,{httpOnly:true,}).json(rest);
   
   
   
   
    }catch(error){
    next(error)
    }
}