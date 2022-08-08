import { Request, Response } from "express";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import JwtService from "../services/jwt.service";

export async function getUserScore(request: Request, response: Response) {
  const { id } = request.params;
  const user = await UserService.findUserById(id);
  const userScore = user.entries;
  const authorization = AuthService.checkCurrentUser(
    id,
    JwtService.isAuthorized(request)
  );

  if (!authorization) return response.status(401).json("Authorization failed");

  if (!user || user === null)
    return response.status(404).json("User not found");

  return response.status(200).json(userScore);
}

export async function updateUserScore(request: Request, response: Response) {
  const { id } = request.params;
  const user = await UserService.findUserById(id);
  const increment = await UserService.incrementUserScore(user);
  const authorization = AuthService.checkCurrentUser(
    id,
    JwtService.isAuthorized(request)
  );

  if (!authorization) return response.status(401).json("Authorization failed");

  if (!user || user === null)
    return response.status(404).json("User not found");

  return response.status(200).json(increment);
}
