import { CarsRepositoryInMemory } from "@modules/cars/repository/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListAvailableCarsCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test 1",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "05f17818-8834-4623-a261-4dd6d1066c41",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test 2",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "DEF-1234",
      fine_amount: 10,
      brand: "BMW",
      category_id: "05f17818-8834-4623-a261-4dd6d1066c41",
    });

    const cars = await listCarsUseCase.execute({ brand: "BMW" });

    expect(cars).toEqual([car]);
  });
});
