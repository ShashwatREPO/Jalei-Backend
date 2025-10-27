import bcrypt from "bcrypt";

import { EmployeeRepo } from "../repository/employee.repository.js";
import type { Employee, Roles } from "../../dist/generated/prisma/index.js";
import AppError from "../types/AppError.js";

export class EmployeeService {
  static async createEmployee({
    fullname,
    role,
    phoneNumber,
    pin,
  }: {
    fullname: string;
    phoneNumber: string;
    role: Roles;
    pin: string;
  }): Promise<{
    id: string;
    fullname: string;
    phoneNumber: string;
    role: string;
    isEmployed: boolean;
  }> {
    const hashedPin = await bcrypt.hash(pin, 10);

    return await EmployeeRepo.createEmployee({
      fullname,
      role,
      pin: hashedPin,
      phoneNumber,
    });
  }
  static async getEmployeeWithPhno(phoneNumber: string) {
    return await EmployeeRepo.getUser(phoneNumber);
  }
  static async loginEmployee({
    userId,
    userPin,
  }: {
    userId: string;
    userPin: string;
  }): Promise<Omit<Employee, "pin">> {
    const { id, role, isEmployed, user_id, createdAt, pin } =
      await EmployeeRepo.getEmployeeWithId(userId);

    if (!id) throw new AppError("invalid credentials", "BAD_REQUEST", 400);

    const isValidPin = await bcrypt.compare(userPin, pin);

    if (!isValidPin)
      throw new AppError("invalid credentials", "BAD_REQUEST", 400);

    return {
      id,
      role,
      isEmployed,
      user_id,
      createdAt,
    };
  }

  static async getEmployees(): Promise<Employee[]> {
    return await EmployeeRepo.getEmployees();
  }

  static async updateEmployees({
    userId,
    data,
  }: {
    userId: string;
    data: Partial<Pick<Employee, "isEmployed" | "role">>;
  }): Promise<Employee> {
    return await EmployeeRepo.updateEmployee({ id: userId, data });
  }

  static async resetPassword({
    userId,
    newPassword,
  }: {
    userId: string;
    newPassword: string;
  }): Promise<Employee> {
    const hashPassword = await bcrypt.hash(newPassword, 10);

    return await EmployeeRepo.updateEmployee({
      id: userId,
      data: { pin: hashPassword },
    });
  }
}
