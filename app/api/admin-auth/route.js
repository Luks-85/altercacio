export async function POST(request) {
    const { motDePasse } = await request.json()
  
  if (motDePasse === process.env.ADMIN_PASSWORD) {
    return Response.json({ succes: true })
  }
  
  return Response.json({ succes: false }, { status: 401 })
}