import { PrismaClient, User } from "@prisma/client";
import { authentication, random } from "../../helpers";
import _ from "lodash";
const prisma = new PrismaClient();

export class UserModel {
  static async getAll() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch users");
    }
  }
  static async getById(id: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      return user;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  }
  static async create(user: User) {
    try {
      const existingUser = await prisma.user.findFirst({
        where: { username: user.username },
      });
      if (existingUser) {
        return {
          error: { field: "username", message: "Username already exists" },
        };
      }
      const existingEmail = await prisma.user.findFirst({
        where: { email: user.email },
      });
      if (existingEmail) {
        return { error: { field: "email", message: "Email already exists" } };
      }

      const salt = random();
      const newUser = await prisma.user.create({
        data: { ...user, salt, password: authentication(salt, user.password) },
      });
      return _.omit(newUser, ["password", "salt"]);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create user");
    }
  }
  static async update(id: string, user: User) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: user,
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update user");
    }
  }

  static async delete(id: string) {
    try {
      const deleted = await prisma.user.delete({
        where: { id },
      });
      return deleted;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete user");
    }
  }
  static async login(
    user: User
  ): Promise<User | { error: { message: string } }> {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ username: user.username }, { email: user.email }],
        },
      });
      if (!existingUser) {
        return { error: { message: "username or email does not exist" } };
      }

      const expectedHash = authentication(existingUser.salt, user.password);
      if (expectedHash !== existingUser.password) {
        return { error: { message: "Invalid password" } };
      }

      const salt = random();
      existingUser.sessionToken = authentication(
        salt,
        existingUser.id.toString()
      );

      const loggedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: { sessionToken: existingUser.sessionToken },
      });
      return loggedUser;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to login");
    }
  }
}
