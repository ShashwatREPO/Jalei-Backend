import { Type } from "../../dist/generated/prisma/index.js";
import { TransactionRepo } from "../repository/transaction.repository.js";
import AppError from "../types/AppError.js";

export class TransactionService {
  static async addTransaction(
    customer_id: string,
    employee_id: string,
    amount: number,
    type: Type,
    description: string
  ) {
    if (amount <= 0) {
      throw new AppError(
        "Amount cannot be negative or zero",
        "TRANSACTION_ERROR",
        400
      );
    }

    const result = await TransactionRepo.createTransaction(
      customer_id,
      employee_id,
      amount,
      type,
      description
    );

    return { tx: result.tx, balance: result.balance };
  }

  static async getTransactions(customer_id: string) {
    const result = await TransactionRepo.getTransactions(customer_id);

    return { transactions: result.transactions };
  }
}
