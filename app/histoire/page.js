import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function Histoire() {
  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .order('numero', { ascending: false })

  return (
    <main className="min-h-screen px-6 md:px-16 py-12"
      style={{paddingLeft: '120px', paddingRight: '40px', backgroundColor: '#3D1F3A' }}>

      <p style={{ color: '#C9A84C', letterSpacing: '4px', fontSize: '13px' }}
        className="uppercase mb-4">
        Altercacio
      </p>

      <h1 style={{ color: '#EDE0C8', fontFamily: 'var(--font-playfair)' }}
        className="text-4xl mb-12">
        Archives
      </h1>

      <div className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))' }}>
        {questions?.map(q => (
          <Link href={`/histoire/${q.id}`} key={q.id}
            className="flex items-center justify-between p-6 group"
            style={{ border: '1px solid #6B3F6B' }}>
            <div>
              <p style={{ color: '#C9A84C', fontSize: '12px' }}
                className="uppercase tracking-widest mb-2">
                #Jour {q.numero}
              </p>
              <p style={{ color: '#EDE0C8', fontFamily: 'var(--font-playfair)' }}
                className="text-lg group-hover:opacity-70 transition-opacity">
                {q.texte}
              </p>
            </div>
            <p style={{ color: '#EDE0C8', opacity: 0.3 }}
              className="text-2xl ml-8">
              →
            </p>
          </Link>
        ))}
      </div>

    </main>
  )
}