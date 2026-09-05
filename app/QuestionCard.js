'use client'

import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'

export default function QuestionCard({ question }) {
  const [reponse, setReponse] = useState(null)
  const [modalOuvert, setModalOuvert] = useState(false)
  const [argument, setArgument] = useState('')
  const [aVote, setAVote] = useState(false)
  const [resultats, setResultats] = useState(null)
  const [pseudo, setPseudo] = useState('')
  const [totalVotes, setTotalVotes] = useState(0)
  const [ongletMobile, setOngletMobile] = useState('OUI')
  const [confidentialiteAcceptee, setConfidentialiteAcceptee] = useState(false)
  const [modalConfidentialite, setModalConfidentialite] = useState(false)
  const [envoyant, setEnvoyant] = useState(false)
  
  useEffect(() => {
    const dejaAccepte = localStorage.getItem('confidentialite_acceptee')
    if (dejaAccepte) {
      setConfidentialiteAcceptee(true)
    }
    
    async function chargerTotal() {
      const { data: votes } = await supabase
        .from('votes')
        .select('*')
        .eq('question_id', question.id)
      setTotalVotes(votes.length)
    }

      const aVote = localStorage.getItem(`vote_question_${question.id}`)
    if (aVote) {
      setReponse(aVote)
      chargerResultats()
    } else {
      chargerTotal()
    }
  }, [])

  function handleVote(choix) {
    setReponse(choix)
    if (!confidentialiteAcceptee) {
      setModalConfidentialite(true)
    } else {
    setModalOuvert(true)
  }
}
 
  async function handleEnvoi() {
    console.log('argument:', argument)
    console.log('question:', question)
  
    if (argument.trim() === '') return
    if (envoyant) return
    setEnvoyant(true)

  await supabase.from('votes').insert({
    question_id: question.id,
    reponse: reponse

    })

 await fetch('/api/submit-argument', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    question_id: question.id,
    pseudo: pseudo || 'Anonyme',
    texte: argument,
    reponse: reponse
  })
})

  await chargerResultats()
  setModalOuvert(false)
  localStorage.setItem(`vote_question_${question.id}`, reponse)
  setEnvoyant(false)
  setArgument('')
  setPseudo('')

  }

  async function chargerResultats() {
    const { data: votes } = await supabase
      .from('votes')
      .select('*')
      .eq('question_id', question.id)

    const { data: args } = await supabase
      .from('arguments')
      .select('*')
      .eq('question_id', question.id)
      .eq('visible', true)

    const total = votes.length
    const oui = votes.filter(v => v.reponse === 'OUI').length
    const non = votes.filter(v => v.reponse === 'NON').length

    setResultats({
      pourcentageOui: total > 0 ? Math.round((oui / total) * 100) : 0,
      pourcentageNon: total > 0 ? Math.round((non / total) * 100) : 0,
      total: total,
      arguments: args
    })
    
    setTotalVotes(total)
    setAVote(true)
}

  return (
    <>
    <Sidebar visible={aVote} />
    {modalConfidentialite && (
      <div className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
        <div className="p-8 max-w-lg w-full mx-4"
          style={{ backgroundColor: '#1C1C1C', border: '1px solid #6B3F6B' }}>
          
          <p style={{ color: '#C9A84C', letterSpacing: '3px', fontSize: '12px' }}
            className="uppercase mb-4">
            Avant de participer
          </p>

          <p style={{ color: '#EDE0C8', fontFamily: 'var(--font-playfair)' }}
            className="text-xl mb-6">
            Politique de confidentialité
          </p>

          <p style={{ color: '#EDE0C8', opacity: 0.7, fontFamily: 'var(--font-garamond)' }}
            className="text-base leading-relaxed mb-4">
            En participant aux débats d'Altercacio, vous acceptez que votre adresse IP 
            soit collectée à des fins de modération. Elle ne sera jamais affichée 
            publiquement ni transmise à des tiers, et sera supprimée après un an.
          </p>

          <p style={{ color: '#EDE0C8', opacity: 0.7, fontFamily: 'var(--font-garamond)' }}
            className="text-base leading-relaxed mb-8">
            Votre pseudo et votre argument seront affichés publiquement.
          </p>

          <div className="flex justify-between items-center">
            <a href="/a-propos/confidentialite"
              style={{ color: '#EDE0C8', opacity: 0.4, fontSize: '12px' }}
              className="uppercase tracking-widest hover:opacity-100 transition-opacity">
              En savoir plus →
            </a>
            <button
              onClick={() => {
                localStorage.setItem('confidentialite_acceptee', 'true')
                setConfidentialiteAcceptee(true)
                setModalConfidentialite(false)
                setModalOuvert(true)
              }}
              style={{ backgroundColor: '#6B3F6B', color: '#EDE0C8' }}
              className="px-8 py-3 uppercase tracking-widest text-sm hover:opacity-70 transition-opacity">
              J'accepte et je participe
            </button>
          </div>

        </div>
      </div>
    )}
   <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-16"
   style={{ 
    backgroundColor: '#3D1F3A', 
    paddingLeft: aVote ? '120px' : undefined,
    paddingRight: aVote ? '40px' : undefined
   }}>
      
      <p style={{ color: '#C9A84C', letterSpacing: '4px', fontSize: '13px' }}
        className="uppercase mb-15">
        #Jour {question?.numero}
      </p>

       {!aVote ? (
      <p style={{ color: '#EDE0C8', opacity: 0.4, fontSize: '13px' }}
        className="uppercase tracking-widest mb-15">
        {totalVotes} {totalVotes === 1 ? 'personne a' : 'personnes ont'} déjà répondu
      </p> 
       ):(
      <p style={{ color: '#EDE0C8', opacity: 0.4, fontSize: '13px' }}
        className="uppercase tracking-widest mb-15">
        {totalVotes} {totalVotes === 1 ? 'réponse' : 'réponses'}
      </p>   
       )} 

          {/* Le contexte */}
      <p style={{ color: '#EDE0C8', opacity: 0.6, fontFamily: 'var(--font-garamond)', fontSize: '20px' }}
        className="text-center max-w-xl mb-12 text-lg italic">
        {question?.contexte}
      </p>

    {/* La question */}
      <h1 style={{ color: '#EDE0C8', fontFamily: 'var(--font-playfair)' }}
        className="text-2xl md:text-3xl text-center max-w-2xl mb-6">
        {question?.texte}
      </h1>

      {/* Les boutons */}
      {!aVote ? (
  <div className="flex flex-row gap-4 md:gap-8">
    <button
      onClick={() => handleVote('OUI')}
      style={{ borderColor: '#C9A84C', color: '#EDE0C8' }}
      className="border-2 px-6 md:px-12 py-3 md:py-4 text-lg md:text-xl tracking-widest uppercase hover:opacity-70 transition-opacity">
      Oui
    </button>
    <button
      onClick={() => handleVote('NON')}
      style={{ borderColor: '#EDE0C8', color: '#C9A84C' }}
      className="border-2 px-6 md:px-12 py-3 md:py-4 text-lg md:text-xl tracking-widest uppercase hover:opacity-70 transition-opacity">
      Non
    </button>
  </div>
) : (
  <div className="w-full max-w-7xl mt-8">

  {/* Pourcentages */}
  <div className="grid grid-cols-2 gap-8 md:gap-16 mb-12">
    <div className="text-center"
    style={{ borderRight: '1px solid #6B3F6B' }}>
      <p style={{ color: '#C9A84C', fontFamily: 'var(--font-playfair)' }}
        className="text-3xl md:text-5xl mb-2">
        {resultats?.pourcentageOui}%
      </p>
      <p style={{ color: '#EDE0C8', opacity: 0.5 }}
      className="uppercase tracking-widest text-sm">
        D'accord
      </p>
    </div>
    <div className="text-center"
    style={{ borderLeft: '1px solid #6B3F6B' }}>
      <p style={{ color: '#C9A84C', fontFamily: 'var(--font-playfair)' }}
        className="text-3xl md:text-5xl mb-2">
        {resultats?.pourcentageNon}%
      </p>
      <p style={{ color: '#EDE0C8', opacity: 0.5 }}
        className="uppercase tracking-widest text-sm">
        Pas d'accord
      </p>
    </div>
  </div>

  {/* Barre de progression */}
  <div className="w-full mb-12 flex"
    style={{ height: '2px' }}>
    <div style={{
      width: `${resultats?.pourcentageOui}%`,
      backgroundColor: '#C9A84C',
      transition: 'width 1.8s ease'
    }}/>
    <div style={{
      width: `${resultats?.pourcentageNon}%`,
      backgroundColor: '#6B3F6B',
      transition: 'width 1.8s ease'
    }}/>
  </div>

  {/* Colonnes d'arguments */}
    {/* Onglets mobile */}
  <div className="flex md:hidden gap-0 mb-6 w-full">
    <button
      onClick={() => setOngletMobile('OUI')}
      className="flex-1 py-3 uppercase tracking-widest text-sm transition-all"
      style={{
        color: ongletMobile === 'OUI' ? '#C9A84C' : '#EDE0C8',
        borderBottom: ongletMobile === 'OUI' ? '1px solid #C9A84C' : '1px solid #6B3F6B',
        opacity: ongletMobile === 'OUI' ? 1 : 0.4
      }}>
      D'accord
    </button>
    <button
      onClick={() => setOngletMobile('NON')}
      className="flex-1 py-3 uppercase tracking-widest text-sm transition-all"
      style={{
        color: ongletMobile === 'NON' ? '#C9A84C' : '#EDE0C8',
        borderBottom: ongletMobile === 'NON' ? '1px solid #C9A84C' : '1px solid #6B3F6B',
        opacity: ongletMobile === 'NON' ? 1 : 0.4
      }}>
      Pas d'accord
    </button>
  </div>

  {/* Colonnes desktop */}
  <div className="hidden md:grid grid-cols-2 gap-8">

      {/* Colonne OUI */}
      <div>
        <p style={{ color: '#C9A84C' }}
          className="uppercase tracking-widest text-center text-sm mb-4">
          D'accord
        </p>
        <div
          className="break-words overflow-auto"
          style={{ maxHeight: '500px' }}>
          {resultats?.arguments
            .filter(a => a.reponse === 'OUI')
            .map(a => (
              <div key={a.id}
                className="mb-4 p-4"
                style={{ border: '1px solid #6B3F6B' }}>
                <p style={{ color: '#C9A84C', fontSize: '12px' }}
                  className="uppercase tracking-widest mb-2">
                  {a.pseudo}
                </p>
                <p style={{ color: '#EDE0C8', fontFamily: 'var(--font-garamond)' }}
                  className="text-base leading-relaxed">
                  {a.texte}
                </p>
              </div>
            ))}
         </div>
      </div>

      {/* Colonne NON */}
      <div>
        <p style={{ color: '#C9A84C' }}
          className="uppercase tracking-widest text-center text-sm mb-4">
          Pas d'accord
        </p>
        <div
          className="break-words overflow-auto"
          style={{ maxHeight: '500px' }}>
          {resultats?.arguments
            .filter(a => a.reponse === 'NON')
            .map(a => (
              <div key={a.id}
                className="mb-4 p-4"
                style={{ border: '1px solid #6B3F6B' }}>
                <p style={{ color: '#C9A84C', fontSize: '12px' }}
                  className="uppercase tracking-widest mb-2">
                  {a.pseudo}
                </p>
                <p style={{ color: '#EDE0C8', fontFamily: 'var(--font-garamond)' }}
                  className="text-base leading-relaxed">
                  {a.texte}
                </p>
              </div>
            ))}
        </div>
      </div>

    </div>
    {/* Liste mobile */}
  <div className="flex flex-col gap-4 md:hidden">
    {resultats?.arguments
      .filter(a => a.reponse === ongletMobile)
      .map(a => (
        <div key={a.id} className="p-4"
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

)}

      {/* La fenêtre d'argumentation */}
      {modalOuvert && (
        <div className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="p-8 max-w-lg w-full mx-4"
            style={{ backgroundColor: '#1C1C1C', border: '1px solid #6B3F6B' }}>
            
            <p style={{ color: '#C9A84C', letterSpacing: '3px', fontSize: '12px' }}
              className="uppercase mb-4">
              {reponse === 'OUI'
                ? "Vous êtes d'accord"
                : "Vous n'êtes pas d'accord"}
            </p>

            <p style={{ color: '#EDE0C8', fontFamily: 'var(--font-playfair)' }}
              className="text-xl mb-6">
              Argumentez votre réponse
            </p>

            <input
              type="text"
              placeholder="Votre pseudo..."
              maxLength={30}
              value={pseudo}
              onChange={e => setPseudo(e.target.value)}
              className="w-full p-4 outline-none mb-4"
              style={{
                backgroundColor: '#2A1F28',
                color: '#EDE0C8',
                border: '1px solid #6B3F6B',
                fontFamily: 'var(--font-garamond)',
                fontSize: '16px'
              }}
            />

            <textarea
              value = {argument}
              onChange={e => setArgument(e.target.value)}
              placeholder="Développez votre point de vue..."
              maxLength={1500}
              className="w-full p-4 resize-none h-40 outline-none"
              style={{
                backgroundColor: '#2A1F28',
                color: '#EDE0C8',
                border: '1px solid #C9A84C',
                fontFamily: 'var(--font-garamond)',
                fontSize: '16px'
              }}
            />

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setModalOuvert(false)}
                disabled={envoyant}
                style={{ color: '#EDE0C8' }}
                className="text-sm uppercase tracking-widest px-4 py-2 border border-transparent hover:border-prune-medium transition-all"
                onMouseEnter={e => e.target.style.backgroundColor = '#6B3F6B'}
                onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
                Annuler
              </button>
              <button
                onClick={handleEnvoi}
                style={{ backgroundColor: '#6B3F6B', color: '#EDE0C8' }}
                className="px-8 py-3 uppercase tracking-widest text-sm hover:opacity-70 transition-opacity">
                Envoyer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
    </>
  )
}