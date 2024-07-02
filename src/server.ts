import express from "express";
import bodyParser from "body-parser";
import { createUserRouter } from "./routes/user";
import { UserModel } from "./models/mysql/user";

export const createApp = ({ userModel }: { userModel: UserModel }) => {
  const app = express();

  const userRouter = createUserRouter({ userModel });
  app.use(bodyParser.json());
  const port = 3000;

  app.use("/users", userRouter);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};
