import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";

// Setup Mongoose connection
const options = {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

mongoose.connection.on("open", (ref) => {
  console.log("User auth connected to Mongo!");
});

mongoose.connection.on("error", (err) => {
  console.log("User auth IS NOT connected to Mongo!");
});

let mongoURI = "mongodb://mongo:27017/api/user";
mongoose.connect(mongoURI, options);

// Boot express
const app: Application = express();
app.use(cors());

// Application routing
app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: "user auth" });
});

// Start server
const PORT = 8080;
app.listen(PORT, () =>
  console.log(`User auth microservice listening on port: ${PORT}!`)
);
