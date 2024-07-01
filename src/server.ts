import express from "express";
import bodyParser from "body-parser";
import { userRouter } from "./routes/user";

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
