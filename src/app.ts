import express from "express";
import cors from "cors";
import customerRouter from "./routes/customer.router.js";
import employeeRouter from "./routes/employee.router.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use("/api/v1/", customerRouter);
app.use("/api/v1/employee", employeeRouter);
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
