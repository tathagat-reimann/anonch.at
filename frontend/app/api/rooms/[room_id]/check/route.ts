const API_BASE_URL = process.env.NEXT_PUBLIC_ANONCHAT_BACKEND_API_BASE_URL || "http://localhost:8080";

export async function GET(request: Request, { params }: { params: { room_id: string } }) {
  // we will use params to access the data passed to the dynamic route
  params = await params
  const room_id = params.room_id;

  const response = await fetch(`${API_BASE_URL}/api/rooms/${room_id}/check`, { method: "GET" });
  
  return response;
}