import type { Status } from "../generated/prisma/index.js";
import { CustomerRepo } from "../repository/user.repository.js";

export class CustomerService {
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
    return CustomerRepo.createCustomer({
      fullname,
      address,
      phoneNumber,
      balance,
      subs_status,
      subsrate,
    });
  }
}
