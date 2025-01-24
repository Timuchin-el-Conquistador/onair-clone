import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Get the IP address from the 'x-forwarded-for' header
  const ip = req.headers.get('x-forwarded-for') || req.ip;
console.log(ip)
  // Use a geolocation API to get the country from the IP
  const response = await fetch(`http://ip-api.com/json/${ip}?fields=country`);
  const data = await response.json();

  // Return the response with the IP and country data
  if (data && data.country) {
    return NextResponse.json({ ip, country: data.country });
  } else {
    return NextResponse.json({ error: 'Unable to fetch country data' });
  }
}