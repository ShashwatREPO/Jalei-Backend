import express from "express";
import tryCatch from "../utils/tryCatch.js";
import {
  getCustomer,
  getCustomers,
  registerCustomer,
  updateCustomer,
} from "../controller/customer.controller.js";

const router = express.Router();

router.route("/customer").post(tryCatch(registerCustomer));
router.route("/customers").get(tryCatch(getCustomers));
router.route("/customer/:id").get(tryCatch(getCustomer));
router.route("/customer/:id").patch(tryCatch(updateCustomer));

export default router;
