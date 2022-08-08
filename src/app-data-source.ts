import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ["src/entity/*.ts"],
  logging: false,
  synchronize: true,
});
