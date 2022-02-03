import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    private dateProvider: DayjsDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = auth;

    const { sub: user_id, email } = verify(
      token,
      secret_refresh_token
    ) as IPayload;

    const userToken =
      await this.userTokenRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token not found!", 404);
    }

    await this.userTokenRepository.deleteById(userToken.id);

    const newRefreshToken = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    await this.userTokenRepository.create({
      expires_date: this.dateProvider.addDays(
        this.dateProvider.dateNowUTC(),
        expires_in_refresh_token_days
      ),
      refresh_token: newRefreshToken,
      user_id,
    });

    return newRefreshToken;
  }
}

export { RefreshTokenUseCase };
