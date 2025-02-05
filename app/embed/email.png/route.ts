import { NextRequest } from "next/server";
import sharp from "sharp";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const domain = process.env.FRONTEND_URL!.split('https://')[1]

  if (!slug) {
    return new Response("Missing slug parameter", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
  }


  ///fetching link 
  try {
    const backendResponse = await axios.get(
      `https://${process.env.PRODUCTION_BACKEND_URL}/api/v1/url/${slug}`
    );

    const { url } = backendResponse.data;

    //if url does not exist sending no page found
    if (url == null) {
      return NextResponse.json({ error: "No page found " }, { status: 400 });
    }


    const width = 620;
    const height = 50;


    //status
    const statusColor = url.availability === "offline" ? "#4B4B4B" : "#00C853";
    const statusText =
      url.availability === "offline" ? "Offline at the moment" : "Online, visit to call";

    const image = await sharp({
      create: {
        width: width,
        height: height,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    })
      .composite([
        {
          input: Buffer.from(
            `<svg width="${width}" height="${height}">
              <circle cx="10" cy="20" r="8" fill="${statusColor}" />
              <text x="30" y="25" font-size="20" font-family="Arial" fill="black" font-weight="bold">${domain}/${slug}</text>
              <text x="30" y="45" font-size="16" font-family="Arial" fill="black">${statusText}</text>
            </svg>`
          ),
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toBuffer();

    return new Response(image, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="email.png"`,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching from Express server:", error);
    return NextResponse.json({ error: "No page found " }, { status: 400 });
  }
}
