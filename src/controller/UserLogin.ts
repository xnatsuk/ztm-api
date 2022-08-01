import { Request, Response } from "express";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import JwtService from "../services/jwt.service";

export async function userLogin(request: Request, response: Response) {
  const { email, password } = request.body;
  const user = await UserService.findUserByEmail(email);
  if (!user || user === null) response.status(401).json("Invalid credentials");

  const validatePassword = AuthService.isValidPassword(password, user);
  if (!validatePassword)
    return response.status(401).json("Invalid credentials");

  const token = JwtService.generateToken(user);

  return response.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    entries: user.entries,
    token: token,
  });
}
