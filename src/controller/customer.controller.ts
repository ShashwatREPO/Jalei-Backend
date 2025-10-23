import AppError from "../types/AppError.js";
import { CustomerService } from "../service/customer.service.js";
import type { Request, Response, NextFunction } from "express";
import { stringify } from "querystring";
import { json } from "stream/consumers";

export async function registerCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { fullname, address, phoneNumber, balance, subs_status, subsrate } =
    req.body;

  if (!fullname || !phoneNumber)
    throw new AppError("invalid credentials", "REGISTRATION_ERROR", 400);

  const customer = await CustomerService.createCustomer({
    fullname,
    address,
    phoneNumber,
    balance,
    subs_status,
    subsrate,
  });

  return res.status(201).json({
    data: customer,
    message: "Customer registration successful",
  });
}

export async function getCustomers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 5;
  const customers = await CustomerService.getCustomers({ page, size });

  return res.status(200).json({
    data: customers,
    message: "customer fetch successful",
  });
}

export async function getCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let { id } = req.params;
  if (!id) throw new AppError("invalid input", "BAD_REQUEST", 400);
  id = id.toString();
  const customer = await CustomerService.getCustomer(id);

  return res.status(200).json({
    data: customer,
    message: "Customer profile fetch successful",
  });
}

export async function updateCustomer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  if (!id) throw new AppError("invalid input", "BAD_REQUEST", 400);

  const { address, subsrate, subs_status } = req.body;

  const customer = await CustomerService.updateCustomer({
    userId: id,
    data: { address, subs_status, subsrate },
  });

  return res
    .status(200)
    .json({ data: customer, message: "Customer Update successful" });
}
