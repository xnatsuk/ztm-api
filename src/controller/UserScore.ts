import { Request, Response } from "express";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import JwtService from "../services/jwt.service";

export async function getUserScore(request: Request, response: Response) {
  const { id } = request.params;
  const authorization = AuthService.checkCurrentUser(
    id,
    JwtService.isAuthorized(request)
  );
  if (!authorization) return response.status(401).json("Authorization failed");

  const user = await UserService.findUserById(id);
  if (!user || user === null)
    return response.status(404).json("User not found");

  const userScore = user.entries;

  return response.status(200).json(userScore);
}

export async function updateUserScore(request: Request, response: Response) {
  const { id } = request.params;
  const authorization = AuthService.checkCurrentUser(
    id,
    JwtService.isAuthorized(request)
  );
  if (!authorization) return response.status(401).json("Authorization failed");

  const user = await UserService.findUserById(id);
  if (!user || user === null)
    return response.status(404).json("User not found");

  const increment = await UserService.incrementUserScore(user);

  return response.status(200).json(increment);
}
