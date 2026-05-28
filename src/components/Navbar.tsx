'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'Videos',    href: '#videos'    },
  { label: 'Giveaways', href: '#giveaways' },
  { label: 'About',     href: '#about'     },
  { label: 'Socials',   href: '#socials'   },
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>

            {/* Logo + wordmark */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              {/* Circular crop: objectFit cover on square container = cuts gray border, shows only central emblem */}
              <div style={{
                position: 'relative', width: '34px', height: '34px', flexShrink: 0,
                borderRadius: '50%', overflow: 'hidden',
                boxShadow: '0 0 0 1px rgba(201,168,76,0.25)',
              }}>
                <Image
                  src="/logo.jpeg"
                  alt="Sydney Slots King"
                  fill
                  sizes="34px"
                  style={{ objectFit: 'cover', objectPosition: 'center 38%', mixBlendMode: 'screen', filter: 'contrast(1.3) saturate(1.2)', transform: 'scale(1.12)' }}
                />
              </div>
              <span style={{
                fontFamily:    '"Cormorant Garamond", Georgia, serif',
                fontSize:      '0.85rem',
                fontWeight:    600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color:         'rgba(245,230,200,0.72)',
              }}
                className="hidden sm:block"
              >
                Sydney Slots King
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: '32px' }}>
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
              <a
                href="#giveaways"
                style={{
                  fontSize:      '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight:    600,
                  padding:       '10px 20px',
                  border:        `1px solid rgba(201,168,76,0.3)`,
                  background:    'rgba(201,168,76,0.07)',
                  color:         GOLD_L,
                  textDecoration:'none',
                  transition:    'background 0.25s, border-color 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background    = 'rgba(201,168,76,0.15)';
                  e.currentTarget.style.borderColor   = 'rgba(201,168,76,0.55)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background    = 'rgba(201,168,76,0.07)';
                  e.currentTarget.style.borderColor   = 'rgba(201,168,76,0.3)';
                }}
              >
                Join Giveaway
              </a>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden"
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
                    fontFamily:    '"Cormorant Garamond", Georgia, serif',
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
              <motion.a
                href="#giveaways"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: LINKS.length * 0.06 }}
                onClick={() => setOpen(false)}
                style={{
                  display:       'block',
                  marginTop:     '24px',
                  padding:       '14px 24px',
                  textAlign:     'center',
                  fontSize:      '0.72rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight:    700,
                  background:    'rgba(201,168,76,0.1)',
                  border:        '1px solid rgba(201,168,76,0.28)',
                  color:         GOLD_L,
                  textDecoration:'none',
                }}
              >
                Join Giveaway
              </motion.a>
            </div>

            <div style={{
              marginTop:     'auto',
              paddingBottom: '40px',
              fontSize:      '0.65rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.15)',
            }}>
              Sydney Slots King
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
