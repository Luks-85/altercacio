import Link from 'next/link'

export default function APropos() {
  return (
    <main className="min-h-screen px-6 md:pl-32 md:pr-10 py-12"
      style={{ backgroundColor: '#3D1F3A' }}>
      <div className="max-w-3xl mx-auto">
        <p style={{ color: '#C9A84C', letterSpacing: '4px', fontSize: '13px' }}
          className="uppercase mb-4">
          Altercacio
        </p>

        <h1 style={{ color: '#EDE0C8', fontFamily: 'var(--font-playfair)' }}
          className="text-4xl mb-12">
          À propos
        </h1>

        <div className="max-w-2xl">

          <p style={{ color: '#EDE0C8', fontFamily: 'var(--font-garamond)', border: '1px solid #C9A84C' }}
            className="text-xl italic mb-8 leading-relaxed">
            "Altercacio" — du latin altercatio, dispute, débat, échange d'arguments.
          </p>

          <p style={{ color: '#EDE0C8', opacity: 0.8, fontFamily: 'var(--font-garamond)' }}
            className="text-lg leading-relaxed mb-6">
            Altercacio est un espace de réflexion collective. Chaque semaine,
            une question est posée — sur la société, l'actualité, la philosophie, la morale ou 
            l'histoire.
          </p>

          <p style={{ color: '#EDE0C8', opacity: 0.8, fontFamily: 'var(--font-garamond)' }}
            className="text-lg leading-relaxed mb-6">
            Le constat de départ est simple : tout le monde a un avis. 
            Sur les réseaux sociaux, cela donne lieu à des échanges souvent superficiels, rarement constructifs. 
            Altercacio part du principe inverse — avant de voir ce que pensent les autres, il faut d'abord formuler sa propre pensée.
          </p>

          <p style={{ color: '#EDE0C8', opacity: 0.8, fontFamily: 'var(--font-garamond)' }}
            className="text-lg leading-relaxed mb-6">
            Le principe est donc délibérément contraint : répondre OUI ou NON, puis argumenter. 
            Pas de likes, pas de followers, pas de polémique stérile. Juste des idées, développées et confrontées.
          </p>

          <p style={{ color: '#EDE0C8', opacity: 0.8, fontFamily: 'var(--font-garamond)' }}
            className="text-lg leading-relaxed mb-12">
            Une fois son argument soumis, on découvre les résultats et les positions des autres participants. 
            L'objectif n'est pas de convaincre mais de comprendre pourquoi l'autre pense différemment, et ce que cette différence nous apprend sur nous-mêmes.
          </p>

          <p style={{ color: '#EDE0C8', opacity: 0.8, fontFamily: 'var(--font-garamond)' }}
            className="text-lg leading-relaxed mb-12">
            Ce premier projet reste en évolution constante. S'il est réussi, de nouvelles fonctionnalités devraient voir le jour ...
          </p>

          <Link href="/a-propos/confidentialite"
            style={{ color: '#EDE0C8', opacity: 0.4, fontSize: '13px' }}
            className="uppercase tracking-widest hover:opacity-100 transition-opacity block mb-4">
            Politique de confidentialité →
          </Link>

          <Link href="/"
            style={{ color: '#C9A84C', fontSize: '13px' }}
            className="uppercase tracking-widest hover:opacity-70 transition-opacity">
            ← Retour à la question
          </Link>

        </div>
      </div>
    </main>
  )
}