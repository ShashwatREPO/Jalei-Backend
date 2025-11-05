import type { NextFunction, Request, Response } from "express";
import AppError from "../types/AppError.js";
import { EmployeeService } from "../service/employee.service.js";
import type { Employee } from "../../dist/generated/prisma/index.js";
import { EmployeeRepo } from "../repository/employee.repository.js";

export async function registerEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { pin, phoneNumber, role, fullname } = req.body;

  if (!pin || !phoneNumber || !role || !fullname)
    throw new AppError("Invalid credentials", "BAD_REQUEST", 400);

  const employee = await EmployeeService.createEmployee({
    pin,
    phoneNumber,
    role,
    fullname,
  });

  return res.status(201).json({
    data: employee,
    message: "Employee registration successful",
  });
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { pin, userId } = req.body;

  if (!pin || !userId)
    throw new AppError("invalid credentials", "BAD_REQUEST", 400);

  const employee = await EmployeeService.loginEmployee({
    userId,
    userPin: pin,
  });

  return res.status(200).json({
    data: employee,
    message: "Employee login successful",
  });
}

export async function getEmployeeWithPhno(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const phoneNumber = req.params.phno;

  if (!phoneNumber)
    throw new AppError("invalid credentials", "BAD_REQUEST", 400);

  const employee = await EmployeeService.getEmployeeWithPhno(phoneNumber);

  return res.status(200).json({
    data: employee,
    message: "Employee fetch successful",
  });
}

export async function getEmployees(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const employees: Employee[] = await EmployeeService.getEmployees();

  return res.status(200).json({
    data: employees,
    message: "Employees list fetch successful",
  });
}

export async function updateEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { isEmployed, role } = req.body;
  const userId = req.params.id;

  if (!userId) throw new AppError("invalid credentials", "BAD_REQUEST", 400);

  const employee = await EmployeeService.updateEmployees({
    userId,
    data: { isEmployed, role },
  });

  return res.status(200).json({
    data: employee,
    message: "Employee Update sucessful",
  });
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const pin = req.body.pin;
  const userId = req.params.id;

  if (!userId) throw new AppError("invalid credentials", "BAD_REQUEST", 400);

  const employee = await EmployeeService.resetPassword({
    userId,
    newPassword: pin,
  });
  return res.status(200).json({
    data: employee,
    message: "Password reset successful",
  });
}

export async function setGeneralRate( 
  req: Request,
  res: Response,
  next: NextFunction
) {
    const rate = req.body.rate
    if (!rate) throw new AppError("invalid credentials", "BAD_REQUEST", 400);

    const generalRate = await EmployeeRepo.setGeneralRate(rate)

    return res.status(201).json({
      data: generalRate,
      message: "New rate set"
    })
  }
export async function getGeneralRate(
  req: Request,
  res: Response,
  next: NextFunction 
){
    const generalRate = await EmployeeRepo.getGeneralRate()

    return res.status(200).json({
      data: generalRate,
      message: "fetched general rate"
    })
  }