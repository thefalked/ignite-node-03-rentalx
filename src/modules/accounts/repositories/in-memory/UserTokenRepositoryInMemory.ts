import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUserTokenRepository } from "../IUserTokensRepository";

class UserTokenRepositoryInMemory implements IUserTokenRepository {
  userTokens: UserToken[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    this.userTokens = this.userTokens.filter(
      (userToken) => userToken.id !== id
    );
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }
}

export { UserTokenRepositoryInMemory };
