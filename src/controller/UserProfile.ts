import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { User } from "../entity/User";

export async function userProfile(request: Request, response: Response) {
  const { id } = request.params;
  const user = await myDataSource.getRepository(User).findOne({
    where: { id: Number(id) },
    cache: true,
  });

  if (user) {
    response.status(200).json(user);
  } else {
    response.status(404).json("User not found");
  }
}
