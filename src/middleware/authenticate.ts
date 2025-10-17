import type { NextFunction, Request, Response } from "express";
import prisma from "../prisma.js";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  if (await prisma.user.findFirst(username)) {
    next();
  } else {
    res.status(400).json({ message: "Invalid User" });
  }
};
