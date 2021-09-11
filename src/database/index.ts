import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;

  // This option must be EXACTLY has defined in the container_name of the database service
  newOptions.host = "database_ignite";

  createConnection({
    ...options,
  });
});
