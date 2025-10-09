import { NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";
import path from "path";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
        }

        // Fetch user data internally (directly calls your getUser route)
        const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL ||
            (process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : "http://localhost:3000");

        const userRes = await fetch(`${baseUrl}/api/getUser?email=${encodeURIComponent(email)}`);
        if (!userRes.ok) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const user = await userRes.json();

        // Load card background (public/cards/front_empty.png)
        const imgPath = path.join(process.cwd(), "public", "cards", "front_empty.png");
        const cardImage = await loadImage(imgPath);

        // Create canvas same size as card image
        const canvas = createCanvas(cardImage.width, cardImage.height);
        const ctx = canvas.getContext("2d");

        // Draw base image
        ctx.drawImage(cardImage, 0, 0, cardImage.width, cardImage.height);

        // Text styling & layout
        ctx.textBaseline = "middle";

        // Centered main info
        ctx.textAlign = "center";
        ctx.fillStyle = "#1e293b";
        ctx.font = `bold ${Math.floor(cardImage.height * 0.05)}px Arial`;
        ctx.fillText(user.displayName, cardImage.width / 2, cardImage.height * 0.57);

        ctx.font = `${Math.floor(cardImage.height * 0.028)}px Arial`;
        ctx.fillText(user.gdgId, cardImage.width / 2, cardImage.height * 0.62);

        // Bottom-left info
        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";
        ctx.font = `${Math.floor(cardImage.height * 0.025)}px Arial`;
        const startX = cardImage.width * 0.13;
        let startY = cardImage.height * 0.76;
        const lineHeight = cardImage.height * 0.045;

        ctx.fillText(`Name: ${user.name}`, startX, startY);
        ctx.fillText(`Email: ${user.email}`, startX, (startY += lineHeight));
        ctx.fillText(`Course: ${user.course}`, startX, (startY += lineHeight));

        // Convert to PNG buffer
        const buffer = canvas.toBuffer("image/png");

        // Convert Node.js Buffer to Uint8Array for NextResponse
        const uint8Array = new Uint8Array(buffer);

        // Return directly as an image response
        return new NextResponse(uint8Array, {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=3600", // cache for 1hr
            },
        });
    } catch (err) {
        console.error("Error generating ID:", err);
        return NextResponse.json({ error: "Failed to generate ID" }, { status: 500 });
    }
}
