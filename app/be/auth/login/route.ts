import { NextResponse } from "next/server";
import { ROUTE_LISTS } from "@/app/_constants/route";

//
export async function POST(req: Request) {
    const { email, password } = await req.json();

    const res = await fetch(
        process.env.API_URL + (ROUTE_LISTS.get("api-login") ?? "/"),
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        }
    );

    const data = await res.json();
    const token = data.data?.token;

    if (!res.ok || !token) {
        return NextResponse.json(data, { status: res.status });
    }

    const response = NextResponse.json({});

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    return response;
}
