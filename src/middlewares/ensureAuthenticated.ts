import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token not provided", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "54b09b6c1a91b00697a72746a0706614"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
