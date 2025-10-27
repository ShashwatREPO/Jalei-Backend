import type {
  Employee,
  Roles,
  User,
} from "../../dist/generated/prisma/index.js";
import prisma from "../prisma.js";

export class EmployeeRepo {
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
    employeed: boolean;
  }> {
    const employee = await prisma.employee.create({
      data: {
        role,
        pin,
        User: {
          create: {
            fullname,
            phone_number: phoneNumber,
          },
        },
      },
      select: {
        role: true,
        employeed: true,
        id: true,
        User: { select: { fullname: true, phone_number: true } },
      },
    });

    return {
      id: employee.id,
      fullname: employee.User.fullname,
      phoneNumber: employee.User.phone_number,
      employeed: employee.employeed,
      role: employee.role,
    };
  }

  static async getUser(phoneNumber: string): Promise<User> {
    return await prisma.user.findUniqueOrThrow({
      where: { phone_number: phoneNumber, Employee: { isNot: null } },
    });
  }

  static async getEmployeeWithId(userId: string): Promise<Employee> {
    return await prisma.employee.findUniqueOrThrow({
      where: { user_id: userId },
    });
  }

  static async getEmployees(): Promise<Employee[]> {
    return await prisma.employee.findMany();
  }

  static async updateEmployee({
    id,
    data,
  }: {
    id: string;
    data: Partial<Pick<Employee, "isEmployed" | "role" | "pin">>;
  }): Promise<Employee> {
    return await prisma.employee.update({
      where: { user_id: id },
      data,
    });
  }
}
