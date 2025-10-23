import type { Customer, Status, User } from "../generated/prisma/index.js";
import { CustomerRepo } from "../repository/customer.repository.js";
import AppError from "../types/AppError.js";

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

  static async getCustomers({
    page,
    size,
  }: {
    page: number;
    size: number;
  }): Promise<User[]> {
    return CustomerRepo.getCustomers({ page, size });
  }

  static async getCustomer(userId: string): Promise<Customer | null> {
    return CustomerRepo.getCustomer(userId);
  }

  static async updateCustomer({
    userId,
    data,
  }: {
    userId: string;
    data: Partial<Pick<Customer, "address" | "subsrate" | "subs_status">>;
  }): Promise<Customer | null> {
    const customer: Customer = await CustomerRepo.getCustomer(userId);
    if (!customer) throw new AppError("not found", "BAD_REQUEST", 400);

    return await CustomerRepo.updateCustomer({ customerId: customer.id, data });
  }
}
