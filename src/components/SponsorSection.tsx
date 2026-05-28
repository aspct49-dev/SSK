'use client';

import { motion } from 'framer-motion';
import { StylizedWord } from './StylizedWord';
import Image from 'next/image';
import { ExternalLink, Shield } from 'lucide-react';

export default function SponsorSection() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-10 text-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="text-[10px] uppercase font-medium" style={{ letterSpacing: '0.22em', color: 'rgba(201,168,76,0.55)' }}>
            Partners
          </span>
          <h2 className="font-display font-semibold tracking-tight mt-0.5" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'rgba(255,255,255,0.88)' }}>
            <StylizedWord text="Official" />{' '}
            <StylizedWord text="Partner" className="gold-text font-semibold" />
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden flex flex-col items-center gap-8 p-10 sm:p-14"
          style={{
            background: '#020802',
            border: '1px solid rgba(34,197,94,0.6)',
            boxShadow: '0 0 18px rgba(34,197,94,0.25), 0 0 40px rgba(34,197,94,0.1)',
            transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(34,197,94,0.55), 0 0 80px rgba(34,197,94,0.25), 0 0 120px rgba(34,197,94,0.1)';
            e.currentTarget.style.borderColor = 'rgba(34,197,94,0.95)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 0 18px rgba(34,197,94,0.25), 0 0 40px rgba(34,197,94,0.1)';
            e.currentTarget.style.borderColor = 'rgba(34,197,94,0.6)';
          }}
        >

          {/* Logo */}
          <div className="relative w-full" style={{ maxWidth: '320px', height: '90px' }}>
            <Image
              src="/zesty-logo.webp"
              alt="Zesty.Bet"
              fill
              sizes="320px"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Description */}
          <p className="font-sans font-light leading-relaxed" style={{ fontSize: '0.93rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.02em', maxWidth: '420px' }}>
            The platform behind the big wins. Zesty.Bet powers Sydney Slots King&apos;s
            exclusive sessions — a premium casino experience trusted by the community.
          </p>

          {/* Code block */}
          <div
            className="flex items-center gap-5 px-6 py-4 w-full justify-center"
            style={{ border: '1px solid rgba(34,197,94,0.25)', background: 'rgba(34,197,94,0.05)' }}
          >
            <div>
              <span className="text-[9px] uppercase font-medium block mb-0.5" style={{ letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)' }}>
                Exclusive Code
              </span>
              <span
                className="font-bold"
                style={{ fontSize: '1.5rem', letterSpacing: '0.22em', color: '#22c55e' }}
              >
                SYDKINGVIP
              </span>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'rgba(34,197,94,0.2)' }} />
            <span className="text-xs font-light text-left leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)', maxWidth: '130px' }}>
              Use at registration for exclusive benefits
            </span>
          </div>

          {/* CTA */}
          <a
            href="https://zesty.bet"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 text-xs font-bold uppercase transition-all duration-300"
            style={{
              letterSpacing: '0.16em',
              background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 45%, #4ade80 60%, #22c55e 80%, #16a34a 100%)',
              color: '#030f06',
              boxShadow: '0 0 24px rgba(34,197,94,0.3)',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 36px rgba(34,197,94,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 24px rgba(34,197,94,0.3)')}
          >
            Play on Zesty.Bet
            <ExternalLink size={12} />
          </a>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 text-left">
            <Shield size={11} style={{ color: 'rgba(255,255,255,0.18)', marginTop: '2px', flexShrink: 0 }} />
            <p className="font-sans font-light leading-relaxed" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
              Gambling can be addictive. Please gamble responsibly. 18+ only. If you need
              support visit{' '}
              <a
                href="https://www.gamblinghelponline.org.au"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.2)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.color = '')}
              >
                gamblinghelponline.org.au
              </a>
              . This is a sponsored partnership.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="divider-gold absolute bottom-0 inset-x-0" />
    </section>
  );
}
