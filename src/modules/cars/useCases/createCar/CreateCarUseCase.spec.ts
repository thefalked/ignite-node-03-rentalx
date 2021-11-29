import { CarsRepositoryInMemory } from "@modules/cars/repository/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "5f3f8f8f-c9c9-4c4c-b8c8-f8f8f8f8f8f8",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a new car with duplicated license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Fusca",
        description: "Carro de luxo",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "VW",
        category_id: "5f3f8f8f-c9c9-4c4c-b8c8-f8f8f8f8f8f8",
      });

      await createCarUseCase.execute({
        name: "Fusca 2",
        description: "Carro de luxo",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "VW",
        category_id: "5f3f8f8f-c9c9-4c4c-b8c8-f8f8f8f8f8f8",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "DEF-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "5f3f8f8f-c9c9-4c4c-b8c8-f8f8f8f8f8f8",
    });

    expect(car.available).toBe(true);
  });
});
