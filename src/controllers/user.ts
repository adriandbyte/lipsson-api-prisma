import { Request, Response } from "express";
import { UserModel } from "../models/mysql/user";
import { validatePartialUser, validateUser } from "../schemas/user";

export class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await UserModel.getAll();
    res.status(200).json(users);
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await UserModel.getById(parseInt(id));
    res.status(200).json(user);
  }

  static async create(req: Request, res: Response) {
    const result = validateUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  }

  static async update(req: Request, res: Response) {
    const result = validatePartialUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const updatedUser = await UserModel.update(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).json(updatedUser);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await UserModel.delete(parseInt(id));
    res.status(204).send();
  }
}
