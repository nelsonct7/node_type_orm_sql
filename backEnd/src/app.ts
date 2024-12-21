import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import 'reflect-metadata'

import { myDataSource } from "./db/dataSource";

import userRoutes from "./routes/user/user";

// Load environment variables first
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Using cors() instead of cors("*") for better type safety
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", userRoutes);
app.get("/", (_req: Request, res: Response) => {
  const current = Date.now();
  return res.status(200).json({ message: `Current time ${current}` });
});

// Error handling middleware
app.use(
  (err: any, _req: Request, res: Response, _next: express.NextFunction) => {
    res.status(err.status || 500);
    res.json({ error: err });
  }
);

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log(`Auth app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
