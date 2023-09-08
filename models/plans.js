import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Plan Name"],
  },
  plan_type: {
    type: String,
    
  },
  platform: {
    type: String,
    required: [true, "Please Enter Platform"],
  },
  prefrence: {
    type: String,
    
  },
  category: {
    type: String,
  },
  fee: {
    type: Number,
    required: [true, "Please Enter fee"],
  },
  account_size: {
    type: Number,
    required: [true, "Please Enter account_size"],
  },
  description: {
    type: String,
    required: [true, "Please Enter category"],
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Plan = mongoose.model("Plan", schema);
