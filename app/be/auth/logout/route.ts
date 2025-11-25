import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ message: "Berhasil keluar" });

    response.cookies.set("token", "", {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 0,
    });

    return response;
}
