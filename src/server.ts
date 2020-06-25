import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

// Boot express
const app: Application = express();
app.use(cors());

const port = 8080;

// Application routing
app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: "user auth" });
});

// Start server
app.listen(port, () =>
  console.log(`User auth microservice listening on port: ${port}!`)
);
