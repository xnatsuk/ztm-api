import { Request, Response } from "express";
import UserService from "../services/user.service";

export async function userProfile(request: Request, response: Response) {
  const { id } = request.params;
  const user = await UserService.findUserById(id);

  user
    ? response.status(200).json(user)
    : response.status(404).json("User not found");
}
