import { NextResponse } from "next/server";
<<<<<<< HEAD
import { ImageResponse } from "@vercel/og";
import React from "react";

export const runtime = "edge"; // optimized for image generation on Vercel Edge
export const revalidate = 3600; // ✅ cache for 1 hour (you can adjust this)
=======
import { createCanvas, loadImage } from "canvas";
import path from "path";
>>>>>>> 9418ebc95fdf24e6dace6fc9aa3dcdfe44021060

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json({ error: "Missing email parameter" }, { status: 400 });
        }

<<<<<<< HEAD
        // Base URL setup
=======
        // Fetch user data internally (directly calls your getUser route)
>>>>>>> 9418ebc95fdf24e6dace6fc9aa3dcdfe44021060
        const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL ||
            (process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : "http://localhost:3000");

<<<<<<< HEAD
        // ✅ Cached fetch (for production efficiency)
        const userRes = await fetch(`${baseUrl}/api/getUser?email=${encodeURIComponent(email)}`, {
            cache: "force-cache", // uses cached response unless data changes
            next: { revalidate: 3600 }, // revalidate every hour
        });

=======
        const userRes = await fetch(`${baseUrl}/api/getUser?email=${encodeURIComponent(email)}`);
>>>>>>> 9418ebc95fdf24e6dace6fc9aa3dcdfe44021060
        if (!userRes.ok) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const user = await userRes.json();

<<<<<<< HEAD
        // ================================================================
        //  BACKGROUND CARD ASSET
        // ================================================================
        const cardImageUrl = `${baseUrl}/cards/front_empty.png`;

        // ================================================================
        //  PNG DIMENSIONS
        // ================================================================
        const CARD_WIDTH = 373;
        const CARD_HEIGHT = 558;

        // ================================================================
        //  STYLE DEFINITIONS 
        // ================================================================
        const styles = {
            container: {
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0)", // transparent
            } as React.CSSProperties,

            background: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
            } as React.CSSProperties,

            // Display Name
            displayName: {
                position: "absolute",
                top: "57%", // Adjust for vertical positioning
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#1e293b",
                fontSize: 26,
                fontWeight: 700,
                textAlign: "center",
                whiteSpace: "nowrap",
            } as React.CSSProperties,

            // GDG ID
            gdgId: {
                position: "absolute",
                top: "59.5%", // Adjust for proximity to name
                left: "50%",
                transform: "translateX(-50%)",
                color: "#64748b",
                fontSize: 14,
                fontWeight: 500,
                textAlign: "center",
            } as React.CSSProperties,

            // Lower Details
            details: {
                position: "absolute",
                top: "73%",
                left: "13%",
                width: "80%",
                color: "#ffffff",
                fontSize: 12,
                lineHeight: 1.5,
                fontWeight: 400,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                textAlign: "left",
            } as React.CSSProperties,
        };

        // ================================================================
        // 🖼️ GENERATE IMAGE CONTENT
        // ================================================================
        const image = new ImageResponse(
            React.createElement(
                "div",
                { style: styles.container },
                [
                    React.createElement("img", { key: "bg", src: cardImageUrl, style: styles.background }),
                    React.createElement("div", { key: "name", style: styles.displayName }, user.displayName),
                    React.createElement("div", { key: "id", style: styles.gdgId }, user.gdgId),
                    React.createElement(
                        "div",
                        { key: "details", style: styles.details },
                        [
                            `Name: ${user.name}`,
                            `Email: ${user.email}`,
                            `Course: ${user.course}`,
                        ].map((text, i) => React.createElement("div", { key: i }, text))
                    ),
                ]
            ),
            {
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
            }
        );

        // ================================================================
        // 🧾 ADD DOWNLOAD HEADERS 
        // ================================================================
        const filename = `${user.displayName.replace(/\s+/g, "_")}_GDG_PUP_ID.png`;

        return new Response(await image.arrayBuffer(), {
            headers: {
                "Content-Type": "image/png",
                "Content-Disposition": `inline; filename="${filename}"`,
                "Cache-Control": "public, max-age=3600, s-maxage=3600, immutable", // ✅ cache for 1h
=======
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
>>>>>>> 9418ebc95fdf24e6dace6fc9aa3dcdfe44021060
            },
        });
    } catch (err) {
        console.error("Error generating ID:", err);
        return NextResponse.json({ error: "Failed to generate ID" }, { status: 500 });
    }
}
