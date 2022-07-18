import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "natsuki",
  password: "1712",
  database: "smart-brain",
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: true,
});
