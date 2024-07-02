import { createApp } from "./server";
import { UserModel } from "./models/mysql/user";

createApp({ userModel: UserModel });
