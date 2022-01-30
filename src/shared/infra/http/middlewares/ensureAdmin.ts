import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.user;

  if (!id) {
    throw new AppError("You are not authorized to access this route", 401);
  }

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("You are not authorized to perform this action", 401);
  }

  return next();
}
