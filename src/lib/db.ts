import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const isDbConfigured =
    process.env.DATABASE_URL &&
    !process.env.DATABASE_URL.includes("johndoe") &&
    !process.env.DATABASE_URL.includes("randompassword");

// Create a lightweight mock db that returns empty results when no real database is configured
const createMockDb = () => {
    const handler: ProxyHandler<any> = {
        get(_target, prop) {
            if (prop === Symbol.toPrimitive) return () => "[MockDB]";
            if (prop === Symbol.toStringTag) return "MockDB";
            // Return a function that returns empty array or null
            return (..._args: any[]) => {
                if (prop === "findUnique" || prop === "findFirst" || prop === "findUniqueOrThrow" || prop === "findFirstOrThrow") {
                    return Promise.resolve(null);
                }
                if (prop === "create" || prop === "update" || prop === "delete") {
                    return Promise.resolve({});
                }
                // findMany and aggregates return empty array
                return Promise.resolve([]);
            };
        },
    };
    return new Proxy({}, handler);
};

export const db = (() => {
    if (!isDbConfigured) {
        return createMockDb();
    }

    try {
        const { PrismaPg } = require("@prisma/adapter-pg");
        const prismaOptions = {
            adapter: new PrismaPg(process.env.DATABASE_URL),
        };

        return (
            globalForPrisma.prisma ??
            new PrismaClient(prismaOptions as ConstructorParameters<typeof PrismaClient>[0])
        );
    } catch {
        return createMockDb();
    }
})();

if (isDbConfigured && process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db;
}
