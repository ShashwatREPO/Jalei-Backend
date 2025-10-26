import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../dist/generated/prisma/index.js";

export default new PrismaClient().$extends(withAccelerate());
