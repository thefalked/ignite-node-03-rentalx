import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { createClient } from "redis";

import { AppError } from "@shared/errors/AppError";

export default async function rateLimiter(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
    legacyMode: true,
  });

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 10, // 5 requests
    duration: 5, // per 5 second by IP
  });

  try {
    await redisClient.connect();

    await limiter.consume(req.ip);

    return next();
  } catch (err) {
    console.log(err);

    throw new AppError("Too many requests", 429);
  }
}
