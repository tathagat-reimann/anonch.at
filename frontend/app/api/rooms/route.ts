const API_BASE_URL = process.env.NEXT_PUBLIC_ANONCHAT_BACKEND_API_BASE_URL || "http://localhost:8080";

export async function POST(request: Request) {
  const response = await fetch(`${API_BASE_URL}/api/rooms`, { method: "POST" });
  
  return response;
}