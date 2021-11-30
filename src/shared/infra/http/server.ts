import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerIU from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import "@shared/container";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection();
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
