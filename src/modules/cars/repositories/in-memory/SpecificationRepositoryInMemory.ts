import { v4 as uuidV4 } from "uuid";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specification: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { id: uuidV4(), name, description });

    this.specification.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specification.find(
      (specification) => specification.name === name
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specification.filter((specification) =>
      ids.includes(specification.id)
    );
  }
}

export { SpecificationRepositoryInMemory };
