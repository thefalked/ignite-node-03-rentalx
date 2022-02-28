import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { createClient } from "redis";

import { AppError } from "@shared/errors/AppError";

const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

const redisClient = createClient({ url });

const limiter = new RateLimiterRedis({
  storeClient: redisClient.connect(),
  keyPrefix: "rateLimiter",
  points: 5, // 5 requests
  duration: 5, // per 5 second by IP
});

export default async function rateLimiter(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(req.ip);

    return next();
  } catch (err) {
    throw new AppError("Too many requests", 429);
  }
}
