export async function GET() {
  // triggers sync API internally
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/instagram/sync`);
  const data = await res.json();

  return Response.json(data);
}