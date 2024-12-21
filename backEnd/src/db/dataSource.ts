import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT) || 5433,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "example",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [User],
  logging: true,
  synchronize: true,
  subscribers: [],
  migrations: [],
});
