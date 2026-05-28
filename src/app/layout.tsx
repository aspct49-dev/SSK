import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sydneyslotsking.com'),
  title: 'Sydney Slots King — Premium Slots & Casino Entertainment',
  description:
    'Join Sydney Slots King for premium casino slots content, exclusive giveaways, and a thriving community of casino enthusiasts. Australia\'s premier slots creator.',
  keywords: ['Sydney Slots King', 'slots', 'casino', 'giveaways', 'YouTube', 'pokies', 'Australia'],
  openGraph: {
    title: 'Sydney Slots King',
    description: 'Premium casino slots content, exclusive giveaways & community.',
    type: 'website',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sydney Slots King',
    description: 'Premium casino slots content, exclusive giveaways & community.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
