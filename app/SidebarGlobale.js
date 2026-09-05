'use client'

import { usePathname } from 'next/navigation'
import { BookOpen, Info, Menu } from 'lucide-react'
import Link from 'next/link'

export default function SidebarGlobale() {
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <div
      className="fixed left-0 top-0 h-full flex flex-col items-center justify-center gap-8 px-4"
      style={{ 
        borderRight: '1px solid #6B3F6B',
        backgroundColor: '#3D1F3A',
        width: '80px',
        zIndex: 20
      }}>
      <Link href="/histoire" className="flex flex-col items-center gap-2 group">
        <BookOpen size={20} className="text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity"/>
        <span style={{ fontSize: '9px' }} className="uppercase tracking-widest text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity">Archives</span>
      </Link>
      <Link href="/a-propos" className="flex flex-col items-center gap-2 group">
        <Info size={20} className="text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity"/>
        <span style={{ fontSize: '9px' }} className="uppercase tracking-widest text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity">À propos</span>
      </Link>
      <Link href="/" className="flex flex-col items-center gap-2 group">
        <Menu size={20} className="text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity"/>
        <span style={{ fontSize: '9px' }} className="uppercase tracking-widest text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity">Menu</span>
      </Link>
    </div>
  )
}