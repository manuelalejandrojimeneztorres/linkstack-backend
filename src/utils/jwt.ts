import jwt, { JwtPayload } from "jsonwebtoken";

export const generateJWT = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not defined.");
  }

  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });

  return token;
};
