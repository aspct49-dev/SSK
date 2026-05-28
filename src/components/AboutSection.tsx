'use client';

import { motion } from 'framer-motion';
import { StylizedWord } from './StylizedWord';

const stats = [
  { val: 'Since 2024', label: 'Creating' },
  { val: '1,000+',     label: 'Videos'   },
  { val: '10M+',       label: 'Views'    },
  { val: '13K+',       label: 'Subscribers' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[10px] uppercase font-medium" style={{ letterSpacing: '0.22em', color: 'rgba(201,168,76,0.55)' }}>
            The Story
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display font-semibold tracking-tight mt-2 mb-8"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'rgba(255,255,255,0.88)' }}
        >
          <StylizedWord text="About" />{' '}
          <StylizedWord text="Sydney" className="gold-text font-semibold" />{' '}
          <StylizedWord text="Slots" className="gold-text font-semibold" />{' '}
          <StylizedWord text="King" className="gold-text font-semibold" />
        </motion.h2>

        {/* Pull quote */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-display font-light leading-relaxed mx-auto mb-8"
          style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', color: 'rgba(255,255,255,0.62)', maxWidth: '680px' }}
        >
          From Sydney&apos;s pokies rooms to a global community of casino enthusiasts —
          this is what authentic slots content looks like.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="divider-gold mx-auto mb-8"
          style={{ maxWidth: '120px' }}
        />

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4 mx-auto mb-14"
          style={{ maxWidth: '620px' }}
        >
          <p className="font-sans font-light leading-relaxed text-base" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.02em' }}>
            Sydney Slots King launched in 2024 as a passion project — real sessions, no scripts,
            no staged wins. Just genuine casino entertainment shot live in real Australian
            clubs and casinos. In under a year, the channel has published over 1,000 videos
            and racked up more than 10 million total views.
          </p>
          <p className="font-sans font-light leading-relaxed text-base" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em' }}>
            Every video is a real session. Every win is authentic. Every giveaway is run
            with full transparency to the community. That&apos;s the Sydney Slots King promise —
            real, raw, and always entertaining.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map(({ val, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              className="py-7 px-4 flex flex-col items-center gap-1.5"
              style={{ border: '1px solid rgba(201,168,76,0.14)', background: '#000000', boxShadow: '0 0 14px rgba(201,168,76,0.12)', transition: 'box-shadow 0.3s, border-color 0.3s', position: 'relative', zIndex: 38, overflow: 'hidden' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(201,168,76,0.35)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 14px rgba(201,168,76,0.12)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.14)'; }}
            >
              {/* Shimmer */}
              <div aria-hidden style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                width: '50%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.07) 40%, rgba(232,201,122,0.13) 50%, rgba(201,168,76,0.07) 60%, transparent 100%)',
                animation: 'card-shimmer 3.5s ease-in-out infinite',
                animationDelay: `${i * 0.9}s`,
              }} />
              <div className="gold-text font-display font-semibold" style={{ fontSize: '1.8rem', lineHeight: 1, position: 'relative', zIndex: 1 }}>{val}</div>
              <div className="text-[10px] uppercase font-medium" style={{ letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', position: 'relative', zIndex: 1 }}>{label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
