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
  title: "Altercacio",
  description: "Une question. Deux camps. Des arguments.",
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