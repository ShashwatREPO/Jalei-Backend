import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import AppError from "../types/AppError.js";

export default async (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    res
      .status(error.status)
      .json({ sucess: false, code: error.code, error: error.message });
    return;
  }
  console.log(error);
  res.status(500).json({
    sucess: false,
    code: "INTERNAL_SERVER_ERROR",
    error: "Something unexpected occurred!!!",
    ms: error,
  });
};
