import express from "express";
import tryCatch from "../utils/tryCatch.js";
import {
  getEmployees,
  getEmployeeWithPhno,
  getGeneralRate,
  login,
  registerEmployee,
  resetPassword,
  setGeneralRate,
  updateEmployee,
} from "../controller/employee.controller.js";

const router = express.Router();

router.route("/").post(tryCatch(registerEmployee));
router.route("/generalRate").get(tryCatch(getGeneralRate))
router.route("/generalRate").post(tryCatch(setGeneralRate))
router.route("/login").post(tryCatch(login));
router.route("/list_all").get(tryCatch(getEmployees));
router.route("/:phno").get(tryCatch(getEmployeeWithPhno));
router.route("/:id").patch(tryCatch(updateEmployee));
router.route("/reset_password/:id").patch(tryCatch(resetPassword));



export default router;
