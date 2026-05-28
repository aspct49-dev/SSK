'use client';

import { motion } from 'framer-motion';
import { Youtube, Instagram, Facebook } from 'lucide-react';
import { StylizedWord } from './StylizedWord';

const GOLD = '#C9A84C';

const socials = [
  {
    label: 'YouTube',
    sub:   'Subscribe on channel',
    cta:   'Subscribe',
    href:  'https://youtube.com/@sydneyslotsking',
    Icon:  Youtube,
  },
  {
    label: 'Instagram',
    sub:   'Follow the reels',
    cta:   'Follow',
    href:  'https://www.instagram.com/sydneyslotsking?igsh=aWl2aWg1NmU4eGt6',
    Icon:  Instagram,
  },
  {
    label: 'Facebook',
    sub:   'Join the community',
    cta:   'Join',
    href:  'https://www.facebook.com/profile.php?id=61559592762621&mibextid=ZbWKwL',
    Icon:  Facebook,
  },
];

export default function SocialsSection() {
  return (
    <section id="socials" className="relative py-24 overflow-hidden" style={{ background: 'rgba(17,17,17,0.5)' }}>
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-[10px] uppercase font-medium" style={{ letterSpacing: '0.2em', color: 'rgba(201,168,76,0.55)' }}>
            Connect
          </span>
          <h2 className="font-display font-semibold tracking-tight mt-0.5" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'rgba(255,255,255,0.88)' }}>
            <StylizedWord text="Follow" />{' '}
            <StylizedWord text="Our" />{' '}
            <StylizedWord text="Socials" className="gold-text font-semibold" />
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {socials.map(({ label, sub, cta, href, Icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55 }}
              className="group relative flex flex-col items-center text-center px-6 py-10 rounded-xl overflow-hidden"
              style={{
                zIndex: 38, // paint above the global pattern overlay (z-35) so the card reads as solid
                background: 'linear-gradient(160deg, #1c180f 0%, #121008 60%, #0d0b06 100%)',
                border: '1px solid rgba(201,168,76,0.16)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 30px rgba(0,0,0,0.5)',
                transition: 'border-color 0.35s, box-shadow 0.35s, transform 0.35s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.55)';
                e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 34px rgba(201,168,76,0.22), 0 14px 40px rgba(0,0,0,0.6)`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.16)';
                e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 30px rgba(0,0,0,0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Top glow behind icon */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
                  width: '220px', height: '160px',
                  background: `radial-gradient(circle, rgba(201,168,76,0.28) 0%, transparent 68%)`,
                  filter: 'blur(14px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Icon */}
              <Icon
                size={40}
                strokeWidth={1.5}
                className="relative z-10"
                style={{ color: '#F5E9C8', filter: `drop-shadow(0 0 14px rgba(201,168,76,0.6))` }}
              />

              {/* Title with flanking lines */}
              <div className="flex items-center gap-3 w-full mt-7 mb-2 relative z-10">
                <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.35))' }} />
                <h3 className="font-display font-bold uppercase" style={{ letterSpacing: '0.1em', fontSize: '1.05rem', color: 'rgba(255,255,255,0.92)' }}>
                  {label}
                </h3>
                <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.35))' }} />
              </div>

              {/* Subtitle */}
              <p className="text-[11px] uppercase font-medium relative z-10" style={{ letterSpacing: '0.16em', color: 'rgba(255,255,255,0.4)' }}>
                {sub}
              </p>

              {/* Button */}
              <span
                className="mt-8 px-8 py-2.5 rounded-md font-bold uppercase text-xs relative z-10"
                style={{
                  letterSpacing: '0.1em',
                  background: `linear-gradient(180deg, #E7C766 0%, ${GOLD} 100%)`,
                  color: '#0a0a0a',
                  boxShadow: '0 6px 18px rgba(201,168,76,0.3)',
                  transition: 'filter 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.08)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,168,76,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(201,168,76,0.3)'; }}
              >
                {cta}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="divider-gold absolute bottom-0 inset-x-0" />
    </section>
  );
}
