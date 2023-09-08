import express from "express";
import { createPlans, getAllPlans } from "../controllers/planController.js";

const router = express.Router();

//get all plans
router.route("/plans").get(getAllPlans);

//create new plan
router.route("/createplan").post(createPlans)



export default router;