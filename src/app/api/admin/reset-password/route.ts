import { NextRequest, NextResponse } from "next/server";
import { resetAdminPassword } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, newPassword, confirmPassword } = body;

        if (!email || !newPassword || !confirmPassword) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        if (newPassword !== confirmPassword) {
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
        }

        const result = await resetAdminPassword(email, newPassword);
        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json({ message: "Password reset successfully. You can now log in." });
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
