import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use("/categories", categoriesRoutes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
