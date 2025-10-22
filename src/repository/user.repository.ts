import type { Customer, Status, User } from "../generated/prisma/index.js";
import prisma from "../prisma.js";

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
    fullname: string;
    phoneNumber: string;
    subsrate: number;
    address: string | null;
    balance: number;
    subs_status: Status;
  } | null> {
    if (address == null) address = "";
    const customer = await prisma.customer.create({
      data: {
        address,
        User: {
          create: {
            fullname,
            phone_number: phoneNumber,
          },
        },
      },
      select: {
        address: true,
        balance: true,
        subs_status: true,
        last_active: true,
        subsrate: true,
        User: { select: { fullname: true, phone_number: true } },
      },
    });

    return {
      fullname: customer.User.fullname,
      phoneNumber: customer.User.fullname,
      address: customer.address,
      balance: customer.balance,
      subs_status: customer.subs_status,
      subsrate: customer.subsrate,
    };
  }
}
