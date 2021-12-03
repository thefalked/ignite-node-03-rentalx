import { inject, injectable } from "tsyringe";

import { ICarImageRepository } from "@modules/cars/repository/ICarsImageRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carImageRepository: ICarImageRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.forEach(async (image_name) => {
      await this.carImageRepository.create(car_id, image_name);
    });
  }
}

export { UploadCarImageUseCase };
