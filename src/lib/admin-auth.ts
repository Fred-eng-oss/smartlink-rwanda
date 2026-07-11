import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const DATA_DIR = path.join(process.cwd(), "smart-data");
const USERS_FILE = path.join(DATA_DIR, "admin-users.json");

export interface AdminUser {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
    role: "ADMIN";
    createdAt: string;
    updatedAt: string;
}

function ensureDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

let cachedUsers: AdminUser[] | null = null;

function readUsers(): AdminUser[] {
    if (cachedUsers) return cachedUsers;
    ensureDir();
    if (!fs.existsSync(USERS_FILE)) return [];
    try {
        cachedUsers = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8")) as AdminUser[];
        return cachedUsers;
    } catch {
        return [];
    }
}

function writeUsers(users: AdminUser[]) {
    ensureDir();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
    cachedUsers = users;
}

function invalidateCache() { cachedUsers = null; }

const DEFAULT_ADMIN_EMAIL = "elysecag@gmail.com";
const DEFAULT_ADMIN_NAME = "Elyse Mugisha";
const DEFAULT_ADMIN_PASSWORD = "Password@123";

let seededHash: string | null = null;

export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
    const users = readUsers();

    if (users.length === 0) {
        if (!seededHash) seededHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
        const admin: AdminUser = {
            id: "admin-001",
            email: DEFAULT_ADMIN_EMAIL,
            name: DEFAULT_ADMIN_NAME,
            passwordHash: seededHash,
            role: "ADMIN",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        writeUsers([admin]);
        return admin.email === email ? admin : null;
    }

    return users.find((u) => u.email === email) || null;
}

export async function verifyAdminPassword(email: string, password: string): Promise<AdminUser | null> {
    const admin = await getAdminByEmail(email);
    if (!admin) return null;
    const valid = await bcrypt.compare(password, admin.passwordHash);
    return valid ? admin : null;
}

export async function updateAdminProfile(
    id: string,
    data: { name?: string; email?: string }
): Promise<AdminUser | null> {
    const users = readUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    if (data.email && data.email !== users[index].email) {
        const exists = users.find((u) => u.email === data.email && u.id !== id);
        if (exists) throw new Error("Email already in use");
    }

    users[index] = {
        ...users[index],
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        updatedAt: new Date().toISOString(),
    };
    writeUsers(users);
    return users[index];
}

export async function changeAdminPassword(
    id: string,
    currentPassword: string,
    newPassword: string
): Promise<{ success: boolean; error?: string }> {
    const users = readUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return { success: false, error: "User not found" };

    const valid = await bcrypt.compare(currentPassword, users[index].passwordHash);
    if (!valid) return { success: false, error: "Current password is incorrect" };

    if (newPassword.length < 8) return { success: false, error: "Password must be at least 8 characters" };
    if (!/[A-Z]/.test(newPassword)) return { success: false, error: "Password must contain an uppercase letter" };
    if (!/[a-z]/.test(newPassword)) return { success: false, error: "Password must contain a lowercase letter" };
    if (!/[0-9]/.test(newPassword)) return { success: false, error: "Password must contain a number" };

    users[index].passwordHash = await bcrypt.hash(newPassword, 10);
    users[index].updatedAt = new Date().toISOString();
    writeUsers(users);
    return { success: true };
}

export async function resetAdminPassword(
    email: string,
    newPassword: string
): Promise<{ success: boolean; error?: string }> {
    const users = readUsers();
    const index = users.findIndex((u) => u.email === email);
    if (index === -1) return { success: false, error: "No account found with that email" };

    if (newPassword.length < 8) return { success: false, error: "Password must be at least 8 characters" };
    if (!/[A-Z]/.test(newPassword)) return { success: false, error: "Password must contain an uppercase letter" };
    if (!/[a-z]/.test(newPassword)) return { success: false, error: "Password must contain a lowercase letter" };
    if (!/[0-9]/.test(newPassword)) return { success: false, error: "Password must contain a number" };

    users[index].passwordHash = await bcrypt.hash(newPassword, 10);
    users[index].updatedAt = new Date().toISOString();
    writeUsers(users);
    return { success: true };
}
