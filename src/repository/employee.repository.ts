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
    isEmployed: boolean;
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
        isEmployed: true,
        id: true,
        User: { select: { fullname: true, phone_number: true } },
      },
    });

    return {
      id: employee.id,
      fullname: employee.User.fullname,
      phoneNumber: employee.User.phone_number,
      isEmployed: employee.isEmployed,
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

  static async getEmployees(): Promise<
    (Employee & { User: { fullname: string; phone_number: string } })[]
  > {
    return await prisma.employee.findMany({
      include: {
        User: {
          select: {
            fullname: true,
            phone_number: true,
          },
        },
      },
    });
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
  static async setGeneralRate(rate: number): Promise<GeneralRate> {
    return prisma.generalRate.create({
      data: { rate },
    });
  }
  static async getGeneralRate(): Promise<GeneralRate[]> {
    return prisma.generalRate.findMany({
      orderBy: { createdAt: "desc" },
      take: 2,
    });
  }
}
