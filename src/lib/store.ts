import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "smart-data");

function ensureDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function getFilePath(collection: string): string {
    ensureDir();
    return path.join(DATA_DIR, `${collection}.json`);
}

const cache = new Map<string, { data: any[]; mtime: number }>();

export function readCollection<T>(collection: string): T[] {
    const filePath = getFilePath(collection);
    try {
        const stat = fs.statSync(filePath);
        const mtime = stat.mtimeMs;
        const cached = cache.get(collection);
        if (cached && cached.mtime === mtime) return cached.data as T[];
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as T[];
        cache.set(collection, { data, mtime });
        return data;
    } catch {
        return [];
    }
}

export function writeCollection<T>(collection: string, data: T[]): void {
    const filePath = getFilePath(collection);
    ensureDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    cache.delete(collection);
}

export function findById<T extends { id: string }>(collection: string, id: string): T | null {
    const items = readCollection<T>(collection);
    return items.find((item) => item.id === id) || null;
}

export function createItem<T extends { id: string }>(collection: string, item: T): T {
    const items = readCollection<T>(collection);
    items.push(item);
    writeCollection(collection, items);
    return item;
}

export function updateItem<T extends { id: string }>(collection: string, id: string, updates: Partial<T>): T | null {
    const items = readCollection<T>(collection);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates };
    writeCollection(collection, items);
    return items[index];
}

export function deleteItem<T extends { id: string }>(collection: string, id: string): boolean {
    const items = readCollection<T>(collection);
    const filtered = items.filter((item) => item.id !== id);
    if (filtered.length === items.length) return false;
    writeCollection(collection, filtered);
    return true;
}

export function seedDefaults(collection: string, defaults: any[]): void {
    const existing = readCollection(collection);
    if (existing.length === 0) {
        writeCollection(collection, defaults);
    }
}
