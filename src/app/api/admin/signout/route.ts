import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();

    const sessionCookies = cookieStore.getAll().filter((c) =>
        c.name.startsWith("next-auth") || c.name.startsWith("__Secure-next-auth")
    );

    for (const cookie of sessionCookies) {
        cookieStore.delete(cookie.name);
    }

    return NextResponse.json({ ok: true });
}
