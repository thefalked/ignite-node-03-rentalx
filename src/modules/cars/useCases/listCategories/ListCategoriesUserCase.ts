import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repository/ICategoriesRepository";

class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  execute(): Category[] {
    return this.categoryRepository.list();
  }
}

export { ListCategoriesUseCase };
