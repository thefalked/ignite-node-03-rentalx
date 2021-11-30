import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface IFindAllAvailableProps {
  brand?: string;
  category_id?: string;
  name?: string;
}
interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAllAvailable({
    brand,
    category_id,
    name,
  }: IFindAllAvailableProps): Promise<Car[]>;
}

export { ICarsRepository };
