import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Unathorized" });

  const token: string | any = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unathorized" });

  jwt.verify(
    token,
    "secret",
    (err: jwt.VerifyErrors | null, user: JwtPayload | string | undefined) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      req.user = user;

      next();
    }
  );
};
