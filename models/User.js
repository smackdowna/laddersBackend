import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please Enter Your First_Name"],
  },
  last_name: {
    type: String,
    required: [true, "Please Enter Your Last_Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  confirm_password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  gender: {
    type: String,
  },
  country: {
    type: String,
    required: [true, "Please Enter your country"],
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  subscription: {
    id: String,
    status: String,
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plan",
    },
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },

  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});



schema.pre("save",async function (next){
    if(!this.isModified("password","confirm_password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    this.confirm_password = await bcrypt.hash(this.password,10);
    next();
})




schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{
    expiresIn:"2d"
  });
};




schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
};







export const User = mongoose.model("User", schema);
