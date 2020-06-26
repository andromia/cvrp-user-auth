import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";

// Setup Mongoose connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

mongoose.connection.on("open", function (ref) {
  console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function (err) {
  console.log("Could not connect to mongo server!");
});

let mongoURI = "mongodb://mongo_users:27017/auth";
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
