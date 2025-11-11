import express from "express";
import { signin, signup } from "../controller/auth.controller.js";

const router=express.Router();
// Define your authentication routes here

router.post("/sign-up",signup)  // Signup route

router.post("/sign-in",signin) // Login route (to be implemented)


export default router; 