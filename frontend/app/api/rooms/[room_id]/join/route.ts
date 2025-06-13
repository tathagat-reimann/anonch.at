import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_ANONCHAT_BACKEND_API_BASE_URL || "http://localhost:8080";

export async function GET(request: Request, { params }: { params: { room_id: string } }) {
  // we will use params to access the data passed to the dynamic route
  params = await params
  const room_id = params.room_id;

  const ws = new WebSocket(`${API_BASE_URL}/api/rooms/${room_id}/join`);
  
  return NextResponse.json({ data: ws });
}