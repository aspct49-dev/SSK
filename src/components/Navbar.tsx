'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'HOME',      href: '/'          },
  { label: 'GIVEAWAY',  href: '/giveaways' },
];

const GOLD   = '#C9A84C';
const GOLD_L = '#E8C97A';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 44);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* ── Main bar ── */}
      <nav
        style={{
          position:   'fixed',
          top: 0, left: 0, right: 0,
          zIndex:     50,
          transition: 'background 0.45s, border-color 0.45s, box-shadow 0.45s',
          background:  scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom:   scrolled ? '1px solid rgba(201,168,76,0.1)' : '1px solid transparent',
          boxShadow:      scrolled ? '0 4px 32px rgba(0,0,0,0.55)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: '80px' }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Image
                src="/sk-logo.png"
                alt="Sydney Slots King"
                width={677}
                height={369}
                style={{ width: '90px', height: 'auto', display: 'block' }}
              />
            </Link>

            {/* Desktop links — centred column */}
            <div className="hidden md:flex" style={{ alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
              {LINKS.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    fontSize:      '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         'rgba(255,255,255,0.42)',
                    textDecoration:'none',
                    transition:    'color 0.25s',
                    position:      'relative',
                    paddingBottom:  '2px',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = GOLD_L)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.42)')}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Mobile burger — right column */}
            <button
              className="md:hidden"
              style={{ justifySelf: 'end' }}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.6)', padding: '4px',
              }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position:   'fixed',
              inset:      0,
              zIndex:     40,
              background: 'rgba(6,6,6,0.98)',
              backdropFilter: 'blur(20px)',
              display:    'flex',
              flexDirection: 'column',
              paddingTop: '100px',
              paddingLeft:'32px',
              paddingRight:'32px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily:    '"PPNeueCorp", system-ui, sans-serif',
                    fontSize:      '2rem',
                    fontWeight:    300,
                    color:         'rgba(255,255,255,0.65)',
                    textDecoration:'none',
                    padding:       '14px 0',
                    borderBottom:  '1px solid rgba(255,255,255,0.05)',
                    transition:    'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = GOLD_L)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
