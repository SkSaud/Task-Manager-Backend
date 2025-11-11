import express from "express";
import { signup } from "../controller/auth.controller.js";

const router=express.Router();
// Define your authentication routes here

router.post("/sign-up",signup)


export default router; 