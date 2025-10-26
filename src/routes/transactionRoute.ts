import { Router } from "express";
import {
  createTransaction,
  getTransactions,
} from "../controller/customer.controller.js";

const route = Router({ mergeParams: true });

route.post("/transaction", createTransaction);
route.get("/transactions", getTransactions);

export default route;
