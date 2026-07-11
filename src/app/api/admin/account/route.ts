import { NextRequest, NextResponse } from "next/server";
import { changeAdminPassword, updateAdminProfile, getAdminByEmail } from "@/lib/admin-auth";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const admin = await getAdminByEmail(session.user.email);
        return NextResponse.json({
            id: session.user.id,
            name: admin?.name || session.user.name || "Admin",
            email: admin?.email || session.user.email,
            role: session.user.role || "ADMIN",
        });
    } catch {
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, email, currentPassword, newPassword } = body;

        if (currentPassword && newPassword) {
            const result = await changeAdminPassword(session.user.id, currentPassword, newPassword);
            if (!result.success) {
                return NextResponse.json({ error: result.error }, { status: 400 });
            }
            return NextResponse.json({ message: "Password changed successfully" });
        }

        if (name || email) {
            const updated = await updateAdminProfile(session.user.id, { name, email });
            if (!updated) {
                return NextResponse.json({ error: "Failed to update profile" }, { status: 400 });
            }
            return NextResponse.json({
                message: "Profile updated successfully",
                name: updated.name,
                email: updated.email,
            });
        }

        return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 });
    }
}
