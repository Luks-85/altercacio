import { Playfair_Display, EB_Garamond } from "next/font/google"
import "./globals.css"
import SidebarGlobale from "./SidebarGlobale"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
})

export const metadata = {
  title: "Altercacio - Une question. 2 camps. Des arguments",
  description: "Chaque semaine, une question de société, philosophie ou politique. Répondez OUI ou NON et argumentez. Découvrez ce que pensent les autres.",
  keywords: ["débats", "philosophie", "politique", "société", "arguments", "réflexion"]
  openGraph: {
    title: "Altercacio",
    description: "Une question. Deux camps. Des arguments.",
    url: "https://altercacio.vercel.app",
    siteName: "Altercacio",
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Altercacio",
    description: "Une question. Deux camps. Des arguments.",
  }

  verification: {
    google: "<meta name="google-site-verification" content="YY1KM7v4dwr5a4akgQnCzMbT9rNav46xvK5RBtPT8R8" />"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} ${garamond.variable}`}>
        <SidebarGlobale />
          {children}
      </body>
    </html>
  )
}