import { PrismaClient } from "@prisma/client";

// Prisma Client is instantiated here 
const prisma = global.prisma || new PrismaClient(); 

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export { prisma };