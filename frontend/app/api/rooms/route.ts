const API_BASE_URL = process.env.NEXT_PUBLIC_ANONCHAT_BACKEND_API_BASE_URL || "http://localhost:8080";

export async function POST(request: Request) {
  const body = await request.json();
  
  const response = await fetch(`${API_BASE_URL}/api/rooms`, { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
  
  return response;
}