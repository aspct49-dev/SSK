'use client';

import { motion } from 'framer-motion';
import { Youtube, Instagram, Facebook } from 'lucide-react';
import { StylizedWord } from './StylizedWord';

const socials = [
  {
    label:       'YouTube',
    handle:      '@sydneyslotsking',
    href:        'https://youtube.com/@sydneyslotsking',
    Icon:        Youtube,
    iconColor:   '#FF4444',
    hoverColor:  'rgba(239,68,68,0.5)',
    glowColor:   'rgba(239,68,68,0.12)',
    topGleam:    'rgba(239,68,68,0.6)',
    metric:      '13K+',
    metricLabel: 'Subscribers',
    desc:        'Main content hub — weekly pokies sessions, big wins & jackpots.',
  },
  {
    label:       'Instagram',
    handle:      '@sydneyslotsking',
    href:        'https://www.instagram.com/sydneyslotsking?igsh=aWl2aWg1NmU4eGt6',
    Icon:        Instagram,
    iconColor:   '#E1306C',
    hoverColor:  'rgba(236,72,153,0.5)',
    glowColor:   'rgba(236,72,153,0.1)',
    topGleam:    'rgba(236,72,153,0.6)',
    metric:      '7K+',
    metricLabel: 'Followers',
    desc:        'Highlights, casino reels, and exclusive content sneak peeks.',
  },
  {
    label:       'Facebook',
    handle:      'Sydney Slots King',
    href:        'https://www.facebook.com/profile.php?id=61559592762621&mibextid=ZbWKwL',
    Icon:        Facebook,
    iconColor:   '#1877F2',
    hoverColor:  'rgba(59,130,246,0.5)',
    glowColor:   'rgba(59,130,246,0.1)',
    topGleam:    'rgba(59,130,246,0.6)',
    metric:      '1K+',
    metricLabel: 'Followers',
    desc:        'Updates, highlights, and community content.',
  },
];

export default function SocialsSection() {
  return (
    <section id="socials" className="relative py-24 overflow-hidden" style={{ background: 'rgba(17,17,17,0.5)' }}>
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
            Connect
          </span>
          <h2 className="font-display font-semibold tracking-tight mt-0.5" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'rgba(255,255,255,0.88)' }}>
            <StylizedWord text="Follow" />{' '}
            <StylizedWord text="The" />{' '}
            <StylizedWord text="Journey" className="gold-text font-semibold" />
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socials.map(({ label, handle, href, Icon, iconColor, hoverColor, glowColor, topGleam, metric, metricLabel, desc }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55 }}
              className="group block p-6 sm:p-7 relative overflow-hidden"
              style={{
                background: '#050505',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: `0 0 16px ${glowColor.replace('0.1', '0.35').replace('0.12', '0.4')}, inset 0 0 60px ${glowColor}`,
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = hoverColor;
                e.currentTarget.style.boxShadow = `0 0 32px ${hoverColor}, 0 0 60px ${hoverColor.replace('0.5', '0.2')}, inset 0 0 80px ${glowColor}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = `0 0 16px ${glowColor.replace('0.1', '0.35').replace('0.12', '0.4')}, inset 0 0 60px ${glowColor}`;
              }}
            >
              {/* Top gleam line */}
              <div style={{
                position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                background: `linear-gradient(to right, transparent, ${topGleam}, transparent)`,
                filter: 'blur(1px)',
              }} />
              {/* Corner glow */}
              <div style={{
                position: 'absolute', top: '-30px', left: '-20px',
                width: '120px', height: '120px', borderRadius: '50%',
                background: `radial-gradient(circle, ${glowColor.replace('0.1', '0.35').replace('0.12', '0.4')} 0%, transparent 70%)`,
                filter: 'blur(12px)',
                pointerEvents: 'none',
              }} />

              {/* Icon + label */}
              <div className="flex items-start justify-between mb-5 relative z-10">
                <Icon size={22} style={{ color: iconColor, filter: `drop-shadow(0 0 8px ${iconColor})`, transition: 'filter 0.3s' }} />
                <span className="text-[9px] uppercase font-medium" style={{ letterSpacing: '0.16em', color: 'rgba(255,255,255,0.25)' }}>
                  {label}
                </span>
              </div>

              {/* Metric */}
              <div className="mb-4 relative z-10">
                {metric && (
                  <div className="gold-text font-display font-semibold leading-none" style={{ fontSize: '1.9rem' }}>
                    {metric}
                  </div>
                )}
                <div className="text-[9px] uppercase font-medium mt-1" style={{ letterSpacing: '0.16em', color: 'rgba(255,255,255,0.28)' }}>
                  {metricLabel}
                </div>
              </div>

              {/* Thin divider */}
              <div className="relative z-10" style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '16px' }} />

              {/* Handle + desc */}
              <div className="text-xs font-medium mb-1 relative z-10" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>
                {handle}
              </div>
              <p className="text-xs font-light leading-relaxed relative z-10" style={{ color: 'rgba(255,255,255,0.28)' }}>
                {desc}
              </p>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="divider-gold absolute bottom-0 inset-x-0" />
    </section>
  );
}
