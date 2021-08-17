import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.router";

const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
