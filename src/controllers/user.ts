import { Request, Response } from "express";
import { UserModel } from "../models/mysql/user";
import { validatePartialUser, validateUser } from "../schemas/user";
import { isErrorResponse } from "../helpers";

export class UserController {
  userModel: UserModel;
  constructor({ userModel }: { userModel: UserModel }) {
    this.userModel = userModel;
  }
  getAllUsers = async (req: Request, res: Response) => {
    const users = await UserModel.getAll();
    res.status(200).json(users);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserModel.getById(id);
    res.status(200).json(user);
  };

  create = async (req: Request, res: Response) => {
    const result = validateUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  };

  update = async (req: Request, res: Response) => {
    const result = validatePartialUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const updatedUser = await UserModel.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserModel.delete(id);
    res.status(200).json(user);
  };

  login = async (req: Request, res: Response) => {
    const result = validateUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const response = await UserModel.login(req.body);
    if (isErrorResponse(response)) {
      return res.status(400).json(response);
    } else {
      res
        .cookie("auth", response.sessionToken, {
          domain: "localhost",
          path: "/",
        })
        .status(200)
        .json(response);
    }
  };
}
