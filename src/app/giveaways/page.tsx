import Navbar from '@/components/Navbar';
import Footer  from '@/components/Footer';
import type { CSSProperties } from 'react';

const wrapStyle: CSSProperties = {
  position:  'relative',
  minHeight: '100vh',
  background: '#0a0a0a',
  overflowX: 'hidden',
};

const patternStyle: CSSProperties = {
  position:        'fixed',
  inset:           0,
  zIndex:          35,
  pointerEvents:   'none',
  backgroundImage: "url('/pattern.jpg')",
  backgroundRepeat:'repeat',
  backgroundSize:  '480px auto',
  filter:          'invert(1)',
  opacity:         0.3,
  mixBlendMode:    'screen' as CSSProperties['mixBlendMode'],
};

export default function GiveawaysPage() {
  return (
    <div style={wrapStyle}>
      <div aria-hidden="true" style={patternStyle} />
      <div style={{ position: 'relative' }}>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
          <h1
            className="gold-text font-bold uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.1em' }}
          >
            Coming Soon
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', fontSize: '0.75rem', textTransform: 'uppercase' }}>
            Giveaways launching shortly
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
