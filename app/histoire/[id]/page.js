import { supabase } from '@/lib/supabase'

export default async function QuestionArchive({ params }) {
  const { id } = await params
  
  const { data: question } = await supabase
    .from('questions')
    .select('*')
    .eq('id', id)
    .single()

  const { data: votes } = await supabase
    .from('votes')
    .select('*')
    .eq('question_id', id)

  const { data: arguments_ } = await supabase
    .from('arguments')
    .select('*')
    .eq('question_id', id)
    .eq('visible', true)

  const total = votes?.length || 0
  const oui = votes?.filter(v => v.reponse === 'OUI').length || 0
  const non = votes?.filter(v => v.reponse === 'NON').length || 0
  const pourcentageOui = total > 0 ? Math.round((oui / total) * 100) : 0
  const pourcentageNon = total > 0 ? Math.round((non / total) * 100) : 0

  return (
    <main className="min-h-screen md:pl-32 md:pr-10 px-6"
      style={{backgroundColor: '#3D1F3A' }}>

      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <p style={{ color: '#C9A84C', letterSpacing: '4px', fontSize: '13px' }}
          className="uppercase mb-4">
          #Jour {question?.numero}
        </p>

        <h1 style={{ color: '#EDE0C8', fontFamily: 'var(--font-playfair)' }}
          className="text-3xl max-w-2xl mb-4">
          {question?.texte}
        </h1>

        <p style={{ color: '#EDE0C8', opacity: 0.5, fontFamily: 'var(--font-garamond)' }}
          className="text-lg italic max-w-2xl mb-25">
          {question?.contexte}
        </p>

        {/* Pourcentages */}
        <div className="grid grid-cols-2 gap-8">
         <div className="text-center text-3xl md:text-5xl mb-2"
         style={{ borderRight: '1px solid #6B3F6B' }}>
            <p style={{ color: '#C9A84C', fontFamily: 'var(--font-playfair)' }}
              className="text-5xl mb-2">
              {pourcentageOui}%
            </p>
            <p style={{ color: '#EDE0C8', opacity: 0.5 }}
              className="uppercase tracking-widest text-sm">
              Oui
            </p>
         </div>
          <div className="text-center text-3xl md:text-5xl mb-2"
           style={{ borderLeft: '1px solid #6B3F6B' }}>
            <p style={{ color: '#C9A84C', fontFamily: 'var(--font-playfair)' }}
              className="text-5xl mb-2">
              {pourcentageNon}%
            </p>
            <p style={{ color: '#EDE0C8', opacity: 0.5 }}
              className="uppercase tracking-widest text-sm">
              Non
            </p>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="w-full mb-10 flex mt-4"
          style={{ height: '2px' }}>
          <div style={{
            width: `${pourcentageOui}%`,
            backgroundColor: '#C9A84C'
          }}/>
          <div style={{
            width: `${pourcentageNon}%`,
            backgroundColor: '#6B3F6B'
          }}/>
        </div>

        {/* Colonnes d'arguments */}
        <div className="grid grid-cols-2 gap-8">

          <div>
            <p style={{ color: '#C9A84C' }}
              className="uppercase tracking-widest text-sm mb-4">
              Arguments OUI
            </p>
            <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
              {arguments_
                ?.filter(a => a.reponse === 'OUI')
                .map(a => (
                  <div key={a.id} className="mb-4 p-4"
                    style={{ border: '1px solid #6B3F6B' }}>
                    <p style={{ color: '#C9A84C', fontSize: '12px' }}
                      className="uppercase tracking-widest mb-2">
                      {a.pseudo}
                    </p>
                    <p style={{ color: '#EDE0C8', fontFamily: 'var(--font-garamond)' }}
                      className="text-base leading-relaxed break-words">
                      {a.texte}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <p style={{ color: '#C9A84C' }}
              className="uppercase tracking-widest text-sm mb-4">
              Arguments NON
            </p>
            <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
              {arguments_
                ?.filter(a => a.reponse === 'NON')
                .map(a => (
                  <div key={a.id} className="mb-4 p-4"
                    style={{ border: '1px solid #6B3F6B' }}>
                    <p style={{ color: '#C9A84C', fontSize: '12px' }}
                      className="uppercase tracking-widest mb-2">
                      {a.pseudo}
                    </p>
                    <p style={{ color: '#EDE0C8', fontFamily: 'var(--font-garamond)' }}
                      className="text-base leading-relaxed break-words">
                      {a.texte}
                    </p>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}