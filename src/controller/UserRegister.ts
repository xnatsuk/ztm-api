import { Request, Response } from "express";
import UserService from "../services/user.service";

export async function userRegister(request: Request, response: Response) {
  const { name, email, password } = request.body;
  const isUser = await UserService.findUserByEmail(email);
  const newUser = await UserService.registerUser(name, email, password);

  if (isUser) return response.status(400).json("Email already in use");

  return response.status(201).json(newUser);
}
