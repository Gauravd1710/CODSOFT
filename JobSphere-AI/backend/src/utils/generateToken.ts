import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (
  id: string,
  role: string
): string => {
  return jwt.sign(
    {
      id,
      role
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRE as jwt.SignOptions["expiresIn"]
    }
  );
};
