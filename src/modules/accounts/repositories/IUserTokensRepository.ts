import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";

import { UserToken } from "../infra/typeorm/entities/UserTokens";

interface IUserTokenRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken>;
}

export { IUserTokenRepository };
