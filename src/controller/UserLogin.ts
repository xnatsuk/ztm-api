import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { compareSync, hash } from "bcrypt";
import { User } from "../entity/User";

export async function userLogin(request: Request, response: Response) {
  const { email, hash } = request.body;
  const login = await myDataSource.getRepository(User).find({
    where: { email: email, hash: hash },
    cache: true,
  });

  const isValidPassword = compareSync(request.body.password, login[0].hash);

  isValidPassword
    ? response.status(200).json(login)
    : response.status(400).json("Invalid credentials");
}
