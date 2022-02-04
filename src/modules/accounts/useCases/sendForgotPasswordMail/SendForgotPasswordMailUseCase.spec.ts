import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokenRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokenRepositoryInMemory: UserTokenRepositoryInMemory;
let dateProvider: IDateProvider;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokenRepositoryInMemory = new UserTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokenRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("Should be able to send a forgot password mail to the user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    const user: ICreateUserDTO = {
      name: "John Doe",
      email: "jhon@doe.com",
      password: "123456",
      driver_license: "123456789",
    };

    await usersRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send a forgot password mail if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("user@not.exists")
    ).rejects.toEqual(new AppError("User not found!", 404));
  });

  it("Should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(userTokenRepositoryInMemory, "create");

    const user: ICreateUserDTO = {
      name: "John Doe",
      email: "jhon@doe.com",
      password: "123456",
      driver_license: "123456789",
    };

    await usersRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
