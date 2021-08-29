import express from "express";
import swaggerIU from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use("/api-docs", swaggerIU.serve, swaggerIU.setup(swaggerFile));

app.use(router);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
