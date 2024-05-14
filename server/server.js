import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./routers/auth.js";

// connect to express app
const app = express();
// middleware
app.use(bodyParser.json());
app.use(cors());

// mount the route files here
app.use("/auth", authRoutes);

// connect to mongoDB
const dbURI = "mongodb://127.0.0.1:27017/farm-to-table";

mongoose
  .connect(dbURI, {})
  .then(() => {
    app.listen(3001, () => {
      console.log("Server connected to port 3001 and MongoDB");
    });
  })
  .catch((error) => {
    console.log("Unable to connect to Server and/or MongoDB", error);
  });
