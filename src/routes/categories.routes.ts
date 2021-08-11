import { Router } from "express";

import { CategoriesRepository } from "../repository/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  categoriesRepository.create({ name, description });

  res.status(201).send();
});

categoriesRoutes.get("/", (req, res) => {
  const categories = categoriesRepository.list();

  res.status(201).json(categories);
});

export { categoriesRoutes };
