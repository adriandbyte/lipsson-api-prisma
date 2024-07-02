import { Router } from "express";
import { UserController } from "../controllers/user";
import { UserModel } from "../models/mysql/user";

export const createUserRouter = ({ userModel }: { userModel: UserModel }) => {
  const userRouter = Router();
  const userController = new UserController({ userModel });

  userRouter.get("/", userController.getAllUsers);
  userRouter.get("/:id", userController.getById);
  userRouter.post("/", userController.create);
  userRouter.put("/:id", userController.update);
  userRouter.delete("/:id", userController.delete);
  userRouter.post("/login", userController.login);

  return userRouter;
};
