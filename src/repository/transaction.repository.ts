import type { TransactionModel } from "./../../dist/generated/prisma/models/Transaction.js";
import { Type } from "../../dist/generated/prisma/index.js";
import prisma from "../prisma.js";
import AppError from "../types/AppError.js";

export class TransactionRepo {
  static async createTransaction(
    customer_id: string,
    amount: number,
    type: Type,
    description: string
  ): Promise<{
    tx: TransactionModel;
    balance: number;
  }> {
    if (amount <= 0)
      throw new AppError(
        "Amount must be greater than 0",
        "INVALID_AMOUNT",
        400
      );

    const [tx, updateUser] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          customer_id,
          description,
          amount,
          type,
        },
      }),
      prisma.customer.update({
        where: {
          id: customer_id,
        },
        data: {
          balance:
            type == Type.CREDIT ? { increment: amount } : { decrement: amount },
          last_active: new Date(Date.now()),
        },
        select: {
          balance: true,
        },
      }),
    ]);

    return { tx: tx, balance: updateUser.balance };
  }

  static async getTransactions(customer_id: string): Promise<{
    transactions: TransactionModel[];
  }> {
    const result = await prisma.transaction.findMany({
      where: {
        customer_id: customer_id,
      },
    });

    return {
      transactions: result,
    };
  }
}
