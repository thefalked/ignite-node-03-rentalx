import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerIU from "swagger-ui-express";

import "./database";

import "@shared/container";

import { AppError } from "@errors/AppError";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use("/api-docs", swaggerIU.serve, swaggerIU.setup(swaggerFile));

app.use(router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
