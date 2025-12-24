import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
