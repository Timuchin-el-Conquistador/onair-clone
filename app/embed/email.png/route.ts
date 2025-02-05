import { NextRequest } from "next/server";
import { createCanvas } from "canvas";
import axios from "axios";

import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  /*if (!slug) {
    return new Response(JSON.stringify("Missing slug parameter"), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }*/ //as json

  if (!slug) {
    return new Response("Missing slug parameter", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
  } //text
  try {
    // Example: Make a GET request to your external Express server or any backend
    const backendResponse = await axios.get(
      `${process.env.PRODUCTION_BACKEND_URL}/api/v1/url/${slug}`
    );

    const { url } = backendResponse.data;
    const width = 400;
    const height = 50;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background (White)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);

    // Status color
    const statusColor = url.availability === "offline" ? "#4B4B4B" : "#00C853";
    const statusText =
      url.availability === "offline"
        ? "Offline at the moment"
        : "Online, visit to call";

    // Status dot
    ctx.fillStyle = statusColor;
    ctx.beginPath();
    ctx.arc(10, 20, 6, 0, Math.PI * 2);
    ctx.fill();

    // Text
    ctx.fillStyle = "#000000";
    ctx.font = "bold 20px Arial";
    ctx.fillText(`onair.io/${slug}`, 30, 25);

    ctx.font = "16px Arial";
    ctx.fillText(statusText, 30, 45);

    // Convert to PNG buffer
    const imageBuffer = canvas.toBuffer("image/png");

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="email.png"`,
      },
    });
  } catch (error) {
    console.error("Error fetching from Express server:", error);
    return NextResponse.json({ error: "No page found " }, { status: 500 });
  }
}
