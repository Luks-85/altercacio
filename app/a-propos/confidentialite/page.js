import Link from 'next/link'

export default function Confidentialite() {
  return (
    <main className="min-h-screen py-12"
      style={{ paddingLeft: '120px', paddingRight: '40px', backgroundColor: '#3D1F3A' }}>

      <div className="max-w-3xl mx-auto">

        <p style={{ color: '#C9A84C', letterSpacing: '4px', fontSize: '13px' }}
          className="uppercase mb-4">
          Altercacio
        </p>

        <h1 style={{ color: '#EDE0C8', fontFamily: 'var(--font-playfair)' }}
          className="text-4xl mb-4">
          Politique de confidentialité
        </h1>

        <p style={{ color: '#EDE0C8', opacity: 0.4, fontSize: '13px' }}
          className="uppercase tracking-widest mb-12">
          Dernière mise à jour : mai 2025
        </p>

        <div style={{ color: '#EDE0C8', fontFamily: 'var(--font-garamond)' }}
          className="text-lg leading-relaxed flex flex-col gap-8">

          <div>
            <p style={{ color: '#C9A84C', fontSize: '13px' }}
              className="uppercase tracking-widest mb-3">
              Qui sommes-nous ?
            </p>
            <p style={{ opacity: 0.8 }}>
              Altercacio est une plateforme de débat hebdomadaire éditée à titre personnel. 
              Son objectif est d'encourager la réflexion collective à travers des questions 
              de société, de philosophie et d'éthique.
            </p>
          </div>

          <div>
            <p style={{ color: '#C9A84C', fontSize: '13px' }}
              className="uppercase tracking-widest mb-3">
              Données collectées
            </p>
            <p style={{ opacity: 0.8 }}>
              Lorsque vous soumettez un argument, nous collectons les informations suivantes :
            </p>
            <ul style={{ opacity: 0.8 }} className="mt-3 flex flex-col gap-2 ml-4">
              <li>— Votre adresse IP, à des fins de modération et de prévention du spam</li>
              <li>— Votre pseudo, choisi librement et affiché publiquement avec votre argument</li>
              <li>— Votre argument et votre vote, affichés publiquement sur le site</li>
            </ul>
            <p style={{ opacity: 0.8 }} className="mt-3">
              Nous ne collectons aucun nom, email, ni donnée d'identification directe.
            </p>
          </div>

          <div>
            <p style={{ color: '#C9A84C', fontSize: '13px' }}
              className="uppercase tracking-widest mb-3">
              Pourquoi collecter l'adresse IP ?
            </p>
            <p style={{ opacity: 0.8 }}>
              L'adresse IP est collectée uniquement pour nous permettre de modérer 
              le contenu inapproprié et de prévenir les abus. Elle n'est jamais 
              affichée publiquement, jamais utilisée à des fins commerciales, 
              et jamais transmise à des tiers.
            </p>
          </div>

          <div>
            <p style={{ color: '#C9A84C', fontSize: '13px' }}
              className="uppercase tracking-widest mb-3">
              Durée de conservation
            </p>
            <p style={{ opacity: 0.8 }}>
              Les adresses IP sont supprimées au bout d'un an. Les arguments 
              et votes sont conservés indéfiniment car ils constituent le 
              contenu éditorial du site.
            </p>
          </div>

          <div>
            <p style={{ color: '#C9A84C', fontSize: '13px' }}
              className="uppercase tracking-widest mb-3">
              Vos droits
            </p>
            <p style={{ opacity: 0.8 }}>
              Conformément au RGPD, vous disposez d'un droit d'accès, de 
              rectification et de suppression de vos données personnelles. 
              Une adresse de contact sera prochainement disponible.
            </p>
          </div>

          <div>
            <p style={{ color: '#C9A84C', fontSize: '13px' }}
              className="uppercase tracking-widest mb-3">
              Stockage local
            </p>
            <p style={{ opacity: 0.8 }}>
              Altercacio utilise le stockage local de votre navigateur 
              (localStorage) pour retenir votre participation aux débats 
              et votre acceptation de la présente politique. Aucun cookie 
              publicitaire ou traceur tiers n'est utilisé.
            </p>
          </div>

        </div>

        <div className="mt-12 flex gap-8">
          <Link href="/a-propos"
            style={{ color: '#EDE0C8', opacity: 0.4, fontSize: '13px' }}
            className="uppercase tracking-widest hover:opacity-100 transition-opacity">
            ← À propos
          </Link>
          <Link href="/"
            style={{ color: '#EDE0C8', opacity: 0.4, fontSize: '13px' }}
            className="uppercase tracking-widest hover:opacity-100 transition-opacity">
            ← Retour au débat
          </Link>
        </div>

      </div>
    </main>
  )
}