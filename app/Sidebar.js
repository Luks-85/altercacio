'use client'

import { BookOpen, Info, Menu } from 'lucide-react'
import Link from 'next/link'

export default function Sidebar({ visible }) {
  if (!visible) return null

  return (
    <div
      className="fixed left-0 top-0 h-full flex flex-col items-center justify-center gap-8 px-4"
      style={{ borderRight: '1px solid #6B3F6B',
       backgroundColor: '#2A1F28',
       width: '80px'
       }}>

      <Link href="/histoire"
        className="flex flex-col items-center gap-2 group">
        <BookOpen
          size={20}
          className="text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity"
        />
        <span 
          className="uppercase tracking-widest text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity"
          style={{ fontSize: '9px'  }}>
          Archives
        </span>
      </Link>

      <Link href="/a-propos"
        className="text-center flex flex-col items-center gap-2 group">
        <Info
          size={20}
          className="text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity"
        />
        <span 
          className="uppercase tracking-widest text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity"
          style={{ fontSize: '9px'  }}>
          À propos
        </span>
      </Link>

      <Link href="/"
        className="flex flex-col items-center gap-2 group">
        <Menu
          size={20}
          className="text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity"
        />
        <span 
          className="uppercase tracking-widest text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity"
          style={{ fontSize: '9px'  }}>
          Acceuil
        </span>
      </Link>

    </div>
  )
}