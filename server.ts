import "reflect-metadata";
import cors from "cors";
import express from "express";
import { Request, Response } from "express";
import { expressjwt } from "express-jwt";

import { AppRoutes } from "./src/routes";
import { myDataSource } from "./src/app-data-source";

const PORT = 3001;

myDataSource
  .initialize()
  .then(async () => {
    const app = express();
    const jwt = expressjwt({
      secret: `${process.env.JWT_SECRET}`,
      algorithms: ["RS512"],
      credentialsRequired: false,
    }).unless({
      path: ["/login", "/register"],
    });

    app.use(cors());
    app.use(jwt);
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
