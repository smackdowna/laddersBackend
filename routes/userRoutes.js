import express from "express";
import { login, logout, register } from "../controllers/userController.js";

const router = express.Router();

//Register
router.route("/register").post(register);

//LOGIN
router.route("/login").post(login);

//logout
router.route("/logout").get(logout);






//LOGOUT
//get my profile
//change password
//update profile
//update profile pic
//forgot password
//reset password


export default router;