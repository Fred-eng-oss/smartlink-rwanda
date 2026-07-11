import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, seedDefaults } from "@/lib/store";
import { defaultSettings } from "@/lib/data";

export async function GET() {
    try {
        seedDefaults("settings", Object.entries(defaultSettings).map(([key, value]) => ({ id: key, key, value })));
        const items = readCollection<{ id: string; key: string; value: string }>("settings");
        const settings: Record<string, string> = {};
        items.forEach((item) => {
            settings[item.key] = item.value;
        });
        return NextResponse.json(settings);
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const items = readCollection<{ id: string; key: string; value: string }>("settings");
        const map = new Map(items.map((i) => [i.key, i]));

        for (const [key, value] of Object.entries(body)) {
            if (map.has(key)) {
                map.get(key)!.value = value as string;
            } else {
                map.set(key, { id: key, key, value: value as string });
            }
        }

        writeCollection("settings", Array.from(map.values()));
        return NextResponse.json({ message: "Settings updated successfully." });
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
