import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { User } from "../entity/User";

export async function userRegister(request: Request, response: Response) {
  const { name, email, password } = request.body;
  const user = await myDataSource.getRepository(User).findOne({
    where: { email },
    cache: true,
  });

  if (user) {
    response.status(400).json("Email already exists");
  } else {
    const newUser = await myDataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name: name,
        email: email,
      })
      .execute();

    response.status(201).json(newUser);
  }
}
