import type { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUserCase";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(_req: Request, res: Response): Response {
    const categories = this.listCategoriesUseCase.execute();

    return res.status(201).json(categories);
  }
}

export { ListCategoriesController };
