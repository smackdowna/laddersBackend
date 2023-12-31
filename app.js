import express from "express";
import { config } from "dotenv";
import ErrorMiddleWare from "./middleware/Error.js";
import cors from "cors";

config({
  path: "./config/config.env",
});

const app = express();

//using middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Importing & using Routes
import plan from "./routes/planRoute.js";
import user from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

app.use("/api/v1", plan);
app.use("/api/v1", user);

export default app;

app.use(ErrorMiddleWare);

app.get("/",(req,res)=>res.send(`Server is working fine`));
