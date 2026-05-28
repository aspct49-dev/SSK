'use client';

import Image from 'next/image';
import { Youtube, Instagram, Facebook, Shield } from 'lucide-react';

const footerLinks = [
  { label: 'Videos',    href: '#videos'    },
  { label: 'Giveaways', href: '#giveaways' },
  { label: 'About',     href: '#about'     },
  { label: 'Socials',   href: '#socials'   },
];

const socialLinks = [
  { Icon: Youtube,   href: 'https://youtube.com/@sydneyslotsking',                                          label: 'YouTube'   },
  { Icon: Instagram, href: 'https://www.instagram.com/sydneyslotsking?igsh=aWl2aWg1NmU4eGt6',              label: 'Instagram' },
  { Icon: Facebook,  href: 'https://www.facebook.com/profile.php?id=61559592762621&mibextid=ZbWKwL',       label: 'Facebook'  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#060606' }}>
      {/* Top gold divider */}
      <div className="divider-gold" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Main grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-10 py-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div style={{
                position: 'relative', width: '30px', height: '30px', flexShrink: 0,
                borderRadius: '50%', overflow: 'hidden',
                boxShadow: '0 0 0 1px rgba(201,168,76,0.2)',
              }}>
                <Image
                  src="/logo.jpeg"
                  alt="Sydney Slots King"
                  fill
                  sizes="30px"
                  style={{ objectFit: 'cover', objectPosition: 'center 38%', mixBlendMode: 'screen', filter: 'contrast(1.3) saturate(1.2)', transform: 'scale(1.12)' }}
                />
              </div>
              <span
                className="font-display font-semibold uppercase"
                style={{ fontSize: '0.8rem', letterSpacing: '0.22em', color: 'rgba(245,230,200,0.5)' }}
              >
                Sydney Slots King
              </span>
            </div>
            <p
              className="font-sans font-light leading-relaxed mb-6 max-w-[260px]"
              style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.02em' }}
            >
              Australia&apos;s premier slots creator. Authentic casino entertainment,
              exclusive community giveaways, and real pokies sessions.
            </p>
            {/* Socials row */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ color: 'rgba(255,255,255,0.2)', transition: 'color 0.25s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E8C97A')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[10px] uppercase font-medium mb-5" style={{ letterSpacing: '0.18em', color: 'rgba(255,255,255,0.18)' }}>
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              {footerLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-light transition-colors duration-250"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E8C97A')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact + sponsor */}
          <div>
            <p className="text-[10px] uppercase font-medium mb-5" style={{ letterSpacing: '0.18em', color: 'rgba(255,255,255,0.18)' }}>
              Contact & Partners
            </p>
            <div className="flex flex-col gap-2 mb-6">
              <a
                href="mailto:pokieschannel@gmail.com"
                className="text-sm font-light transition-colors duration-250"
                style={{ color: 'rgba(255,255,255,0.28)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E8C97A')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
              >
                pokieschannel@gmail.com
              </a>
              <span className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.16)' }}>
                Business enquiries only
              </span>
            </div>

            {/* Sponsor box */}
            <div
              className="p-4"
              style={{ border: '1px solid rgba(201,168,76,0.14)', background: 'rgba(201,168,76,0.04)' }}
            >
              <p className="text-[9px] uppercase font-medium mb-1" style={{ letterSpacing: '0.18em', color: 'rgba(201,168,76,0.48)' }}>
                Sponsor
              </p>
              <a
                href="https://zesty.bet"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="gold-text text-sm font-medium"
              >
                Zesty.Bet
              </a>
              <p className="text-[10px] font-light mt-0.5" style={{ color: 'rgba(255,255,255,0.18)' }}>
                Official casino partner
              </p>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="divider-gold" />

        {/* Bottom row */}
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2">
            <Shield size={11} style={{ color: 'rgba(255,255,255,0.14)', flexShrink: 0, marginTop: '2px' }} />
            <p className="text-[10px] font-light leading-relaxed max-w-lg" style={{ color: 'rgba(255,255,255,0.14)' }}>
              Gambling involves risk. Please play responsibly. 18+ only. If gambling is affecting
              you or someone you know, call the Gambling Helpline{' '}
              <strong className="font-medium">1800 858 858</strong> or visit{' '}
              <a
                href="https://www.gamblinghelponline.org.au"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.2)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.color = '')}
              >
                gamblinghelponline.org.au
              </a>
            </p>
          </div>
          <p className="text-[10px] font-light whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.14)' }}>
            © {new Date().getFullYear()} Sydney Slots King
          </p>
        </div>
      </div>
    </footer>
  );
}
