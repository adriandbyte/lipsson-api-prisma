import { User } from "@prisma/client";
import crypto from "crypto";

interface ErrorResponse {
  error: { message: string };
}

export function isErrorResponse(
  response: User | ErrorResponse
): response is ErrorResponse {
  return (response as ErrorResponse).error !== undefined;
}

const SECRET = "mysecret";

export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
