import "reflect-metadata";
import * as express from "express";
import { Request, Response } from "express";
import { AppRoutes } from "./routes";
import { myDataSource } from "./app-data-source";

myDataSource
  .initialize()
  .then(async () => {
    const app = express();
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

    app.listen(3000);
    console.log("Express application is up and running on port 3000");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
