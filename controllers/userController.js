import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";

//register
export const register = catchAsyncError(async (req, res, next) => {
  const { first_name, last_name, email, password, confirm_password, country } =
    req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !confirm_password ||
    !country
  ) {
    return next(new ErrorHandler("Please Enter all Fields", 400));
  }

  if (password != confirm_password)
    return next(new ErrorHandler("Password and Confirm password didn't match"));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 409));

  user = await User.create({
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    country,
  });

  sendToken(res, user, "Registered Successfully", 201);
});

//login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please Enter all Fields", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  sendToken(res, user, `Welcome Back  ${user.first_name}`, 201);
});

//logout
export const logout = catchAsyncError(async (req,res,next)=>{
    res.status(200).cookie("token",null,{ 
        expires:new Date(Date.now()),
        httpOnly: true,
        secure: true,
        samesite: "none",
    }).json({
        success:true,
        message:"logged out successfully"
    })
})