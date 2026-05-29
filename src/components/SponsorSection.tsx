'use client';

import { motion } from 'framer-motion';
import { StylizedWord } from './StylizedWord';
import Image from 'next/image';
import { Crown, Shield, ExternalLink } from 'lucide-react';

const CLIP = 'polygon(0% 5%, 5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%)';

function Diamond() {
  return (
    <span style={{ color: '#C9A84C', fontSize: '0.55rem', lineHeight: 1, opacity: 0.9 }}>◆</span>
  );
}

function Rule() {
  return (
    <div className="flex items-center gap-3 w-full">
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
      <Diamond />
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
    </div>
  );
}

export default function SponsorSection() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative max-w-2xl mx-auto px-6 lg:px-10 text-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="font-display font-semibold tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'rgba(255,255,255,0.88)' }}>
            <span className="gold-text font-semibold">
              PARTNERS
            </span>
          </h2>
        </motion.div>

        {/* Card — outer gold border */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03, filter: 'drop-shadow(0 0 28px rgba(201,168,76,0.55))' }}
          style={{
            clipPath: CLIP,
            background: 'linear-gradient(180deg, #F0D060 0%, #C9A84C 25%, #8B6914 55%, #C9A84C 80%, #F0D060 100%)',
            padding: '3px',
            maxWidth: '380px',
            margin: '0 auto',
            cursor: 'pointer',
            transition: 'filter 0.35s ease',
            position: 'relative',
            zIndex: 38,
          }}
        >
          {/* Dark gap */}
          <div style={{ clipPath: CLIP, background: '#000000', padding: '3px' }}>
            {/* Inner gold line */}
            <div style={{ clipPath: CLIP, background: 'linear-gradient(180deg, rgba(201,168,76,0.5) 0%, rgba(201,168,76,0.2) 50%, rgba(201,168,76,0.5) 100%)', padding: '1px' }}>
              {/* Card content */}
              <div
                style={{
                  clipPath: CLIP,
                  background: '#000000',
                  padding: '24px 28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Shimmer sweep */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '40%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.07) 40%, rgba(232,201,122,0.13) 50%, rgba(201,168,76,0.07) 60%, transparent 100%)',
                    animation: 'card-shimmer 3.5s ease-in-out infinite',
                    animationDelay: '1s',
                  }} />
                </div>

                {/* ZESTY.BET logo */}
                <div style={{ width: '100%', maxWidth: '280px' }}>
                  <Image
                    src="/zesty-logo-crop.png"
                    alt="Zesty.Bet"
                    width={1460}
                    height={660}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>

                {/* Description */}
                <p
                  className="uppercase font-medium"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}
                >
                  The platform<br />behind the big wins.
                </p>

                {/* Code box */}
                <div style={{
                  width: '100%',
                  border: '1px solid rgba(201,168,76,0.55)',
                  background: 'rgba(201,168,76,0.04)',
                  padding: '10px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span
                    className="uppercase font-medium"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.24em', color: 'rgba(201,168,76,0.65)' }}
                  >
                    Exclusive Code
                  </span>
                  <div className="flex items-center gap-3">
                    <span style={{ color: 'rgba(201,168,76,0.55)', fontSize: '1rem' }}>❧</span>
                    <span
                      className="font-bold gold-text"
                      style={{ fontSize: '1.35rem', letterSpacing: '0.18em' }}
                    >
                      SSK
                    </span>
                    <span style={{ color: 'rgba(201,168,76,0.55)', fontSize: '1rem', transform: 'scaleX(-1)', display: 'inline-block' }}>❧</span>
                  </div>
                </div>

                {/* Exclusive benefits label */}
                <span
                  className="uppercase font-medium"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: 'rgba(201,168,76,0.65)' }}
                >
                  Exclusive Benefits
                </span>

                {/* CTA */}
                <a
                  href="https://zesty.bet"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 font-bold uppercase transition-all duration-300"
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.18em',
                    background: 'linear-gradient(135deg, #B8932A 0%, #E8C97A 35%, #FFF0A0 55%, #E8C97A 75%, #B8932A 100%)',
                    color: '#060606',
                    boxShadow: '0 0 24px rgba(201,168,76,0.25)',
                    border: '1px solid rgba(201,168,76,0.4)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(201,168,76,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(201,168,76,0.25)'; }}
                >
                  Play on Zesty.Bet
                  <ExternalLink size={13} />
                </a>

                {/* Disclaimer */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <div style={{
                    width: 32, height: 32,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Shield size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                  </div>
                  <p
                    className="uppercase font-medium"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}
                  >
                    18+ Gambling Responsibly. If you need support visit{' '}
                    <a
                      href="https://www.gamblinghelponline.org.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'rgba(201,168,76,0.5)', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.8)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.5)')}
                    >
                      gamblinghelponline.org.au
                    </a>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="divider-gold absolute bottom-0 inset-x-0" />
    </section>
  );
}
