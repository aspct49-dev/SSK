'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Gift, Clock, Users, CheckCircle2, Youtube, Twitter,
  MessageSquare, Trophy, Crown, ChevronRight
} from 'lucide-react';
import { StylizedWord } from './StylizedWord';

/* ─── Types ─── */
interface Giveaway {
  id:           string;
  title:        string;
  prize:        string;
  deadline:     string; /* ISO string — safe to serialize server→client */
  winners:      number;
  status:       'active' | 'ended' | 'upcoming';
  requirements: string[];
  entries:      number;
}

/* ─── Data ─────────────────────────────────────────────────────────
   Deadlines are stored as ISO strings so they're identical on
   server and client — no hydration mismatch.
──────────────────────────────────────────────────────────────────── */
const MS = (days: number, hours = 0) =>
  new Date(Date.now() + days * 86400_000 + hours * 3600_000).toISOString();

const GIVEAWAYS: Giveaway[] = [
  {
    id:       'gw-001',
    title:    'MEGA JUNE GIVEAWAY',
    prize:    '$500 Cash Prize',
    deadline: MS(6, 14),
    winners:  1,
    status:   'active',
    requirements: [
      'Subscribe on YouTube',
      'Comment under the video',
    ],
    entries: 4231,
  },
  {
    id:       'gw-002',
    title:    'COMMUNITY MILESTONE',
    prize:    '150K Subscriber Special — $250 + Merch',
    deadline: MS(12),
    winners:  3,
    status:   'active',
    requirements: [
      'Subscribe on YouTube',
      'Comment under the video',
    ],
    entries: 2817,
  },
  {
    id:       'gw-003',
    title:    'JACKPOT WINNER DRAW',
    prize:    'Signed Merch Bundle',
    deadline: MS(-3),
    winners:  2,
    status:   'ended',
    requirements: [
      'Subscribe on YouTube',
      'Comment favourite slot game',
    ],
    entries: 6100,
  },
];

/* ─── Countdown hook — client-only, no SSR mismatch ─── */
function useCountdown(isoDeadline: string) {
  const calc = useCallback(() => {
    const diff = new Date(isoDeadline).getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, expired: true };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
      expired: false,
    };
  }, [isoDeadline]);

  /* Start as zeroes — set real value after mount to prevent hydration diff */
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0, expired: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return { ...time, mounted };
}

/* ─── Countdown display ─── */
function Countdown({ deadline, expired }: { deadline: string; expired: boolean }) {
  const { d, h, m, s, mounted } = useCountdown(deadline);

  if (expired) {
    return (
      <span className="text-xs uppercase font-medium" style={{ letterSpacing: '0.16em', color: 'rgba(255,255,255,0.28)' }}>
        Giveaway Ended
      </span>
    );
  }

  const units = [
    { val: d, label: 'D' },
    { val: h, label: 'H' },
    { val: m, label: 'M' },
    { val: s, label: 'S' },
  ];

  return (
    <div className="flex items-end gap-2" suppressHydrationWarning>
      {units.map(({ val, label }) => (
        <div key={label} className="flex flex-col items-center gap-0.5">
          <span
            className="gold-text font-display font-semibold tabular-nums w-9 text-center"
            style={{ fontSize: '1.4rem', lineHeight: 1 }}
            suppressHydrationWarning
          >
            {mounted ? String(val).padStart(2, '0') : '--'}
          </span>
          <span className="text-[9px] uppercase font-medium" style={{ letterSpacing: '0.14em', color: 'rgba(255,255,255,0.22)' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Requirement icon map ─── */
const REQ_ICONS: Record<string, React.ElementType> = {
  'Subscribe on YouTube':   Youtube,
  'Follow on Twitter/X':    Twitter,
  'Join Discord server':    MessageSquare,
  'Like the milestone video': CheckCircle2,
};

/* ─── Single giveaway card ─── */
function GiveawayCard({ gw, index }: { gw: Giveaway; index: number }) {
  const [entered, setEntered] = useState(false);
  const expired = gw.status === 'ended';

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
      style={{
        background: '#050505',
        border: expired
          ? '1px solid rgba(255,255,255,0.05)'
          : '1px solid rgba(201,168,76,0.16)',
        boxShadow: expired
          ? '0 0 10px rgba(255,255,255,0.03)'
          : '0 0 16px rgba(201,168,76,0.14)',
        opacity: expired ? 0.55 : 1,
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        if (!expired) {
          e.currentTarget.style.boxShadow = '0 0 32px rgba(201,168,76,0.32)';
          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = expired ? '0 0 10px rgba(255,255,255,0.03)' : '0 0 16px rgba(201,168,76,0.14)';
        e.currentTarget.style.borderColor = expired ? 'rgba(255,255,255,0.05)' : 'rgba(201,168,76,0.16)';
      }}
    >
      {/* Status badge */}
      <div
        className="absolute top-5 right-5 px-2.5 py-1 text-[9px] font-bold uppercase"
        style={{
          letterSpacing: '0.16em',
          background: expired
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(201,168,76,0.12)',
          color: expired
            ? 'rgba(255,255,255,0.25)'
            : '#E8C97A',
        }}
      >
        {expired ? 'ENDED' : gw.status === 'upcoming' ? 'SOON' : 'LIVE'}
      </div>

      <div className="p-6 sm:p-8">
        {/* Prize header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <Crown size={12} style={{ color: 'rgba(201,168,76,0.5)' }} />
            <span className="text-[9px] uppercase font-medium" style={{ letterSpacing: '0.18em', color: 'rgba(201,168,76,0.5)' }}>
              Prize
            </span>
          </div>
          <h3
            className="font-display font-semibold leading-tight pr-16"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: 'rgba(255,255,255,0.85)' }}
          >
            {gw.title}
          </h3>
          <p className="mt-1 font-sans font-light" style={{ fontSize: '0.875rem', color: 'rgba(232,201,122,0.65)' }}>
            {gw.prize}
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Clock size={11} style={{ color: 'rgba(255,255,255,0.22)' }} />
            <span className="text-[9px] uppercase font-medium" style={{ letterSpacing: '0.16em', color: 'rgba(255,255,255,0.22)' }}>
              {expired ? 'Ended' : 'Time Remaining'}
            </span>
          </div>
          <Countdown deadline={gw.deadline} expired={expired} />
        </div>

        {/* Divider */}
        <div className="divider-gold mb-5" />

        {/* Requirements */}
        <div className="mb-5">
          <p className="text-[9px] uppercase font-medium mb-3" style={{ letterSpacing: '0.16em', color: 'rgba(255,255,255,0.28)' }}>
            Entry Requirements
          </p>
          <div className="flex flex-col gap-2">
            {gw.requirements.map((req) => {
              const Icon = REQ_ICONS[req] ?? CheckCircle2;
              return (
                <div key={req} className="flex items-center gap-2.5">
                  <Icon size={11} style={{ color: 'rgba(201,168,76,0.45)', flexShrink: 0 }} />
                  <span className="font-sans font-light text-sm" style={{ color: 'rgba(255,255,255,0.48)' }}>
                    {req}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs font-light" style={{ color: 'rgba(255,255,255,0.28)' }}>
              <Users size={11} />
              {gw.entries.toLocaleString()} entries
            </span>
            <span className="flex items-center gap-1.5 text-xs font-light" style={{ color: 'rgba(255,255,255,0.28)' }}>
              <Trophy size={11} />
              {gw.winners} winner{gw.winners > 1 ? 's' : ''}
            </span>
          </div>

          {!expired && (
            <button
              onClick={() => setEntered(true)}
              disabled={entered}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase transition-all duration-300"
              style={{
                letterSpacing: '0.15em',
                background: entered ? 'rgba(34,197,94,0.1)' : 'linear-gradient(135deg, #B8932A 0%, #D4AF37 30%, #F0D060 55%, #D4AF37 75%, #B8932A 100%)',
                color:      entered ? 'rgba(134,239,172,0.7)' : '#060606',
                border:     entered ? '1px solid rgba(34,197,94,0.25)' : 'none',
                cursor:     entered ? 'default' : 'pointer',
              }}
            >
              {entered ? (
                <><CheckCircle2 size={12} /> Entered</>
              ) : (
                <>Enter Now <ChevronRight size={12} /></>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ─── */
export default function GiveawaySection() {
  const active = GIVEAWAYS.filter(g => g.status === 'active');

  return (
    <section id="giveaways" className="relative py-24 overflow-hidden" style={{ background: 'rgba(17,17,17,0.6)' }}>
      <div className="divider-gold absolute top-0 inset-x-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="text-[10px] uppercase font-medium" style={{ letterSpacing: '0.2em', color: 'rgba(201,168,76,0.55)' }}>
            Community Rewards
          </span>
          <h2 className="font-display font-semibold tracking-tight mt-1" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'rgba(255,255,255,0.88)' }}>
            <StylizedWord text="Active" />{' '}
            <StylizedWord text="Giveaways" className="gold-text font-semibold" />
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs mt-2" style={{ color: 'rgba(255,255,255,0.18)' }}>
            <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            {active.length} LIVE NOW
          </div>
        </motion.div>

        {/* Active giveaways */}
        {active.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {active.map((gw, i) => <GiveawayCard key={gw.id} gw={gw} index={i} />)}
          </div>
        )}

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 p-7 sm:p-10"
          style={{ background: '#050505', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 0 12px rgba(255,255,255,0.04)' }}
        >
          <div className="grid sm:grid-cols-[auto_1fr] gap-8">
            <div className="sm:max-w-[220px]">
              <span className="text-[9px] uppercase font-medium block mb-3" style={{ letterSpacing: '0.18em', color: 'rgba(201,168,76,0.55)' }}>
                How It Works
              </span>
              <h3 className="font-display font-light leading-snug" style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.65)' }}>
                Three steps to enter
              </h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Subscribe', desc: 'Subscribe to the YouTube channel and enable notifications.' },
                { step: '02', title: 'Comment',   desc: 'Drop your entry comment under the giveaway video.' },
                { step: '03', title: 'Wait',      desc: 'Winners are announced on the channel — stay tuned!' },
              ].map(({ step, title, desc }) => (
                <div key={step}>
                  <div className="font-display font-light mb-1.5" style={{ fontSize: '2rem', color: 'rgba(201,168,76,0.2)' }}>{step}</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{title}</div>
                  <div className="text-xs font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      <div className="divider-gold absolute bottom-0 inset-x-0" />
    </section>
  );
}
