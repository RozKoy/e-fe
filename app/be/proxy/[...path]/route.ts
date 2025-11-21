import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//
interface Context {
    params: Promise<{ path: string[] }>;
}

//
async function handleRequest(req: Request, context: Context) {
    const { path } = await context.params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({}, { status: 401 });
    }

    const url = `${process.env.API_URL}/api/${path.join("/")}`;

    const body =
        req.method === "GET" || req.method === "HEAD"
            ? undefined
            : await req.text();

    const externalRes = await fetch(url, {
        method: req.method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": req.headers.get("Content-Type") ?? "",
        },
        body,
    });

    const rawBody = await externalRes.text();

    return new NextResponse(rawBody, {
        status: externalRes.status,
        headers: {
            "Content-Type":
                externalRes.headers.get("Content-Type") ?? "application/json",
        },
    });
}

export {
    handleRequest as GET,
    handleRequest as PUT,
    handleRequest as POST,
    handleRequest as DELETE,
};
