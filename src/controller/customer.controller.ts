import AppError from "../types/AppError.js";
import { CustomerService } from "../service/customer.service.js";
import type { Request, Response, NextFunction } from "express";

export async function registerCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { fullname, address, phoneNumber, balance, subs_status, subsrate } =
    req.body;

  if (!fullname || !phoneNumber)
    throw new AppError("invalid credentials", "REGISTRATION_ERROR", 400);

  const user = await CustomerService.createCustomer({
    fullname,
    address,
    phoneNumber,
    balance,
    subs_status,
    subsrate,
  });

  return res.status(201).json({
    data: user,
    message: "User registration successfull",
  });
}
