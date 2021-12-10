import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

let dateProvider: IDateProvider;
let todayPlus24Hour: Date;

describe("Create Rental", () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();

    todayPlus24Hour = dateProvider.addHours(dateProvider.dateNowUTC(), 24);

    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1",
      car_id: "1",
      expected_return_date: todayPlus24Hour,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there's already a rental open for the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1",
        car_id: "123",
        expected_return_date: todayPlus24Hour,
      });

      await createRentalUseCase.execute({
        user_id: "1",
        car_id: "321",
        expected_return_date: todayPlus24Hour,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there's already a rental open for the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "1",
        expected_return_date: todayPlus24Hour,
      });

      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "1",
        expected_return_date: todayPlus24Hour,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "1",
        expected_return_date: dateProvider.dateNowUTC(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
