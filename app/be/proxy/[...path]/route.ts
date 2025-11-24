import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface Context {
    params: Promise<{ path: string[] }>;
}

async function handleRequest(req: Request, context: Context) {
    const { path } = await context.params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({}, { status: 401 });
    }

    const url = `${process.env.API_URL}/api/${path.join("/")}${
        new URL(req.url).search
    }`;

    const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
    };

    let body: BodyInit | undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
        const contentType = req.headers.get("Content-Type") || "";

        if (contentType.includes("multipart/form-data")) {
            body = await req.formData();
        } else if (contentType.includes("application/json")) {
            body = JSON.stringify(await req.json());
            headers["Content-Type"] = "application/json";
        } else {
            body = await req.text();
            if (contentType) headers["Content-Type"] = contentType;
        }
    }

    const externalRes = await fetch(url, {
        method: req.method,
        headers,
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
    handleRequest as PATCH,
    handleRequest as DELETE,
    handleRequest as OPTIONS,
};
