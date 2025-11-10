 import mongoose  from "mongoose";

 const userSchema=new mongoose.Schema(
    {
     name:{
        type:String,
        required:true,
     },

     email:{
        type:String,
        required:true,
        unique:true,
     },

     password:{
        type:String,
        required:true,
     },

     profileImageUrl:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png",
     },

     role:{
        type:String,
        enum:["admin","user"],
        default:"user",
     }, 

 },{timestamps:true}
);

const User=mongoose.model("User",userSchema)

export default User;