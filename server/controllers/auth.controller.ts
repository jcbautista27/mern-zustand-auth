import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const loginHandler = (req: Request, res: Response) => {
  //req.body = {email: "", password: "sddsdsd"}
  //validation, express-validator, joi , zod
  //store in database - mongodb , mysql , pg, etc
  //generar token - sdads234wsdafs432432sdfsfds

  const token = jwt.sign(
    {
      test: "test",
    },
    "secret",
    {
      expiresIn: 60 * 60 * 24,
    }
  );
  res.json({ token });
};

export const profileHandler = (req: Request, res: Response) => {
  res.json({
    profile: req.user,
    message: "profile data",
  });
};
