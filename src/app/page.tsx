import Navbar        from '@/components/Navbar';
import Hero           from '@/components/Hero';
import SponsorSection from '@/components/SponsorSection';
import VideosSection  from '@/components/VideosSection';
import GiveawaySection from '@/components/GiveawaySection';
import AboutSection   from '@/components/AboutSection';
import SocialsSection from '@/components/SocialsSection';
import Footer         from '@/components/Footer';
import type { CSSProperties } from 'react';

/* ─── Inline-style objects ──────────────────────────────────────────
   Keeping styles out of Tailwind custom-class territory so they
   are 100% reliable regardless of JIT purging / config issues.
─────────────────────────────────────────────────────────────────── */
const wrapStyle: CSSProperties = {
  position:  'relative',
  minHeight: '100vh',
  background: '#0a0a0a',
  overflowX: 'hidden',
};

const patternStyle: CSSProperties = {
  /* The pattern.jpg is white-on-white.
     filter:invert(1)  → white bg becomes black  (screen-blends away)
                         gray lines become dark   (adds subtle glow via screen)
     mix-blend-mode:screen → black = invisible, dark-grey = faint brightening
     zIndex 5 → above content (z-index 1) so screen-blend actually applies,
                below navbar (z-index 50) and mobile menu (z-index 40)
     pointer-events:none → no click interference */
  position:        'fixed',
  inset:           0,
  zIndex:          5,
  pointerEvents:   'none',
  backgroundImage: "url('/pattern.jpg')",
  backgroundRepeat:'repeat',
  backgroundSize:  '480px auto',
  filter:          'invert(1)',
  opacity:         0.3,
  mixBlendMode:    'screen' as CSSProperties['mixBlendMode'],
};

const contentStyle: CSSProperties = {
  position: 'relative',
  zIndex:   1,
};

export default function Home() {
  return (
    <div style={wrapStyle}>
      {/* Global pattern overlay */}
      <div aria-hidden="true" style={patternStyle} />

      {/* Page content */}
      <div style={contentStyle}>
        <Navbar />
        <Hero />
        <SponsorSection />
        <VideosSection />
        <GiveawaySection />
        <AboutSection />
        <SocialsSection />
        <Footer />
      </div>
    </div>
  );
}
