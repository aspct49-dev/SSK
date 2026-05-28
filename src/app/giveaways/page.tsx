import Navbar         from '@/components/Navbar';
import GiveawaySection from '@/components/GiveawaySection';
import Footer          from '@/components/Footer';
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
        <div style={{ paddingTop: '80px' }}>
          <GiveawaySection />
        </div>
        <Footer />
      </div>
    </div>
  );
}
