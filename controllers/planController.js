import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Plan } from "../models/plans.js";
import ErrorHandler from "../utils/errorHandler.js";

//get all plans
export const getAllPlans = catchAsyncError(async (req, res, next) => {
  const plans = await Plan.find();
  res.status(200).json({
    success: true,
    plans,
  });
});

//create plans
export const createPlans = catchAsyncError(async (req, res, next) => {
  const {
    name,
    plan_type,
    platform,
    prefrence,
    category,
    fee,
    account_size,
    description,
  } = req.body;

  if (
    !name ||
    !platform ||
    !fee ||
    !account_size ||
    !description
  ) {
    return next(new ErrorHandler("Please add all fields", 400));
  }

  await Plan.create({
    name,
    plan_type,
    platform,
    prefrence,
    category,
    fee,
    account_size,
    description,
  });

  res.status(201).json({
    success: true,
    message: "Plan Created Successfully",
  });
});
