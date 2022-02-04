import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO 
      USERS(id, name, email, password, "isAdmin", driver_license, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, "Admin", "admin@rentx.com", password, true, "XXXXXXX", "now()"]
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category", async () => {
    const {
      body: { refresh_token },
    } = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const response = await request(app)
      .post("/categories")
      .set({
        authorization: `Bearer ${refresh_token}`,
      })
      .send({
        name: "teste",
        description: "teste",
      });

    expect(response.statusCode).toBe(201);
  });

  it("Should not be able to create a new category with an existing name", async () => {
    const {
      body: { refresh_token },
    } = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const response = await request(app)
      .post("/categories")
      .set({
        authorization: `Bearer ${refresh_token}`,
      })
      .send({
        name: "teste",
        description: "teste",
      });

    expect(response.statusCode).toBe(400);
  });
});
