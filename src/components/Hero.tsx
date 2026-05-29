'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Gift } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative h-screen overflow-hidden flex flex-col bg-[#060606]"
      style={{ minHeight: '640px' }}
    >
      {/* Radial gold glow — shifted right to follow logo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 72% 55%, rgba(170,130,35,0.13) 0%, transparent 70%)',
        }}
      />

      {/* Corner vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 40%, rgba(4,4,4,0.96) 100%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0a0a0a, transparent)' }}
      />

      {/* ── Two-column main content ── */}
      <div
        className="relative z-10 flex-1 flex items-center pt-20 px-8 sm:px-12 lg:px-20"
        style={{ gap: 'clamp(2rem, 6vw, 6rem)' }}
      >
        {/* ── Left: headline + CTAs ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
          style={{ flex: '1 1 0', minWidth: 0 }}
        >
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-6"
            style={{
              border: '1px solid rgba(201,168,76,0.22)',
              background: 'rgba(201,168,76,0.05)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: '#C9A84C', boxShadow: '0 0 7px rgba(201,168,76,0.85)' }}
            />
            <span
              className="text-[9px] font-medium uppercase"
              style={{ letterSpacing: '0.2em', color: 'rgba(212,175,55,0.85)' }}
            >
              Sydney, Australia
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="font-bold uppercase leading-none select-none"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)' }}
          >
            <span
              className="block"
              style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '0.04em' }}
            >
              Australia&apos;s
            </span>
            <span
              className="block hero-shine"
              style={{ letterSpacing: '0.04em', lineHeight: 0.95 }}
            >
              #1 IRL
            </span>
            <span
              className="block"
              style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '0.04em' }}
            >
              Slots
            </span>
            <span
              className="block hero-shine"
              style={{ letterSpacing: '0.04em' }}
            >
              Creator
            </span>
          </h1>

          {/* Thin gold rule */}
          <div
            className="my-6"
            style={{
              width: '48px', height: '1px',
              background: 'linear-gradient(to right, rgba(201,168,76,0.7), transparent)',
            }}
          />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <a
              href="/giveaways"
              className="gold-bg inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase transition-all duration-300"
              style={{ color: '#060606', letterSpacing: '0.17em', boxShadow: '0 0 18px rgba(201,168,76,0.18)' }}
            >
              <Gift size={13} />
              Join Giveaways
            </a>
            <a
              href="https://youtube.com/@sydneyslotsking"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-medium uppercase transition-all duration-300"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.17em' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <Play size={12} />
              Watch Videos
            </a>
          </div>
        </motion.div>

        {/* ── Right: logo ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 flex items-center justify-center"
          style={{ flex: '0 0 auto' }}
        >
          <Image
            src="/sk-logo.png"
            alt="Sydney Slots King"
            width={677}
            height={369}
            priority
            style={{ width: 'clamp(340px, 46vw, 660px)', height: 'auto', display: 'block' }}
          />
        </motion.div>
      </div>

    </section>
  );
}
