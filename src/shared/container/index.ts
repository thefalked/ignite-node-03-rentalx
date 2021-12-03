import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { CarImageRepository } from "@modules/cars/infra/typeorm/repositories/CarImageRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarImageRepository } from "@modules/cars/repository/ICarsImageRepository";
import { ICarsRepository } from "@modules/cars/repository/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repository/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repository/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarImageRepository>(
  "CarsImageRepository",
  CarImageRepository
);
