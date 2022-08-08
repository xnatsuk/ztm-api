import { hashSync } from "bcrypt";
import { User } from "../entity/User";
import { myDataSource } from "../app-data-source";

class UserService {
  async findUserById(id: string) {
    return await myDataSource.getRepository(User).findOneBy({ id: Number(id) });
  }

  async findUserByEmail(email: string) {
    return await myDataSource.getRepository(User).findOneBy({ email: email });
  }

  async registerUser(name: string, email: string, password: string) {
    const hash = hashSync(password, 10);
    return await myDataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .insert()
      .values({
        name: name,
        email: email,
        hash: hash,
      })
      .execute();
  }

  incrementUserScore(user: User) {
    return myDataSource.manager.increment(
      User,
      { id: Number(user.id) },
      "entries",
      1
    );
  }
}

export default new UserService();
