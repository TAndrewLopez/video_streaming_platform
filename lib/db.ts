import { PrismaClient } from "@prisma/client";

// FIX HOT RELOAD ISSUE CREATING MULTIPLE PRISMA CLIENTS OUTSIDE OF PRODUCTION

declare global {
    var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;