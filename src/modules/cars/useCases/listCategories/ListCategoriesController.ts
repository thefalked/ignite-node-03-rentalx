import type { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUserCase";

class ListCategoriesController {
  async handle(_req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const categories = await listCategoriesUseCase.execute();

    return res.status(201).json(categories);
  }
}

export { ListCategoriesController };
