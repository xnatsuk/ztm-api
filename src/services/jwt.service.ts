import { Request } from "express";
import * as jwt from "jsonwebtoken";

import { User } from "../entity/User";

const JWT_KEY = process.env.JWT_SECRET;

export interface IJwtDetails {
  id: number;
  email: string;
}

class JwtService {
  generateToken(user: User) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      `${JWT_KEY}`,
      { expiresIn: "14d" }
    );

    return token;
  }

  isAuthorized(request: Request) {
    const token = () => {
      if (
        request.headers.authorization &&
        request.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return request.headers.authorization.split(" ")[1];
      }
      return null;
    };

    const decoded = jwt.verify(token(), `${JWT_KEY}`);
    return decoded as IJwtDetails;
  }
}

export default new JwtService();
