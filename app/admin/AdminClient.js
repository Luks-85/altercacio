'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminClient({ questions, args }) {
  const [onglet, setOnglet] = useState('questions')
  const [numero, setNumero] = useState('')
  const [texte, setTexte] = useState('')
  const [contexte, setContexte] = useState('')
  const [publieLe, setPublieLe] = useState('')
  const [message, setMessage] = useState('')
  const [connecte, setConnecte] = useState(false)
  const [motDePasse, setMotDePasse] = useState('')

async function verifierMotDePasse() {
  const response = await fetch('/api/admin-auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ motDePasse })
  })
  
  const data = await response.json()
  
  if (data.succes) {
    setConnecte(true)
  } else {
    setMessage('Mot de passe incorrect.')
  }
}

  async function publierQuestion() {
    if (!texte || !numero) return

    await supabase.from('questions').update({ active: false }).eq('active', true)

    await supabase.from('questions').insert({
      numero: parseInt(numero),
      texte: texte,
      contexte: contexte,
      active: true,
      publie_le: publieLe || new Date().toISOString()
    })

    setMessage('Question publiée avec succès.')
    setNumero('')
    setTexte('')
    setContexte('')
    setPublieLe('')
  }

  async function toggleVisible(id, visible) {
    await supabase
      .from('arguments')
      .update({ visible: !visible })
      .eq('id', id)
    setMessage(visible ? 'Argument masqué.' : 'Argument restauré.')
  }

if (!connecte) {
  return (
   <main className="min-h-screen px-6 md:pl-32 md:pr-10 py-12"
      style={{ backgroundColor: '#3D1F3A' }}>
      <div className="flex flex-col gap-4 max-w-sm w-full">
        <p style={{ color: '#C9A84C', letterSpacing: '4px', fontSize: '13px' }}
          className="uppercase text-center mb-4">
          Accès restreint
        </p>
        <input
          type="password"
          placeholder="Mot de passe..."
          value={motDePasse}
          onChange={e => setMotDePasse(e.target.value)}
          className="w-full p-4 outline-none"
          style={{
            backgroundColor: '#2A1F28',
            color: '#EDE0C8',
            border: '1px solid #6B3F6B',
            fontFamily: 'var(--font-garamond)',
            fontSize: '16px'
          }}
        />
        <button
          onClick={verifierMotDePasse}
          style={{ backgroundColor: '#6B3F6B', color: '#EDE0C8' }}
          className="px-8 py-4 uppercase tracking-widest text-sm hover:opacity-70 transition-opacity">
          Entrer
        </button>
      </div>
    </main>
  )
}
  return (
    <main className="min-h-screen px-6 md:pl-32 md:pr-10 py-12"
      style={{ backgroundColor: '#3D1F3A' }}>

      <p style={{ color: '#C9A84C', letterSpacing: '4px', fontSize: '13px' }}
        className="uppercase mb-4">
        Altercacio
      </p>

      <h1 style={{ color: '#EDE0C8', fontFamily: 'var(--font-playfair)' }}
        className="text-4xl mb-8">
        Administration
      </h1>

      {/* Message de confirmation */}
      {message && (
        <p style={{ color: '#C9A84C', border: '1px solid #C9A84C' }}
          className="px-4 py-3 text-sm uppercase tracking-widest mb-8 max-w-lg">
          {message}
        </p>
      )}

      {/* Onglets */}
      <div className="flex gap-8 mb-12"
        style={{ borderBottom: '1px solid #6B3F6B' }}>
        <button
          onClick={() => setOnglet('questions')}
          style={{
            color: onglet === 'questions' ? '#C9A84C' : '#EDE0C8',
            borderBottom: onglet === 'questions' ? '1px solid #C9A84C' : 'none',
            opacity: onglet === 'questions' ? 1 : 0.4
          }}
          className="uppercase tracking-widest text-sm pb-4 transition-opacity">
          Publier une question
        </button>
        <button
          onClick={() => setOnglet('moderation')}
          style={{
            color: onglet === 'moderation' ? '#C9A84C' : '#EDE0C8',
            borderBottom: onglet === 'moderation' ? '1px solid #C9A84C' : 'none',
            opacity: onglet === 'moderation' ? 1 : 0.4
          }}
          className="uppercase tracking-widest text-sm pb-4 transition-opacity">
          Modération ({args?.length})
        </button>
      </div>

      {/* Onglet publier */}
      {onglet === 'questions' && (
        <div className="max-w-lg flex flex-col gap-4">

          <input
            type="number"
            placeholder="Numéro de la question (ex: 2)"
            value={numero}
            onChange={e => setNumero(e.target.value)}
            className="w-full p-4 outline-none"
            style={{
              backgroundColor: '#2A1F28',
              color: '#EDE0C8',
              border: '1px solid #6B3F6B',
              fontFamily: 'var(--font-garamond)',
              fontSize: '16px'
            }}
          />

          <textarea
            placeholder="La question..."
            value={texte}
            onChange={e => setTexte(e.target.value)}
            className="w-full p-4 outline-none resize-none h-24"
            style={{
              backgroundColor: '#2A1F28',
              color: '#EDE0C8',
              border: '1px solid #6B3F6B',
              fontFamily: 'var(--font-garamond)',
              fontSize: '16px'
            }}
          />

          <textarea
            placeholder="Le contexte (texte d'introduction)..."
            value={contexte}
            onChange={e => setContexte(e.target.value)}
            className="w-full p-4 outline-none resize-none h-32"
            style={{
              backgroundColor: '#2A1F28',
              color: '#EDE0C8',
              border: '1px solid #6B3F6B',
              fontFamily: 'var(--font-garamond)',
              fontSize: '16px'
            }}
          />

          <input
            type="datetime-local"
            value={publieLe}
            onChange={e => setPublieLe(e.target.value)}
            className="w-full p-4 outline-none"
            style={{
              backgroundColor: '#2A1F28',
              color: '#EDE0C8',
              border: '1px solid #6B3F6B',
              fontFamily: 'var(--font-garamond)',
              fontSize: '16px'
            }}
          />

          <button
            onClick={publierQuestion}
            style={{ backgroundColor: '#6B3F6B', color: '#EDE0C8' }}
            className="px-8 py-4 uppercase tracking-widest text-sm hover:opacity-70 transition-opacity">
            Publier la question
          </button>

        </div>
      )}

      {/* Onglet modération */}
      {onglet === 'moderation' && (
        <div className="flex flex-col gap-4 max-w-2xl">
          {args?.map(a => (
            <div key={a.id} className="p-6"
              style={{
                border: '1px solid #6B3F6B',
                opacity: a.visible ? 1 : 0.4
              }}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p style={{ color: '#C9A84C', fontSize: '12px' }}
                    className="uppercase tracking-widest mb-1">
                    {a.pseudo} — {a.reponse}
                  </p>
                  <p style={{ color: '#EDE0C8', opacity: 0.4, fontSize: '11px' }}
                    className="uppercase tracking-widest">
                    Question #{a.question_id}
                  </p>
                </div>
                <button
                  onClick={() => toggleVisible(a.id, a.visible)}
                  style={{
                    color: a.visible ? '#A63D2F' : '#C9A84C',
                    fontSize: '11px'
                  }}
                  className="uppercase tracking-widest hover:opacity-70 transition-opacity">
                  {a.visible ? 'Masquer' : 'Restaurer'}
                </button>
              </div>
              <p style={{ color: '#EDE0C8', fontFamily: 'var(--font-garamond)' }}
                className="text-base leading-relaxed">
                {a.texte}
              </p>
            </div>
          ))}
        </div>
      )}

    </main>
  )
}