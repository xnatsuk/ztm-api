import { compareSync } from "bcrypt";

import { User } from "../entity/User";
import { IJwtDetails } from "./jwt.service";

class AuthService {
  isValidPassword(password: string, info: User) {
    return compareSync(password, info.hash);
  }

  checkCurrentUser(id: string, auth: IJwtDetails) {
    if (Number(id) == auth.id) return true;
    return false;
  }
}

export default new AuthService();
