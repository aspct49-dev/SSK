'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import type { VideoData } from '@/app/api/videos/route';

/* ─── Fallback data — shown instantly on first render ───────────────── */
const FALLBACK: VideoData[] = [
  { id: 'Drc7sGrs2XI', title: 'GAMBLING THE NIGHT AWAY — Part 4 of 4',                    date: '28 May 2026', views: '' },
  { id: '1BghuMV0ppA', title: 'BIG FEATURE WIN — Bullrush Stampede $10 Max Bets',          date: '23 May 2026', views: '' },
  { id: 'lApLB4KUfb8', title: 'Fortune 8 Win + 3 Dragon Train Hits + Fortune Hearts Win',  date: '22 May 2026', views: '' },
  { id: 'opPehweXSJg', title: 'RISKING BIG MONEY FOR THAT BIG WIN',                        date: '22 May 2026', views: '' },
  { id: 'gPoUc3v4c28', title: 'NEW BULLRUSH STAMPEDE Slot Machine',                        date: '12 May 2026', views: '' },
];

/* ─── Slide animation variants (direction-aware) ────────────────────── */
// Reel positioning: maps a slide's signed offset from the active slide to a
// transform. Offset 0 is front-and-center; ±1 are the dimmed side slides; ±2
// sit further back at zero opacity, ready to slide in. STEP is a % of the
// slide's own width, so it stays proportional at every screen size.
const STEP = 82;
const pose = (offset: number) => {
  const a = Math.abs(offset);
  return {
    x: `${-50 + offset * STEP}%`,
    y: '-50%',
    scale: a === 0 ? 1 : a === 1 ? 0.52 : 0.42,
    opacity: a === 0 ? 1 : a === 1 ? 0.78 : 0,
    filter: a === 0 ? 'brightness(1)' : 'brightness(0.65)',
    zIndex: 30 - a * 10,
  };
};

const titleVariants = {
  enter:  (dir: number) => ({ x: dir >= 0 ? 28 : -28, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir >= 0 ? -28 : 28, opacity: 0 }),
};

/* ─── Thumbnail (with graceful fallback) ─────────────────────────────── */
// hqdefault always exists for a public video and returns a real image (unlike
// maxresdefault, which 404s to a gray placeholder for many uploads). Fall back
// to mqdefault on the rare error.
function Thumbnail({ id, title }: { id: string; title: string }) {
  const [errored, setErrored] = useState(false);
  const src = `https://img.youtube.com/vi/${id}/${errored ? 'mqdefault' : 'hqdefault'}.jpg`;
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={title}
      onError={() => setErrored(true)}
      className="absolute inset-0 w-full h-full object-cover"
      draggable={false}
    />
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */
export default function VideosSection() {
  const [videos, setVideos] = useState<VideoData[]>(FALLBACK);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetch('/api/videos')
      .then(r => r.json())
      .then((data: VideoData[]) => { if (data.length > 0) { setVideos(data); setActive(0); } })
      .catch(() => { /* keep fallback */ });
  }, []);

  const n = videos.length;
  const go = (dir: number) => { setDirection(dir); setActive(a => (a + dir + n) % n); };

  const featured = videos[active];

  // Compute each slide's nearest signed offset from the active one (wrapping
  // around the ends so the reel is endless), keeping only the visible window.
  const slides = videos
    .map((v, i) => {
      let offset = i - active;
      if (offset > n / 2) offset -= n;
      else if (offset < -n / 2) offset += n;
      return { v, offset };
    })
    .filter(s => Math.abs(s.offset) <= 2);

  return (
    <section id="videos" className="relative py-24 overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span
            className="inline-flex items-center justify-center rounded-lg"
            style={{ width: 46, height: 32, background: 'linear-gradient(180deg, #E7C766 0%, #C9A84C 100%)', boxShadow: '0 4px 14px rgba(201,168,76,0.35)' }}
          >
            <Play size={16} fill="#0a0a0a" style={{ color: '#0a0a0a', marginLeft: 2 }} />
          </span>
          <h2 className="font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)' }}>
            <span className="gold-text">YouTube</span>{' '}
            <span style={{ color: '#ffffff' }}>Highlights</span>
          </h2>
        </motion.div>

        {/* Coverflow reel */}
        <div className="relative select-none"
          style={{ minHeight: 'clamp(240px, 34vw, 400px)' }}>

          {/* Reel slides — each video keeps its own element (keyed by id) and
              framer-motion animates it between reel positions on navigation. */}
          {slides.map(({ v, offset }) => {
            const isFront = offset === 0;
            return (
              <motion.div
                key={v.id}
                className="absolute"
                style={{ top: '50%', left: '50%', width: 'clamp(280px, 48vw, 600px)', aspectRatio: '16/9' }}
                initial={false}
                animate={pose(offset)}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {isFront ? (
                  <div
                    className="w-full h-full rounded-2xl"
                    style={{
                      padding: '5px',
                      background: 'linear-gradient(135deg, #E8C97A 0%, #C9A84C 40%, #F0D060 60%, #C9A84C 80%, #B8932A 100%)',
                      boxShadow: '0 30px 80px rgba(0,0,0,0.65), 0 0 32px rgba(201,168,76,0.35)',
                    }}
                  >
                    <a
                      href={`https://youtube.com/watch?v=${v.id}`}
                      target="_blank" rel="noopener noreferrer"
                      className="group block w-full h-full overflow-hidden rounded-xl relative"
                    >
                      <Thumbnail id={v.id} title={v.title} />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'rgba(6,6,6,0.35)' }}>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #B8932A 0%, #E8C97A 50%, #B8932A 100%)', boxShadow: '0 0 28px rgba(201,168,76,0.55)' }}>
                          <Play size={26} fill="#060606" style={{ color: '#060606', marginLeft: 3 }} />
                        </div>
                      </div>
                    </a>
                  </div>
                ) : (
                  <div
                    className="w-full h-full rounded-xl"
                    style={{
                      padding: '5px',
                      background: 'linear-gradient(135deg, #FFE566 0%, #E8C97A 40%, #FFD700 60%, #E8C97A 100%)',
                    }}
                  >
                    <button
                      onClick={() => go(offset > 0 ? 1 : -1)}
                      aria-label={offset > 0 ? 'Next video' : 'Previous video'}
                      tabIndex={-1}
                      className="relative block w-full h-full overflow-hidden rounded-lg cursor-pointer"
                      style={{ pointerEvents: Math.abs(offset) >= 2 ? 'none' : 'auto' }}
                    >
                      <Thumbnail id={v.id} title={v.title} />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Chevron nav buttons */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous video"
            className="absolute z-30 flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              top: '50%',
              left: 'max(6px, calc(50% - clamp(150px, 25vw, 300px) - 48px))',
              transform: 'translateY(-50%)',
              width: 42, height: 42,
              background: 'rgba(6,6,6,0.75)',
              border: '2.5px solid rgba(201,168,76,0.85)',
              color: '#E8C97A',
              boxShadow: '0 0 14px rgba(201,168,76,0.25)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(201,168,76,0.12)';
              e.currentTarget.style.boxShadow = '0 0 22px rgba(201,168,76,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(6,6,6,0.75)';
              e.currentTarget.style.boxShadow = '0 0 14px rgba(201,168,76,0.25)';
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next video"
            className="absolute z-30 flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              top: '50%',
              right: 'max(6px, calc(50% - clamp(150px, 25vw, 300px) - 48px))',
              transform: 'translateY(-50%)',
              width: 42, height: 42,
              background: 'rgba(6,6,6,0.75)',
              border: '2.5px solid rgba(201,168,76,0.85)',
              color: '#E8C97A',
              boxShadow: '0 0 14px rgba(201,168,76,0.25)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(201,168,76,0.12)';
              e.currentTarget.style.boxShadow = '0 0 22px rgba(201,168,76,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(6,6,6,0.75)';
              e.currentTarget.style.boxShadow = '0 0 14px rgba(201,168,76,0.25)';
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Title + CTA */}
        <div className="text-center mt-8">
          <AnimatePresence custom={direction} mode="wait" initial={false}>
            <motion.p
              key={featured.id}
              custom={direction}
              variants={titleVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="font-semibold uppercase mx-auto max-w-2xl"
              style={{ letterSpacing: '0.06em', fontSize: '1.1rem', color: 'rgba(255,255,255,0.92)', textShadow: '0 0 24px rgba(201,168,76,0.18)' }}
            >
              {featured.title}
            </motion.p>
          </AnimatePresence>

          <a
            href={`https://youtube.com/watch?v=${featured.id}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 mt-7 px-9 py-3.5 rounded-lg text-xs font-bold uppercase transition-all duration-300"
            style={{ letterSpacing: '0.12em', background: 'linear-gradient(135deg, #B8932A 0%, #E8C97A 50%, #B8932A 100%)', color: '#060606', boxShadow: '0 10px 30px rgba(201,168,76,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Play size={13} fill="#060606" style={{ color: '#060606' }} /> Watch Now
          </a>
        </div>
      </div>
    </section>
  );
}
