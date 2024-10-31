import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
console.log("Connected to DB")

export const Admin = prisma.admin;
export const Category = prisma.category;
export const Product = prisma.product;
export const History = prisma.history;

export default prisma;