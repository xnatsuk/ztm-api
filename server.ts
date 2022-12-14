import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { Request, Response } from "express";
import { AppRoutes } from "./src/routes";
import { myDataSource } from "./src/app-data-source";

const PORT = process.env.PORT;

myDataSource
  .initialize()
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    AppRoutes.forEach((route) => {
      app[route.method](
        route.path,
        (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err: any) => next(err));
        }
      );
    });

    app.listen(PORT);
    console.log(`Express application is up and running on port ${PORT}`);
  })
  .catch((error) => console.log(`TypeORM connection error: ${error}`));
