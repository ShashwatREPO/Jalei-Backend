import { Router, type Request, type Response } from "express";

const route = Router();

route.get("/friends");
route.post("/friends", async (req: Request, res: Response) => {});

export default route;
