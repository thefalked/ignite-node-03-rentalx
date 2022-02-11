import { inject, injectable } from "tsyringe";

import { ICarImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carImageRepository: ICarImageRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.forEach(async (image_name) => {
      await this.carImageRepository.create(car_id, image_name);
      await this.storageProvider.saveFile(image_name, "cars");
    });
  }
}

export { UploadCarImageUseCase };
