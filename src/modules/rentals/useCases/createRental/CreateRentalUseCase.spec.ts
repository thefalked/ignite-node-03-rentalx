import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let dateProvider: IDateProvider;
let todayPlus24Hour: Date;

describe("Create Rental", () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();

    todayPlus24Hour = dateProvider.addHours(dateProvider.dateNowUTC(), 24);

    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test car",
      description: "Test car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "1",
      car_id: car.id,
      expected_return_date: todayPlus24Hour,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there's already a rental open for the same user", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "2",
      car_id: "123",
      expected_return_date: todayPlus24Hour,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "2",
        car_id: "321",
        expected_return_date: todayPlus24Hour,
      })
    ).rejects.toEqual(new AppError("User already has an open rental"));
  });

  it("should not be able to create a new rental if there's already a rental open for the same car", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "3",
      car_id: "1234",
      expected_return_date: todayPlus24Hour,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "4",
        car_id: "1234",
        expected_return_date: todayPlus24Hour,
      })
    ).rejects.toEqual(new AppError("Car is already rented"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "1",
        expected_return_date: dateProvider.dateNowUTC(),
      })
    ).rejects.toEqual(
      new AppError("Expected return date must be at least 24 hours")
    );
  });
});
