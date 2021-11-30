import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO 
      USERS(id, name, email, password, "isAdmin", driver_license, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [id, "Admin", "admin@rentx.com", password, true, "XXXXXXX", "now()"]
  );

  await connection.close();
}

create().then(() => console.log("User Admin created"));
