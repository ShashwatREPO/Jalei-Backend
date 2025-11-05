import { NODATA, NOTFOUND } from "dns";
import type {
  Customer,
  Prisma,
  Status,
  User,
} from "../../dist/generated/prisma/index.js";
import prisma from "../prisma.js";

type UserWithCustomer = Prisma.UserGetPayload<{
  select: {
    phone_number: true;
    fullname: true;
    createdAt: true;
    Customer: true;
  };
}>;

export class CustomerRepo {
  static async createCustomer({
    fullname,
    address,
    phoneNumber,
    balance,
    subs_status,
    subsrate,
  }: {
    fullname: string;
    address: string | null;
    phoneNumber: string;
    balance: number;
    subsrate: number;
    subs_status: Status;
  }): Promise<{
    id: string;
    fullname: string;
    phoneNumber: string;
    subsrate: number;
    address: string | null;
    balance: number;
    subs_status: Status;
  }> {
    if (address == null) address = "";
    const customer = await prisma.customer.create({
      data: {
        address,
        subsrate,
        subs_status,
        balance,
        User: {
          create: {
            fullname,
            phone_number: phoneNumber,
          },
        },
      },
      select: {
        id: true,
        address: true,
        balance: true,
        subs_status: true,
        last_active: true,
        subsrate: true,
        User: { select: { fullname: true, phone_number: true } },
      },
    });

    return {
      id: customer.id,
      fullname: customer.User.fullname,
      phoneNumber: customer.User.fullname,
      address: customer.address,
      balance: customer.balance,
      subs_status: customer.subs_status,
      subsrate: customer.subsrate,
    };
  }
  static async getCustomers({
    page = 1,
    size = 5,
  }: {
    page: number;
    size: number;
  }): Promise<{customers: User[] ,count: number}> {
    const count = await prisma.customer.count();
    const customers = await prisma.user.findMany({
      where: {
        Customer: {
          isNot: null,
        },
      },
      skip: (page - 1) * size,
      take: size,
      orderBy: {createdAt: 'desc'}
    });

    return {customers, count}
  }
  static async getCustomer(userId: string): Promise<Customer> {
    return await prisma.customer.findUniqueOrThrow({
      where: { user_id: userId },
    });
  }

  static async updateCustomer({
    customerId,
    data,
  }: {
    customerId: string;
    data: Partial<Pick<Customer, "address" | "subsrate" | "subs_status">>;
  }): Promise<Customer> {
    return await prisma.customer.update({
      where: { id: customerId },
      data,
    });
  }
  static async getUser(phoneNumber: string): Promise<UserWithCustomer> {
      return await prisma.user.findUniqueOrThrow({
        where: { phone_number: phoneNumber, Customer: { isNot: null } },
        select : {Customer: true, phone_number: true, fullname: true, createdAt: true},
      });
    }
}
