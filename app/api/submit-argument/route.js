import { supabase } from '@/lib/supabase'

export async function POST(request) {
  console.log('Route submit-argument appelée')
  const { question_id, pseudo, texte, reponse } = await request.json()
  
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'inconnue'

  const { error } = await supabase.from('arguments').insert({
    question_id,
    pseudo: pseudo || 'Anonyme',
    texte,
    reponse,
    visible: true,
    ip: ip.split(',')[0].trim()
  })

  if (error) {
    return Response.json({ succes: false }, { status: 500 })
  }

  return Response.json({ succes: true })
}