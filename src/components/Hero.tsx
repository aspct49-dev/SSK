'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, Gift } from 'lucide-react';
import { StylizedWord } from './StylizedWord';
import { useState, useEffect, useRef } from 'react';

/* ── Sparkle helpers (outside component — no hooks) ─────────────────── */
type SparkleItem = { key: number; x: number; y: number; arm: number; dur: number };
const SPARK_CENTER = 106; // centre of the 212×212 container (inset:-60 on 92px logo)
const SPARK_ORBIT  = 54;  // px from logo centre

function genSparkle(key: number): SparkleItem {
  const angle = Math.random() * 2 * Math.PI;
  const dist  = SPARK_ORBIT + (Math.random() - 0.5) * 12;
  return {
    key,
    x:   SPARK_CENTER + Math.cos(angle) * dist,
    y:   SPARK_CENTER + Math.sin(angle) * dist,
    arm: 16 + Math.random() * 10,
    dur: 1.8 + Math.random() * 0.8,
  };
}

export default function Hero() {
  /* ── Random sparkle state ── */
  const timerRefs  = useRef<ReturnType<typeof setTimeout>[]>([]);
  const counterRef = useRef(10);
  const [sparkles, setSparkles] = useState<SparkleItem[]>(() => [
    genSparkle(1), genSparkle(2), genSparkle(3),
  ]);

  useEffect(() => {
    // After each sparkle's animation finishes, remount it at a new random position
    const refresh = (idx: number) => {
      const s = genSparkle(counterRef.current++);
      setSparkles(prev => { const n = [...prev]; n[idx] = s; return n; });
      timerRefs.current[idx] = setTimeout(() => refresh(idx), s.dur * 1000);
    };
    // Stagger the initial delays so sparkles don't all cycle in unison
    timerRefs.current[0] = setTimeout(() => refresh(0), 2100);
    timerRefs.current[1] = setTimeout(() => refresh(1), 2800);
    timerRefs.current[2] = setTimeout(() => refresh(2), 3600);
    return () => timerRefs.current.forEach(t => clearTimeout(t));
  }, []);

  return (
    /*
     * h-screen: locks to exactly one viewport height
     * overflow-hidden: prevents text bleed
     * pt-20: pushes past the 80px fixed navbar so content isn't clipped
     * flex flex-col: stacks [spacer → center-block → stats]
     */
    <section
      className="relative h-screen overflow-hidden flex flex-col bg-[#060606]"
      style={{ minHeight: '600px' }}
    >
      {/* ── Radial gold glow — lower-centre ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 50% 68%, rgba(170,130,35,0.14) 0%, transparent 70%)',
        }}
      />

      {/* ── Hard vignette corners ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 38%, rgba(4,4,4,0.97) 100%)',
        }}
      />

      {/* ── Bottom fade into next section ── */}
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
           style={{ background: 'linear-gradient(to top, #0a0a0a, transparent)' }} />

      {/* ══════════ MAIN CONTENT ══════════
          - pt-20 clears the 80px fixed navbar
          - flex-1 + flex col items-center justify-center centres within remaining height
      ══════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center pt-20 px-4 pb-4">

        {/* ── Badge pill ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10 inline-flex items-center gap-2.5 rounded-full px-5 py-2"
          style={{
            border: '1px solid rgba(201,168,76,0.22)',
            background: 'rgba(201,168,76,0.05)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: '#C9A84C',
              boxShadow: '0 0 7px rgba(201,168,76,0.85)',
            }}
          />
          <span
            className="text-[10px] sm:text-[11px] font-medium uppercase"
            style={{ letterSpacing: '0.22em', color: 'rgba(212,175,55,0.9)' }}
          >
            Australia&apos;s #1 Slots Creator
          </span>
        </motion.div>

        {/* ── Single-line headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="gold-text font-bold select-none"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(1.6rem, 6vw, 7rem)',
            lineHeight: 1,
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}
        >
          <StylizedWord text="Sydney" />{' '}
          <StylizedWord text="Slots" />{' '}
          <StylizedWord text="King" />
        </motion.h1>

        {/* ── Logo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: '2rem', position: 'relative' }}
        >
          {/* Gold ambient glow behind the circle — breathes */}
          <div style={{
            position: 'absolute', inset: '-20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.28) 0%, transparent 70%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
            animation: 'logo-ambient-breathe 3s ease-in-out infinite',
          }} />

          {/* ── Rotating orbit light ── */}
          {/* Sharp comet arc */}
          <div style={{
            position: 'absolute', inset: '-3px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, rgba(255,224,100,1) 0deg, rgba(232,201,122,0.85) 25deg, rgba(201,168,76,0.4) 55deg, transparent 90deg, transparent 285deg, rgba(201,168,76,0.3) 320deg, rgba(255,224,100,1) 360deg)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))',
            animation: 'logo-orbit 2.8s linear infinite',
            pointerEvents: 'none',
            zIndex: 2,
          }} />
          {/* Soft outer glow halo */}
          <div style={{
            position: 'absolute', inset: '-6px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, rgba(232,201,122,0.55) 0deg, rgba(201,168,76,0.2) 40deg, transparent 85deg, transparent 285deg, rgba(201,168,76,0.15) 330deg, rgba(232,201,122,0.55) 360deg)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 7px), white calc(100% - 7px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 7px), white calc(100% - 7px))',
            animation: 'logo-orbit 2.8s linear infinite',
            filter: 'blur(3px)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />

          {/* ── Sparkle stars — random positions, remounted each cycle ── */}
          {/* Container is 212×212 (inset:-60px on 92px logo) — center=(106,106) */}
          <div style={{
            position: 'absolute', inset: '-60px',
            pointerEvents: 'none', zIndex: 2,
          }}>
            {sparkles.map(({ key, x, y, arm, dur }) => (
              <div
                key={key}
                style={{
                  position: 'absolute', left: x, top: y,
                  // 'forwards' keeps opacity:0 after the animation ends so there's
                  // no flash before the next position is mounted
                  animation: `sparkle-twinkle ${dur}s ease-in-out forwards`,
                }}
              >
                {/* Vertical arm */}
                <div style={{
                  position: 'absolute',
                  width: '1.5px', height: `${arm}px`,
                  background: 'linear-gradient(to bottom, transparent, rgba(255,228,80,0.95), transparent)',
                  left: '-0.75px', top: `${-arm / 2}px`,
                }} />
                {/* Horizontal arm */}
                <div style={{
                  position: 'absolute',
                  width: `${arm}px`, height: '1.5px',
                  background: 'linear-gradient(to right, transparent, rgba(255,228,80,0.95), transparent)',
                  left: `${-arm / 2}px`, top: '-0.75px',
                }} />
                {/* Centre dot */}
                <div style={{
                  position: 'absolute',
                  width: '4px', height: '4px',
                  borderRadius: '50%',
                  background: '#FFE450',
                  boxShadow: '0 0 6px rgba(255,228,80,0.95), 0 0 14px rgba(255,200,60,0.6)',
                  left: '-2px', top: '-2px',
                }} />
              </div>
            ))}
          </div>

          <div style={{
            position: 'relative',
            width: '92px', height: '92px',
            borderRadius: '50%', overflow: 'hidden',
            boxShadow: '0 0 0 1px rgba(201,168,76,0.3), 0 8px 32px rgba(0,0,0,0.5)',
            zIndex: 3,
          }}>
            <Image
              src="/logo.jpeg"
              alt="Sydney Slots King"
              fill
              sizes="92px"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center 38%', mixBlendMode: 'screen', filter: 'contrast(1.3) saturate(1.2)', transform: 'scale(1.12)' }}
            />
          </div>
        </motion.div>

        {/* ── CTA row ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.48, ease: 'easeOut' }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="#giveaways"
            className="gold-bg inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-bold uppercase transition-all duration-300"
            style={{
              color: '#060606',
              letterSpacing: '0.17em',
              boxShadow: '0 0 18px rgba(201,168,76,0.18)',
            }}
          >
            <Gift size={13} />
            Join Giveaways
          </a>
          <a
            href="https://youtube.com/@sydneyslotsking"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-medium uppercase transition-all duration-300"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.17em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <Play size={12} />
            Watch Videos
          </a>
        </motion.div>
      </div>

      {/* ══════════ STATS BAR — pinned to bottom ══════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="relative z-10 flex-shrink-0 flex items-center justify-center gap-8 sm:gap-16 py-5 sm:py-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        {[
          { value: '13K+',  label: 'Subscribers' },
          { value: '10M+',  label: 'Total Views' },
          { value: '1K+',   label: 'Videos'      },
          { value: '100K',   label: 'Best Video'  },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span
              className="gold-text font-display font-semibold leading-none"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.6rem)' }}
            >
              {value}
            </span>
            <span
              className="font-sans uppercase hidden sm:block"
              style={{ fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.2)' }}
            >
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 sm:hidden flex flex-col items-center gap-1.5"
      >
        <div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
