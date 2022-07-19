import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { User } from "../entity/User";

export async function userEntries(request: Request, response: Response) {
  const { id } = request.body;
  const user = await myDataSource.getRepository(User).findOne({
    where: { id: Number(id) },
    cache: true,
  });

  const increaseEntries = await myDataSource.manager.increment(
    User,
    { id: Number(id) },
    "entries",
    1
  );

  user
    ? response.status(200).json(increaseEntries)
    : response.status(404).json("User not found");
}
