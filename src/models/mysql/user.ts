import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserModel {
  static async getAll() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  }
  static async getById(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id: id },
      });
      return user;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  }
  static async create(user: User) {
    try {
      const newUser = await prisma.user.create({
        data: user,
      });
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create user");
    }
  }
  static async update(id: number, user: User) {
    try {
      const updatedUser = await prisma.user.update({
        where: { user_id: id },
        data: user,
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update user");
    }
  }

  static async delete(id: number) {
    try {
      const deleted = await prisma.user.delete({
        where: { user_id: id },
      });
      return deleted;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete user");
    }
  }
}
