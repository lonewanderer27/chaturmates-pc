export async function GET(request: Request) {
  return new Response("Hello klasmeyt!", { status: 200 });
}

export async function POST(request: Request) {
  const { name } = await request.json();
  return new Response(`Hello klasmeyt ${name}!`, { status: 200 });
}
