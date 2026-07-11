const globalForPrisma = globalThis as unknown as { prisma: any | undefined };

const isDbConfigured =
    process.env.DATABASE_URL &&
    !process.env.DATABASE_URL.includes("johndoe") &&
    !process.env.DATABASE_URL.includes("randompassword");

const createMockDb = () => {
    const handler: ProxyHandler<any> = {
        get(_target, prop) {
            if (prop === Symbol.toPrimitive) return () => "[MockDB]";
            if (prop === Symbol.toStringTag) return "MockDB";
            return (..._args: any[]) => {
                if (prop === "findUnique" || prop === "findFirst" || prop === "findUniqueOrThrow" || prop === "findFirstOrThrow") {
                    return Promise.resolve(null);
                }
                if (prop === "create" || prop === "update" || prop === "delete") {
                    return Promise.resolve({});
                }
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
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { PrismaClient } = require("@prisma/client");
        return (
            globalForPrisma.prisma ??
            new PrismaClient()
        );
    } catch {
        return createMockDb();
    }
})();

if (isDbConfigured && process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db;
}
