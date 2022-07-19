import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { hashSync } from "bcrypt";
import { User } from "../entity/User";

export async function userRegister(request: Request, response: Response) {
  const { name, email, password } = request.body;
  const hash = hashSync(password, 10);
  const user = await myDataSource.getRepository(User).findOne({
    where: { email },
    cache: true,
  });

  const newUser = await myDataSource
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      name: name,
      email: email,
      hash: hash,
    })
    .execute();

  user
    ? response.status(400).json("User already exists")
    : response.status(201).json(newUser);
}
