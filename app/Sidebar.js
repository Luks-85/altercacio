'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Info, Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Sidebar({ visible }) {
  const [ouvert, setOuvert] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!visible) return null

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setOuvert(true)}
          className="fixed top-4 left-4 z-50"
          style={{ color: '#EDE0C8' }}>
          <Menu size={24} />
        </button>

        {ouvert && (
          <div
            onClick={() => setOuvert(false)}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          />
        )}

        <div
          className="fixed top-0 left-0 h-full z-50 flex flex-col justify-center gap-8 px-8"
          style={{
            width: '75%',
            backgroundColor: '#3D1F3A',
            borderRight: '1px solid #6B3F6B',
            transform: ouvert ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease'
          }}>

          <button
            onClick={() => setOuvert(false)}
            className="absolute top-6 right-6"
            style={{ color: '#EDE0C8', opacity: 0.5 }}>
            <X size={20} />
          </button>

          <Link href="/histoire" onClick={() => setOuvert(false)}
            className="flex items-center gap-4 group">
            <BookOpen size={20} className="text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity" />
            <span style={{ fontSize: '13px' }}
              className="uppercase tracking-widest text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity">
              Archives
            </span>
          </Link>

          <Link href="/a-propos" onClick={() => setOuvert(false)}
            className="flex items-center gap-4 group">
            <Info size={20} className="text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity" />
            <span style={{ fontSize: '13px' }}
              className="uppercase tracking-widest text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity">
              À propos
            </span>
          </Link>

          <Link href="/" onClick={() => setOuvert(false)}
            className="flex items-center gap-4 group">
            <Menu size={20} className="text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity" />
            <span style={{ fontSize: '13px' }}
              className="uppercase tracking-widest text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity">
              Menu
            </span>
          </Link>

        </div>
      </>
    )
  }

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
        <BookOpen size={20} className="text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity" />
        <span style={{ fontSize: '9px' }}
          className="uppercase tracking-widest text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity">
          Archives
        </span>
      </Link>
      <Link href="/a-propos" className="flex flex-col items-center gap-2 group">
        <Info size={20} className="text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity" />
        <span style={{ fontSize: '9px' }}
          className="uppercase tracking-widest text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity">
          À propos
        </span>
      </Link>
      <Link href="/" className="flex flex-col items-center gap-2 group">
        <Menu size={20} className="text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity" />
        <span style={{ fontSize: '9px' }}
          className="uppercase tracking-widest text-stone-200 opacity-40 group-hover:opacity-100 transition-opacity">
          Menu
        </span>
      </Link>
    </div>
  )
}