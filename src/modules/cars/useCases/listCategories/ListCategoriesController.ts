import type { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUserCase";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(_req: Request, res: Response): Promise<Response> {
    const categories = await this.listCategoriesUseCase.execute();

    return res.status(201).json(categories);
  }
}

export { ListCategoriesController };
