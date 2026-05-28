'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Calendar, Youtube } from 'lucide-react';
import { StylizedWord } from './StylizedWord';
import type { VideoData } from '@/app/api/videos/route';

/* ─── Fallback data — shown instantly on first render ───────────────── */
const FALLBACK: VideoData[] = [
  { id: 'Drc7sGrs2XI', title: 'GAMBLING THE NIGHT AWAY — Part 4 of 4',                    date: '28 May 2026', views: '' },
  { id: '1BghuMV0ppA', title: 'BIG FEATURE WIN — Bullrush Stampede $10 Max Bets',          date: '23 May 2026', views: '' },
  { id: 'lApLB4KUfb8', title: 'Fortune 8 Win + 3 Dragon Train Hits + Fortune Hearts Win',  date: '22 May 2026', views: '' },
  { id: 'opPehweXSJg', title: 'RISKING BIG MONEY FOR THAT BIG WIN',                        date: '22 May 2026', views: '' },
  { id: 'gPoUc3v4c28', title: 'NEW BULLRUSH STAMPEDE Slot Machine',                        date: '12 May 2026', views: '' },
];

/* ─── Thumbnail ──────────────────────────────────────────────────────── */
function Thumbnail({ id, title, large = false }: { id: string; title: string; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  const src = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

  return failed ? (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: '#050505' }}
    >
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }}
      />
      <div className="relative z-10 flex flex-col items-center gap-3 opacity-30">
        <div className={`rounded-full flex items-center justify-center ${large ? 'w-14 h-14' : 'w-10 h-10'}`}
          style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <Play size={large ? 22 : 16} style={{ color: '#C9A84C', marginLeft: '2px' }} fill="#C9A84C" />
        </div>
        <span className="text-[9px] uppercase font-medium text-center px-4 leading-relaxed"
          style={{ letterSpacing: '0.14em', color: 'rgba(201,168,76,0.6)', maxWidth: '140px' }}>
          {title.substring(0, 40)}{title.length > 40 ? '…' : ''}
        </span>
      </div>
    </div>
  ) : (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt={title} onError={() => setFailed(true)}
      className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
  );
}

/* ─── Small video card ───────────────────────────────────────────────── */
function SmallCard({ video, index }: { video: VideoData; index: number }) {
  return (
    <motion.a
      href={`https://youtube.com/watch?v=${video.id}`}
      target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.55 }}
      className="video-card group block overflow-hidden"
      style={{ background: '#050505', border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.3s, box-shadow 0.3s', boxShadow: '0 0 12px rgba(255,255,255,0.04)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.22)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(201,168,76,0.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(255,255,255,0.04)'; }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Thumbnail id={video.id} title={video.title} />
        <div className="play-overlay absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(6,6,6,0.45)' }}>
          <div className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(201,168,76,0.85)', boxShadow: '0 0 20px rgba(201,168,76,0.3)' }}>
            <Play size={17} style={{ color: '#060606', marginLeft: '2px' }} fill="#060606" />
          </div>
        </div>
      </div>
      <div className="p-3.5">
        <h3 className="font-sans font-medium text-sm leading-snug line-clamp-2"
          style={{ color: 'rgba(255,255,255,0.72)' }}>
          {video.title}
        </h3>
        <div className="flex items-center gap-3 mt-2.5">
          {video.views && (
            <span className="flex items-center gap-1 text-[11px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
              <Eye size={10} /> {video.views}
            </span>
          )}
          {video.date && (
            <span className="flex items-center gap-1 text-[11px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
              <Calendar size={10} /> {video.date}
            </span>
          )}
        </div>
      </div>
    </motion.a>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */
export default function VideosSection() {
  const [videos, setVideos] = useState<VideoData[]>(FALLBACK);

  useEffect(() => {
    fetch('/api/videos')
      .then(r => r.json())
      .then((data: VideoData[]) => { if (data.length > 0) setVideos(data); })
      .catch(() => { /* keep fallback */ });
  }, []);

  const featured = videos[0];
  const recent   = videos.slice(1, 5);

  return (
    <section id="videos" className="relative py-24 overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-[10px] uppercase font-medium" style={{ letterSpacing: '0.2em', color: 'rgba(201,168,76,0.55)' }}>
            Latest Content
          </span>
          <h2 className="font-display font-semibold tracking-tight mt-0.5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'rgba(255,255,255,0.88)' }}>
            <StylizedWord text="Recent" />{' '}
            <StylizedWord text="Videos" className="gold-text font-semibold" />
          </h2>
        </motion.div>

        {/* Featured video */}
        <motion.div
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <a href={`https://youtube.com/watch?v=${featured.id}`} target="_blank" rel="noopener noreferrer"
            className="video-card group block overflow-hidden"
            style={{ background: '#050505', border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.3s, box-shadow 0.3s', boxShadow: '0 0 12px rgba(255,255,255,0.04)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.22)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(201,168,76,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(255,255,255,0.04)'; }}>
            <div className="grid md:grid-cols-[1.55fr_1fr]">
              <div className="relative aspect-video md:aspect-auto overflow-hidden" style={{ minHeight: '220px' }}>
                <Thumbnail id={featured.id} title={featured.title} large />
                <div className="play-overlay absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(6,6,6,0.4)' }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(201,168,76,0.88)', boxShadow: '0 0 28px rgba(201,168,76,0.35)' }}>
                    <Play size={26} style={{ color: '#060606', marginLeft: '3px' }} fill="#060606" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 text-[9px] font-bold uppercase px-2.5 py-1"
                  style={{ letterSpacing: '0.14em', background: 'rgba(201,168,76,0.9)', color: '#060606' }}>
                  Latest
                </span>
              </div>
              <div className="flex flex-col justify-between p-7 sm:p-9">
                <div>
                  <span className="text-[9px] uppercase font-medium block mb-3"
                    style={{ letterSpacing: '0.18em', color: 'rgba(201,168,76,0.55)' }}>
                    Featured Upload
                  </span>
                  <h3 className="font-display font-medium leading-snug"
                    style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.4rem)', color: 'rgba(255,255,255,0.82)' }}>
                    {featured.title}
                  </h3>
                </div>
                <div>
                  <div className="divider-gold my-5" />
                  <div className="flex items-center gap-5">
                    {featured.views && (
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
                        <Eye size={12} /> {featured.views} views
                      </span>
                    )}
                    {featured.date && (
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
                        <Calendar size={12} /> {featured.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </a>
        </motion.div>

        {/* 4-video grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recent.map((video, i) => (
            <SmallCard key={video.id} video={video} index={i} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <a href="https://youtube.com/@sydneyslotsking" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs uppercase font-medium transition-all duration-300"
            style={{ letterSpacing: '0.16em', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
            <Youtube size={14} /> View All Videos on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
}
